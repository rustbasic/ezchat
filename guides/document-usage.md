# guides/document-usage.md

## 목적
이 문서는 `prompts`, `guides`, `memory` 문서를 어떤 상황에 어떻게 쓰는지 작업 흐름 기준으로 설명한다.

`guides/project-structure.md`가 디렉토리 역할을 짧게 요약한 문서라면, 이 문서는 실제 작업 흐름에서 무엇을 먼저 보고 무엇을 나중에 보는지까지 포함한 운영 설명서에 가깝다.

## 기본 흐름
1. 공통 규칙은 `prompts/default.md`를 먼저 따른다.
2. 문서 위치나 역할이 헷갈리면 `guides/project-structure.md`를 본다.
3. 현재 작업에 필요한 세부 규칙만 `guides`에서 찾아본다.
4. 진행 방향이 흐려지면 `memory/present.md`를 먼저 확인한다.
5. 작업이 끝나면 필요한 범위에서 memory 문서를 짧게 갱신한다.

JSON 실행 예시:
```text
@rdos {"cmd":"rtype prompts\default.md"}
@rdos {"cmd":"rtype guides\project-structure.md"}
@rdos {"cmd":"rtype memory\present.md"}
```

---

## 1. `prompts` 문서
### 역할
- 모델이 기본적으로 따라야 하는 규칙을 둔다.
- 자주 흔들리면 안 되는 공통 원칙과 작업 흐름을 담는다.

### 특징
- 짧고 분명해야 한다.
- 처음 보는 상태에서도 대략 행동을 추측할 수 있어야 한다.
- 세부 옵션 나열보다 방향과 우선순위를 알려주는 쪽이 좋다.

### 대표 문서
- `prompts/default.md`: 공통 규칙과 기본 응답 원칙
- 작업별 prompt 문서: 특정 작업 흐름에서 추가로 따라야 할 규칙

### 언제 먼저 보나
- 대화 언어, 역할, 실행 형식, memory 사용 원칙처럼 항상 지켜야 하는 규칙이 필요할 때

---

## 2. `guides` 문서
### 역할
- 작업 중 필요할 때 참고하는 설명서다.
- 모든 guides를 항상 읽는 것이 아니라, 현재 작업에 필요한 문서만 찾아본다.

### 특징
- 특정 주제에 대한 설명을 담는다.
- `prompts`보다 더 자세할 수 있다.
- 예시, 옵션, 작업 기준, 주의점을 담을 수 있다.

### 예시
JSON 실행 예시:
```text
@rdos {"cmd":"rtype guides\runtime.md"}
@rdos {"cmd":"rtype guides\rdos.md head 120"}
@rdos {"cmd":"rtype guides\file-save.md"}
```

- 실행환경 규칙이 필요하면 `guides/runtime.md`
- R-DOS 규칙이 필요하면 `guides/rdos.md`
- 파일 저장 규칙이 필요하면 `guides/file-save.md`

---

## 3. `memory` 문서
### 역할
- 현재 상태와 다음 단계를 짧게 이어가는 작업 메모다.
- 긴 설명보다 최신 상태 유지가 더 중요하다.

### 기본 사용
- 진행 방향을 놓치면 먼저 `memory/present.md`를 확인한다.
- 전반 맥락이 필요할 때만 `memory/overview.md`를 본다.
- 끝난 내용은 필요하면 `memory/past.md`를 참고한다.
- 이후 계획은 필요하면 `memory/future.md`를 참고한다.

JSON 실행 예시:
```text
@rdos {"cmd":"rtype memory\present.md"}
@rdos {"cmd":"rtype memory\overview.md"}
```

### 갱신 원칙
- 작업 전에는 `memory/present.md`에 현재 상태와 바로 다음 단계를 짧게 기록한다.
- 작업 후에도 결과 기준으로 다시 짧게 정리한다.
- 중복되거나 오래된 내용은 정리한다.

---

## 4. 추천 참조 순서
작업 흐름 예시:
```text
@rdos {"cmd":"rtype prompts\default.md"}
@rdos {"cmd":"rtype guides\project-structure.md"}
@rdos {"cmd":"rtype memory\present.md"}
@rdos {"cmd":"rtype guides\rdos.md"}
```

- 기본 규칙 확인
- 문서 위치가 헷갈리면 구조 문서 확인
- 현재 상태가 필요하면 memory 확인
- 그 뒤에 필요한 세부 guides만 추가 확인
