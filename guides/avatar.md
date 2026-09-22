# guides/avatar.md

## 목적
채팅 메시지 안에서 assist가 `@avatar` flat JSON 명령으로 ezChat avatar의 입 모양과 눈 overlay를 제어하는 방법을 정리한다.
avatar 이미지, `.axis` sidecar, mouth/eyes asset 구조는 `guides/avatar_assets.md`를 참고한다.

## 기본 규칙
- `@avatar` 명령은 assist가 avatar runtime을 제어하기 위한 내부 프로토콜에 가깝다.
- `@avatar` 뒤에는 JSON object만 둔다.
- legacy token 문법은 지원하지 않는다.
  - 예: `@avatar mouth a duration=1`은 지원하지 않는다.
- 한 메시지에 여러 줄의 `@avatar { ... }` 명령을 넣을 수 있다.
- 메시지 안의 `@avatar` 줄은 일반 채팅/R-DOS 처리보다 먼저 avatar runtime으로 전달된다.
- `@avatar` 줄은 채팅로그/본문에서 제거하지 않고 그대로 남긴다.
- avatar-only 메시지는 local visual control로 처리되어 provider/R-DOS로 넘기지 않는다.
- 일반 텍스트나 R-DOS 명령이 섞인 mixed 메시지는 avatar를 먼저 처리한 뒤 기존 일반 채팅/R-DOS 흐름을 유지한다.
- `@AVATAR`처럼 명령 접두어는 대소문자를 구분하지 않는다.
- fenced code block 안의 `@avatar` 줄은 예시로 취급하며 실행하지 않는다.
  - 예: backtick 또는 tilde로 둘러싼 fenced block 안의 `@avatar`는 무시된다.

## Runtime 최소 asset 기준
- 기본 구동 최소 구성은 기본 avatar 이미지 1개, `mouth\smile-open.png`, `eyes\closed.png`이다.
- 권장 배치는 `avatar\\<avatar-name>\\` 패키지 구조다. 폴더 안에는 대표 이미지(`<avatar-name>.png` 권장), `avatar.axis`, `mouth\\...`, `eyes\\...`를 함께 둔다.
- `mouth\smile-rest.png`는 직접 준비 필수 파일이 아니다. 프로그램이 기본 avatar 이미지에서 rest/smile-rest 계열 이미지를 자동 복사해 사용할 수 있다.
- `mouth\smile-open.png`는 열린 입/말하는 입 frame으로 사용한다.
- `eyes\closed.png`는 blink/눈 감기 overlay source로 사용한다.
- 더 자연스러운 lip-sync가 필요하면 `rest/a/a-soft/e/i/o/u/m/smile-rest/smile-open` 같은 full mouth variant 세트를 추가할 수 있지만, 기본 동작 필수 조건은 아니다.
## JSON 형식
기본 형태:

```text
@avatar {"mouth":"smile-open","eyes":"left_wink","duration":1.2}
```

지원 필드:

| field | type | 설명 |
| --- | --- | --- |
| `normal` | boolean | `true`면 양쪽 눈 open + mouth rest frame을 만든다. `duration` 생략 시 2.5초 기본 쉼표로 쓴다. |
| `mouth` | string | 단일 입 모양 viseme을 지정한다. |
| `mouth_sequence` | string array | 여러 입 모양을 순서대로 재생한다. |
| `eyes` | string | 기존 눈 overlay preset을 지정한다. |
| `left_eye` | string | 왼쪽 눈 상태를 `open`/`closed`로 지정한다. |
| `right_eye` | string | 오른쪽 눈 상태를 `open`/`closed`로 지정한다. |
| `duration` | number | 해당 frame 또는 sequence 전체 재생 시간(초). 생략하면 10초. |
| `loop` | boolean | 단독 control object에서만 사용한다. `{"loop":false}`는 batch/현재 반복을 끈다. |
| `sticky` | boolean | `true`면 다음 assist 메시지에서도 avatar 상태를 자동 clear하지 않는다. `false`면 유지 모드를 해제한다. |
| `reset` | boolean | queue, active frame, loop frame을 모두 비운다. sticky도 해제한다. |
| `clear` | boolean | `reset`과 같다. |

## 반복과 reset / sticky
- frame batch 반복은 기본으로 켜진다.
- `loop`는 mouth/eyes frame 옵션이 아니라 standalone control object로만 사용한다.
- `@avatar {"loop":false}` 단독 줄은 해당 batch 또는 현재 반복을 끈다.
- 팁: `loop:false`는 표정이 한 번만 살짝 지나가고 끝나므로, 기본 표정/분위기를 유지하려면 되도록 쓰지 않는다. 짧은 1회성 연출이 필요할 때만 사용한다.
- `@avatar {"loop":true}` 단독 줄은 해당 batch 반복을 명시적으로 켠다.
- sticky mode는 다음 assist 메시지가 avatar command를 포함하지 않아도 현재 avatar 상태를 자동 clear하지 않게 한다.
- `@avatar {"sticky":true}`는 유지 모드를 켠다.
- `@avatar {"sticky":false}`는 유지 모드만 해제한다. 현재 표정을 즉시 지우려면 `clear:true` 또는 `reset:true`를 사용한다.
- frame object에 `sticky:true`를 함께 넣으면 해당 표정을 적용하면서 유지 모드도 켠다.
- `mouth`, `eyes`, `mouth_sequence`와 `loop`를 같은 JSON object에 섞어 쓰지 않는다.
- `{"reset":true}` 또는 `{"clear":true}`는 queue, active frame, loop frame을 모두 비우고 sticky도 해제한다.
- reset/clear object는 frame을 만들지 않는다.

예:

```text
@avatar {"mouth_sequence":["a","a-soft","e","i","o","u","m","smile-rest","rest"],"duration":2}
```

한 번만 재생할 때:

```text
@avatar {"loop":false}
@avatar {"mouth_sequence":["a","a-soft","e","i","o","u","m","smile-rest","rest"],"duration":2}
```

반복/유지 모드를 제어할 때:

```text
@avatar {"loop":false}
@avatar {"sticky":true}
@avatar {"sticky":false}
@avatar {"reset":true}
@avatar {"clear":true}
```

## normal
기본 표정으로 잠깐 돌아가는 frame을 만든다. `normal:true`는 양쪽 눈을 open 상태로 두고 mouth를 `rest`로 지정한다. `duration`을 생략하면 2.5초 기본 쉼표로 재생되고, 더 짧거나 길게 쉬고 싶으면 `duration`을 명시한다.

```text
@avatar {"normal":true}
@avatar {"normal":true,"duration":1.5}
```

표정 사이에 넣는 예:

```text
@avatar {"left_eye":"closed","right_eye":"open","mouth":"smile-open","duration":1.0}
@avatar {"normal":true}
@avatar {"normal":true,"duration":1.5}
@avatar {"left_eye":"open","right_eye":"closed","mouth":"smile-open","duration":1.0}
```

## mouth
단일 입 모양 overlay를 지정한다.

```text
@avatar {"mouth":"a","duration":0.5}
@avatar {"mouth":"smile-open","duration":2}
```

지원 mouth viseme:

```text
rest
a
a-soft
e
i
o
u
m
smile-rest
smile-open
```

## mouth_sequence
여러 입 모양을 순서대로 재생한다. `duration`은 sequence 전체 시간이며, 내부적으로 항목 수로 나누어 각 frame duration으로 사용한다.

```text
@avatar {"mouth_sequence":["a","a-soft","e","i","o","u","m","smile-rest","smile-open","rest"],"duration":3}
```

## eyes
눈 overlay를 지정한다.

기존 preset `eyes` 값은 계속 지원한다.

```text
@avatar {"eyes":"closed","duration":0.25}
@avatar {"eyes":"left_wink","duration":0.5}
@avatar {"eyes":"right_wink","duration":0.5}
```

좌우 눈을 각각 지정할 때는 `left_eye`, `right_eye`를 사용한다. 값은 `open` 또는 `closed`다. `open`은 해당 눈에 closed overlay를 그리지 않는 상태이고, `closed`는 해당 눈만 감긴 overlay를 그린다.

```text
@avatar {"left_eye":"closed","right_eye":"open","duration":0.5}
@avatar {"left_eye":"open","right_eye":"closed","duration":0.5}
@avatar {"left_eye":"closed","right_eye":"closed","mouth":"a","duration":0.2}
@avatar {"left_eye":"open","right_eye":"open","mouth":"a","duration":0.2}
@avatar {"left_eye":"closed","right_eye":"open","sticky":true,"duration":1.0}
```

지원 eye state와 alias:

```text
closed, close
left_wink, wink_left
right_wink, wink_right
```

## mouth와 eyes 동시 지정
JSON 형식에서는 한 frame에서 입과 눈 overlay를 동시에 지정할 수 있다.

```text
@avatar {"mouth":"smile-open","eyes":"left_wink","duration":1}
```

`mouth_sequence`와 `eyes`를 함께 쓰면 eyes overlay는 sequence의 첫 frame에만 적용된다. 윙크를 짧은 accent처럼 쓰기 위한 동작이다.

```text
@avatar {"mouth_sequence":["a","a-soft","e","i","o","u","m","smile-rest","rest"],"eyes":"closed","duration":2}
```

## batch 예시
여러 frame을 순서대로 재생한다. 기본으로 반복되며, 한 번만 재생하려면 loop-only 줄을 batch에 포함한다.

```text
@avatar {"mouth":"a","duration":0.2}
@avatar {"mouth":"e","duration":0.2}
@avatar {"loop":false}
@avatar {"mouth":"smile-open","eyes":"left_wink","duration":0.5}
```

반복 idle animation 예시:

```text
@avatar {"mouth_sequence":["smile-rest","smile-open","smile-rest"],"eyes":"left_wink","duration":2}
```

## 구현 위치
- 명령 파싱/반복 runtime: `src/rchat_avatar_command.rs`
- user 입력 경로: `src/rchat.rs`의 chat input 처리
- assistant 답변 경로: assistant 메시지가 `@avatar` 명령-only이면 `handle_assistant_rdos()` 전에 avatar command runtime으로 처리한다.
- avatar asset/axis 기준: `guides/avatar_assets.md`


## preset recipe 예시

현재는 `preset` 필드를 직접 지원하지 않는다. 대신 여러 `@avatar` frame을 조합하면 preset처럼 재사용할 수 있다.
아래 예시는 그대로 복사해서 한 번의 메시지로 보내는 것을 기준으로 한다.

### surprised

양쪽 눈을 짧게 깜빡이고 입을 `o`/`a`로 벌려 놀란 느낌을 만든다.

```text
@avatar {"sticky":true}
@avatar {"left_eye":"closed","right_eye":"closed","mouth":"rest","duration":0.08}
@avatar {"left_eye":"open","right_eye":"open","mouth":"o","duration":0.45}
@avatar {"mouth":"a","duration":0.18}
@avatar {"mouth":"o","duration":0.25}
@avatar {"mouth":"rest","duration":0.4}
```

### happy laugh

양쪽 눈을 감고 `smile-open`/`a`를 섞어 밝게 웃는 느낌을 만든다.

```text
@avatar {"sticky":true}
@avatar {"left_eye":"closed","right_eye":"closed","mouth":"smile-open","duration":0.35}
@avatar {"left_eye":"open","right_eye":"open","mouth":"a","duration":0.25}
@avatar {"mouth":"smile-open","duration":0.35}
@avatar {"mouth":"rest","duration":0.25}
```

### wink smile

한쪽 눈을 감고 웃는 입 모양을 유지해 장난스러운 느낌을 만든다.

### kiss wink

한쪽 눈을 감고 `o`/`u`를 1초 이상 번갈아 반복해 윙크 뽀뽀 느낌을 만든다.

```text
@avatar {"sticky":true}
@avatar {"left_eye":"closed","right_eye":"open","mouth":"o","duration":1.0}
@avatar {"left_eye":"closed","right_eye":"open","mouth":"u","duration":1.0}
@avatar {"left_eye":"open","right_eye":"open","mouth":"smile-rest","duration":0.5}
@avatar {"left_eye":"closed","right_eye":"open","mouth":"o","duration":1.0}
@avatar {"left_eye":"closed","right_eye":"open","mouth":"u","duration":1.0}
@avatar {"left_eye":"open","right_eye":"open","mouth":"smile-open","duration":0.7}
@avatar {"left_eye":"closed","right_eye":"open","mouth":"o","duration":1.0}
@avatar {"left_eye":"closed","right_eye":"open","mouth":"u","duration":1.0}
@avatar {"normal":true,"duration":1.0}
```
```text
@avatar {"sticky":true}
@avatar {"left_eye":"closed","right_eye":"open","mouth":"smile-open","duration":0.5}
@avatar {"left_eye":"open","right_eye":"open","mouth":"a","duration":0.25}
@avatar {"mouth":"smile-open","duration":0.35}
```

### calm smile

입만 부드럽게 웃는 모양으로 반복해 차분한 미소 느낌을 만든다.

```text
@avatar {"sticky":true}
@avatar {"mouth":"smile-rest","duration":0.6}
@avatar {"mouth":"smile-open","duration":0.35}
@avatar {"mouth":"smile-rest","duration":0.6}
```

recipe 반복을 멈추고 원래 상태로 돌릴 때는 다음을 사용한다.

```text
@avatar {"clear":true}
```



참고: `@avatar {"normal":true}`에서 `duration`을 생략하면 2.5초 기본 쉼표로 재생된다.
