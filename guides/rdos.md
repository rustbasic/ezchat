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
- `rtype`, `rfindtext`, `console`, `rwrite`, `rreplace`, `rdelete`, `rinsert` 같은 내부 명령도 모두 이 형식 안에서 실행한다.
- 파일 확인, 검색, 저장, 부분 수정은 내부 명령을 우선한다.
- 필요하면 `@rdos` 안에서 일반 DOS 명령도 사용할 수 있다.
- 필요하면 한 답변 안에서 여러 `@rdos {"cmd":...}` 명령을 순서대로 제시할 수 있다.
- 삭제/위험 명령이나 영향 범위가 큰 작업은 사용자 확인을 우선한다.
- 시스템 규칙 문서를 바꾼 뒤 적용이 필요하면 `rsysmsg_refresh`를 사용한다.
- 아래 설명은 대표 사용법만 다룬다.

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

- 수정할 위치 후보를 먼저 좁힐 때 유용하다.
- 치환 전에는 `rtype`로 주변 내용을 다시 확인하는 편이 안전하다.

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
@rdos {"cmd":"rtype","file":"prompts\\default.md","from":8,"count":8}
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
- clipboard가 비어 있으면 clipboard 참조 기반 `rreplace`는 실패한다.
- 필요한 최소 범위만 치환하는 편이 안전하다.
- 짧고 정확한 부분 수정에 우선 사용하는 편이 좋다.
- 치환 범위가 애매하거나 줄 구조가 많이 바뀌면 `rdelete` 후 `rinsert`가 더 안전할 수 있다.

### `rdelete`
기존 파일에서 지정한 줄부터 여러 줄을 삭제할 때 사용한다.

실행 예시:
```text
@rdos {"cmd":"rdelete","file":"tmp.txt","line":3,"count":2}
```

- 삭제 전에는 `rtype`로 대상 줄을 먼저 확인하는 편이 안전하다.
- 블록 교체가 필요할 때는 `rinsert`와 함께 쓰기 좋다.
- 영향 범위가 큰 삭제는 사용자 확인을 우선한다.

### `rinsert`
기존 파일의 특정 위치에 내용을 끼워 넣을 때 사용한다.

실행 예시:
```text
@rdos {"cmd":"rinsert","file":"src\\main.rs","line":12,"position":"before","content":["// inserted"]}
@rdos {"cmd":"rinsert","file":"src\\main.rs","line":12,"position":"before","content_esc":"// inserted\n"}
```

- `rinsert`는 flat JSON 형식으로 사용한다.
- 보통 삽입 전후를 `rtype`로 확인한다.
- 대표 필드는 `file`, `line`, `position`, `content`를 사용한다.
- `content` 기본 모드는 `content_lines`와 같은 줄 배열 의미다.
- escape 해석 문자열이 필요하면 `content_esc`를 사용한다.
- `content_raw`, `content_lines`도 계속 명시적으로 사용할 수 있다.
- `line`이 없으면 파일 끝 삽입으로 처리한다.
- 요청 `line`이 현재 마지막 줄보다 크면 파일 끝 append로 처리한다.
- `position`은 `before` 또는 `after`를 사용한다.
- `expected_line`을 함께 주면, 기준 줄이 내가 확인한 내용과 같은지 검증할 수 있다. 특히 비어 있지 않은 줄에 삽입할 때 안전하다.
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

### 기타 제어 명령
- `rsysmsg_refresh`: prompts가 변경된 경우 적용하는 `@rdos` 명령
- `rdos_clear`: rdos 명령이 이상해졌거나 미실행 내용을 취소할 때 쓰는 `@rdos` 명령
- 예시: `@rdos {"cmd":"rsysmsg_refresh"}`
- 예시: `@rdos {"cmd":"rdos_clear"}`

## 사용 팁
- 경로와 대상 텍스트를 먼저 짧게 확인하고 필요한 범위만 읽는다.
- 수정 전 확인, 수정 후 재확인 흐름을 유지하면 실수를 줄이기 쉽다.
- 설명용 `@rdos`는 코드블럭 안에 넣거나 줄 맨 앞에서 시작하지 않게 둬야 실행되지 않는다.
