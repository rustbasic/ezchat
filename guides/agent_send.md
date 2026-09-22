# guides/agent_send.md

## 목적
`agent_send`는 메인 채팅에서 live sub-agent 또는 Main에게 메시지를 보내는 R-DOS builtin 명령이다.

주 용도는 메인 채팅 흐름에서 `researcher`, `coder`, `tester` 같은 역할 agent에게 작업을 맡기고, 기본적으로 그 최종 답변을 메인 채팅 R-DOS 결과로 돌려받아 후속 흐름을 이어가는 것이다.

## 기본 실행 형식
`agent_send`는 채팅의 R-DOS wrapper 안에서 flat JSON 필드로 실행한다.

```text
@rdos {"cmd":"agent_send","target":"researcher","message":"이 주제를 조사해줘"}
@rdos {"cmd":"agent_send","target":"tester","message":"이 동작을 확인해줘","auto_continue":false}
@rdos {"cmd":"agent_send","target":"main","message":"Worker에서 Main으로 보고합니다."}
```

필드:
- `target`: 메시지를 보낼 target agent/role 또는 `main`. 예: `researcher`, `writer`, `reviewer`, `coder`, `tester`, `main`
- `message`: target에게 보낼 message 본문. 빈 문자열은 허용하지 않는다.
- `return_to_rdos`: 선택 필드. 기본값은 `true`다. agent 최종 답변을 메인 채팅 R-DOS 결과로 돌려받지 않으려면 `false`를 명시한다.
- `topic`: 선택 필드. 지원 role TOPIC을 명시한다. 예: `Agent Researcher`, `researcher`, `Agent Coder`, `coder`
- `model`: 선택 필드. worker provider/model 선택에 사용할 모델명이다. 빈 문자열이면 지정하지 않은 것으로 취급한다.
- `auto_continue`: 선택 필드. 기본값은 `true`다. `false`로 두면 agent_send worker의 자동 이어가기 모드를 끈다.

## target과 TOPIC 선택

### 일반 role worker
```text
@rdos {"cmd":"agent_send","target":"researcher","message":"조사해줘"}
```

동작:
- `researcher` live sub-agent template을 기준으로 새 worker를 만들거나 재사용한다.
- 별도 `topic`이 없으면 target role에 맞는 Agent TOPIC을 사용한다.
- `researcher`는 웹 자료 확인이 필요할 때 `rweb` 등 허용된 읽기 중심 도구와 출처 표기 기준을 직접 사용한다.

### topic을 명시해서 선택
```text
@rdos {"cmd":"agent_send","target":"researcher","topic":"Agent Researcher","message":"이 주제를 조사해줘"}
@rdos {"cmd":"agent_send","target":"coder","topic":"Agent Coder","message":"이 코드를 확인해줘"}
```

동작:
- `topic` 문자열은 앞뒤 공백, `\\`/`/`, `_`/`-` 차이를 정규화해서 해석한다.
- 지원하지 않는 topic을 지정하면 `unsupported agent_send topic` error를 반환한다.
- 별도 웹 조사 전용 TOPIC/alias는 더 이상 지원하지 않는다. 조사 작업은 `researcher`를 사용한다.

지원 예시:
- `Agent Main` / `main`
- `Agent Researcher` / `researcher`
- `Agent Writer` / `writer`
- `Agent Reviewer` / `reviewer`
- `Agent Coder` / `coder`
- `Agent Tester` / `tester`
- `Agent Security` / `security`
- `Agent Cleaner` / `cleaner`
- `Agent Designer` / `designer`
- `Agent Provider` / `provider`
- `Agent Marketer` / `marketer` / `marketing strategist`

## model 옵션
`model`은 worker 생성 시 사용할 모델명을 전달하는 선택 필드다.

```text
@rdos {"cmd":"agent_send","target":"researcher","model":"models/gemini-2.5-flash","message":"최신 자료를 조사해줘"}
```

기준:
- 모델명이 비어 있으면 지정하지 않은 것으로 취급한다.
- provider를 별도로 지정하는 옵션은 두지 않는다.
- 실제 provider/model 선택은 현재 agent session/template과 app의 worker 생성 흐름을 따른다.

## auto_continue 옵션
`auto_continue`는 `agent_send`로 생성되는 worker의 자동 이어가기 모드를 제어한다.

```text
@rdos {"cmd":"agent_send","target":"researcher","message":"조사하고 계속 진행해줘"}
@rdos {"cmd":"agent_send","target":"researcher","message":"한 번만 답해줘","auto_continue":false}
```

동작:
- 기본값은 `true`다.
- `true`이면 worker가 agent mode, auto confirm, ongoing talk, auto continue 기본값으로 시작한다.
- `false`이면 해당 요청의 worker는 자동 이어가기 없이 한 번의 작업 중심으로 동작한다.
- 일반 Agent 창에서 수동으로 보내는 메시지 동작은 바꾸지 않고, `agent_send` worker 시작 경로에만 적용한다.

## return_to_rdos 옵션
`return_to_rdos`는 agent의 최종 답변을 main chat/R-DOS 후속 결과로 돌려받을지 정한다.

### 기본값: return_to_rdos:true
```text
@rdos {"cmd":"agent_send","target":"researcher","message":"답변을 돌려줘"}
```

동작:
- message는 지정 target agent에게 전송된다.
- agent 창 Chat history에는 Main Agent에서 보낸 message로 남는다.
- `agent_send` 명령 자체는 시작/전달 결과를 즉시 반환하고 끝난다.
- agent 최종 답변이 준비되면 별도 completion report가 main chat/R-DOS 후속 결과로 돌아온다.
- 메인 채팅에서 결과를 이어 받아야 하는 일반 작업에 적합하다.

### Fire-and-forget: return_to_rdos:false
```text
@rdos {"cmd":"agent_send","target":"researcher","message":"조용히 확인만 해줘","return_to_rdos":false}
```

동작:
- message는 지정 target agent에게 전송된다.
- agent 창 Chat history에는 Main Agent에서 보낸 message로 남는다.
- 메인 채팅 R-DOS 결과에는 시작/전달 상태만 남고, agent 최종 답변은 돌아오지 않는다.
- 메인 흐름에서 완료 답변을 기다리지 않는 작업에만 명시적으로 사용한다.

## Worker→Main 직접 보고: target:"main"
Worker Agent가 자기 R-DOS에서 Main Agent에게 중간 결과나 상태를 직접 남겨야 할 때도 같은 flat JSON 형식으로 `main` target을 사용한다.

```text
@rdos {"cmd":"agent_send","target":"main","message":"보고할 내용"}
```

Main 채팅에는 다음 형식의 메시지가 들어온다.

```text
[agent_send direct report] from: <worker-id> from_name: <worker display name>
target: main
from_role: <worker role>

보고할 내용
```

주의:
- 이 기능은 Worker→Main 직접 보고용이다.
- Main→Worker 위임의 기본 완료 보고는 기존 completion report 흐름으로 계속 돌아온다.
- Worker에게 단순 최종 결과를 받는 일반 작업은 `@rdos {"cmd":"agent_send","target":"<role>","message":"..."}` + completion report 흐름을 우선 사용한다.

## Researcher 운영 패턴

### 새 조사 작업 시작
```text
@rdos {"cmd":"agent_send","target":"researcher","model":"models/gemini-2.5-flash","message":"새 주제로 조사해줘. 결과는 agent_workspace\\research\\research_<topic_slug>.md 형식의 markdown 파일로 저장하고, 출처 URL과 한계를 포함해줘.","return_to_rdos":true}
```

### 공용 결과 저장 위치
Agent 협업 산출물은 `memory`, `guides`, `prompts`와 역할이 섞이지 않도록 프로젝트 루트의 `agent_workspace\\` 아래에 둔다.
Researcher 조사 결과 파일은 `agent_workspace\\research\\` 아래에 저장한다.

```text
agent_workspace\research\research_<topic_slug>.md
```

파일명 기준:
- `<topic_slug>`는 영어 `snake_case`를 우선한다.
- 새 주제는 새 `research_<topic_slug>.md` 파일을 만든다.
- 같은 주제 보강은 기존 파일을 업데이트한다.
- 별도 판본이 필요하면 `research_<topic_slug>_v2.md`를 사용한다.
- 보충 문서는 `research_<topic_slug>_supplement_<subtopic>.md`처럼 구분한다.

예시:
```text
agent_workspace\research\research_rust_2026_update.md
agent_workspace\research\research_openai_api_pricing.md
agent_workspace\research\research_agent_architecture_supplement_openclaw.md
```

권장 기준:
- 새 주제이거나 기존 조사와 맥락이 섞이면 안 되는 요청은 새 worker와 새 결과 파일로 시작한다.
- message에는 원하는 산출물, 깊이, 결과 파일 저장 위치, 파일명 slug, 출처 표기 요구를 함께 적는다.
- 메인 채팅에서 결과 경로를 이어 받아야 하는 동작이 기본값이다. 의도를 분명히 남기고 싶으면 `return_to_rdos:true`를 명시해도 된다.

### 같은 주제 추가작업
```text
@rdos {"cmd":"agent_send","target":"researcher","message":"agent_workspace\\research\\research_rust_2026_update.md 파일을 기준으로 nightly 부분만 보강하고, 같은 markdown 파일에 변경 내용을 추가해줘.","return_to_rdos":true}
```

운영 기준:
- 같은 주제의 보강 요청은 가능한 한 기존 Researcher worker에 이어서 지시하는 것이 좋다.
- 현재 구현에서 `agent_send`는 호출마다 worker를 생성하거나 선택하는 시작 surface이므로, 특정 기존 worker 재사용/지정 UX는 실제 불편이 확인되면 별도 기능으로 보강한다.
- 명확한 이어쓰기 작업이라면 message에 기존 결과 파일 경로와 보강 범위를 반드시 포함한다.

### 결과 파일 중심 완료 처리
Researcher 조사 작업은 채팅 답변만으로 완료로 보지 않는다. 다음 조건을 만족해야 완료로 본다.

1. 결과 markdown 파일이 생성 또는 업데이트됨
2. 결과 파일에 조사 주제, 핵심 요약, 출처 URL, 한계, 추가 확인 필요사항이 포함됨
3. 최종 보고에 결과 파일 경로가 포함됨
4. 더 이어서 실행할 명령이 없으면 worker가 `auto_continue_off`를 실행함

### reset/remove/close 관리 원칙
- 기본은 worker history와 결과 파일을 보존하는 것이다. 조사 흔적을 지우는 reset/remove는 사용자가 명시적으로 요청했을 때만 수행한다.
- worker를 닫거나 제거하기 전에는 결과 파일 경로와 최종 요약이 main chat, `plan.md`, 또는 관련 문서에 남았는지 확인한다.
- 완료된 worker는 바로 삭제하기보다, 필요 시 보류/완료 상태로 두고 새 주제는 새 worker로 시작하는 편이 안전하다.

## 기존 positional 형식
기존 형식도 유지한다.

```text
agent_send researcher 내용
agent_send researcher "따옴표로 감싼 내용"
```

주의:
- positional 형식도 기본 `return_to_rdos:true`로 동작한다.
- positional 형식에는 현재 `return_to_rdos`, `topic`, `model`, `auto_continue` 옵션을 붙이는 별도 문법을 두지 않는다.
- `return_to_rdos:false`나 topic/model/auto_continue를 지정해야 하면 flat JSON 형식을 사용한다.

## 예시

### 조용히 agent에게만 보내기
```text
@rdos {"cmd":"agent_send","target":"researcher","message":"이 주제만 조사해두고 메인 채팅에는 답하지 마","return_to_rdos":false}
```

### agent 답변을 R-DOS 결과로 돌려받기
```text
@rdos {"cmd":"agent_send","target":"researcher","message":"Rust async 관련 핵심만 요약해줘"}
```

### 모델명 지정
```text
@rdos {"cmd":"agent_send","target":"researcher","model":"models/gemini-2.5-flash","message":"최신 Rust async 자료를 조사해줘","return_to_rdos":true}
```

### 자동 이어가기 끄기
```text
@rdos {"cmd":"agent_send","target":"researcher","message":"한 번만 짧게 확인해줘","auto_continue":false}
```

### 기존 형식 사용
```text
agent_send researcher Rust async 관련 핵심만 요약해줘
```

이 경우도 기본 `return_to_rdos:true`이므로 메인 채팅으로 최종 답변이 completion report로 돌아온다. fire-and-forget이 필요하면 flat JSON 형식에서 `return_to_rdos:false`를 명시한다.

## 오류와 주의사항
- `target`이 비어 있거나 `message`가 비어 있으면 error status를 반환한다.
- 지정한 id의 live sub-agent session이 없으면 error status를 반환한다.
- JSON 형식이 잘못되거나 알 수 없는 필드가 있으면 `invalid agent_send JSON` error를 반환한다.
- 지원하지 않는 `topic`을 지정하면 `unsupported agent_send topic` error를 반환한다.
- `reply:true`는 지원하지 않는다. `return_to_rdos:true`를 사용한다.
- 기본 동작은 agent 최종 답변을 main chat/R-DOS 후속 결과로 돌려받는 것이다. fire-and-forget이 필요할 때는 반드시 `return_to_rdos:false`를 명시한다.
- 코드 변경 후 새 동작을 실제 앱에서 보려면 최신 실행본으로 다시 실행해야 한다.

## 관련 문서
- R-DOS 기본 사용법: `guides/rdos.md