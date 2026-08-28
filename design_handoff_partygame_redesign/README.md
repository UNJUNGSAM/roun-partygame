# Handoff: 로운네 파티게임 — 디자인 개선

## Overview

기존 파티게임 웹앱(바닐라 HTML/CSS/JS, `index.html` + `styles.css` + `questions.js` + `characters.js`)의 UI를 전면 정리합니다.

문제로 지목된 것: **3D 입체 버튼/그림자, 무지개 그라데이션 카드, 직접 그린 SVG 아이콘·동물 아바타, 뒤죽박죽 타이포, 산만한 게임 플레이 화면.**

작업은 두 단계로 나뉩니다. **Phase 1은 CSS만 바꾸면 끝나고(로직 무변경), Phase 2는 화면 구조와 JS 흐름을 바꿉니다.** Phase 1만 적용해도 완결된 결과가 나오므로 반드시 Phase 1 → 확인 → Phase 2 순서로 진행하세요.

## About the Design Files

이 번들의 `파티게임 리디자인 시안.dc.html` 은 **디자인 레퍼런스(HTML로 만든 시안)** 입니다. 제품 코드로 그대로 복사해 쓰는 파일이 아닙니다. 이 파일은 여러 화면을 한 캔버스에 나란히 늘어놓은 **보드**이고, 각 화면은 고정 크기(390×800 / 1120×630) 프레임 안에 그려진 정적 목업입니다.

구현 대상은 기존 코드베이스 **바닐라 HTML/CSS/JS** 입니다. 프레임워크를 도입하지 마세요. 기존 `styles.css`의 CSS 변수 체계와 `index.html`의 화면 전환 방식(`showScreen()` + `.screen.active`)을 그대로 유지한 채 값과 마크업만 교체합니다.

시안 파일을 브라우저에서 열어 실제 렌더를 눈으로 확인하고 작업하세요. (시안은 `_ds/` 폴더의 스타일시트를 참조하지만, 구현에는 필요 없습니다 — 아래 Design Tokens 표에 모든 값이 있습니다.)

## Fidelity

**High-fidelity.** 색·폰트·크기·간격·라운드 값이 모두 확정값입니다. 아래 표의 hex와 px를 그대로 쓰세요. 단, 시안은 정적 목업이라 **hover/active/포커스 상태와 애니메이션은 이 문서의 서술을 따르세요.**

시안에 없는 화면(점수 관리 모달, 초기화 확인 모달, 이어서 말해요의 룰렛/슬롯 연출 등)은 **같은 규칙을 적용해 유추 구현**합니다: 크림 면 + 알약 버튼 + 라인 아이콘 + 그림자 1종.

---

# Design Tokens

기존 `styles.css`의 `:root` / `body[data-mode=...]` 블록을 아래로 **교체**합니다. 변수 이름은 기존 것을 최대한 유지했으므로 대부분의 컴포넌트 CSS는 자동으로 새 톤을 따라갑니다.

## Color — 공통 (ground / ink / line)

| 역할 | 값 | 용도 |
|---|---|---|
| `--bg` | `#f5ead8` | 앱 배경 (파티 모드). **그라데이션 아님, 단색** |
| `--bg` (워크샵) | `#f9f4ed` | 앱 배경 (워크샵 모드). 한 톤 밝은 오프화이트 |
| `--panel` | `#fffdf6` | 카드·패널·입력 면 |
| `--panel-soft` | `#ebddc5` | 한 단계 눌린 면 (패스 버튼, start 블록, 힌트 박스) |
| `--ink-900` | `#201e1d` | 본문/제목 잉크 |
| `--ink-700` | `#474238` | 보조 텍스트 |
| `--ink-500` | `#82796a` | 라벨·캡션 |
| `--ink-400` | `#a19786` | 아이콘 비활성, 단위(`초`, `SEC`) |
| `--ink-300` | `#c0b6a5` | 강한 테두리, chevron |
| `--line` | `#dcd3c4` | 기본 1px 테두리 |
| `--line-soft` | `#e1d6c0` | 구분선, 진행 바 트랙 |
| `--track` | `#e1d6c0` | 타이머/점수 막대 트랙 |

## Color — accent

| 역할 | 값 |
|---|---|
| `--accent` (파티 primary) | `#c67139` |
| `--accent-press` | `#b2622d` (누른 상태) |
| `--accent-text` | `#8c491a` (크림 위 작은 글씨의 강조색 — 대비 확보용, `#c67139`을 본문 크기에 쓰지 말 것) |
| `--accent-tint` | `#fff2eb` (아이콘 타일 배경) |
| `--accent-2` (성공/세이지) | `#728157` |
| `--accent-2-press` | `#56633f` |
| `--accent-2-tint` | `#f0fae1` |
| 워크샵 모드 primary | `#56633f` (세이지) / press `#3d472b` / tint `#f0fae1` |

**워크샵 모드는 다크가 아니라 밝은 화면입니다.** 파티 모드와의 차이는 배경 한 톤(`#f5ead8` → `#f9f4ed`)과 강조색(테라코타 → 세이지)뿐입니다. 기존의 비비드 블루(`#4285FF`) 배경은 전부 제거하세요. `applyMode()`의 `theme-color` 메타값도 `party: #f5ead8`, `workshop: #f9f4ed` 로 변경.

## Color — 게임별 아이덴티티 (그라데이션 → 단색 + 틴트)

5색 모두 같은 명도 단계라 나란히 놓아도 튀지 않습니다. `--grad-speed` 같은 그라데이션 변수는 **전부 삭제**하고 아래 쌍으로 대체하세요.

| 게임 | 단색 (`--game-*`) | 틴트 배경 (`--game-*-tint`) | 틴트 위 아이콘 색 |
|---|---|---|---|
| speed (스피드) | `#c67139` | `#fff2eb` | `#b2622d` |
| body (몸으로) | `#728157` | `#f0fae1` | `#56633f` |
| chosung (초성) | `#5b7d8c` | `#e9f1f3` | `#3f5b67` |
| relay (이어서) | `#8a6a86` | `#f5ecf3` | `#6b4f67` |
| fourLetter (네 글자) | `#b8952f` | `#fbf2d9` | `#8a6d17` |

사용 규칙: **게임 색은 (1) 카드 왼쪽 5px 스트라이프, (2) 아이콘 타일 배경(틴트)+아이콘(딥), (3) 인게임 상단 게임명 배지 채움 — 이 세 곳에만.** 카드 본체는 항상 `--panel` 크림입니다.

## Color — 팀 색 (아바타 대체)

동물 아바타를 없애고 **팀 색 원형 + 이니셜 모노그램(A~J)** 을 씁니다. 팀 인덱스 순서로 배정:

```
['#c67139','#728157','#5b7d8c','#8a6a86','#b8952f','#645c50','#8c491a','#56633f','#3f5b67','#6b4f67']
```

글자는 항상 `#ffffff`, `Outfit 800`, 원 지름의 0.42배 크기.

## Typography

| 역할 | 폰트 | 크기·굵기 |
|---|---|---|
| 제시어 (인게임) | `GmarketSans 700` | 무대: `clamp(72px, 14vw, 184px)` / 폰: `clamp(56px, 13vw, 120px)`. `letter-spacing:-0.04em`, `line-height:1`, `word-break:keep-all` |
| 초성 제시어 | `GmarketSans 700` | 무대 `132px`, `letter-spacing:0.08em`, 색 `--ink-900` (초록·컬러 금지) |
| 화면 제목 | `GmarketSans 700` | 폰 `27~38px` / `line-height:1.2` |
| 카드 제목 | `GmarketSans 700` | `19~23px` |
| 버튼 (한글) | `GmarketSans 700` | 큰 버튼 `28~34px`, 일반 `17~21px` |
| 본문·라벨 | `Pretendard 400/600/700/800` | `12.5 / 13 / 14 / 15.5 / 16px` |
| 숫자·점수·타이머 | `Outfit 800`, `font-variant-numeric: tabular-nums` | 타이머 `52~78px`, 점수 `26~64px`, 배지 `15px` |
| 오버라인(영문 라벨) | `Outfit 700` | `11~13px`, `letter-spacing:0.20~0.24em`, `uppercase`, 색 `--accent-text` 또는 `--ink-400` |

폰트 로딩은 기존과 동일(GmarketSans woff CDN, Pretendard CDN, Outfit Google Fonts). 추가 폰트 없음.

**버튼 라벨은 한글로 통일합니다.** `PASS` → **패스**, 그 외 성공/정답/실패/정지는 기존 한글 유지. 키보드 안내도 `← 패스 / → 성공 / Esc 정지`.

## Radius · Shadow · Spacing

| 토큰 | 값 |
|---|---|
| `--radius-sm` | `12px` (아이콘 타일 소) |
| `--radius-md` | `16px` (아이콘 타일, 힌트 박스) |
| `--radius-lg` | `22~26px` (카드) |
| `--radius-xl` | `28~32px` (패널, 모달) |
| 버튼·입력·칩·배지 | `999px` (전부 알약) |
| `--shadow-card` | `0 3px 10px rgba(46,43,37,0.08)` |
| `--shadow-modal` | `0 12px 32px rgba(46,43,37,0.30)` |

**그림자는 이 두 개만 존재합니다.** `.btn-3d`의 `0 5px 0 ...` 입체 그림자, `--shadow-pop`, 카드 hover 그림자 확대, 아바타 그림자는 전부 삭제.

간격은 8의 배수 기준: `6 / 8 / 10 / 14 / 18 / 20 / 26 / 32px`.

---

# Phase 1 — 스타일 정리 (CSS 중심, 로직 무변경)

시안 보드의 **Turn 1 섹션(`#1a` / `#1b` / `#1c`)** 이 이 단계의 결과물입니다. 화면 구성·JS·화면 전환 흐름은 손대지 않습니다.

## 1-1. `styles.css` 토큰 교체

1. `:root`, `body[data-mode="party"]`, `body[data-mode="workshop"]` 의 색 변수를 위 Design Tokens 표로 교체.
2. `--grad-*` 변수 전부 삭제. 참조하던 곳(`.btn-primary`, `.game-card--*`, `.mode-card--*`, `.game-score-tile`, `.badge-game`, `.quiz-answer`, `.timer-progress-fill`)을 단색으로 변경.
3. `body::before`의 캔디 블롭 4개 radial-gradient **삭제** (배경은 단색 크림).
4. `body`의 `background: var(--bg)` 는 단색이므로 `background-attachment: fixed` 불필요.

## 1-2. 컴포넌트별 변경

**`.btn-3d`** — 클래스 자체를 없애도 되고, 유지하되 아래로 바꿔도 됩니다.
```css
border-radius: 999px;
box-shadow: none;
transition: background-color .12s;
```
`:active`는 `transform: translateY(4px)` 대신 **배경색만** 한 단계 짙게(`--accent-press` / `--accent-2-press`). `:hover`는 같은 press 색을 8% 섞은 톤. `:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }` 를 모든 인터랙티브 요소에 추가(현재 없음).

버튼 변형: `주요 동작` = accent 채움 / `성공·정답` = accent-2 채움 / `패스` = `--panel-soft` + 1px `--line` + `--ink-700` 글씨 / `보조` = 투명 + 1px `--ink-300` + `--accent-text` 글씨 / `실패·초기화` = accent 채움에 `--accent-press` 테두리(별도 빨강 도입 금지, 위험은 문구로 전달).

**`.mode-card`** (모드 선택) — 그라데이션 풀블리드 → `--panel` 크림 카드 + 1px `--line` + `--radius-xl`. 왼쪽에 `64×64` `--radius-md` 아이콘 타일(파티=accent-tint/`#b2622d`, 워크샵=accent-2-tint/`#56633f`). 내부 텍스트 색은 `--ink-*`. `.mode-card::after` 광택 그라데이션 삭제.

**`.game-card`** (게임 목록) — 그라데이션 → 크림 카드 + **왼쪽 `border-left: 5px solid var(--game-*)`** + `50×50` `--radius-md` 틴트 아이콘 타일 + 오른쪽 chevron(`--ink-300`). 카드 높이는 `min-height` 제거하고 `padding:16px 18px`로. `::after` 광택 삭제. hover는 `translateY(-4px)` 대신 테두리 색만 `--ink-300`으로.

**`.avatar` / `characters.js`** — `avatarHtml()`를 이니셜 모노그램 렌더로 교체:
```js
function avatarHtml(teamIndex, cls) { /* 원형 div + 팀 색 배경 + String.fromCharCode(65+teamIndex) */ }
```
`characters.js`의 `svg` 필드는 더 이상 렌더하지 않습니다(파일은 남겨도 됨). **`names` 풀은 반드시 유지** — 동물 그림은 없애지만 `불꽃 여우팀 / 느긋한 판다팀` 추천 이름이 재미를 담당합니다. `injectCharSymbols()` 호출 제거.

**`.score-chip`** (헤더 점수판) — 크림 알약 + 모노그램(26px) + `Outfit 800 15px` 점수. 비활성 `opacity:.7`, 활성은 `opacity:1` + `1.5px solid var(--accent)`. `transform: scale(1.04)` 제거.

**`.chip` / `.selector-row`** — 선택 안 된 칩: `--panel` + 1px `--line` + `--ink-700`. 선택된 칩: **`--ink-900` 채움 + `--bg` 글씨**(주제·시간 등 중립 선택), 팀 선택 칩만 `--accent` 채움. 그라데이션 제거.

**시간 선택** — `<select id="timer-select">` 를 세그먼트 컨트롤(3분할 알약, 선택=`--ink-900` 채움)로 교체. `.form-select` 자체는 팀 수 선택에만 남깁니다.

**`.quiz-card` (인게임 중앙)** — 흰 카드 박스를 **없애고** 제시어를 배경 위에 직접 올립니다. `game-stage`가 배경 크림, 제시어는 `--ink-900`.

**`.timer`** — `Outfit 800`, `78px`(무대) / `52px`(폰), 색 `--ink-900`. 위험 상태(≤10초)는 `--accent` 색 + `opacity` 펄스(`scale` 펄스 금지 — 숫자가 흔들려 읽기 어려움).

**`.timer-progress`** — 높이 `4px` → `6px`, 트랙 `--line-soft`, 채움 단색 `--accent`(워크샵은 `#56633f`). 그라데이션 제거.

**`.quiz-answer`** (정답 노출 배지) — accent 채움 알약 유지, 그림자는 `--shadow-card` 하나만.

**`.hint-btn` / `.hint-text`** — 알약 + 1px `--accent-2`(`#728157`) 테두리 + `#56633f` 글씨. 힌트 본문은 `--panel-soft` 면 + `--radius-md`, 글씨 `--ink-700` `20px`.

**모달** (`dialog > .modal`) — `--panel` + `--radius-xl(32px)` + `--shadow-modal`, 백드롭 `rgba(46,43,37,0.45)`. 결과 모달: 상단 **모노그램 74px** → 상태 태그(성공=`--accent-2-tint`/`#56633f`, 시간초과=`--accent-tint`/`#8c491a`) → 팀 이름 `GmarketSans 28px` → `--bg` 면 위 획득/총점 2단(획득 `#728157`, 총점 `--ink-900`, `Outfit 800 38px`) → accent 알약 버튼 + ghost 버튼. 트로피/시계 일러스트 심볼 제거.

**`.game-score-tile`** (배점 설정 모달) — `--grad-*` 배경 → `36×36` `--radius-sm` 틴트 타일 + 딥 아이콘. 숫자 입력은 `74×42` 알약(`Outfit 800 17px`, 배경 `#f9f4ed`).

## 1-3. 아이콘 교체

`index.html` 상단 `<svg><defs>` 의 심볼 중 **컬러 삽화형(`i-mode-*`, `i-game-*`, `i-result-*`, `i-pick-big`)을 전부 삭제**하고, Lucide 아이콘(https://lucide.dev)의 단색 라인 버전으로 대체합니다. `stroke-width: 2.75`, `stroke-linecap/linejoin: round`, `fill: none`, 색은 `currentColor`.

| 용도 | Lucide 이름 |
|---|---|
| 로고 | `tent` |
| 파티 모드 | `party-popper` |
| 워크샵 모드 | `users` |
| 스피드 | `zap` |
| 몸으로 | `person-standing` |
| 초성 | `languages` |
| 이어서 | `messages-square` |
| 네 글자 | `layout-grid` |
| 설정 | `settings-2` |
| 뒤로 | `arrow-left` |
| 다음/chevron | `chevron-right` / `chevron-down` |
| 다시 뽑기 | `refresh-cw` (전체) / `dices` (개별) |
| 힌트 | `lightbulb` |
| 성공 | `check` |
| 패스 | `chevrons-right` |
| 정지 | `pause` (사각 2개) |
| 점수 관리 | `trophy` |
| 배점 | `target` |
| 팀 설정 | `users` |
| 순위 상승/하락 | `chevron-up` / `chevron-down` |

시안 파일에 위 아이콘들의 실제 path가 이미 들어 있으니 그대로 복사해 심볼로 등록하면 됩니다.

## 1-4. 사운드·이펙트

`FX_COLORS`(confetti 팔레트)를 새 팔레트로 교체:
```js
const FX_COLORS = ['#c67139','#728157','#b8952f','#5b7d8c','#fffdf6'];
```
Tone.js 사운드 엔진, 햅틱, 키보드 단축키 로직은 **변경하지 않습니다.**

---

# Phase 2 — 게임 흐름 재구성 (구조 + JS)

시안 보드의 **Turn 2 섹션(`#2a` / `#2b` / `#2c`)** 이 이 단계의 결과물입니다. Phase 1이 끝난 뒤 진행하세요.

## 2-1. 로비 화면 — 4화면을 1화면으로 (`#2a`)

`screen-mode` + `screen-setup` + `screen-menu` + `screen-pregame` 네 개를 **`screen-lobby` 하나로 통합**합니다. 기존 화면 요소는 삭제하지 말고 새 화면을 추가한 뒤 라우팅을 바꾸는 편이 안전합니다.

레이아웃 (위→아래, 폰 390px 기준 / 태블릿은 2단):
1. **헤더 행** — 로고 34px + **모드 세그먼트(파티/워크샵)** + 설정 아이콘. `setMode()`는 이 토글에 연결하고 화면 전환은 하지 않습니다(`applyMode()`만 호출).
2. **참가 팀** — 모노그램 `54px` 원 + 이름 2줄(`12.5px`)을 가로로 나열, 마지막에 `2px dashed #c0b6a5` 원 + `plus` 아이콘 = **팀 추가**. 원을 탭하면 인라인 이름 편집, 길게 누르면 색·이름 재추첨(`rerollAllTeams()` 재사용). `team-count-select`는 제거하고 추가/삭제로 대체(2~10팀 범위 유지).
3. **구분선** `1px #e1d6c0`
4. **게임** — 가로 스크롤 카루셀(`overflow-x:auto`, `scroll-snap-type:x mandatory`). 선택된 카드는 `150×auto` 게임 단색 채움 + 흰 글씨, 나머지는 `104px` 크림 카드 + 틴트 아이콘 타일. `prepareGame()` 대신 선택 상태만 갱신.
5. **주제 / 시간** — 각각 한 줄. 왼쪽 `46px` 라벨 + 알약 칩 행 / 3분할 세그먼트. 게임 종류에 따라 이 줄만 교체(초성=주제만, 이어서=난이도, 네 글자=목표 개수).
6. **하단 고정 시작 버튼** — `64px` accent 알약, 라벨은 **다음 차례 팀 이름을 포함**: `[A] 불꽃 여우팀 시작`. 그 아래 `13px` 순서 안내 `순서 A → B → C → D · 한 바퀴 4라운드`.

필요한 상태: `lobby = { mode, teams[], selectedGame, category, timer, difficulty, targetCount, turnIndex }`. `turnIndex`는 라운드마다 +1(모듈로 팀 수)로 다음 차례 팀을 자동 결정 — 기존의 매 라운드 "도전 팀 선택" 단계를 없애는 핵심입니다. 사회자가 순서를 바꾸고 싶으면 팀 모노그램을 탭해 수동 지정(현재 차례 팀에 `2px solid var(--accent)` 링).

`localStorage` 저장 키는 스키마가 바뀌므로 `partygame_v28` 로 올리고, 구버전 키는 무시(마이그레이션 불필요, README에 초기화 안내 있음).

## 2-2. 차례 넘김 전면 카드 (`#2a` 오른쪽)

라운드 시작 직전 `screen-handoff` 를 삽입합니다. **배경 = 다음 팀 색 전면 채움**, 콘텐츠 전부 `#fffdf6`:
- 오버라인 `Outfit 700 14px / 0.28em` — `ROUND 6 · NEXT UP`
- 모노그램 `150px` 원 (배경 `#fffdf6`, 글자는 팀 색)
- 팀 이름 `GmarketSans 700 56px`
- 반투명 알약 2개(`rgba(255,253,246,0.18)`) — 게임·주제 / 현재 순위·점수
- `118px` 원형 카운트다운 (`6px solid rgba(255,253,246,0.35)`, 숫자 `Outfit 800 58px`) — 3 → 2 → 1, 각 1초, 기존 카운트다운 톤 상승 사운드 재사용
- `준비되면 화면을 눌러 시작` — 화면 아무 곳이나 탭하면 카운트다운 스킵하고 즉시 시작

애니메이션: 진입 `opacity 0→1 + scale .96→1`, `280ms cubic-bezier(.2,.8,.2,1)`. 카운트 숫자는 매 초 `scale 1.25→1` `220ms`.

## 2-3. 무대 플레이 화면 (`#2b`)

`screen-game`을 좌우 2단으로 재구성합니다.

**오른쪽 시간 기둥 (`width:132px`)** — 위에서부터 `Outfit 800 52px` 남은 초, `Outfit 700 13px/0.2em` `SEC` 라벨, 그 아래 `36px` 폭 알약 트랙(`--track`)이 세로로 남고 **아래에서 위로 채워진 채움 막대**(`--accent`)가 줄어듭니다. `height: %` 를 `transition: height 1s linear` 로 갱신. 남은 시간 ≤10초에 채움색을 `#b2622d`로, ≤5초에 `opacity` 펄스(0.6↔1, 500ms).

**왼쪽 본문**
- 상단 행: 팀 배지(모노그램+이름, accent 채움) + `15px` `게임명 · 주제` 텍스트 + 오른쪽 `Outfit 800 26px` 현재 점수 + `점 · 2위`
- 중앙: 콤보 배지(`--accent-2-tint` 알약, `3연속 성공`, 2연속부터 등장) + **제시어 `184px`**
- 하단 눈금: 라운드 문제 수만큼 `flex:1` `height:12px` `999px` 막대를 `gap:5px`로 나열. 성공=`#728157`, 패스=`#c0b6a5`, 현재=`#c67139`, 미출제=`#e1d6c0`. `ROUND_CAP`(speed 30 / body 25 / chosung 12)이 그대로 눈금 개수가 됩니다. 기존 `#ingame-progress` "12 / 30" 배지는 제거.
- 버튼 행: `패스` `230×92` (`--panel-soft`) + `성공` `flex:1 height:92` (`--accent-2`) + `정지` `92×92` 아이콘 전용(테두리만). **성공이 화면 폭의 절반 이상**을 차지해 오탭을 줄입니다.

정답 노출(몸으로/초성)은 제시어 아래 accent 알약으로 `answerIn` 애니메이션 유지.

**반응형** — 폰 세로에서는 시간 기둥을 상단 가로 바 `6px`로 되돌리고 숫자를 좌우 배치, 제시어 `clamp(56px,13vw,120px)`, 버튼 높이 `72px`.

## 2-4. 라운드 결과 = 순위표 (`#2c`)

`modal-result`를 **전체 화면 순위 화면(`screen-standings`)** 으로 교체합니다.
- 상단 좌: 오버라인 `ROUND 5 결과` + `GmarketSans 700 38px` 한 문장 — `불꽃 여우팀, 1위로 올라섰습니다` (순위 변동 없으면 `1위를 지켰습니다` / 하락 시 `2위로 내려갔습니다`)
- 상단 우: `Outfit 800 64px` `+42` (`#728157`) + `21문제 성공 · 콤보 3`
- 팀별 레인 (팀 수만큼): `Outfit 800 26px` 순위 · 모노그램 `46px` · 이름 `GmarketSans 22px/190px` · 순위변동 태그(상승=`--accent-2-tint`+`chevron-up`, 하락=`--accent-tint`+`chevron-down`, 무변동=빈 `96px` 자리) · `20px` 점수 막대(1위=100%, 나머지는 비율) · `Outfit 800 30px` 점수. **방금 플레이한 팀 레인만 `2px solid var(--accent)` + `--shadow-card`.**
- 하단: `74px` accent 알약 `[B] 느긋한 판다팀 차례` (→ 2-2 핸드오프로) + `240px` ghost `로비로`

애니메이션(각 300ms, stagger 60ms): 점수 막대 width 트윈 → 순위 변동 시 레인 y 위치 스와프(`transform: translateY` + `transition`) → `+42` 카운트업. confetti는 **1위가 바뀔 때만** 발사(현재는 매 라운드 발사 — 과합니다).

## 2-5. 손대지 않는 것

`questions.js` 데이터 구조, `tools/validate.js`, `ROUND_CAP`/`keyOf`/`shuffle` 출제 로직, Tone.js 사운드 엔진, 키보드 단축키, PWA 매니페스트, Netlify 설정.

---

# 구현 순서 (권장)

1. Phase 1-1 토큰 교체 → 브라우저에서 전체 화면 훑기 (색만 바뀌고 깨진 곳 없는지)
2. Phase 1-3 아이콘 교체 (삽화 심볼 삭제 → Lucide 등록)
3. Phase 1-2 컴포넌트 (모드/게임 카드 → 아바타 → 인게임 → 모달)
4. 커밋. 여기까지가 Turn 1 시안.
5. Phase 2-3 무대 플레이 화면 (효과 체감이 가장 큼)
6. Phase 2-1 로비 통합 + `turnIndex` 자동 순서
7. Phase 2-2 핸드오프 + 2-4 순위표
8. 아이폰 노치·홈바 `env(safe-area-inset-*)`, 가로 모드, iPad 2단 레이아웃 회귀 확인

# Files

| 파일 | 내용 |
|---|---|
| `파티게임 리디자인 시안.dc.html` | 디자인 시안 보드. 브라우저로 열면 Turn 2(위) / Turn 1(아래) 순서로 전체 화면이 보입니다 |
| `README.md` | 이 문서 |

시안 보드 내 화면 앵커: `#2a` 로비·핸드오프 / `#2b` 무대 플레이 / `#2c` 순위표 / `#1a` Turn 1 폰 화면 5종 / `#1b` Turn 1 플레이 화면(파티·워크샵) / `#1c` 컴포넌트·컬러·타이포 시트.

# Assets

새로 추가되는 이미지·폰트 없음. 아이콘은 Lucide(ISC 라이선스) SVG path를 인라인 심볼로 복사. 기존 `characters.js`의 동물 SVG는 렌더에서 빠지지만 팀 이름 풀은 계속 사용합니다.
