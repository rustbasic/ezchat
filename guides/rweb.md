# rweb guide

## 목적
- `rweb`는 웹 페이지나 RSS URL을 읽어 텍스트로 추출하고 `memory\web`에 저장하는 R-DOS 내부 명령입니다.
- 채팅에서는 반드시 `@rdos {"cmd":"..."}` JSON 형식으로 실행합니다.

## 기본 읽기(read)
- URL을 직접 읽을 때는 기존 문법과 mode 기반 JSON 문법을 모두 사용할 수 있습니다.

```text
@rdos {"cmd":"rweb","url":"https://example.com"}
@rdos {"cmd":"rweb","mode":"read","url":"https://example.com"}
```

- 내부 실행 문자열은 기존 호환을 위해 `rweb <url>` 흐름을 사용합니다.
- native에서는 결과가 `memory\web\rweb_<timestamp>_<host>.txt` 형식으로 저장됩니다.
- wasm에서는 host 파일 대신 인앱 문서 `memory/web/...`로 저장됩니다.

## 뉴스(news)
- `mode:"news"`는 1차 구현에서 API 키 없이 Google News RSS를 사용합니다.
- `query`가 있으면 검색 RSS로 변환하고, `query`가 없으면 주요 뉴스 RSS를 읽습니다.

```text
@rdos {"cmd":"rweb","mode":"news","query":"rust language"}
@rdos {"cmd":"rweb","mode":"news"}
```

- 이미 RSS URL을 알고 있으면 직접 지정할 수도 있습니다.

```text
@rdos {"cmd":"rweb","mode":"news","url":"https://news.google.com/rss/search?q=rust&hl=ko&gl=KR&ceid=KR:ko"}
```

- native 내부 실행 문자열은 `rweb --mode news <rss-url>` 형태가 됩니다.
- native 저장 파일은 `memory\web\rweb_news_<timestamp>_<host>.txt` 형식으로 구분됩니다.
- 현재 `news`는 RSS 텍스트 추출 중심이며, 별도 뉴스 API 키나 전문 검색 API는 사용하지 않습니다.

## 출력과 이어 읽기
- 채팅 출력은 처음 100줄까지만 미리보기로 보여줍니다.
- `total_lines`가 더 크면 출력의 `hint`에 이어 읽기 명령이 표시됩니다.

```text
@rdos {"cmd":"rtype memory\\web\\<saved-file>.txt from 101 100"}
```

## 후처리 권장 규칙
- RSS/피드처럼 HTML fragment가 섞인 입력은 저장 전에 태그 제거와 HTML entity 디코딩을 우선 적용하는 것이 좋습니다.
- 1차 정리 대상은 `<p>`, `</p>`, `<span class=...>`, `<code class=...>`, `<pre ...>`, `<a ...>` 같은 HTML/하이라이트 태그 잔여물입니다.
- 태그를 제거할 때는 코드블록의 실제 텍스트, 링크 텍스트, 제목/소제목, 날짜/작성자, 원문 URL은 보존하는 방향을 우선합니다.
- `&amp;`, `&quot;`, `&lt;`, `&gt;`, `&nbsp;`, `&middot;` 같은 HTML entity는 사람이 읽을 수 있는 문자로 디코딩하는 것이 좋습니다.
- 사이트 공통 헤더/푸터나 네비게이션 문구 제거는 본문 손실 위험이 있으므로 강한 전역 규칙보다 선택적/약한 규칙으로 적용합니다.

## 관련 문서
- `rweb` 검색 출발점, 추천 사이트, 검색 원칙은 `guides\rweb-search-sources.md`를 참고합니다.

## 주의
- Rust 코드 수정 뒤 실제 앱 동작 확인이 필요하면 `cargo check`만으로 끝내지 말고 release 빌드 후 새 실행본을 다시 실행해야 합니다.
- `mode:"search"`는 별도 검색 API/HTML 검색 정책을 정해야 하므로 아직 구현하지 않았습니다.