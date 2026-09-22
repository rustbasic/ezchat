# guides/agent_collaboration.md

## 목적
이 문서는 TOPIC Agent 협업 v0.1에서 Main Agent가 Worker Agent에게 작업을 위임하고 결과를 검증할 때 따르는 안정 규칙을 정리한다.

현재 기준은 새 supervisor/task registry를 만들기보다 `TOPIC + AgentSession + agent_send + agent-local R-DOS continuation` 흐름을 먼저 사용한다.

## 기본 원칙
- Main은 사용자 요청을 짧게 정리하고, 작업 범위와 성공 기준을 분명히 한 뒤 Worker에게 위임한다.
- Worker에게 맡길 때는 해야 할 일과 하지 말아야 할 일을 같은 위임 패킷 안에 함께 쓴다.
- Main은 Worker 결과를 그대로 믿지 않고, 근거 파일, 실행 명령, 검증 여부, 충돌 의견, 남은 확인을 기준으로 최종 판단한다.
- 새 runtime layer, supervisor, task registry, 승인 dashboard는 실제 필요가 확인될 때만 재검토한다.

## 위임 패킷 필수 항목
Main이 `agent_send`로 Worker에게 작업을 보낼 때는 가능한 한 다음 항목을 포함한다.

- 목표: Worker가 달성해야 할 결과
- 범위: 확인하거나 작업할 파일, 문서, 주제 범위
- 읽을 문서: 먼저 참고해야 할 guides, prompts, memory, source 파일
- 금지 범위: 수정 금지, 삭제 금지, 범위 밖 추정 금지 같은 제한
- 출력 형식: 요약, 표, 후보 목록, diff 제안, 검증 보고 등
- 완료 기준: 어떤 상태가 되면 작업을 끝냈다고 볼지
- 대기 조건: 사용자 확인, Main 재지시, 실행 재확인이 필요한 조건

## 권한과 수정 제한
- 읽기, 분석, 조사, 검토 작업에는 `파일 수정 금지` 또는 `코드 변경 금지`를 명시한다.
- Coder가 아닌 Agent는 기본적으로 소스 수정 금지로 다룬다.
- Coder도 Main이 명시한 파일과 범위 밖을 임의로 수정하지 않는다.
- 삭제, 위험 명령, 큰 범위 변경, 요구 범위 밖 소스 수정은 Worker가 직접 진행하지 않고 Main 또는 사용자 확인으로 되돌린다.
- 수정 후보가 필요하면 실제 수정이 아니라 후보와 근거만 제안하게 한다.

## Worker 완료와 auto continue
- 긴 조사나 문서 작업은 결과 경로 또는 최종 요약을 남기고 `auto_continue_off`로 자동 진행을 끊게 한다.
- `auto_continue_off`는 runaway 자동 진행을 줄이는 완료 신호이지, Worker 권한을 제한하는 보안 장치가 아니다.
- auto continue LOCK이 켜져 있으면 `auto_continue_off`로 꺼지지 않는 것이 의도된 동작이다.
- Main은 Worker가 완료했다고 해도 필요한 파일 확인이나 결과 검증을 직접 수행한다.

## 결과 취합 기준
여러 Worker 결과를 모을 때 Main은 다음 기준으로 정리한다.

- 사용자 요청을 충족했는가
- 근거 파일, 명령, 출처가 확인됐는가
- Worker 간 의견이 충돌하는가
- 추가 확인, 재실행, 사용자 판단이 필요한가
- 실제 수정이 필요한 경우 Coder에게 줄 수 있는 범위가 충분히 좁혀졌는가

## 위임 예시
```text
목표: guides/agent_send.md의 agent_send 옵션 설명이 현재 코드와 맞는지 검토한다.
범위: guides/agent_send.md, 관련 src 파일 읽기만 허용한다.
읽을 문서: guides/agent_send.md, 필요한 경우 src에서 agent_send 구현 검색.
금지 범위: 파일 수정 금지, 코드 변경 금지, 문서 변경 금지. 수정 후보만 제안한다.
출력 형식: 불일치 항목 / 근거 위치 / 수정 후보를 bullet로 정리한다.
완료 기준: 확인한 파일과 남은 의문을 함께 보고하고 auto_continue_off로 종료한다.
```

## 관련 문서
- `guides/agent_send.md`: `agent_send` R-DOS builtin 사용법과 옵션
- `agent_lessons/main.md`: Main 역할의 살아있는 성공/실패 교훈