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
@rdos {"cmd":"rtype guides\rdos.md"}
```

## 핵심
- 모든 R-DOS 명령은 `@rdos {"cmd":"..."}` 형식으로 실행한다.
- `rtype`, `rfindtext`, `console`, `rwrite`, `rreplace`, `rdelete`, `rinsert` 같은 내부 명령도 모두 이 형식 안에서 실행한다.
- 파일 확인, 검색, 저장, 부분 수정은 내부 명령을 우선한다.
- 필요하면 `@rdos` 안에서 일반 DOS 명령도 사용할 수 있다.
- 필요하면 한 답변 안에서 여러 `@rdos {"cmd":"..."}` 명령을 순서대로 제시할 수 있다.
- 삭제/위험 명령이나 영향 범위가 큰 작업은 사용자 확인을 우선한다.
- 시스템 규칙 문서를 바꾼 뒤 적용이 필요하면 `rsysmsg_refresh`를 사용한다.

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
@rdos {"cmd":"rtype Cargo.toml"}
@rdos {"cmd":"rtype src\main.rs head 40"}
@rdos {"cmd":"rtype src\main.rs from 120 40"}
@rdos {"cmd":"rtype src\main.rs tail 30"}
@rdos {"cmd":"rtype src\main.rs head 40 plain"}
```

- 긴 파일은 필요한 범위만 본다.
- 기본 출력은 실제 파일 줄번호를 함께 보여준다.
- `plain`을 붙이면 줄번호 없이 내용만 보여준다.
- 수정 전에는 관련 구간을 먼저 확인하는 편이 안전하다.

### `rfindtext`
파일에서 특정 문자열을 찾을 때 사용한다.

실행 예시:
```text
@rdos {"cmd":"rfindtext src\main.rs prompt"}
@rdos {"cmd":"rfindtext guides\rdos.md rwrite"}
```

- 수정할 위치 후보를 먼저 좁힐 때 유용하다.
- 치환 전에는 `rtype`로 주변 내용을 다시 확인하는 편이 안전하다.

### `console`
최근 콘솔 출력을 확인할 때 사용한다.

실행 예시:
```text
@rdos {"cmd":"console"}
@rdos {"cmd":"console 120"}
@rdos {"cmd":"console plain"}
@rdos {"cmd":"console 120 plain"}
```

- 기본은 최근 50줄을 보여준다.
- `console <n>`처럼 줄 수를 주면 최근 n줄을 보여준다.
- 기본 출력은 실제 콘솔 버퍼 줄번호를 함께 보여준다.
- `plain`을 붙이면 줄번호 없이 내용만 보여준다.
- 직전 실행 결과나 진행 상황 확인에 쓴다.
- 필요한 범위만 확인한다.

### `rwrite`
새 파일을 만들 때 사용한다.

실행 예시:
```text
@rdos {"cmd":"rwrite {\"file\":\"tmp_demo.rs\",\"content\":\"fn main() {\n    println!(\\\"demo\\\");\n}\n\"}"}
@rdos {"cmd":"rwrite {\"file\":\"tmp_lines.txt\",\"content_lines\":[\"alpha\",\"beta\"]}"}
@rdos {"cmd":"rwrite {\"file\":\"memory\\present.md\",\"content\":\"# present\n\n...\n\",\"overwrite\":true}"}
```

- 기본은 새 파일 생성용이다. 기존 파일이 있으면 실패한다.
- `rwrite` 내용은 JSON에서 명시적으로 준다.
- 내용 필드는 `content`, `content_raw`, `content_lines` 중 하나만 사용한다.
- `content_lines`는 문자열 배열을 줄바꿈(`\n`)으로 이어 붙여 저장한다.
- 둘 이상을 같이 주면 JSON 오류로 거절된다.
- `overwrite: true`를 주면 기존 파일 전체를 덮어쓴다.
- 자동으로 최근 대화 내용을 저장하는 기능은 지원하지 않는다.
- 최신 실행본에서는 JSON 문자열 안의 실제 개행, 탭, 캐리지리턴이 입력된 경우에도 공통 보정으로 처리될 수 있다.
- 그래도 가장 안전한 기본 입력은 `\n`, `\t`, `\r`를 명시적으로 쓰는 방식이다.
- `content_raw`나 `content_lines`는 긴 문자열이나 줄 단위 입력에서 JSON 이스케이프 부담을 줄일 때 유용하다.

### `rreplace`
기존 파일의 일부 내용을 바꿀 때 사용한다.

실행 예시:
```text
@rdos {"cmd":"rtype prompts\default.md from 8 8"}
@rdos {"cmd":"rreplace {\"file\":\"prompts\\default.md\",\"line\":10,\"old\":\"old\",\"new\":\"new\"}"}
@rdos {"cmd":"rreplace {\"file\":\"tmp.txt\",\"original_raw\":\"a\\nb\",\"replacement_lines\":[\"x\",\"y\"]}"}
@rdos {"cmd":"rtype prompts\default.md from 8 8"}
```

- `rreplace`는 JSON 형식만 지원한다.
- 단일 JSON과 `items` 배열을 사용하는 일괄 치환 형식을 지원한다.
- 기준 줄 번호는 `line`으로 준다.
- 보통 대상 구간을 `rtype`로 먼저 확인한 뒤 쓴다.
- 기본 필드명은 `old`, `new`를 권장하며 실제 파일 내용 기준으로 정확히 넣는다.
- `old*`에는 현재 파일에 실제로 있는 내용을, `new*`에는 바꿀 내용을 넣는다.
- 기존 `original`, `replacement`, `replace`도 함께 지원한다.
- 문자열 필드는 `old`/`old_raw`/`old_lines`, `new`/`new_raw`/`new_lines`, `original`/`original_raw`/`original_lines`, `replacement`/`replacement_raw`/`replacement_lines`, `replace`/`replace_raw`/`replace_lines`처럼 같은 의미 묶음 안에서 하나만 사용한다.
- 같은 의미 묶음에서 둘 이상을 같이 주면 JSON 오류로 거절된다.
- `*_lines`는 문자열 배열을 줄바꿈(`\n`)으로 이어 붙여 사용한다.
- 최신 실행본에서는 JSON 문자열 안의 실제 개행, 탭, 캐리지리턴이 입력된 경우에도 공통 보정으로 처리될 수 있다.
- 그래도 가장 안전한 기본 입력은 `\n`, `\t`, `\r`를 명시적으로 쓰는 방식이다.
- 필요한 최소 범위만 치환하는 편이 안전하다.
- 짧고 정확한 부분 수정에 우선 사용하는 편이 좋다.
- 치환 범위가 애매하거나 줄 구조가 많이 바뀌면 `rdelete` 후 `rinsert`가 더 안전할 수 있다.
- 실행 결과에는 `path`, `requested_line`, `applied_line`, `replaced_bytes`, `replacement_bytes`, `verified` 같은 정보가 포함될 수 있다.

### `rdelete`
기존 파일에서 지정한 줄부터 여러 줄을 삭제할 때 사용한다.

실행 예시:
```text
@rdos {"cmd":"rdelete {\"file\":\"tmp.txt\",\"line\":3,\"count\":2}"}
```

- 삭제 전에는 `rtype`로 대상 줄을 먼저 확인하는 편이 안전하다.
- 블록 교체가 필요할 때는 `rinsert`와 함께 쓰기 좋다.
- 영향 범위가 큰 삭제는 사용자 확인을 우선한다.

### `rinsert`
기존 파일의 특정 위치에 내용을 끼워 넣을 때 사용한다.

실행 예시:
```text
@rdos {"cmd":"rinsert {\"file\":\"tmp.txt\",\"content\":\"gamma\"}"}
@rdos {"cmd":"rinsert {\"file\":\"tmp.txt\",\"content\":\"gamma\",\"ensure_newline_before\":true,\"ensure_newline_after\":true}"}
@rdos {"cmd":"rinsert {\"file\":\"src\\main.rs\",\"line\":12,\"position\":\"before\",\"content\":\"// inserted\\n\"}"}
@rdos {"cmd":"rinsert {\"file\":\"src\\main.rs\",\"line\":12,\"expected_line\":\"fn main() {\",\"position\":\"after\",\"content\":\"    println!(\\\"debug\\\");\\n\"}"}
```

- `rinsert`는 JSON 형식만 지원한다.
- 보통 삽입 전후를 `rtype`로 확인한다.
- `content`, `content_raw`, `content_lines` 중 하나만 사용한다.
- 파일 끝 삽입과 줄 기준 삽입을 모두 지원한다.
- `line`이 없으면 파일 끝 삽입으로 처리한다.
- 요청 `line`이 현재 마지막 줄보다 크면 파일 끝 append로 처리한다.
- `line`과 `position`으로 삽입 위치를 정한다.
- `position`은 `before` 또는 `after`를 사용한다.
- `expected_line`을 함께 주면 기준 줄 검증에 도움이 된다.
- 긴 삽입은 한 번에 크게 넣기보다 더 작은 덩어리로 나누면 안전하다.
- 필요하면 `ensure_newline_before`, `ensure_newline_after`로 줄바꿈을 보정한다.
- 치환보다 삽입이 더 안전한 상황이면 `rreplace` 대신 `rinsert`를 고려한다.
- 비어 있지 않은 줄의 앞이나 뒤에 삽입할 때는 먼저 `rtype`로 기준 줄을 확인하는 편이 안전하다.
- 기준 줄에 백슬래시나 이스케이프 문자가 있으면 `expected_line` 작성이 까다로울 수 있다.
- 이런 경우에는 주변 빈 줄 기준 삽입이나 더 작은 수정 경로를 함께 고려한다.
### 기타 제어 명령
- `rsysmsg_refresh`: prompts가 변경된 경우 적용하는 `@rdos` 명령
- `rdos_clear`: rdos 명령이 이상해졌거나 미실행 내용을 취소할 때 쓰는 `@rdos` 명령
- 예시: `@rdos {"cmd":"rsysmsg_refresh"}`
- 예시: `@rdos {"cmd":"rdos_clear"}`

## 사용 팁
- 경로와 대상 텍스트를 먼저 짧게 확인하고 필요한 범위만 읽는다.
- 수정 전 확인, 수정 후 재확인 흐름을 유지하면 실수를 줄이기 쉽다.
- 설명용 `@rdos`는 코드블럭 안에 넣거나 줄 맨 앞에서 시작하지 않게 둬야 실행되지 않는다.
