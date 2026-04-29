# guides/project-structure.md

## 목적
프로젝트 문서 디렉토리 역할과 참조 순서를 짧게 정리한다.

이 문서는 문서들의 위치만 보는 용도보다, 작업할 때 무엇을 먼저 보고 어디까지 참고할지 빠르게 판단하는 안내문에 가깝다.

## 큰 흐름
- `prompts`: 지금 어떻게 행동하고 답할지 정하는 규칙
- `guides`: 필요한 세부 규칙만 찾아보는 설명서
- `memory`: 현재 상태와 다음 단계를 짧게 이어가는 작업 메모

즉, 보통은 `prompts`를 기준으로 움직이고, 필요할 때만 `guides`를 찾아보고, 진행 중 상태는 `memory`에 짧게 남긴다.

## 빠른 확인 예시
문서 위치를 빠르게 확인할 때의 JSON 실행 예시:
```text
@rdos {"cmd":"rtype","file":"guides\\project-structure.md"}
@rdos {"cmd":"rtype","file":"guides\\document-usage.md","count":80}
@rdos {"cmd":"rtype","file":"memory\\present.md"}
```

## `guides`
실행환경, R-DOS, 파일 저장, 작업 절차 같은 보조 설명서다.

- 항상 전부 읽기보다 현재 작업에 필요한 문서만 참고한다.
- 예: 실행환경은 `guides/runtime.md`, R-DOS는 `guides/rdos.md`를 참고한다.

## `prompts`
모델이 따를 프롬프트 문서다.
예: `prompts/default.md`, `prompts/rust_programming.md`

- `prompts/default.md`: 공통 규칙과 기본 응답 원칙
- 작업별 prompt 문서: 특정 작업 흐름에서 추가로 따라야 할 규칙
- 상단에 자주 노출되는 문서이므로, 자세한 구현 설명보다 짧고 추측 가능한 안내를 우선한다.

## `memory`
작업 상태와 프로젝트 맥락을 역할별로 나눠 기록하는 메모다.
예: `memory/present.md`, `memory/overview.md`, `memory/past.md`

- `memory/present.md`: 현재 상태, 문제, 바로 다음 단계를 짧게 적는 작업용 메모
- `memory/overview.md`: 프로젝트 전반 맥락과 상시 참고 사항
- `memory/past.md`: 끝난 작업 요약


## 사용 원칙
- 문서 위치나 역할이 헷갈리면 이 문서를 먼저 확인한다.
- 공통 규칙은 `prompts/default.md`를 따른다.
- 작업별 규칙은 해당 `prompts` 문서를 따른다.
- 세부 절차나 자세한 문법은 필요한 범위에서 `guides` 문서를 참고한다.
- 진행 방향을 놓치면 먼저 `memory/present.md`를 확인한다.
- 작업 상태 정리는 필요한 범위에서 `memory` 문서를 확인하고 갱신한다.
- 각 문서 묶음의 실제 사용처와 읽는 순서는 `guides/document-usage.md`를 참고한다.

## 요약
- 먼저 `prompts`
- 필요할 때 `guides`
- 진행 중 상태는 `memory`
- 방향을 놓치면 `memory/present.md`부터 확인한다.
