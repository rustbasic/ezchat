# rdos_server

`rdos_server`는 native 쪽 R-DOS serve를 시작, 상태 확인, 중지할 때 사용하는 제어 명령이다.
wasm 환경에서 `@rdos_server`로 native R-DOS 기능을 호출하려면, 먼저 native ezChat에서 R-DOS serve가 실행 중이어야 한다.

## 실행 예시

```text
@rdos {"cmd":"rdos_server start"}
@rdos {"cmd":"rdos_server status"}
@rdos {"cmd":"rdos_server stop"}
```

## 명령

- `start`: native R-DOS serve를 시작한다.
- `status`: 현재 serve 실행 상태를 확인한다.
- `stop`: 실행 중인 serve를 중지한다.

## wasm에서 사용할 때

wasm 환경의 `@rdos_server {"cmd":"..."}` 호출은 native serve가 켜져 있을 때만 동작한다.
native serve가 꺼져 있으면 wasm 쪽 호출은 native R-DOS 기능을 실행할 수 없다.

`@rdos_server`는 자주 쓰는 대부분의 `@rdos` 내부 명령을 같은 JSON 형태로 native 쪽에 전달해 실행할 수 있다.
다만 허용되는 명령은 native serve 쪽 안전 목록을 통과해야 하며, 위험하거나 아직 serve 경로에 연결되지 않은 명령은 제외될 수 있다.
일반 작업에는 `console`, `cmd_child`, `rtype`, `rfindtext`, `rfindfile`, `rwrite`, `rreplace`, `rdelete`, `rinsert`, `rcopy`, `rcut`, `rpaste` 같은 내부 명령을 우선 사용한다.

## `@rdos_server` 사용 예시

```text
@rdos_server {"cmd":"rtype","file":"src\\main.rs","from":1,"count":20}
@rdos_server {"cmd":"rfindtext","file":"src","text":"fn main"}
@rdos_server {"cmd":"rwrite","file":"tmp.txt","content":["hello"],"overwrite":true}
@rdos_server {"cmd":"rreplace","file":"tmp.txt","line":1,"old":["hello"],"new":["hello from server"]}
@rdos_server {"cmd":"rcopy","file":"tmp.txt","line":1,"count":1}
@rdos_server {"cmd":"rpaste","file":"tmp.txt","line":1,"position":"after"}
@rdos_server {"cmd":"cmd_child","action":"list"}
```

`rcopy`, `rcut`, `rpaste`는 브라우저 clipboard가 아니라 native ezChat/R-DOS 내부 clipboard를 기준으로 동작한다.

## 관련 문서

- 기본 R-DOS 사용법: `guides/rdos.md`
- 이미지 관련 R-DOS 명령: `guides/rimage.md`