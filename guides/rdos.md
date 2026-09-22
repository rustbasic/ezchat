# guides/rdos.md

## 목적
native 환경에서 자주 쓰는 R-DOS 명령의 기본 사용법을 짧게 정리한다.
- R-DOS 명령은 user도 사용할 수 있지만, 실제 작업에서는 assist가 주로 사용하는 작업용 명령으로 보는 편이 맞다.

## 먼저 구분
- 실제 실행 형식은 `@rdos {"cmd":"실제명령"}` 뿐이다.
- 실제 실행 줄은 메시지에서 `@rdos`로 바로 시작해야 한다.
- `@rdos` 앞에 다른 글자가 있으면 실행되지 않는다.
- 코드블럭 안의 내용은 전부 텍스트로 보고 실행하지 않는다.

실행 예시:
```text
@rdos {"cmd":"rtype","file":"guides\\rdos.md"}
```

## 핵심
- 모든 R-DOS 명령은 flat JSON 단독 형식으로 실행한다.
- 대표 형태는 `@rdos {"cmd":"명령어", ...}` 이다.
- `rtype`, `rfindtext`, `rfindfile`, `console`, `rwrite`, `rreplace`, `rdelete`, `rfiledelete`, `rinsert` 같은 내부 명령도 모두 이 형식 안에서 실행한다.
- 파일 확인, 검색, 저장, 부분 수정은 내부 명령을 우선한다.
- 필요하면 `@rdos` 안에서 일반 DOS 명령도 사용할 수 있다.
  - 예: `@rdos {"cmd":"dir"}`
  - 예: `@rdos {"cmd":"cargo fmt"}`
- 필요하면 한 답변 안에서 여러 `@rdos {"cmd":...}` 명령을 순서대로 제시할 수 있다.
- 삭제/위험 명령이나 영향 범위가 큰 작업은 사용자 확인을 우선한다.
- 시스템 규칙 문서를 바꾼 뒤 적용이 필요하면 `rsysmsg_refresh`를 사용한다.
- 아래 설명은 대표 사용법만 다룬다.

## 관련 상세 문서
- `agent_send`: 메인 채팅 R-DOS에서 live sub-agent에게 prompt를 보내는 명령이다. 상세 사용법은 `guides/agent_send.md`를 참고한다.

### assist 기준 권장 작업 패턴
- 수정 전에는 `rtype`로 관련 범위를 먼저 확인한다.
- 짧고 정확한 수정은 `rreplace`를 우선한다.
- `rreplace`가 길어지거나 애매하면 `rdelete` 뒤 `rinsert` 조합을 고려한다.
- 긴 삽입은 가능하면 더 작은 덩어리로 나눈다.
- 수정 후에는 `rtype`로 반영 상태를 다시 확인한다.

## 자주 쓰는 명령

### `rtype`
파일 내용을 확인할 때 사용한다.

실행 예시:
```text
@rdos {"cmd":"rtype","file":"src\\main.rs","from":120,"count":40}
```

- 긴 파일은 필요한 범위만 본다.
- `head`, `tail`, `from`, `count`, `plain` 같은 대표 옵션을 쓴다.
- 기본 출력은 실제 파일 줄번호를 함께 보여준다.
- `plain: true`를 주면 줄번호 없이 내용만 보여준다.
- 수정 전에는 관련 구간을 먼저 확인하는 편이 안전하다.

### `rfindtext`
파일에서 특정 문자열을 찾을 때 사용한다.

실행 예시:
```text
@rdos {"cmd":"rfindtext","file":"src\\main.rs","text":"prompt"}
```

### `rfindfile`
파일명이나 상대 경로에서 특정 문자열을 찾을 때 사용한다. 기본은 지정한 디렉터리 아래를 재귀 검색한다.

실행 예시:
```text
@rdos {"cmd":"rfindfile","path":"src","query":"rdos"}
@rdos {"cmd":"rfindfile","path":".","query":"tools_rfindfile"}
@rdos {"cmd":"rfindfile","path":"src","query":"tools_","recursive":false}
@rdos {"cmd":"rfindfile","path":"src","query":"tools_","count":50}
```

- 검색 대상은 파일/디렉터리 이름과 기준 경로 기준 상대 경로다.
- 매칭은 대소문자를 구분하지 않는다.
- 기본값은 재귀 검색이며 결과에 `recursive: true`로 표시된다.
- 1단계 검색만 필요하면 `--flat`, `--no-recursive`, 또는 JSON `recursive:false`를 사용한다.
- JSON `count`는 내부 명령에서 `--max`처럼 최대 표시 개수로 변환된다.
- 수정할 위치 후보를 먼저 좁힐 때 유용하다.
- 치환 전에는 `rtype`로 주변 내용을 다시 확인하는 편이 안전하다.

### `rweb`
웹 페이지나 RSS URL을 읽어 텍스트로 추출하고 `memory\web`에 저장할 때 사용한다.

실행 예시:
```text
@rdos {"cmd":"rweb","url":"https://example.com"}
@rdos {"cmd":"rweb","mode":"news","query":"rust language"}
@rdos {"cmd":"rweb","url":"https://example.com","proxy":false}
@rdos {"cmd":"rweb","mode":"news"}
```

- 기본 읽기는 URL을 직접 지정하거나 `mode:"read"`를 사용할 수 있다.
- `mode:"news"`는 Google News RSS 기반으로 주요 뉴스나 검색 RSS를 읽는다.
- `proxy` 기본값은 `true`이며, WASM/browser 환경에서 먼저 direct fetch를 시도하고 실패할 때 proxy fallback을 허용한다는 뜻이다. 처음부터 proxy로 요청한다는 의미는 아니다.
- `proxy:false` 또는 `no_proxy:true`는 WASM/browser 환경에서 direct fetch 실패 시 proxy fallback을 하지 않게 한다. native 환경은 기존처럼 직접 요청한다.
- 저장된 결과가 길면 출력 hint의 `rtype memory\web\...` 이어 읽기 명령으로 필요한 범위를 확인한다.

### `console`
최근 콘솔 출력을 확인할 때 사용한다.

실행 예시:
```text
@rdos {"cmd":"console","count":120,"plain":true}
```

- 기본은 최근 50줄을 보여준다.
- `count`를 주면 최근 n줄을 보여준다.
- 기본 출력은 실제 콘솔 버퍼 줄번호를 함께 보여준다.
- `plain: true`를 주면 줄번호 없이 내용만 보여준다.
- 직전 실행 결과나 진행 상황 확인에 쓴다.
- 필요한 범위만 확인한다.

### `rwrite`
새 파일을 만들거나 기존 파일 전체를 덮어쓸 때 사용한다.

실행 예시:
```text
@rdos {"cmd":"rwrite","file":"memory\\present.md","content":["# present","","..."],"overwrite":true}
@rdos {"cmd":"rwrite","file":"memory\\present.md","content_esc":"# present\n\n...\n","overwrite":true}
```

- 기본은 새 파일 생성용이다. 기존 파일이 있으면 실패한다.
- 대표 필드는 `file`, `content`, `overwrite`를 사용한다.
- `content` 기본 모드는 `content_lines`와 같은 줄 배열 의미다.
- escape 해석 문자열이 필요하면 `content_esc`를 사용한다.
- `content_raw`, `content_lines`도 계속 명시적으로 사용할 수 있다.
- `overwrite: true`를 주면 기존 파일 전체를 덮어쓴다.
- 자동으로 최근 대화 내용을 저장하는 기능은 지원하지 않는다.

### `rreplace`
기존 파일의 일부 내용을 바꿀 때 사용한다.

실행 예시:
```text
@rdos {"cmd":"rtype","file":"prompts\\default.md","from":8,"count":8}
@rdos {"cmd":"rreplace","file":"prompts\\default.md","line":10,"old":["old"],"new":["new"]}
@rdos {"cmd":"rreplace","file":"prompts\\default.md","line":10,"old_from_clipboard":true,"new":["new"]}
@rdos {"cmd":"rreplace","file":"prompts\\default.md","line":10,"old":["old"],"new_from_clipboard":true}
@rdos {"cmd":"rreplace","file":"prompts\\default.md","line":10,"old_esc":"old","new_esc":"new"}
@rdos {"cmd":"rreplace","file":"prompts\\default.md","line":1,"old":["old"],"new":["new"],"replace_all":true,"max_matches":10}
@rdos {"cmd":"rtype","file":"prompts\\default.md","from":8,"count":8}
```

clipboard 재사용 흐름 예시:
```text
@rdos {"cmd":"rcopy","file":"prompts\\default.md","line":10,"count":3}
@rdos {"cmd":"rreplace","file":"prompts\\default.md","line":10,"old_from_clipboard":true,"new":["new"]}
@rdos {"cmd":"rcopy","file":"prompts\\default.md","line":20,"count":3}
@rdos {"cmd":"rreplace","file":"prompts\\default.md","line":10,"old":["old"],"new_from_clipboard":true}
```

- `rreplace`는 flat JSON 형식으로 사용한다.
- 기준 줄 번호는 `line`으로 준다.
- 보통 대상 구간을 `rtype`로 먼저 확인한 뒤 쓴다.
- 대표 필드는 `file`, `line`, `old`, `new`를 사용한다.
- 기본 `old`, `new`는 각각 `old_lines`, `new_lines`와 같은 줄 배열 의미다.
- escape 해석 문자열이 필요하면 `old_esc`, `new_esc`를 사용한다.
- `old_raw`, `new_raw`, `old_lines`, `new_lines`도 계속 명시적으로 사용할 수 있다.
- `old_*` 그룹과 `new_*` 그룹은 서로 독립적으로 선택되므로 `old_raw + new_lines` 같은 혼합 조합도 허용된다.
- 다만 같은 그룹 안에서는 한 방식만 선택해야 한다.
- `old_from_clipboard`, `new_from_clipboard`를 사용하면 clipboard에 있는 현재 내용으로 각각 `old`, `new` 값을 대신할 수 있다.
- `old`와 `old_from_clipboard`, `new`와 `new_from_clipboard`는 각각 동시에 사용할 수 없다.
- `old_from_clipboard`와 `new_from_clipboard`도 동시에 사용할 수 없다.
- 기본 동작은 한 곳만 치환하며, 같은 `old` 블록을 모두 바꾸려면 `replace_all:true`를 명시한다.
- `replace_all:true`를 사용할 때 `max_matches`를 함께 지정하면 예상보다 많은 위치가 바뀌는 것을 막을 수 있다.
- 실제 매치 수가 `max_matches`보다 많으면 파일을 바꾸지 않고 실패한다.
- clipboard가 비어 있으면 clipboard 참조 기반 `rreplace`는 실패한다.
- 필요한 최소 범위만 치환하는 편이 안전하다.
- 짧고 정확한 부분 수정에 우선 사용하는 편이 좋다.
- 치환 범위가 애매하거나 줄 구조가 많이 바뀌면 `rdelete` 후 `rinsert`가 더 안전할 수 있다.

#### `rreplace` 여러 개 동시 변경
여러 위치를 한 번에 바꿔야 하면 `items` 배열을 사용한다.

실행 예시:
```text
@rdos {"cmd":"rreplace","items":[{"file":"src\\main.rs","line":40,"old":["old_b"],"new":["new_b"]},{"file":"src\\main.rs","line":20,"old":["old_a"],"new":["new_a"]}]}
```

- `items`의 각 항목은 단일 `rreplace`와 같은 필드(`file`, `line`, `old`, `new` 등)를 사용한다.
- 같은 파일 안에서 여러 줄을 바꿀 때는 내부적으로 뒤쪽 줄부터 먼저 적용해, 앞쪽 수정 때문에 줄 번호가 밀리는 문제를 줄인다.
- 결과 보고는 보통 사용자가 넣은 `items` 순서 기준으로 다시 맞춰 보여준다.
- 같은 파일과 다른 파일을 섞어서 한 번에 요청할 수 있다.
- 범위가 큰 일괄 수정은 먼저 `rtype`로 각 위치를 다시 확인하는 편이 안전하다.

### `rdelete`
기존 파일에서 지정한 줄부터 여러 줄을 삭제할 때 사용한다.

실행 예시:
```text
@rdos {"cmd":"rdelete","file":"tmp.txt","line":3,"count":2}
```

- 삭제 전에는 `rtype`로 대상 줄을 먼저 확인하는 편이 안전하다.
- 블록 교체가 필요할 때는 `rinsert`와 함께 쓰기 좋다.
- 영향 범위가 큰 삭제는 사용자 확인을 우선한다.

### `rfiledelete`
파일 자체를 삭제할 때 사용한다. `rdelete`가 파일 안의 줄을 지우는 명령인 것과 구분한다.

실행 예시:
```text
@rdos {"cmd":"rfiledelete","file":"tmp.txt"}
```

- 파일 1개만 삭제한다.
- 디렉터리 삭제는 거부한다.
- 존재하지 않는 파일은 실패로 보고한다.
- 파일 삭제는 위험 작업이므로 실제 대상 경로를 먼저 확인하고 사용한다.
- 삭제 성공 시 경로와 삭제된 바이트 수를 출력한다.

### `rinsert`
기존 파일의 특정 위치에 내용을 끼워 넣을 때 사용한다.

실행 예시:
```text
@rdos {"cmd":"rinsert","file":"src\\main.rs","line":12,"position":"before","content":["// inserted"]}
@rdos {"cmd":"rinsert","file":"src\\main.rs","line":12,"position":"before","content_esc":"// inserted\n"}
@rdos {"cmd":"rinsert","file":"src\\main.rs","line":12,"position":"before","new_from_clipboard":true}
@rdos {"cmd":"rinsert","file":"src\\main.rs","position":"start","content":["// file header"]}
@rdos {"cmd":"rinsert","file":"src\\main.rs","position":"end","content":["// file footer"]}
```

- `rinsert`는 flat JSON 형식으로 사용한다.
- 보통 삽입 전후를 `rtype`로 확인한다.
- 대표 필드는 `file`, `line`, `position`, `content`를 사용한다.
- `content` 기본 모드는 `content_lines`와 같은 줄 배열 의미다.
- escape 해석 문자열이 필요하면 `content_esc`를 사용한다.
- `content_raw`, `content_lines`도 계속 명시적으로 사용할 수 있다.
- `new_from_clipboard: true`를 주면 현재 clipboard 내용을 삽입 내용으로 사용한다.
- clipboard가 비어 있으면 `new_from_clipboard` 기반 `rinsert`는 실패한다.
- `new_from_clipboard`는 `content*` 또는 `text*` 계열 필드와 동시에 사용할 수 없다.
- `line`이 없으면 기본적으로 파일 끝 삽입으로 처리한다.
- `position: "start"`는 `line` 없이 파일 맨 앞에 삽입한다.
- `position: "end"`는 `line` 없이 파일 맨 끝에 삽입한다. 기존 내용이 비어 있지 않고 줄바꿈으로 끝나지 않으면 삽입 내용 앞에 줄바꿈을 하나 추가해 마지막 기존 줄과 붙지 않게 한다. 단, 삽입 내용이 이미 줄바꿈으로 시작하면 추가하지 않는다.
- `start` 또는 `end`와 `line`을 함께 지정하면 파일을 바꾸지 않고 오류를 반환한다.
- 대상 파일이 없을 때는 명시적인 `start` 또는 `end`만 빈 파일로 간주해 새 파일을 만들 수 있다. 기존의 line 생략 append와 line 기반 삽입은 파일이 없으면 오류를 유지한다.
- 요청 `line`이 현재 마지막 줄보다 크면 파일 끝 append로 처리한다.
- line 기반 `position`은 `before` 또는 `after`를 사용한다.
- `expected_line`을 함께 주면, 기준 줄이 내가 확인한 내용과 같은지 검증할 수 있다. 특히 비어 있지 않은 줄에 삽입할 때 안전하다.
- `rpaste`는 내부적으로 이 clipboard 기반 `rinsert` 경로를 재사용한다.
- 긴 삽입은 한 번에 크게 넣기보다 더 작은 덩어리로 나누면 안전하다.
- 치환보다 삽입이 더 안전한 상황이면 `rreplace` 대신 `rinsert`를 고려한다.
- 비어 있지 않은 줄의 앞이나 뒤에 삽입할 때는 먼저 `rtype`로 기준 줄을 확인하는 편이 안전하다.

### `rcopy`
파일에서 지정한 줄 범위를 clipboard로 복사할 때 사용한다.

실행 예시:
```text
@rdos {"cmd":"rcopy","file":"tmp.txt","line":3,"count":2}
```

- `rcopy`는 명령 인자를 flat JSON으로만 받는다.
- 대표 필드는 `file`, `line`, `count`를 사용한다.
- 복사 전에는 `rtype`로 대상 줄을 먼저 확인하는 편이 안전하다.
- 성공 시 clipboard에 저장하고, 복사된 내용 preview를 함께 보여준다.
- 여러 줄이면 공통 미리보기 규칙에 따라 일부만 축약해 보여줄 수 있다.
- 복사한 clipboard 내용은 뒤이어 `rreplace`의 `old_from_clipboard` 또는 `new_from_clipboard`에 재사용할 수 있다.

### `rcut`
파일에서 지정한 줄 범위를 잘라내고 clipboard에 저장할 때 사용한다.

실행 예시:
```text
@rdos {"cmd":"rcut","file":"tmp.txt","line":3,"count":2}
```

- `rcut`는 명령 인자를 flat JSON으로만 받는다.
- 대표 필드는 `file`, `line`, `count`를 사용한다.
- 동작은 보통 `rcopy` 뒤 `rdelete`를 잇는 흐름으로 이해하면 된다.
- 삭제가 실제로 성공한 경우에만 clipboard가 갱신된다.
- 영향 범위가 큰 잘라내기는 사용자 확인을 우선하는 편이 안전하다.
- 잘라낸 clipboard 내용도 뒤이어 `rreplace`의 `old_from_clipboard` 또는 `new_from_clipboard`에 재사용할 수 있다.

### `rpaste`
clipboard에 있는 내용을 파일의 지정 위치에 붙여 넣을 때 사용한다.

실행 예시:
```text
@rdos {"cmd":"rpaste","file":"tmp.txt","line":3}
```

- `rpaste`는 명령 인자를 flat JSON으로만 받는다.
- 대표 필드는 `file`, `line`을 사용한다.
- 내부적으로는 `rinsert` 경로를 재사용하는 붙여 넣기 흐름이다.
- 필요하면 `expected_line`을 함께 줄 수 있고, 기준 줄이 내가 확인한 내용과 같은지 검증하는 데 쓴다. 특히 비어 있지 않은 줄에 붙여 넣을 때 안전하다.
- 성공 시 삽입된 내용 preview를 함께 보여준다.
- clipboard 전체를 그대로 넣는 용도이므로, 일부 내용만 바꾸려는 경우에는 `rreplace`와 목적을 구분해서 사용하는 편이 좋다.

### `cmd_child`
background로 남아 있는 R-DOS child 명령을 확인하거나, 추적 중인 child를 종료할 때 사용한다.

실행 예시:
```text
@rdos {"cmd":"cmd_child","action":"list"}
@rdos {"cmd":"cmd_child","action":"kill","pid":1234}
```

- `cmd_child`는 flat JSON 형식으로 사용한다.
- `action`은 `list` 또는 `kill`을 사용한다.
- `list`는 ezChat이 추적 중인 R-DOS child 목록과 실행 상태를 보여준다.
- `kill`은 `pid` 필드가 필요하다.
- `kill`은 `cmd_child list`에 추적 중인 R-DOS child PID만 대상으로 한다.
- OS 전체 프로세스 PID를 직접 찾아 죽이는 용도가 아니며, 추적 목록에 없는 PID는 거부된다.
- 긴 명령이 chat soft-timeout 이후 background로 남았을 때 `list`로 확인하고 필요한 PID만 `kill`한다.

### 이미지 관련 명령
자세한 설명은 `guides/rimage.md`를 참고한다.

- `rimagegen`: 프롬프트로 새 이미지를 생성한다.
  - 예시: `@rdos {"cmd":"rimagegen","prompt":"a cute robot icon","output_format":"png"}`
- `rimageedit`: 기존 이미지와 지시문으로 편집 이미지를 생성한다.
  - 예시: `@rdos {"cmd":"rimageedit","image":"ezchat_output_images\\source.png","prompt":"add a blue star"}`
- `rimageview`: 로컬 이미지 파일이나 이미지 URL을 채팅에 표시한다.
  - 예시: `@rdos {"cmd":"rimageview","file":"ezchat_output_images\\sample.png"}`
- `rimageinfo`: 로컬 이미지 파일의 포맷, 크기, 파일 용량을 확인한다.
  - 예시: `@rdos {"cmd":"rimageinfo","file":"ezchat_output_images\\sample.png"}`
- `rimageask`: 이미지 파일이나 URL에 대해 질문하고 답변을 받는다.
  - 예시: `@rdos {"cmd":"rimageask","image":"ezchat_output_images\\sample.png","question":"What is in this image?"}`

### 기타 제어 명령
- `rsysmsg_refresh`: prompts가 변경된 경우 적용하는 `@rdos` 명령
- `auto_continue_off`: 켜져 있는 `auto_continue_mode`를 끄고 예약된 auto continue deadline도 함께 정리하는 내부 명령
- `rdos_clear`: rdos 명령이 이상해졌거나 미실행 내용을 취소할 때 쓰는 `@rdos` 명령
- `rdos_server start/status/stop`: native R-DOS serve를 시작, 상태 확인, 중지할 때 쓰는 `@rdos` 명령. 자세한 내용은 `guides/rdos_server.md`를 참고한다.
- 예시: `@rdos {"cmd":"rsysmsg_refresh"}`
- 예시: `@rdos {"cmd":"rdos_clear"}`

## 사용 팁
- 경로와 대상 텍스트를 먼저 짧게 확인하고 필요한 범위만 읽는다.
- 수정 전 확인, 수정 후 재확인 흐름을 유지하면 실수를 줄이기 쉽다.
- 설명용 `@rdos`는 코드블럭 안에 넣거나 줄 맨 앞에서 시작하지 않게 둬야 실행되지 않는다.
## app_state

현재 실행 중인 ezChat `MyApp` 상태를 확인하는 디버그용 R-DOS 내부 명령이다. 기본 조회는 RON 직렬화 결과를 기반으로 하며, `serde(skip)` 필드는 `page`/`find`에는 나타나지 않는다. 단, `summary`나 allowlist `get`에 직접 구현된 runtime 값은 별도로 볼 수 있다.

예:
```text
@rdos {"cmd":"app_state"}
@rdos {"cmd":"app_state","action":"summary"}
@rdos {"cmd":"app_state","action":"find","text":"rdos","max":5}
@rdos {"cmd":"app_state","action":"page","from":1,"count":40}
@rdos {"cmd":"app_state","action":"get","path":"top_fields"}
```

현재 지원:
- `summary`: 상태 크기, top-level fields, 일부 runtime flags 요약
- `find`: RON 직렬화 결과에서 텍스트 검색
- `page`: RON 직렬화 결과 일부 줄 출력
- `get`: allowlist path 조회
- `set`: 현재는 안전상 실제 변경하지 않고 unsupported/dry-run 안내만 출력

주의:
- 현재는 디버그용 read-only 도구로 사용한다.
- 상태 변경이 필요하면 범용 편집보다 안전한 allowlist setter나 명시적인 snapshot/rollback 설계를 우선 검토한다.
