# guides/avatar_assets.md

## 목적
ezChat의 left panel avatar 이미지, `.axis` sidecar 파일, 눈깜박임/립싱크/표정 변형 기준을 정리한다.
이 문서는 avatar 이미지 위에 얼굴/눈/코/입 좌표를 표시하거나, 이후 애니메이션형 avatar 기능을 확장할 때 기준 문서로 사용한다.

## 현재 구현 요약
- 설정 필드 이름은 아직 `avatar_directory`이지만, 현재 RChat Settings UI는 avatar 폴더 또는 avatar 이미지 파일 선택을 중심으로 동작한다.
  - native 기본값 예: `avatar\rimage-348\rimage-348.png`.
  - wasm 기본값 예: `avatar/rimage-348/rimage-348.png`.
  - 폴더 경로가 저장된 경우에는 해당 폴더 안에서 대표 이미지를 자동 선택한다.
  - 대표 이미지는 폴더명과 같은 root 이미지 -> root 이미지 1개 -> `avatar.png` -> `mouth/smile-rest.png` 순으로 선택한다.
- 현재 기본 avatar 위치는 배포 폴더 안의 `avatar\<avatar-name>\<avatar-name>.png` 패키지 계열이다.
- native에서 상대 avatar 경로는 process working directory가 아니라 실행파일이 있는 디렉토리 기준으로 해석한다.
  - 예: `target\debug\ezchat.exe`를 실행하면 `target\debug\avatar\rimage-348\rimage-348.png`를 우선 찾는다.
  - 배포/실행 폴더를 옮겨도 실행파일 옆의 bundled avatar가 같이 따라가도록 하기 위한 규칙이다.
- wasm에서는 `avatar/rimage-348/rimage-348.png`, `avatar/sophia-7/sophia-7.png`가 bundled avatar 목록으로 제공된다.
- 대표 이미지가 들어 있는 캐릭터 폴더를 리소스 디렉토리로 우선 사용한다.
  - 예: `avatar\rimage-348\rimage-348.png` -> `avatar\rimage-348\avatar.axis`.
- 눈감은 이미지가 있으면 blink 때 별도 eye patch source로 사용한다.
  - 예: `avatar\rimage-348\rimage-348.png` -> `avatar\rimage-348\eyes\closed.png`.
  - 눈감은 이미지는 기본 `avatar.axis` 좌표를 source/destination 공통 기준으로 사용하므로 별도 axis를 만들지 않는다.
- 기존 같은 폴더 sidecar(`rimage-348.axis`, `rimage-348-eyes-closed.png`)는 호환 fallback으로 유지한다.
- `Axis` 토글이 켜진 경우 face/eye/nose/mouth/lower_face overlay를 표시한다. `lower_face`가 있으면 주황색 하관 영역으로 표시한다.
- `Blink 1s` 토글이 켜진 경우 1초마다 blink를 반복해 눈 위치/patch 정렬을 빠르게 확인한다.
- `Blink 1s`가 꺼진 평상시에는 7초~13초 deterministic pseudo-random 간격으로 blink한다.
- assistant 답변 중에는 mouth variant overlay 기반 lip-sync를 우선 표시하고, variant가 없으면 기존 avatar mouth slice lip-sync로 fallback한다. motion/crop 영역은 `lower_face`가 있으면 우선 사용하고, 없으면 `mouth`를 사용한다.

## 파일 배치
최소 구성:
- 기본 구동 최소 구성은 기본 avatar 이미지 1개, `mouth\smile-open.png`, `eyes\closed.png`이다.
  - 예: `avatar\<avatar-name>\<avatar-name>.png`, `avatar\<avatar-name>\mouth\smile-open.png`, `avatar\<avatar-name>\eyes\closed.png`.
- `mouth\smile-rest.png`는 직접 준비 필수 파일이 아니다. 프로그램이 기본 avatar 이미지에서 rest/smile-rest 계열 이미지를 자동 복사해 사용할 수 있다.
- `rest/a/a-soft/e/i/o/u/m/smile-rest` 등 추가 mouth variant는 더 자연스러운 lip-sync용 확장 asset으로 본다.
권장 구조:

```text
avatar\
  rimage-348\
    rimage-348.png
    avatar.axis
    rimage-348.axis                  # legacy fallback
    rimage-348-eyes-closed.png      # legacy fallback
    eyes\
      closed.png
    mouth\
      rest.png
      a.png
      a-soft.png
      e.png
      i.png
      o.png
      u.png
      m.png
      smile-rest.png
      smile-open.png
  sophia-7\
    sophia-7.png
    avatar.axis
    sophia-7.axis                   # legacy fallback
    eyes\
      closed.png
```

규칙:
- 기본 avatar 이미지는 `avatar\<avatar-name>\<avatar-name>.<ext>`에 둔다.
- 캐릭터별 부가 리소스는 `avatar\<avatar-name>\` 하위에 모은다.
- 기본 axis 우선 경로는 `avatar\<avatar-name>\avatar.axis`이다.
  - 기존 `avatar\<avatar-name>\<avatar-name>.axis`는 호환 fallback으로만 사용한다.
- 눈감은 이미지 우선 경로는 `avatar\<avatar-name>\eyes\closed.<ext>`이다.
- 눈감은 이미지는 별도 axis 없이 기본 `avatar.axis` 좌표를 source/destination 공통 기준으로 사용한다.
- 눈감은 이미지가 없으면 blink overlay를 그리지 않는다.
- 눈감은 이미지 source와 destination 위치는 항상 기본 `avatar.axis` 좌표를 기준으로 한다.
- 별도 axis는 만들거나 읽지 않는다.
- legacy 폴더 설정값이 있을 수 있으므로, 폴더 fallback 동작은 유지한다.

## `.axis` JSON 구조
현재 앱이 읽는 기본 구조는 다음과 같고, 눈 영역, 눈썹 영역, `upper_face`, `lower_face` 같은 확장 영역은 optional 필드로 저장한다.

```json
{
  "version": 1,
  "source_image": "rimage-348.png",
  "image_width": 1536,
  "image_height": 1024,
  "detected_by": "rimageask-gpt-5.5-estimate",
  "face_roll_deg": 0.0,
  "face_yaw_deg": 0.0,
  "face_pitch_deg": 0.0,
  "eye_gaze_yaw_deg": 0.0,
  "eye_gaze_pitch_deg": 0.0,
  "face": { "x": 520.0, "y": 110.0, "w": 430.0, "h": 520.0 },
  "upper_face": { "x": 585.0, "y": 225.0, "w": 310.0, "h": 150.0 },
  "right_eyebrow": { "x": 755.0, "y": 245.0, "w": 130.0, "h": 35.0 },
  "left_eyebrow": { "x": 590.0, "y": 250.0, "w": 130.0, "h": 35.0 },
  "right_eye": {
    "x": 815.0,
    "y": 325.0,
    "box": { "x": 760.0, "y": 280.0, "w": 120.0, "h": 85.0 }
  },
  "left_eye": {
    "x": 650.0,
    "y": 330.0,
    "box": { "x": 595.0, "y": 285.0, "w": 120.0, "h": 85.0 }
  },
  "nose": { "x": 740.0, "y": 405.0 },
  "mouth": { "x": 650.0, "y": 500.0, "w": 170.0, "h": 70.0 },
  "lower_face": { "x": 620.0, "y": 490.0, "w": 230.0, "h": 150.0 }
}
```

필드 의미:
- `version`: 선택 필드. axis 파일 형식 버전이다. 현재는 `1`을 사용한다.
- `source_image`: 선택 필드. 이 axis가 기준으로 삼은 이미지 파일명이다.
- `image_width`: 원본 이미지 너비(px).
- `image_height`: 원본 이미지 높이(px).
- `detected_by`: 선택 필드. 좌표를 만든 방법이나 도구 이름을 적는다.
- `face_roll_deg`: 선택 필드. 얼굴의 이미지 평면상 기울기 각도(degrees). 누락 시 `0.0`으로 처리한다.
- `face_yaw_deg`: 선택 필드. 얼굴의 좌우 회전 각도(degrees). 누락 시 `0.0`으로 처리한다.
- `face_pitch_deg`: 선택 필드. 얼굴의 상하 회전 각도(degrees). 누락 시 `0.0`으로 처리한다.
- `eye_gaze_yaw_deg`: 선택 필드. 눈동자/시선의 좌우 각도(degrees). 누락 시 `0.0`으로 처리한다.
- `eye_gaze_pitch_deg`: 선택 필드. 눈동자/시선의 상하 각도(degrees). 누락 시 `0.0`으로 처리한다.
- `upper_face`: 선택 필드. 양쪽 눈과 눈썹을 포함한 상단 얼굴 rectangle이다. blink/눈감기/표정 overlay에서 눈과 눈썹 주변을 한 번에 움직일 때 우선 사용하고, 없으면 기존 eye box 기반으로 fallback한다.
- `face`: 선택 필드. 얼굴 영역 rectangle.
- `right_eyebrow`: 선택 필드. 캐릭터 기준 오른쪽 눈썹 영역 rectangle. 향후 표정/감정 표현과 eyebrow overlay/animation 기준으로 사용한다.
- `left_eyebrow`: 선택 필드. 캐릭터 기준 왼쪽 눈썹 영역 rectangle. 향후 표정/감정 표현과 eyebrow overlay/animation 기준으로 사용한다.
- `right_eye`: 선택 필드. 캐릭터 기준 오른쪽 눈 정보. `x`, `y`는 눈동자/시선 기준점이다.
- `left_eye`: 선택 필드. 캐릭터 기준 왼쪽 눈 정보. `x`, `y`는 눈동자/시선 기준점이다.
- `right_eye.box`: 선택 필드. 캐릭터 기준 오른쪽 눈 전체 영역 rectangle. blink patch, eyes-closed source crop, eye overlay 표시 기준으로 사용한다.
- `left_eye.box`: 선택 필드. 캐릭터 기준 왼쪽 눈 전체 영역 rectangle. blink patch, eyes-closed source crop, eye overlay 표시 기준으로 사용한다.
- `nose`: 선택 필드. 코 point.
- `mouth`: 선택 필드. 입술/입 자체의 기준 rectangle이다.
- `lower_face`: 선택 필드. 입과 턱을 포함한 하관/움직임 기준 rectangle이다. 보통 `mouth`보다 아래쪽으로 더 크며, 턱까지 함께 움직이는 자연스러운 mouth overlay/lip-sync가 필요할 때 사용한다.

좌표 타입:
- point: `{ "x": number, "y": number }`
- rectangle: `{ "x": number, "y": number, "w": number, "h": number }`
- eye: `{ "x": number, "y": number, "box": rectangle }`. `box`는 optional이다.

## 얼굴 각도 기준
각도 필드는 모두 degrees이며, 기본 범위는 `-180..180`으로 정규화해 저장한다.
`+360..-360`처럼 같은 방향을 여러 값으로 표현하지 않는다.

- `face_roll_deg`: 이미지 평면 안에서 얼굴이 기울어진 각도다. 캐릭터 기준 왼쪽 얼굴이 올라가면 `+`, 내려가면 `-`다. 거꾸로 선 얼굴은 `+180` 또는 `-180`으로 표현한다.
- `face_yaw_deg`: 얼굴이 좌우로 돌아간 각도다. 캐릭터 기준 왼쪽 얼굴면이 더 많이 보이면 `+`, 더 적게 보이면 `-`다. 뒤돌아 선 상태는 `+180` 또는 `-180`으로 표현한다.
- `face_pitch_deg`: 얼굴이 위아래로 돌아간 각도다. Axis overlay에서는 보수적인 화면 높이 scale 보정으로 반영한다.
- `eye_gaze_yaw_deg`: 얼굴 방향과 별개로 눈동자/시선이 좌우로 향한 각도다. 정면을 보면 `0.0`이다.
- `eye_gaze_pitch_deg`: 얼굴 방향과 별개로 눈동자/시선이 위아래로 향한 각도다. 고개를 숙였지만 정면을 보면 얼굴 기준으로 약간 위를 볼 수 있다.

얼굴 각도와 시선 각도는 분리해서 저장한다.
현재 Axis overlay는 `face_roll_deg`를 face 중심 기준 2D 회전으로 반영하고, `face_yaw_deg`/`face_pitch_deg`는 과한 3D 투영 대신 보수적인 화면 scale 보정으로 반영한다.
눈동자/시선 각도는 아직 표시 메타데이터이며, 실제 시선 보정 계산에는 사용하지 않는다.

중요: `face_roll_deg`는 overlay를 맞추기 위해 줄이거나 `0.0`으로 우회하지 말고 실제 얼굴 기울기대로 잡는다.
얼굴이 기울어진 avatar에서는 눈 좌표와 눈 영역을 원본 이미지에서 보이는 기울어진 위치 그대로만 잡으면 roll 보정 적용 후 overlay나 blink patch가 어긋날 수 있다.
따라서 `right_eye.x/y`, `left_eye.x/y`, `right_eye.box`, `left_eye.box`는 `face_roll_deg`가 적용된 결과를 고려해 보정한다.
대부분의 정면 또는 약한 3/4 anime avatar에서는 roll 보정 기준으로 양쪽 눈의 `y` 값이 같거나 매우 비슷해야 자연스럽다.

## 좌표 기준
가장 중요한 원칙: `.axis` 좌표는 항상 원본 이미지 픽셀 좌표다.

- `(0, 0)`은 원본 이미지의 왼쪽 위다.
- `x`는 오른쪽으로 증가한다.
- `y`는 아래쪽으로 증가한다.
- `w`, `h`는 원본 이미지 픽셀 기준의 너비와 높이다.
- 화면에 표시된 이미지 크기나 crop 상태를 기준으로 `.axis` 값을 저장하지 않는다.

이 원칙을 지켜야 left panel 표시 크기가 바뀌거나 중앙 crop이 들어가도 같은 `.axis` 파일을 계속 사용할 수 있다.

## 화면 표시 변환 원칙
left panel avatar는 고정 header 영역 안에 표시되며, 이미지 비율에 따라 중앙 crop이 생길 수 있다.
따라서 앱은 `.axis` 원본 좌표를 바로 화면 좌표로 쓰지 않고 다음 순서로 변환한다.

1. 원본 이미지 픽셀 좌표를 `image_width`/`image_height`로 나누어 source UV로 바꾼다.
2. 현재 표시 중인 crop UV 영역 안에서 보이는 상대 위치로 다시 계산한다.
3. 최종적으로 egui image rect 안의 화면 좌표로 변환한다.

현재 이 변환은 `src\rchat_avatar.rs`의 `AvatarAxisProjector`가 담당한다.
립싱크, blink, 표정 변형, 향후 animation 코드를 추가할 때도 raw `.axis` 픽셀 좌표를 화면 좌표처럼 직접 쓰지 말고 이 변환 원칙을 유지한다.

## Axis / Blink UI
현재 RChat Settings의 avatar 관련 UI 기준:
- `Avatar Image`: avatar 이미지 파일을 선택한다.
- `Axis`: `Avatar Image` 설명 아래 줄에 있으며, axis overlay 표시/숨김을 토글한다.
- `Blink 1s`: `Axis` 버튼 옆에 있으며, blink 정렬 확인용 테스트 토글이다.

동작 기준:
- `Axis` ON: face/upper_face/eye/eyebrow/nose/mouth/lower_face overlay와 axis 상태를 확인한다. 현재 색상 기준은 face=하늘색, upper_face=보라색, mouth=분홍색, lower_face=주황색, eye=연두색, eyebrow=연녹색, nose=노란색이다.
- `Axis` OFF: overlay를 숨기고 일반 avatar 표시만 한다.
- `Blink 1s` ON: 1초마다 blink한다. 눈감은 이미지 patch 정렬, 눈꺼풀 shape, 좌우 눈 위치 확인용이다.
- `Blink 1s` OFF: 평상시 blink 모드다. 7초~13초 deterministic pseudo-random 간격으로 blink한다.

평상시 blink timing 구현 기준:
- 10초 base slot을 사용한다.
- 각 slot마다 deterministic jitter를 0초~약 3초 범위로 더한다.
- 인접 blink 간격은 `10초 + 다음 jitter - 이전 jitter`가 되므로 7초~13초 범위에 들어간다.
- blink duration은 약 0.22초다.

## Blink / eyes-closed 리소스 원칙
눈감은 이미지가 있으면 blink는 단순 색칠이 아니라 실제 눈감은 이미지의 eye patch를 가져와 기본 avatar의 눈 위치에 합성한다.

중요 원칙:
- 기본 avatar axis는 destination 기준이다.
  - blink 결과가 놓일 위치는 기본 avatar의 `right_eye`/`left_eye`를 따른다.
  - `right_eye.box`/`left_eye.box`가 있으면 눈 전체 영역 기준으로 patch 위치와 크기를 잡는다.
  - `box`가 없으면 기존처럼 eye point와 face 크기 기반 fallback을 사용한다.
- eyes-closed 이미지는 source와 destination 모두 기본 `avatar.axis` 좌표를 사용한다.
  - `gpt-image-2`처럼 원본 위치를 잘 유지하는 편집 결과를 전제로 하며, 별도 closed-eye axis는 만들거나 읽지 않는다.
  - `upper_face`가 있으면 눈+눈썹 포함 상단 얼굴 영역을 우선 patch하고, 없으면 eye `box` 기반 patch로 fallback한다.
- eyes-closed 이미지가 없으면 blink overlay를 그리지 않는다.
- 눈감은 이미지와 기본 이미지의 얼굴 크기/위치/표정이 다르면 patch가 완벽히 맞지 않을 수 있다.
- 눈감은 이미지를 만들 때는 기본 이미지와 최대한 같은 구도, 같은 얼굴 크기, 같은 색감, 같은 crop을 유지한다.
- 실제 blink용 eyes-closed 이미지는 가능하면 기본 이미지와 같은 pixel size로 만든다.
  - 같은 크기이면 원본과 닫힌 눈 source의 눈 위치가 유지되기 쉬워 axis 없이도 자연스럽게 맞을 가능성이 높다.
  - 크기가 다른 eyes-closed 이미지는 일부러 테스트에는 유용하지만, 실제 blink용으로 쓰려면 기본 구도에 맞춰 리사이즈/재생성하는 편이 좋다.
- 얼굴이 기울어진 경우 `face_roll_deg`와 `face_yaw_deg` 보정을 고려해 patch를 회전/스케일한다.

현재 blink rendering은 두 계열을 함께 고려한다.
- eyes-closed 이미지 patch가 있으면 실제 닫힌 눈 이미지를 source로 사용한다.
- fallback 또는 보조 표현으로 원본 이미지 픽셀 이동 기반 눈꺼풀 형태를 사용한다.

## Lip-sync 원칙
현재 lip-sync는 assistant 답변 중 mouth variant overlay를 우선 사용하고, variant가 없으면 기존 mouth slice 방식으로 fallback한다.

원칙:
- `.axis`의 `mouth` rectangle은 입술/입 자체의 기준 영역이다.
- `.axis`의 optional `lower_face` rectangle은 입과 턱을 포함한 하관/움직임 기준 영역이다.
  - `lower_face`가 있으면 mouth variant overlay나 lip-sync 움직임 기준으로 더 중요할 수 있다.
  - `lower_face`가 없으면 기존처럼 `mouth` 영역을 사용한다.
- 화면 표시에는 `AvatarAxisProjector`의 변환 결과를 사용한다.
- `face_roll_deg`는 입 벌림 방향의 기울기에 반영한다.
- `face_yaw_deg`/`face_pitch_deg`는 보수적인 위치/크기 보정에 반영한다.
- mouth slice는 단순 axis-aligned rectangle보다 corrected mouth corners 기반 textured quad mesh 쪽을 우선한다.
- 너무 과장된 입 벌림은 어색하므로 opening 이동량은 보수적으로 유지한다.

현재 mouth variant overlay 규칙:
- avatar 캐릭터 패키지 하위 디렉토리에 mouth variant를 둔다.
  - 예: `avatar\rimage-348\mouth\a.png`.
  - 일반 규칙: `avatar\<avatar-name>\mouth\<viseme>.png`.
- mouth variant 이미지는 기본 avatar와 같은 pixel size, 같은 구도, 같은 얼굴 위치를 유지한 full-size 이미지여야 한다.
- 렌더링할 때 full-size variant 전체를 그리지 않고, axis의 mouth motion 영역에 해당하는 UV 영역만 잘라 base avatar 위에 overlay한다.
  - 현재 작성 기준에서 mouth motion 영역은 `lower_face`가 있으면 `lower_face`, 없으면 `mouth`로 본다.
  - `mouth` 자체는 입술/입 기준으로 유지하고, 턱까지 함께 움직이는 자연스러운 효과가 필요하면 `lower_face`를 더 크게 잡는다.
- 전체 mouth variant 세트를 만들 때 권장하는 viseme 파일명:
  - `rest.png`
  - `a.png`
  - `a-soft.png`
  - `e.png`
  - `i.png`
  - `o.png`
  - `u.png`
  - `m.png`
  - `smile-rest.png`
  - `smile-open.png`
- 실제 음성 출력 중에는 native PCM 분석 기반 audio viseme을 우선 사용한다.
  - 현재 재생 위치 주변의 amplitude/frequency/zero-crossing 성향으로 `Rest/M/A/ASoft/E/I/O/U` 계열을 고른다.
  - audio viseme을 얻지 못하면 text 기반 lipsync state를 fallback으로 사용한다.
- text fallback은 한글 조합 음절의 중성을 기준으로 `O/U/ASoft/A/I/E` 계열을 고른다.
- 선택된 mouth variant texture가 없거나 로딩에 실패하면 기존 mouth slice lip-sync로 fallback한다.
- 루트 파일명 `rimage-348-mouth-<viseme>.png` 방식은 현재 주 규칙이 아니다. 새 avatar에는 stem 하위 `mouth` 디렉토리 방식을 사용한다.
- `closed`/`eo`는 현재 권장 파일명이 아니다.
  - 닫힌/rest 계열은 `rest` 또는 `m`을 사용한다.
  - `eo` 계열은 별도 파일보다 text/audio mapping에서 `O`, `U`, `ASoft` 등 기존 viseme 그룹으로 보낸다.

다른 avatar에 mouth 세트를 추가할 때 권장 순서:
1. 대상 avatar의 `.axis`에서 `mouth` rectangle과, 필요하면 `lower_face` rectangle이 정확한지 먼저 확인한다.
2. `avatar\<avatar-name>\mouth` 디렉토리를 만든다.
3. 최소 구성만 필요하면 `smile-open` full-size variant를 만든다. `rest/a/a-soft/e/i/o/u/m/smile-rest`는 기본 구동 필수 파일이 아니라 자연스러운 lip-sync를 위한 확장 variant로 추가한다.
4. 각 variant가 원본 avatar와 같은 크기와 구도를 유지하는지 확인한다.
5. ezChat을 다시 빌드/실행해야 하는 코드 변경이 없다면 파일 추가 후 avatar reload 흐름을 확인하고, 코드 변경이 있으면 dev build 후 새 실행본으로 확인한다.
6. 실제 TTS 음성 출력 중 audio viseme 변화와 말 끝 입 닫힘을 확인한다.

현재 권장되는 mouth/lower-face axis 항목:
- `mouth`: 입술/입 자체의 기준 rectangle이다. 기존 호환과 mouth-only crop/mask 기준으로 유지한다.
- `lower_face`: 선택 항목이다. 입과 턱을 포함한 하관 영역이며, mouth variant overlay나 lip-sync 움직임에서 턱까지 함께 자연스럽게 움직이게 하고 싶을 때 사용한다. 보통 `mouth`보다 아래쪽으로 더 크다.

향후 자연스러운 lip-sync를 위해 추가될 수 있는 landmark:
- upper lip point
- lower lip point
- mouth corner left/right
- jaw point
- teeth/tongue visibility hint
- phoneme/viseme별 mouth shape metadata

## axis를 얻는 방법
현재 사용할 수 있는 방법은 세 가지다.

### 1. 수동 작성
이미지 편집기나 뷰어에서 원본 이미지 픽셀 좌표를 확인해 `.axis` JSON을 직접 작성한다.
가장 정확하게 보정할 수 있지만 시간이 걸린다.

권장 절차:
1. 원본 이미지의 실제 크기를 확인한다.
2. 얼굴/눈/코/입 위치를 원본 이미지 픽셀 기준으로 잡고, mouth overlay가 턱까지 자연스럽게 움직여야 하면 `lower_face`도 함께 잡는다.
3. 이미지 파일과 같은 stem의 `.axis` 파일을 만든다.
4. ezChat에서 `Axis` 버튼을 켜 overlay 위치를 확인한다.
5. 필요하면 `.axis` 값을 조금씩 보정한다.
6. blink 정렬을 볼 때는 `Blink 1s`를 켜서 빠르게 확인한다.

### 2. rimageask 또는 이미지 분석으로 추정
이미지 분석 도구에 얼굴/눈/코/입 위치를 원본 이미지 픽셀 기준으로 추정하게 하고, 결과를 `.axis` 파일로 저장한다.
현재 우선 axis인 `avatar\rimage-348\avatar.axis`는 `rimageask-gpt-5.5-estimate` 추정값을 바탕으로 보정했다.
기존 `avatar\rimage-348\rimage-348.axis`는 legacy fallback으로만 유지한다.

주의사항:
- 추정값은 시작점으로만 본다.
- 얼굴이 기울어져 있거나 머리카락/표정/장식이 있으면 눈이나 입 좌표가 어긋날 수 있다.
- 앱의 `Axis` overlay로 실제 표시 위치를 확인한 뒤 보정한다.
- 눈감은 이미지는 원본 구도/크기를 유지하도록 만들고, source patch 위치도 기본 `avatar.axis`를 그대로 사용한다.

### 3. 향후 자동 검출
나중에 얼굴/랜드마크 검출 모델을 붙이면 `.axis` 파일을 자동 생성할 수 있다.
다만 저장 형식과 좌표 기준은 동일하게 유지한다.
즉, 자동 검출 결과도 원본 이미지 픽셀 기준의 `.axis` JSON으로 저장한다.

## 현재 rimage-348 기준값
현재 기준 avatar:
- 기본 이미지: `avatar\rimage-348\rimage-348.png`
- 기본 axis 우선 경로: `avatar\rimage-348\avatar.axis`
- 기본 axis legacy fallback: `avatar\rimage-348\rimage-348.axis`
- 눈감은 이미지 우선 경로: `avatar\rimage-348\eyes\closed.png`
- 눈감은 이미지 legacy fallback: `avatar\rimage-348\rimage-348-eyes-closed.png`

기본 `avatar.axis` 주요 값:
- `image_width`: `1536`
- `image_height`: `1024`
- `face_roll_deg`: `-13.0`
- `face_yaw_deg`: `-5.0`
- `face_pitch_deg`: `0.0`
- `face`: `(x=606, y=82, w=238, h=300)`
- `right_eyebrow`: `(x=632, y=165, w=59, h=23)`
- `left_eyebrow`: `(x=716, y=159, w=74, h=24)`
- `right_eye`: `(x=660, y=200)`, `box=(x=627, y=184, w=67, h=41)`
- `left_eye`: `(x=765, y=200)`, `box=(x=732, y=184, w=65, h=41)`
- `nose`: `(x=711, y=239)`
- `mouth`: `(x=663, y=270, w=110, h=70)`
- `lower_face`: `(x=643, y=270, w=170, h=110)`


mouth variant directory:
- `avatar\rimage-348\mouth`
- 현재 권장 파일:
  - `rest.png`
  - `a.png`
  - `a-soft.png`
  - `e.png`
  - `i.png`
  - `o.png`
  - `u.png`
  - `m.png`
  - `smile-rest.png`
  - `smile-open.png`

주의:
- 눈감은 이미지는 기본 이미지와 같은 얼굴 위치/구도/크기를 유지하도록 만든다.
- blink patch source와 destination은 모두 기본 `avatar.axis` 좌표를 사용한다.
- 이후 이미지를 새로 만들면 같은 stem 규칙과 원본 픽셀 좌표 원칙을 다시 확인한다.

## 현재 구현 위치
- `src\rchat_avatar.rs`
  - avatar 이미지 찾기와 표시.
  - legacy folder path fallback과 image path 처리.
  - 캐릭터 리소스 디렉토리 우선 axis 경로와 legacy sidecar fallback 경로 계산.
  - `<stem>\eyes\closed.png` 우선 경로와 `*-eyes-closed.*` 이미지 fallback 경로 계산. 별도 closed-eye axis는 읽지 않는다.
  - `.axis` JSON 읽기와 상태 표시.
  - `AvatarAxis`, `AvatarAxisPoint`, `AvatarAxisRect` 구조.
  - `face_roll_deg`, `face_yaw_deg`, `face_pitch_deg` 얼굴 각도 메타데이터.
  - `eye_gaze_yaw_deg`, `eye_gaze_pitch_deg` 눈동자/시선 각도 메타데이터.
  - `AvatarAxisProjector` 좌표 변환과 face 각도 기반 Axis overlay 보정.
  - face/mouth/lower_face는 보정된 네 꼭짓점 선분, eye/nose는 보정 point overlay. `lower_face`는 있으면 주황색 polygon으로 표시한다.
  - 평상시 7초~13초 blink timing과 `Blink 1s` 테스트 timing.
  - eyes-closed 이미지 patch 기반 blink.
  - assistant 답변 중 mouth variant overlay 기반 lip-sync 표시. `lower_face`가 있으면 mouth motion/crop 기준으로 우선 사용하고, 없으면 `mouth`로 fallback한다.
  - mouth variant가 없거나 실패하면 기존 실제 avatar mouth image slice 기반 lip-sync로 fallback.
- `src\rsetup.rs`
  - `Avatar Image` 설정 UI.
  - wasm `Select Image` / `Select Axis` / `Clear` custom avatar 버튼.
  - wasm `Bundled Avatar` combo box.
  - `Axis` overlay 표시/숨김 토글 버튼.
  - `Blink 1s` 테스트 토글.
- `src\app_state.rs`
  - `avatar_directory` 설정값. 현재 이름은 directory지만 image path 중심으로도 사용된다.
  - `show_avatar_axis_overlay` 설정값.
  - `avatar_blink_test_1s` 설정값.
  - avatar image cache key와 eyes-closed image cache key.

## 보정 시 주의사항
- `.axis` 좌표는 원본 이미지 기준이므로, 화면에 crop되어 안 보이는 부분도 원본 좌표로 기록한다.
- left/right eye는 보는 사람 기준이 아니라 캐릭터 자신의 왼쪽/오른쪽 기준으로 유지한다.
- 얼굴이 기울어진 이미지는 단순 point/rect만으로 완벽히 맞지 않을 수 있다.
- `mouth` rectangle은 입술/입 자체 기준으로 너무 넓거나 좁지 않게 잡고, 턱까지 함께 움직이는 자연스러운 lip-sync가 필요하면 `lower_face`를 별도로 잡는다.
- blink source와 destination은 모두 기본 `avatar.axis` 좌표를 사용하므로, 눈감은 이미지는 기본 이미지 구도와 최대한 같게 만든다.
- 눈감은 이미지 patch가 어색하면 먼저 `Blink 1s`를 켜고 기본 `avatar.axis`의 `upper_face` 또는 eye `box` 좌표와 closed image 구도를 함께 확인한다.
- 실제 lip-sync나 blink 이미지 변형을 추가하기 전에는 debug overlay로 위치와 크기를 먼저 확인한다.

## 향후 animation 확장 방향
현재 구조는 이미 부분 animation 기반이다.
- blink
- eyes-closed patch 합성
- lip-sync mouth movement
- face angle 보정 overlay
- `Blink 1s` 테스트 timing

부담이 적은 다음 확장 후보:
- idle breathing: 평상시 1~2px 정도 천천히 위아래 이동.
- subtle sway: 3초~6초 간격의 아주 작은 좌우/상하 흔들림.
- speaking emphasis: 말할 때 avatar를 아주 살짝 확대하거나 앞으로 오는 느낌.
- thinking state: 답변 생성 중 눈/고개/위치에 작은 변화를 준다.
- emotion state: happy/surprised 등 상태에 따라 눈/입 overlay 또는 이미지 variant를 바꾼다.

가능한 구현 방식:
1. 현재 이미지 + axis 기반 변형
   - 가장 현재 구조와 잘 맞는다.
   - blink/lip-sync/미세 이동/확대/표정 overlay를 코드로 처리한다.
2. 여러 프레임 이미지 방식
   - `idle_001.png`, `idle_002.png`처럼 프레임을 준비해 순서대로 표시한다.
   - 자연스럽지만 프레임 파일 관리와 lip-sync 동기화가 필요하다.
3. Live2D 같은 본격 rigging 모델
   - 표현력은 크지만 별도 runtime/renderer/model format 통합이 필요해 현재 단계에서는 부담이 크다.

우선순위는 1번 방식이다. 현재 `.axis` 기준과 image patch 구조를 유지하면 작은 효과부터 안전하게 추가할 수 있다.

## 현재 단계의 한계
- `.axis` landmark 좌표는 아직 2D point/axis-aligned rectangle 중심이다.
- Axis overlay는 얼굴 각도 기반 표시 보정을 적용하지만, `face_yaw_deg`/`face_pitch_deg`는 실제 3D 투영이 아니라 보수적인 scale 근사다.
- 눈동자/시선 각도는 아직 실제 시선 보정 계산에는 사용하지 않는다.
- 회전된 얼굴, 턱선, 눈꺼풀, 입술 윤곽 같은 세부 landmark는 아직 없다.
- eyes-closed patch는 source/destination 보정을 하지만, 두 이미지의 얼굴 형태가 크게 다르면 완벽히 맞기 어렵다.
- 더 자연스러운 lip-sync와 animation을 위해서는 나중에 mouth polygon, upper/lower lip point, jaw point, eyelid point 같은 추가 landmark가 필요할 수 있다.

## 유지해야 할 핵심 원칙
- 기본 이미지와 같은 stem의 캐릭터 리소스 디렉토리를 우선 사용한다.
- 기본 axis는 `<stem>\avatar.axis`, 눈감은 리소스는 `<stem>\eyes\closed.png`에 둔다. 눈감은 이미지는 기본 axis 좌표를 그대로 사용한다.
- 기존 같은 폴더 sidecar 파일은 호환 fallback으로만 유지한다.
- `.axis` 좌표는 항상 원본 이미지 픽셀 기준이다.
- 화면 표시에서는 image rect와 crop UV를 반영해 변환한다.
- blink source와 destination은 모두 기본 `avatar.axis` 좌표를 기준으로 한다.
- `Axis` overlay로 좌표를 먼저 검증하고, 실제 변형은 그 다음에 적용한다.
- blink 정렬 확인은 `Blink 1s`를 사용한다.
- 평상시 blink는 7초~13초 간격을 유지한다.
- 좌표 생성 방법은 바뀔 수 있지만 저장 형식과 좌표 기준은 유지한다.