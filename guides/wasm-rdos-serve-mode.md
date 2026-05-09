# wasm R-DOS serve mode

## 현재 마무리 상태
- native `rdos_server` local HTTP endpoint와 wasm `@rdos_server` 전달 흐름은 현재 dev 빌드 기준으로 동작 확인됐다.
- 사용자가 새 dev 실행본을 재컴파일/재실행한 뒤, `rdos_server start` 후 DOS/R-DOS 화면이 아니어도 wasm `@rdos_server` 요청이 처리된다고 확인했다.
- 최신 native 구현은 listener worker thread가 HTTP 요청을 받아 main app loop queue로 넘기고, main loop에서 기존 R-DOS builtin handler 또는 기존 child pump 흐름으로 처리한다.
- 조회 계열 R-DOS builtin(`console`, `rtype`, `rfindtext`, `rfindfile`)은 wasm `@rdos_server` 경로에서 동작 확인됐다.
- 쓰기 계열 R-DOS builtin(`rwrite`, `rreplace`, `rdelete`, `rinsert`)은 handler 허용 및 빌드는 완료됐지만, wasm 채팅방에서의 실제 쓰기 테스트는 아직 남아 있다.
- Windows/DOS shell 명령과 PATH에 있는 외부 실행 파일도 기존 child 관리 흐름에 등록되어 응답을 돌려준다.

## 목적
- wasm ezChat에서 native 컴퓨터의 프로젝트 파일 확인, 수정, 컴파일을 보조할 수 있도록 native local serve bridge를 둔다.
- 브라우저/wasm은 native 파일 시스템과 `cargo` 실행에 직접 접근할 수 없으므로, native ezChat이 local HTTP endpoint로 요청을 받는다.
- native 직접 실행 명령 문법은 `@rdos`, wasm에서 native endpoint로 전달할 명령 문법은 `@rdos_server`로 구분한다.

## 최신 기본 구조
```text
wasm ezChat
  -> @rdos_server command
  -> POST http://127.0.0.1:11777/rdos or /execute
native ezChat rdos_serve listener worker
  -> request channel로 main app loop에 ServeRequest 전달
native ezChat main/update loop
  -> 안전한 R-DOS builtin이면 기존 builtin parser/handler로 즉시 처리
  -> 그 외 DOS/shell 명령이면 기존 CmdChild/child pump 흐름에 등록
  -> run_dos_command_check_processing()에서 완료/실패/timeout polling
native ezChat rdos_serve response channel
  -> stdout/stderr 또는 builtin output을 HTTP JSON response로 반환
wasm ezChat
  -> chat R-DOS output 표시
```

## endpoint
- 기본 주소: `127.0.0.1:11777`
- 주요 경로:
  - `GET /status`: serve 상태 확인
  - `POST /rdos`: 명령 실행
  - `POST /execute`: 명령 실행 호환 경로
  - `OPTIONS /rdos`, `/execute`, `/status`: wasm fetch용 CORS preflight
- 모든 HTTP 응답에는 CORS 헤더가 포함된다.

## 현재 실행 방식
- `src\rdos_serve.rs`는 HTTP 요청을 받은 listener worker thread에서 직접 명령을 실행하지 않는다.
- listener worker는 요청을 `ServeRequest`로 main app loop에 전달하고, HTTP handler thread는 `ServeResponse`를 기다린다.
- main app loop의 `rdos_serve_poll()`은 queue에 들어온 요청을 꺼내 `run_dos_command_for_serve()`로 보낸다.
- `run_dos_command_for_serve()`는 가능한 R-DOS builtin을 먼저 기존 handler로 처리하고, 그 외 명령은 기존 DOS child 실행/관리 흐름에 등록한다.
- `rdos_serve_finish(app)`는 공통 child polling 함수인 `run_dos_command_check_processing(app)`을 호출한다.
- 이 호출은 serve-owned DOS child 완료/응답 회수가 DOS/R-DOS 화면 렌더링에 묶이지 않도록 유지하는 핵심이다.

## 확인된 동작
- 검증: `cargo fmt`, native `cargo check`, wasm `cargo check --target wasm32-unknown-unknown`, dev `cargo build` 성공.
- 사용자가 새 dev 실행본을 재컴파일/재실행했다.
- `rdos_server start` 후 native 앱이 DOS/R-DOS 화면이 아니어도 wasm `@rdos_server` 요청이 동작한다고 확인했다.
- wasm `@rdos_server`에서 DOS/shell 명령(`echo`, `dir`)이 동작한다고 확인했다.
- wasm `@rdos_server`에서 조회 계열 builtin(`console`, `rtype`, `rfindtext`, `rfindfile`) 동작 확인 이력이 있다.
- dev 실행 파일 위치: `target\debug\ezchat.exe`

## 현재 가능한 명령 범위
- DOS/shell 및 외부 실행:
  - `echo ...`
  - `dir`
  - `cargo check`, `cargo fmt`, `cargo build`
  - `trunk ...`
  - Windows shell builtin 또는 PATH에 있는 외부 실행 파일
- R-DOS 조회 계열 builtin:
  - `console`
  - `rtype`
  - `rfindtext`
  - `rfindfile`
- R-DOS 쓰기 계열 builtin:
  - `rwrite`
  - `rreplace`
  - `rdelete`
  - `rinsert`
  - 구현과 빌드는 완료됐지만, wasm 채팅방에서 실제 파일 쓰기/삭제 동작 확인은 아직 남아 있다.
- 주의: 장기 실행 명령은 HTTP 응답을 오래 붙잡을 수 있으므로 timeout/streaming 정책이 별도로 필요할 수 있다.

## R-DOS builtin 처리 방침
- `@rdos_server`는 shell fallback 전에 안전하게 허용된 R-DOS builtin 이름을 먼저 검사한다.
- 허용된 builtin은 Windows `cmd.exe`로 넘기지 않고 기존 R-DOS parser/executor 경로를 재사용한다.
- 이 방식은 native 직접 `@rdos`와 wasm `@rdos_server`의 명령 해석 차이를 줄인다.
- 현재 허용 범위는 다음과 같다.
  - 조회: `console`, `rtype`, `rfindtext`, `rfindfile`
  - 쓰기: `rwrite`, `rreplace`, `rdelete`, `rinsert`
- 이미지 계열(`rimagegen`, `rimageedit`, `rimageview`, `rimageinfo`, `rimageask`)은 아직 serve builtin 범위에 넣지 않았다.

## 쓰기/삭제 계열 내부명령 상태
- `rwrite`, `rreplace`, `rdelete`, `rinsert`는 파일을 변경하므로 실제 테스트 때 작은 임시 파일로 먼저 확인한다.
- 현재 코드는 기존 R-DOS builtin의 parser/executor/안전 계약을 재사용하는 방향이다.
- 별도 새 권한 구조는 아직 만들지 않았다.
- 앞으로 확인할 항목:
  - wasm `@rdos_server rwrite ...`로 임시 파일 생성/덮어쓰기 확인
  - wasm `@rdos_server rreplace ...`로 특정 줄 치환 확인
  - wasm `@rdos_server rinsert ...`로 특정 위치 삽입 확인
  - wasm `@rdos_server rdelete ...`로 특정 줄 삭제 확인
  - 실패 시 에러 메시지가 wasm 채팅 결과로 충분히 전달되는지 확인

## Document/native path namespace 방침
- wasm memory 문서와 native workspace 파일은 역할을 분리한다.
- `doc:`는 wasm 브라우저 Document 저장소를 의미한다.
  - 예: `doc:memory\present.md`, `doc:memory\overview.md`, `doc:memory\past.md`
- `native:`는 native ezChat이 열고 있는 workspace 기준 상대 경로를 의미한다.
  - 예: `native:src\main.rs`, `native:Cargo.toml`, `native:guides\wasm-rdos-serve-mode.md`
- `native_abs:`는 native 컴퓨터의 절대 경로를 의미한다.
  - 예: `native_abs:C:\prog\ezchat\Cargo.toml`
- 1차 구현에서는 절대 경로는 기본 차단하거나 별도 허용 옵션이 있을 때만 사용하는 편이 안전하다.
- 접두어 없는 상대 경로는 native 환경에서는 기존 호환성을 위해 workspace 기준 native 경로로 유지한다.
- wasm에서는 `memory\...`는 `doc:`로 볼 수 있지만, 프로젝트 파일은 가능하면 `native:`를 명시하는 방향이 안전하다.

## native server 처리 상태
- native 제어 builtin은 `rdos_server start|stop|status` 흐름을 기준으로 한다.
- local bind 주소는 `127.0.0.1`이다.
- 기존 구현에서 self-call `GET /status`, `POST /rdos` 검증 이력이 있다.
- 최신 구조는 listener worker 직접 실행이 아니라 main app loop queue와 기존 R-DOS/child pump 재사용을 우선한다.
- `rdos_serve_poll()`은 queued HTTP 요청을 main loop에서 시작한다.
- `rdos_serve_finish()`는 serve-owned child polling을 공통 update 경로에서 진행한다.

## 단계별 체크리스트
### 1단계: local shell bridge
- [x] native `rdos_server start|stop|status` builtin 추가
- [x] `127.0.0.1:11777` endpoint 열기
- [x] CORS/preflight 처리
- [x] wasm에서 native serve endpoint로 요청 전달
- [x] shell/DOS 명령을 기존 CmdChild/child pump 흐름에 등록
- [x] wasm에서 `echo` 확인
- [x] wasm에서 `dir` 확인
- [x] DOS/R-DOS 화면이 아니어도 serve 요청 처리 확인
- [ ] 긴 명령 timeout/streaming 정책 재검토

### 2단계: local read-only R-DOS builtin bridge
- [x] `console` 지원
- [x] `rtype` 지원
- [x] `rfindtext` 지원
- [x] `rfindfile` 지원
- [x] wasm 채팅방에서 조회 명령 결과 표시 확인

### 3단계: Rust 작업 루프 안정화
- [x] `cargo fmt` 실행/응답 확인
- [x] `cargo check` 실행/응답 확인
- [x] `cargo build` 실행/응답 확인
- [x] 앱 재빌드 후 새 바이너리 재실행 필요 여부 안내
- [x] 실제 앱 동작 확인이 필요한 경우 재컴파일과 재실행 여부 확인
- [ ] 긴 `cargo` 명령의 timeout/streaming UX 재검토

### 4단계: local write bridge
- [x] `rreplace` handler 허용 및 빌드 확인
- [x] `rinsert` handler 허용 및 빌드 확인
- [x] `rdelete` handler 허용 및 빌드 확인
- [x] `rwrite` handler 허용 및 빌드 확인
- [ ] wasm 채팅방에서 `rreplace` 실제 동작 확인
- [ ] wasm 채팅방에서 `rinsert` 실제 동작 확인
- [ ] wasm 채팅방에서 `rdelete` 실제 동작 확인
- [ ] wasm 채팅방에서 `rwrite` 실제 동작 확인
- [ ] confirm/위험 처리 추가 설계 필요 여부 검토
- [ ] 수정 결과 요약 또는 diff 표시 검토

### 5단계: LAN/VPN 확장
- [ ] bind 주소 선택 추가: `127.0.0.1` / `0.0.0.0`
- [ ] 현재 접속 주소 표시
- [ ] Windows 방화벽 안내
- [ ] VPN IP 접속 사용 안내

### 6단계: relay/reverse tunnel
- [ ] relay 서버 프로토콜 설계
- [ ] native ezChat outbound 연결
- [ ] wasm ezChat relay 연결
- [ ] 요청/응답 id 매칭
- [ ] 재접속 처리
- [ ] relay 로그와 상태 표시

## 우선순위 결론
1. local shell bridge와 조회 계열 R-DOS builtin bridge는 dev 빌드와 사용자 확인 기준으로 1차 완료됐다.
2. `rdos_server start` 후 DOS/R-DOS 화면이 아니어도 serve 요청이 처리되는 것도 확인됐다.
3. 다음은 wasm 채팅방에서 쓰기 계열 `rwrite`, `rreplace`, `rdelete`, `rinsert`를 작은 임시 파일로 실제 확인하는 것이다.
4. 그 다음 긴 명령 timeout/streaming UX와 confirm/위험 처리 필요성을 재검토한다.
5. 원격은 LAN/VPN을 먼저 보고, relay/reverse tunnel은 장기 과제로 둔다.