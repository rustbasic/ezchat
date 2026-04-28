# guide/file-save.md

## 목적
이 문서는 `rwrite`를 JSON 전용으로 사용할 때의 저장 방식을 짧게 정리한다.

## 먼저 구분
- 실제 실행은 항상 `@rdos {"cmd":"실제명령"}` 형식으로 한다.
- 실제 실행 줄은 메시지에서 `@rdos`로 바로 시작해야 한다.
- 코드블럭 안의 내용은 전부 텍스트로 보고 실행하지 않는다.
- 아래 예시는 모두 바로 복붙하기 쉬운 JSON 실행 예시 기준이다.

실행 예시:
```text
@rdos {"cmd":"rwrite {\"file\":\"guide\\rdos.md\",\"content\":\"# title\\n\\nbody\\n\"}"}
```

## 기본 원칙
- 새 파일을 만들 때는 `rwrite`를 사용한다.
- `rwrite`는 JSON 형식만 지원한다.
- 기존 파일 전체를 다시 써야 할 때만 JSON 형식의 `overwrite: true`를 제한적으로 사용한다.
- 이미 있는 파일을 부분 수정할 때는 보통 `rreplace`를 사용한다.
- 파일 확인이나 수정 전후 검증은 가능하면 `rtype`를 먼저 사용한다.
- 최근 대화나 코드블럭을 자동으로 저장하는 방식은 지원하지 않는다.

## 기본 사용
실행 예시:
```text
@rdos {"cmd":"rwrite {\"file\":\"notes.txt\",\"content\":\"hello\\nworld\\n\"}"}
@rdos {"cmd":"rwrite {\"file\":\"src\\sample.rs\",\"content\":\"fn main() {\\n    println!(\\\"demo\\\");\\n}\\n\"}"}
```

- 파일 내용은 JSON의 `content`에서 직접 제공해야 한다.
- 내용 추론이나 최근 대화 자동저장은 하지 않는다.

## 전체 덮어쓰기
실행 예시:
```text
@rdos {"cmd":"rwrite {\"file\":\"memory\\present.md\",\"content\":\"# present\\n\\n...\\n\",\"overwrite\":true}"}
```

- 기존 파일 전체를 새 내용으로 덮어쓴다.
- 부분 수정이 아니라 파일 전체 교체에 맞는다.
- 기존 내용이 사라지므로 필요한 경우 먼저 `rtype`로 확인한다.
- 작은 수정이면 `overwrite`보다 `rreplace`를 우선한다.

## 권장 요약
- 실제 실행은 항상 `@rdos {"cmd":"..."}` 형식으로 한다.
- 새 파일 생성: `rwrite` + JSON 내용 명시
- 기존 파일 전체 교체: JSON 내용 지정 + `overwrite: true`
- 자동저장 없음: 최근 대화/코드블럭 자동 추출 비지원
- 작은 수정은 `rreplace`를 우선한다.

## 관련 문서
- `guide/rdos.md`
- `guide/rwrite-rreplace.md`
