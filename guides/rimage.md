# rimage guide

## 목적
- `rimage` 계열 명령은 ezChat의 R-DOS 내부 명령으로 이미지 생성, 편집, 표시, 이미지 질의응답을 처리합니다.
- 채팅에서는 반드시 `@rdos {"cmd":"..."}` JSON 형식으로 실행합니다.
- 현재 문서의 대상 명령은 `rimagegen`, `rimageedit`, `rimageview`, `rimageinfo`, `rimageask`입니다.

## 공통 실행 규칙
- R-DOS 실행 포맷에서는 `cmd` 값에 내부 명령 이름만 넣고, 옵션은 같은 JSON 객체의 최상위 필드로 넣습니다.
- 파일 경로는 현재 작업 디렉터리 기준 상대 경로나 절대 경로를 사용할 수 있습니다.
- JSON 문자열 안의 Windows 경로 구분자 `\`는 `\\`처럼 이스케이프합니다.
- OpenAI API를 호출하는 `rimagegen`, `rimageedit`, `rimageask`는 OpenAI API key가 설정되어 있어야 합니다.

```text
@rdos {"cmd":"rimagegen","prompt":"a cute robot icon"}
@rdos {"cmd":"rimageedit","image":"ezchat_output_images\\input.png","prompt":"add a blue star"}
@rdos {"cmd":"rimageview","file":"ezchat_output_images\\input.png"}
@rdos {"cmd":"rimageask","image":"ezchat_output_images\\input.png","question":"What is in this image?"}
@rdos {"cmd":"rimageinfo","file":"ezchat_output_images\\input.png"}
```

## rimagegen: 이미지 생성
- 텍스트 프롬프트로 새 이미지를 생성합니다.
- 현재 OpenAI 방 모델을 기본 모델로 사용하며, JSON의 `model` 필드로 덮어쓸 수 있습니다.
- 결과 이미지는 `ezchat_output_images` 디렉터리에 `rimagegen_<timestamp>_<millis>.<ext>` 형식으로 저장됩니다.

### 사용 형식
```text
@rdos {"cmd":"rimagegen","prompt":"a cute cat mascot holding an ezChat sign"}
@rdos {"cmd":"rimagegen","prompt":"a cute cat mascot holding an ezChat sign","output_format":"png"}
```

### 주요 필드
- `prompt`: 생성할 이미지 설명입니다. 필수입니다.
- `input`: `prompt`의 별칭입니다.
- `model`: 사용할 OpenAI 모델입니다. 생략하면 현재 방 모델을 사용합니다.
- `size`: 이미지 크기 옵션입니다. 예: `1024x1024`, `1024x1536`, `1536x1024`.
- `quality`: 품질 옵션입니다. 모델이 지원하는 값만 사용합니다.
- `background`: 배경 옵션입니다. 모델이 지원하는 값만 사용합니다.
- `output_format`: 저장 형식입니다. `png`, `jpg`/`jpeg`, `webp`를 사용할 수 있고 기본값은 `png`입니다.
- `output_compression`: 출력 압축률입니다. 지원 형식/모델에서만 의미가 있습니다.

### 출력
- 성공 시 `status: ok`, `command: rimagegen`, `model`, `file`, `prompt`가 출력됩니다.
- OpenAI가 `revised_prompt`를 반환하면 함께 출력됩니다.

## rimageedit: 이미지 편집
- 기존 이미지와 편집 지시문을 함께 보내 새 편집 이미지를 생성합니다.
- 내부적으로 source image를 `input_image`로 전달하고 `image_generation` tool을 edit action으로 사용합니다.
- 결과 이미지는 `ezchat_output_images` 디렉터리에 `rimageedit_<timestamp>_<millis>.<ext>` 형식으로 저장됩니다.

### 사용 형식
```text
@rdos {"cmd":"rimageedit","image":"ezchat_output_images\\source.png","prompt":"add one small blue sparkle in the top-right corner","output_format":"png"}
```

### 주요 필드
- `image`: 편집할 원본 이미지 파일 경로입니다. 필수입니다.
- `path`, `file`: `image`의 별칭입니다.
- `prompt`: 편집 지시문입니다. 필수입니다.
- `input`: `prompt`의 별칭입니다.
- `model`: 사용할 OpenAI 모델입니다. 생략하면 현재 방 모델을 사용합니다.
- `size`, `quality`, `background`, `output_format`, `output_compression`: `rimagegen`과 같은 이미지 출력 옵션입니다.

### 출력
- 성공 시 `status: ok`, `command: rimageedit`, `model`, `file`, `source_image`, `prompt`가 출력됩니다.
- OpenAI가 `revised_prompt`를 반환하면 함께 출력됩니다.

## rimageview: 이미지 표시용 출력
- 로컬 이미지 파일이나 이미지 URL을 채팅에서 이미지로 표시하기 위한 R-DOS 내부 명령입니다.
- OpenAI API를 호출하지 않습니다.
- 로컬 파일을 사용할 때는 파일 존재 여부를 확인한 뒤 절대 경로를 출력합니다.

### 사용 형식
```text
@rdos {"cmd":"rimageview","file":"ezchat_output_images\\sample.png"}
@rdos {"cmd":"rimageview","url":"https://example.com/sample.png","note":"reference image"}
```

### 주요 필드
- `image`: 표시할 로컬 이미지 파일 경로입니다.
- `path`, `file`: `image`의 별칭입니다.
- `url`: 표시할 이미지 URL입니다.
- `note`: 출력에 함께 붙일 짧은 설명입니다.

### 제한
- `image`/`path`/`file` 중 하나와 `url` 중 하나만 사용할 수 있습니다.
- 로컬 파일과 URL을 동시에 주면 오류가 납니다.

### 출력
- 성공 시 `status: ok`, `command: rimageview`와 함께 `file` 또는 `url`이 출력됩니다.
- `note`가 있으면 함께 출력됩니다.

## rimageinfo: 이미지 파일 정보 확인
- 로컬 이미지 파일의 포맷, 크기, 파일 용량을 텍스트로 확인하는 R-DOS 내부 명령입니다.
- OpenAI API를 호출하지 않고, 채팅에 이미지를 표시하지도 않습니다.
- 파일 헤더/메타데이터 확인용이므로 실제 픽셀 전체를 채팅 히스토리에 싣지 않습니다.

### 사용 형식
```text
@rdos {"cmd":"rimageinfo","file":"ezchat_output_images\\sample.png"}
```

### 주요 필드
- `image`: 확인할 로컬 이미지 파일 경로입니다.
- `path`, `file`: `image`의 별칭입니다.

### 출력
- 성공 시 `status: ok`, `command: rimageinfo`, `file`, `extension`, `format`, `width`, `height`, `dimensions`, `bytes`, `created`, `modified`가 출력됩니다.

## rimageask: 이미지 질의응답
- 이미지 파일이나 이미지 URL을 OpenAI vision-capable Responses 모델에 보내 질문에 답하게 합니다.
- 현재 방 모델이 이미지 생성 전용 모델처럼 보이면 기본 vision 모델로 `gpt-4.1-mini`를 사용합니다.
- JSON의 `model` 필드로 사용할 vision 모델을 직접 지정할 수 있습니다.

### 사용 형식
```text
@rdos {"cmd":"rimageask","image":"ezchat_output_images\\sample.png","question":"Describe this image briefly."}
@rdos {"cmd":"rimageask","url":"https://example.com/sample.png","question":"What is visible?","model":"gpt-4.1-mini"}
```

### 주요 필드
- `image`: 분석할 로컬 이미지 파일 경로입니다.
- `path`, `file`: `image`의 별칭입니다.
- `url`: 분석할 이미지 URL입니다.
- `question`: 이미지에 대해 물어볼 질문입니다. 필수입니다.
- `prompt`, `input`: `question`의 별칭입니다.
- `model`: 사용할 vision-capable 모델입니다.

### 제한
- 로컬 이미지(`image`/`path`/`file`)와 `url` 중 하나만 사용할 수 있습니다.
- 질문 필드(`question`/`prompt`/`input`)가 비어 있으면 오류가 납니다.

### 출력
- 성공 시 `status: ok`, `command: rimageask`, `model`, `image`, `question`, `answer`가 출력됩니다.

## 권장 작업 흐름
1. `rimagegen`으로 후보 이미지를 생성합니다.
2. 필요하면 `rimageedit`로 작은 수정부터 적용합니다.
3. `rimageinfo`로 파일 포맷, 크기, 용량을 빠르게 확인합니다.
4. `rimageview`로 결과 파일을 채팅에 표시합니다.
5. `rimageask`로 이미지 내용이나 편집 반영 여부를 확인합니다.

```text
@rdos {"cmd":"rimagegen","prompt":"a friendly blue ezChat mascot","output_format":"png"}
@rdos {"cmd":"rimageinfo","file":"ezchat_output_images\\rimagegen_...png"}
@rdos {"cmd":"rimageview","file":"ezchat_output_images\\rimagegen_...png"}
@rdos {"cmd":"rimageask","image":"ezchat_output_images\\rimagegen_...png","question":"Is this a friendly blue mascot?"}
```

## 주의
- `rimagegen`, `rimageedit`, `rimageask`는 네트워크와 OpenAI API 상태에 따라 시간이 걸리거나 실패할 수 있습니다.
- `output_format`은 저장 확장자 결정에도 쓰입니다. 알 수 없는 값은 현재 구현에서 `png`로 저장됩니다.
- `rimageedit` 원본 이미지와 `rimageask` 로컬 이미지는 `png`, `jpg`/`jpeg`, `webp` 확장자에 맞춰 data URL MIME 타입을 정합니다. 그 외 확장자는 `image/png`로 처리됩니다.
- Rust 코드 수정 뒤 실제 앱 동작 확인이 필요하면 `cargo check`만으로 끝내지 말고 release 빌드 후 새 실행본을 다시 실행해야 합니다.