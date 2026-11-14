// =============================================================
// 로운네 파티게임 — 가족 놀이 '게임 포인트' 애니메이션 엔진
// - 손그림 느낌의 '콩알 가족' 캐릭터(오리지널: 아빠·엄마·아이·딸·할머니·할아버지) + 소품을 SVG로 그리고,
//   10초짜리 장면을 키프레임으로 움직입니다.
// - 장면 대본은 family-scenes.js (놀이 id별). 이 파일은 그림 도구와 재생기만 담당합니다.
// - 외부 라이브러리·영상 파일 없음 → 가볍고 인터넷이 끊겨도 재생됩니다.
// =============================================================
(function () {
    'use strict';
    const NS = 'http://www.w3.org/2000/svg';
    const INK = '#2a2622', CREAM = '#fffdf6', PINK = '#ec9a92', TEAR = '#7fb3d5', PAPER = '#f8f1e2';
    const COL = { terra: '#c67139', sage: '#728157', blue: '#5b7d8c', plum: '#8a6a86', gold: '#b8952f', brown: '#8c491a', gray: '#8b8378', red: '#d9534a' };
    const W = 400, H = 300, FLOOR = 262, DUR = 10, HOLD = 1.4;

    const EASE = {
        lin: t => t,
        io: t => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
        o: t => 1 - (1 - t) * (1 - t),
        i: t => t * t,
        o3: t => 1 - Math.pow(1 - t, 3),
        back: t => { const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
        step: t => (t < 1 ? 0 : 1)
    };
    const st = (w = 2.4) => `stroke="${INK}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
    const P = (d, w = 2.3, fill = 'none') => `<path d="${d}" fill="${fill}" ${st(w)}/>`;
    const dot = (x, y, r = 2.8) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${INK}"/>`;
    // ---------- 콩알 가족 표정 (머리 좌표: 목 = 0,0 / 눈 y -42, 입 y -26) ----------
    const SKIN = '#ffe6cf', HAIR_DARK = '#3a2e2a', HAIR_BROWN = '#7a4a2e', HAIR_GRAY = '#c9c4bd';
    const eyeD = (x, y, k = 1) => `<ellipse cx="${x}" cy="${y}" rx="${3.4 * k}" ry="${4.4 * k}" fill="${INK}"/><circle cx="${x + 1.2 * k}" cy="${y - 1.6 * k}" r="${1.25 * k}" fill="#fff"/>`;
    const blush = `<ellipse cx="-23" cy="-31" rx="6.5" ry="4" fill="${PINK}" opacity=".8"/><ellipse cx="23" cy="-31" rx="6.5" ry="4" fill="${PINK}" opacity=".8"/>`;
    const squeeze = P('M-21 -47 l10 5 l-10 5 M21 -47 l-10 5 l10 5', 2.8);
    const happyEyes = P('M-20 -40 q6 -9 12 0 M8 -40 q6 -9 12 0', 3);
    const closedEyes = P('M-20 -42 q6 5 12 0 M8 -42 q6 5 12 0', 2.6);
    const sweat = `<path d="M33 -62 q-6 8 0 12 q6 -4 0 -12 z" fill="${TEAR}" ${st(1.6)}/>`;
    const FACES = {
        neutral: eyeD(-13, -42) + eyeD(13, -42) + P('M-6 -27 q3 3.5 6 0 q3 3.5 6 0', 2.4) + blush,
        smug: P('M-20 -45 h13 M7 -45 h13', 2.6) + eyeD(-13, -41, 0.7) + eyeD(13, -41, 0.7) + P('M-20 -51 q5 -2 11 -1 M8 -56 q6 -3 12 1 M-7 -26 q8 3 15 -5', 2.4) + blush,
        shock: `<circle cx="-13" cy="-43" r="7.5" fill="#fff" ${st(2.4)}/><circle cx="13" cy="-43" r="7.5" fill="#fff" ${st(2.4)}/>` + dot(-13, -42, 2.6) + dot(13, -42, 2.6)
            + `<ellipse cx="0" cy="-22" rx="4.6" ry="6.6" fill="${INK}"/>` + P('M30 -70 l5 -7 M35 -61 l8 -2', 2.4),
        laugh: happyEyes + `<path d="M-11 -31 h22 q-1 15 -11 15 q-10 0 -11 -15 z" fill="${INK}"/><path d="M-6 -20 q6 -5 12 0 q-6 4 -12 0z" fill="#f07f7f"/>` + blush,
        proud: happyEyes + P('M-10 -29 q10 10 20 0', 2.8) + blush,
        cry: P('M-20 -43 h13 M7 -43 h13', 3.2) + `<path d="M-18 -41 q-3 15 -1 32 h9 q1 -17 -3 -32z M18 -41 q3 15 1 32 h-9 q-1 -17 3 -32z" fill="${TEAR}" opacity=".9"/>`
            + `<path d="M-9 -28 q4 -5 9 0 q5 -5 9 0 q-1 11 -9 11 q-8 0 -9 -11z" fill="${INK}"/>`,
        strain: squeeze + `<rect x="-10" y="-32" width="20" height="10" rx="3" fill="#fff" ${st(2.2)}/>` + P('M-3 -32 v10 M4 -32 v10 M-10 -27 h20', 1.4) + sweat,
        blow: closedEyes + `<circle cx="-21" cy="-28" r="9.5" fill="#ffd2c6" ${st(2.2)}/><circle cx="21" cy="-28" r="9.5" fill="#ffd2c6" ${st(2.2)}/>` + dot(0, -25, 4.2),
        focus: eyeD(-13, -42) + P('M8 -42 q5 -4 10 0 M-21 -52 l10 3 M21 -52 l-10 3 M-7 -27 h10', 2.6) + `<path d="M1 -27 q0 9 5 9 q5 0 5 -9 z" fill="#f07f7f" ${st(2)}/>`,
        closed: closedEyes + P('M-5 -26 q5 2 10 0', 2.4) + blush,
        puzzled: eyeD(-13, -42, 0.8) + eyeD(13, -42, 1.25) + P('M7 -57 q6 -4 12 0 M-8 -26 q4 -4 8 0 q4 4 8 0', 2.4),
        shout: squeeze + `<ellipse cx="0" cy="-21" rx="10" ry="12" fill="${INK}"/><ellipse cx="0" cy="-14" rx="5.5" ry="3.2" fill="#f07f7f"/>`,
        nervous: eyeD(-17, -42, 0.85) + eyeD(9, -42, 0.85) + P('M-21 -51 l10 -3 M21 -51 l-10 -3 M-9 -26 q3 -3 6 0 q3 3 6 0 q3 -3 6 0', 2.4) + sweat,
        back: ''
    };
    // 역할별 머리 모양 (아빠·엄마·아이·딸·할머니·할아버지)
    const HAIR = {
        dad: `<path d="M-37 -58 C-40 -86 -20 -94 0 -94 C22 -94 40 -86 37 -58 q-6 -9 -13 -6 q-4 -10 -12 -4 q-6 -9 -12 0 q-8 -6 -14 2 q-7 -2 -10 8 z" fill="${HAIR_DARK}" ${st(2)}/>`,
        mom: `<path d="M-45 -20 C-52 -70 -30 -98 0 -98 C30 -98 52 -70 45 -20 q-5 -2 -8 -10 C37 -48 30 -60 16 -66 q-14 10 -38 3 q-10 10 -13 20 q-2 14 -2 23 q-4 2 -8 0 z" fill="${HAIR_BROWN}" ${st(2.2)}/>`,
        kid: P('M-1 -88 q-2 -12 5 -17', 2.6) + `<path d="M4 -105 q-13 -5 -13 -14 q13 0 15 10z" fill="#8fbf6a" ${st(2.2)}/><path d="M4 -105 q12 -8 16 -2 q-6 8 -16 2z" fill="#8fbf6a" ${st(2.2)}/>`,
        girl: `<ellipse cx="-42" cy="-70" rx="10" ry="14" fill="#5a3a26" ${st(2.2)}/><ellipse cx="42" cy="-70" rx="10" ry="14" fill="#5a3a26" ${st(2.2)}/>`
            + `<path d="M-36 -64 C-32 -92 32 -92 36 -64 q-8 -8 -16 -4 q-8 -9 -18 -2 q-10 -7 -18 2 q-8 -2 -12 4z" fill="#5a3a26" ${st(2.2)}/>`
            + `<path d="M-38 -84 l-10 -8 v16 z M-38 -84 l10 -8 v16 z" fill="${COL.red}" ${st(1.8)}/><path d="M38 -84 l-10 -8 v16 z M38 -84 l10 -8 v16 z" fill="${COL.red}" ${st(1.8)}/>`,
        grandma: `<circle cx="0" cy="-100" r="13" fill="${HAIR_GRAY}" ${st(2.4)}/><path d="M-38 -56 C-41 -90 -18 -95 0 -95 C20 -95 41 -90 38 -56 q-14 -16 -38 -14 q-24 -2 -38 14 z" fill="${HAIR_GRAY}" ${st(2.2)}/>`
            + `<circle cx="-13" cy="-43" r="10.5" fill="#fff" fill-opacity=".25" ${st(2.3)}/><circle cx="13" cy="-43" r="10.5" fill="#fff" fill-opacity=".25" ${st(2.3)}/>` + P('M-2.5 -44 h5', 2.3),
        grandpa: `<path d="M-41 -46 q-8 -12 2 -22 q5 7 7 15 M41 -46 q8 -12 -2 -22 q-5 7 -7 15" fill="${HAIR_GRAY}" ${st(2)}/>`
            + `<path d="M-13 -35 q6 -6 13 -2 q7 -4 13 2 q-6 7 -13 2 q-7 5 -13 -2z" fill="#f3efe8" ${st(2)}/>` + P('M-6 -84 q6 -4 12 0', 1.8)
            + `<circle cx="-13" cy="-44" r="10.5" fill="#fff" fill-opacity=".25" ${st(2.3)}/><circle cx="13" cy="-44" r="10.5" fill="#fff" fill-opacity=".25" ${st(2.3)}/>` + P('M-2.5 -45 h5', 2.3)
    };
    const ROLE_BY_NAME = { a: 'kid', b: 'mom', c: 'dad', d: 'grandma', h: 'grandma', m: 'dad' };
    function pickRole(name, o) {
        if (o.role) return o.role;
        const acc = o.acc || [];
        if (acc.includes('ribbon')) return 'girl';
        if (acc.includes('glasses')) return 'grandpa';
        return ROLE_BY_NAME[name] || 'kid';
    }

    // ---------- 소품 ----------
    const PROPS = {
        tissue: () => `<path d="M-14 -11 q7 -4 14 0 q7 4 14 0 l-1 22 q-6 -4 -13 0 q-7 4 -14 0 z" fill="${CREAM}" ${st(2)}/>`,
        tissueBox: () => `<rect x="-30" y="-24" width="60" height="26" rx="4" fill="#9fc3cf" ${st(2.2)}/>` + P('M-12 -24 h24', 2) + `<path d="M-8 -24 q-4 -14 4 -22 q6 8 12 4 q2 10 -2 18 z" fill="${CREAM}" ${st(2)}/>`,
        roll: () => `<circle r="15" fill="${CREAM}" ${st(2.2)}/><circle r="5.5" fill="#c9a27a" ${st(1.8)}/>` + P('M0 -15 v4', 1.6),
        cup: () => `<path d="M-12 -26 L12 -26 L8.5 0 L-8.5 0 Z" fill="${CREAM}" ${st(2.2)}/>` + P('M-13 -26 h26', 2.6) + P('M-10 -17 h20', 1.2),
        glass: () => `<path d="M-14 -34 L14 -34 L11 0 L-11 0 Z" fill="#d9ecf2" fill-opacity=".7" ${st(2.2)}/>`,
        ball: () => `<circle r="6.5" fill="#fff" ${st(2)}/><path d="M-3 -3 q2 -2 4 -1" stroke="#c9c2b5" stroke-width="1.4" fill="none"/>`,
        bottle: () => `<path d="M-10 -40 q0 -6 5 -9 v-7 h10 v7 q5 3 5 9 v38 q0 2 -2 2 h-16 q-2 0 -2 -2 z" fill="#e8f3f6" ${st(2.2)}/><path d="M-9 -14 h18 v12 q0 2 -2 2 h-14 q-2 0 -2 -2 z" fill="${TEAR}"/>` + `<rect x="-6" y="-60" width="12" height="5" rx="1.5" fill="${COL.blue}" ${st(1.6)}/>`,
        balloon: (c = COL.red) => `<path d="M0 22 q-4 12 3 22 q4 8 -2 18" fill="none" stroke="#a89f90" stroke-width="1.6"/><ellipse cx="0" cy="0" rx="17" ry="21" fill="${c}" ${st(2.2)}/><path d="M-3 21 l3 -3 l3 3 z" fill="${c}" ${st(1.6)}/><ellipse cx="-6" cy="-8" rx="3.5" ry="6" fill="#fff" opacity=".35" transform="rotate(25 -6 -8)"/>`,
        balloonBare: (c = COL.red) => `<ellipse cx="0" cy="0" rx="17" ry="21" fill="${c}" ${st(2.2)}/><path d="M-3 21 l3 -3 l3 3 z" fill="${c}" ${st(1.6)}/><ellipse cx="-6" cy="-8" rx="3.5" ry="6" fill="#fff" opacity=".35" transform="rotate(25 -6 -8)"/>`,
        spoon: () => `<ellipse cx="0" cy="-12" rx="7" ry="9" fill="#d8d4cc" ${st(2)}/>` + P('M0 -3 v22', 3),
        spoonFlat: () => P('M-22 0 h20', 3) + `<ellipse cx="6" cy="-1" rx="9" ry="5" fill="#d8d4cc" ${st(2)}/>`,
        cookie: () => `<circle r="10" fill="#d9a35b" ${st(2)}/>` + dot(-3, -3, 1.6) + dot(4, 1, 1.6) + dot(-1, 5, 1.6),
        coin: () => `<ellipse rx="8" ry="3.5" fill="#e4bf4a" ${st(1.8)}/>`,
        coinFace: () => `<circle r="9" fill="#e4bf4a" ${st(2)}/><circle r="5" fill="none" stroke="#b8952f" stroke-width="1.4"/>`,
        toothpick: () => P('M0 0 L18 -26', 2.2),
        straw: () => `<path d="M0 0 L34 -6" stroke="${INK}" stroke-width="6.5" stroke-linecap="round"/><path d="M0 0 L34 -6" stroke="#f3d27a" stroke-width="3.5" stroke-linecap="round"/>`,
        bit: (c = COL.terra) => `<rect x="-4" y="-4" width="8" height="8" rx="1" fill="${c}" ${st(1.4)}/>`,
        plate: () => `<ellipse rx="24" ry="5.5" fill="${CREAM}" ${st(2)}/>`,
        tube: () => `<rect x="-8" y="-24" width="16" height="24" rx="2" fill="#d4b087" ${st(2)}/><ellipse cx="0" cy="-24" rx="8" ry="2.6" fill="#a98560" ${st(1.6)}/>`,
        sock: () => `<circle r="11" fill="#c96c5f" ${st(2)}/>` + P('M-10 -3 q10 -4 20 0 M-9 4 q9 -3 18 0', 1.4),
        newspaper: () => `<rect x="-60" y="-6" width="120" height="12" rx="2" fill="#efe9dc" ${st(2)}/>` + P('M-50 -1 h30 M-12 -1 h22 M20 -1 h28 M-50 3 h18', 1.2),
        table: (w = 220) => `<rect x="${-w / 2}" y="0" width="${w}" height="10" rx="3" fill="#c79a6b" ${st(2.2)}/>` + P(`M${-w / 2 + 12} 10 v52 M${w / 2 - 12} 10 v52`, 3),
        mat: () => `<rect x="-80" y="-8" width="160" height="12" rx="6" fill="#d7e3c8" ${st(2)}/>`,
        note: (t = '펭귄') => `<rect x="-17" y="-14" width="34" height="26" rx="2" fill="#f6dc6e" ${st(1.8)}/><text x="0" y="5" text-anchor="middle" font-family="Gaegu, 'LINE Seed KR', sans-serif" font-weight="700" font-size="14" fill="${INK}">${t}</text>`,
        phones: () => P('M-43 -40 q0 -56 43 -56 q43 0 43 56', 4.5) + `<rect x="-52" y="-52" width="13" height="24" rx="5" fill="${COL.plum}" ${st(2)}/><rect x="39" y="-52" width="13" height="24" rx="5" fill="${COL.plum}" ${st(2)}/>`,
        glasses: () => `<circle cx="-13" cy="-43" r="10.5" fill="#fff" fill-opacity=".25" ${st(2.3)}/><circle cx="13" cy="-43" r="10.5" fill="#fff" fill-opacity=".25" ${st(2.3)}/>` + P('M-2.5 -44 h5 M-23.5 -45 l-12 -3 M23.5 -45 l12 -3', 2.3),
        ribbon: () => `<path d="M14 -86 l-12 -8 v16 z M14 -86 l12 -8 v16 z" fill="${COL.red}" ${st(1.8)}/><circle cx="14" cy="-86" r="3.4" fill="${COL.red}" ${st(1.6)}/>`,
        box: () => `<rect x="-22" y="-16" width="44" height="30" rx="3" fill="#9fc3cf" ${st(2.2)}/>` + `<ellipse cx="0" cy="-2" rx="10" ry="5" fill="${INK}"/>` + P('M-22 -6 h-12 M22 -6 h12', 2),
        capRed: () => `<ellipse rx="9" ry="4" fill="${COL.red}" ${st(1.8)}/>`,
        capBlue: () => `<ellipse rx="9" ry="4" fill="${COL.blue}" ${st(1.8)}/>`,
        target: () => `<ellipse rx="34" ry="8" fill="#fff" ${st(1.8)}/><ellipse rx="22" ry="5" fill="#f6dc6e" ${st(1.6)}/><ellipse rx="9" ry="2.4" fill="${COL.red}"/>`,
        cone: () => `<path d="M-10 0 L0 -26 L10 0 Z" fill="#e58c3a" ${st(2)}/>` + P('M-6 -9 h12', 2.4).replace(INK, '#fff'),
        paper: () => `<rect x="-26" y="-32" width="52" height="64" rx="2" fill="#fff" ${st(2)}/>`,
        pen: () => P('M0 0 l14 -20', 4) + P('M0 0 l2.4 -3.4', 2),
        band: () => `<ellipse rx="44" ry="7" fill="none" stroke="#e05a6a" stroke-width="4.5"/>`,
        rope: () => '',
        hand5: () => handSvg(5), hand4: () => handSvg(4), hand3: () => handSvg(3), hand2: () => handSvg(2), hand1: () => handSvg(1), hand0: () => handSvg(0),
        rock: () => `<circle r="11" fill="${CREAM}" ${st(2)}/>` + P('M-7 -3 h14 M-7 2 h14', 1.4),
        paperHand: () => `<rect x="-11" y="-6" width="22" height="16" rx="6" fill="${CREAM}" ${st(2)}/>` + P('M-8 -6 v-12 M-3 -6 v-15 M2 -6 v-15 M7 -6 v-12 M11 3 l7 -7', 3),
        scissors: () => `<rect x="-10" y="-4" width="20" height="14" rx="6" fill="${CREAM}" ${st(2)}/>` + P('M-4 -4 l-5 -16 M3 -4 l5 -16', 3),
        bubble: (t = '', w = 64) => `<rect x="${-w / 2}" y="-18" width="${w}" height="30" rx="14" fill="#fff" ${st(2)}/><path d="M-6 12 l-4 10 l12 -10" fill="#fff" ${st(2)}/><path d="M-5 11 h10" stroke="#fff" stroke-width="3"/>`
            + `<text x="0" y="4" text-anchor="middle" font-family="Gaegu, 'LINE Seed KR', sans-serif" font-weight="700" font-size="17" fill="${INK}">${t}</text>`,
        xmark: () => P('M-12 -12 L12 12 M12 -12 L-12 12', 5).replace(INK, COL.red),
        measure: (w = 100) => P(`M0 0 h${w} M0 -6 v12 M${w} -6 v12`, 2).replace(INK, COL.terra),
        drawing: () => `<path d="M-16 -22 q-14 24 2 38 q26 10 26 -18 q0 -26 -24 -20 M-8 -32 l3 -9 l3 8 l4 -10 l2 9 M-9 -6 h5 M20 -26 h5 M2 -8 q10 8 -3 12 M-16 18 q8 7 16 -5" pathLength="1" stroke-dasharray="1" fill="none" ${st(2.4)}/>`,
        trail: () => `<path d="M0 34 L18 -8 L36 34 M56 -18 V44 M56 12 H76" pathLength="1" stroke-dasharray="1" fill="none" stroke="${COL.terra}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`,
        note8: () => `<path d="M0 0 v-16 l10 -3 v16" fill="none" ${st(2)}/><ellipse cx="-3" cy="0" rx="4" ry="3" fill="${INK}"/><ellipse cx="7" cy="-3" rx="4" ry="3" fill="${INK}"/>`,
        holes: () => '', strip: () => `<rect x="0" y="-3" width="1" height="6" fill="${CREAM}" stroke="${INK}" stroke-width="1.8" vector-effect="non-scaling-stroke"/>`,
        wrap: () => `<rect x="-47" y="-6" width="94" height="12" rx="4" fill="${CREAM}" ${st(1.8)}/>`,
        sparkle: (c = COL.gold) => `<path d="M0 -10 Q0 0 10 0 Q0 0 0 10 Q0 0 -10 0 Q0 0 0 -10 Z" fill="${c}"/>`
    };
    function handSvg(n) {
        const fingers = [[-11, -8, -18], [-5, -10, -22], [1, -10, -23], [7, -9, -20]].slice(0, Math.max(0, n - 1));
        let s = `<rect x="-12" y="-8" width="24" height="18" rx="7" fill="${CREAM}" ${st(2)}/>`;
        s += fingers.map(([x, y0, y1]) => P(`M${x + 2} ${y0} V${y1}`, 4.2)).join('');
        if (n >= 1) s += P('M12 2 l8 -8', 4.2);
        return s;
    }

    // ---------- 캐릭터: 콩알 가족 (머리와 몸이 하나인 콩 모양, 옷 색 = 팀 색) ----------
    const BEAN = 'M-41 56 C-49 5 -39 -88 0 -88 C39 -88 49 5 41 56 Q0 68 -41 56 Z';
    function charSvg(id, o, name) {
        const role = pickRole(name, o);
        const shirt = o.shirt || COL.terra;
        const faces = Object.keys(FACES).map(k => `<g class="fa-face" data-face="${k}" style="display:none">${FACES[k]}</g>`).join('');
        const acc = (o.acc || []).filter(a => !(a === 'ribbon' && role === 'girl') && !(a === 'glasses' && (role === 'grandma' || role === 'grandpa')))
            .map(a => PROPS[a] ? PROPS[a]() : '').join('');
        const foot = (side) => `<g id="${id}.leg${side}"><ellipse cx="${side === 'L' ? -2 : 2}" cy="10" rx="11" ry="6" fill="#fff" ${st(2.6)}/></g>`;
        const arm = (side) => {
            const k = side === 'L' ? -1 : 1;
            return `<g id="${id}.arm${side}"><ellipse cx="${3 * k}" cy="11" rx="8" ry="12.5" fill="${SKIN}" ${st(2.6)} transform="rotate(${-14 * k} ${3 * k} 11)"/>`
                + `<g id="${id}.hand${side}" data-slot="1"></g></g>`;
        };
        return `<g id="${id}">`
            + `<ellipse cx="0" cy="17" rx="34" ry="4.5" fill="${INK}" opacity=".08"/>`
            + foot('L') + foot('R')
            + `<g id="${id}.head">`
            + `<clipPath id="${id}-clip"><path d="${BEAN}"/></clipPath>`
            + `<path d="${BEAN}" fill="${SKIN}"/>`
            + `<path d="M-60 12 Q0 24 60 12 V80 H-60 Z" fill="${shirt}" clip-path="url(#${id}-clip)"/>`
            + P('M-46 12 Q0 24 46 12', 2.4).replace('<path', `<path clip-path="url(#${id}-clip)"`)
            + `<path d="${BEAN}" fill="none" ${st(3)}/>`
            + faces + (HAIR[role] || '') + acc + `<g id="${id}.face" data-slot="1"></g></g>`
            + `<g id="${id}.back" data-slot="1"></g>`
            + arm('L') + arm('R')
            + `</g>`;
    }
    const CHAR_PARTS = { legL: [-15, 6], legR: [15, 6], armL: [-40, -38], armR: [40, -38], head: [0, -52], handL: [0, 0], handR: [0, 0], back: [0, 0], face: [0, 0] };

    // ---------- 장면 빌더 ----------
    function Scene(uid) {
        this.uid = uid;
        this.layers = { bg: [], back: [], chars: [], front: [], fx: [] };
        this.slotItems = [];      // [slotId, svg]
        this.base = {};           // id -> {x,y,r,s,sx,sy,o,draw}
        this.keys = {};           // id -> [[t, props, ease]]
        this.ev = [];             // [t, type, a, b]
        this.chars = [];
        this.nb = 0;
    }
    Scene.prototype = {
        id(n) { return this.uid + '-' + n; },
        _reg(name, b) { this.base[this.id(name)] = Object.assign({ x: 0, y: 0, r: 0, s: 1, sx: 1, sy: 1, o: 1 }, b); },
        char(name, x, y, o = {}) {
            const id = this.id(name);
            this.layers[o.layer || 'chars'].push(charSvg(id, o, name));
            this._reg(name, { x, y, s: o.s || 0.86, sx: o.flip ? -1 : 1, r: o.r || 0 });   // 콩알 가족은 폭이 넓어 기본 0.86배
            for (const [part, [px, py]] of Object.entries(CHAR_PARTS)) this._reg(name + '.' + part, { x: px, y: py });
            this.chars.push(name);
            this.ev.push([-1, 'face', name, o.face || 'neutral']);
            return this;
        },
        prop(name, kind, x, y, o = {}) {
            const id = this.id(name);
            const f = PROPS[kind];
            const inner = f ? f.apply(null, o.args || []) : kind;
            const svg = `<g id="${id}">${inner}</g>`;
            if (o.parent) this.slotItems.push([this.id(o.parent), svg]);
            else this.layers[o.layer || 'back'].push(svg);
            const d = (v, def) => (v == null ? def : v);
            this._reg(name, { x, y, r: d(o.r, 0), s: d(o.s, 1), sx: d(o.sx, 1), sy: d(o.sy, 1), o: d(o.o, 1), draw: o.draw });
            if (o.hidden) this.ev.push([-1, 'vis', name, false]);
            return this;
        },
        key(target, ...frames) {
            const id = this.id(target);
            (this.keys[id] = this.keys[id] || []).push(...frames);
            return this;
        },
        face(t, name, f) { this.ev.push([t, 'face', name, f]); return this; },
        show(t, name) { this.ev.push([t, 'vis', name, true]); return this; },
        hide(t, name) { this.ev.push([t, 'vis', name, false]); return this; },
        cap(t, text, sub) { this.ev.push([t, 'cap', text, sub || '']); return this; },
        burst(t, x, y, text, o = {}) {
            const name = '_bu' + (this.nb++);
            const size = o.size || 22, dur = o.dur || 1.3, col = o.color || INK;
            const lines = o.lines === false ? '' : P(`M${-size * 0.9} ${-size * 0.9} l-6 -6 M${-size * 1.1} ${-size * 0.2} h-9 M${-size * 0.8} ${size * 0.5} l-7 5`, 2);
            this.layers.fx.push(`<g id="${this.id(name)}">${lines}<text x="0" y="${size * 0.35}" text-anchor="middle" font-family="Gaegu, 'LINE Seed KR', sans-serif" font-weight="700" font-size="${size}" fill="${col}" stroke="${PAPER}" stroke-width="5" paint-order="stroke">${text}</text></g>`);
            this._reg(name, { x, y, r: o.r || 0, s: 0, o: 0 });
            this.key(name, [t - 0.01, { s: 0.3, o: 0 }], [t + 0.22, { s: 1, o: 1 }, 'back'], [t + dur, { o: 1 }], [t + dur + 0.25, { o: 0, s: 1.08 }, 'io']);
            return this;
        },
        sparkles(t, pts, c) {
            pts.forEach(([x, y, sz], i) => {
                const name = '_sp' + (this.nb++);
                this.layers.fx.push(`<g id="${this.id(name)}">${PROPS.sparkle(c || (i % 2 ? COL.gold : COL.terra))}</g>`);
                this._reg(name, { x, y, s: 0, o: 0 });
                const t0 = t + i * 0.08;
                this.key(name, [t0, { s: 0, o: 0, r: 0 }], [t0 + 0.3, { s: sz || 1, o: 1, r: 45 }, 'back'], [t0 + 0.7, { s: (sz || 1) * 0.75, r: 70 }, 'io'], [t0 + 1.0, { s: sz || 1, r: 90 }, 'io']);
            });
            return this;
        },
        // 걷기: 루트 x 이동 + 다리 교차 + 몸 들썩
        walk(name, x0, x1, t0, t1, o = {}) {
            const n = o.steps || Math.max(2, Math.round((t1 - t0) / 0.32)), dt = (t1 - t0) / n, y = o.y == null ? FLOOR : o.y, a = o.leg || 24;
            const root = [], L = [], R = [];
            for (let i = 0; i <= n; i++) {
                const t = t0 + i * dt;
                root.push([t, { x: x0 + (x1 - x0) * (i / n), y: y - (i % 2 ? (o.bob || 4) : 0) }, 'lin']);
                const sgn = i === n ? 0 : (i % 2 ? 1 : -1);
                L.push([t, { r: sgn * a }, 'io']); R.push([t, { r: -sgn * a }, 'io']);
            }
            this.key(name, ...root); this.key(name + '.legL', ...L); this.key(name + '.legR', ...R);
            return this;
        },
        jump(name, t, h = 24, y = FLOOR, dur = 0.5) {
            this.key(name, [t, { y }], [t + dur / 2, { y: y - h }, 'o'], [t + dur, { y }, 'i']);
            return this;
        },
        cheer(name, t0, t1) {
            const ks = [], ks2 = [];
            for (let t = t0, i = 0; t <= t1; t += 0.3, i++) { ks.push([t, { r: i % 2 ? 150 : 120 }, 'io']); ks2.push([t, { r: i % 2 ? -120 : -150 }, 'io']); }
            this.key(name + '.armL', ...ks); this.key(name + '.armR', ...ks2);
            return this;
        },
        // 포물선 이동: x는 일정하게, y는 올라갔다 내려옴
        arc(target, t0, t1, [x0, y0], [x1, y1], peak, spin = 0) {
            const tm = t0 + (t1 - t0) * 0.5;
            this.key(target, [t0, { x: x0 }], [t1, { x: x1 }, 'lin']);
            this.key(target, [t0, { y: y0 }], [tm, { y: Math.min(y0, y1) - peak }, 'o'], [t1, { y: y1 }, 'i']);
            if (spin) this.key(target, [t0, { r: 0 }], [t1, { r: spin }, 'lin']);
            return this;
        },
        wiggle(target, prop, t0, t1, amp, period = 0.3, base = 0) {
            const ks = [];
            for (let t = t0, i = 0; t <= t1 + 1e-6; t += period / 2, i++) ks.push([t, { [prop]: base + (i % 2 ? amp : -amp) }, 'io']);
            ks.push([t1 + period / 2, { [prop]: base }, 'io']);
            this.key(target, ...ks);
            return this;
        },
        end(t, text, sub) {
            this.cap(t, text, sub);
            this.sparkles(t + 0.1, [[60, 120, 1], [345, 110, 0.8], [90, 205, 0.6], [320, 200, 0.9], [205, 100, 0.7]]);
            return this;
        }
    };

    // ---------- 재생기 ----------
    const SCENES = {};
    let active = null;
    const reduced = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

    function build(host, sceneId) {
        const fn = SCENES[sceneId];
        if (!fn) return null;
        const uid = 'fa' + Math.random().toString(36).slice(2, 7);
        const S = new Scene(uid);
        fn(S, { COL, FLOOR, W, H });
        const filters = [1, 2, 3].map(n => `<filter id="${uid}-boil${n}" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="1" seed="${n * 7}" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" xChannelSelector="R" yChannelSelector="G"/></filter>`).join('');
        host.innerHTML = `<svg class="fa-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="게임 진행 애니메이션">`
            + `<defs>${filters}</defs>`
            + `<rect width="${W}" height="${H}" fill="${PAPER}"/>`
            + `<g class="fa-draw" id="${uid}-draw">`
            + `<path d="M8 ${FLOOR + 21} q60 -3 120 0 t120 0 t140 -1" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round" opacity=".55"/>`
            + ['bg', 'back', 'chars', 'front', 'fx'].map(l => `<g>${S.layers[l].join('')}</g>`).join('')
            + `</g>`
            + `<g class="fa-ui"><rect id="${uid}-hl" x="0" y="42" width="0" height="11" rx="5" fill="#f3d27a" opacity=".85"/>`
            + `<text id="${uid}-cap" x="${W / 2}" y="48" text-anchor="middle" font-family="Gaegu, 'LINE Seed KR', sans-serif" font-weight="700" font-size="27" fill="${INK}"></text>`
            + `<text id="${uid}-sub" x="${W / 2}" y="74" text-anchor="middle" font-family="Gaegu, 'LINE Seed KR', sans-serif" font-weight="700" font-size="17" fill="#6e6556"></text></g>`
            + `</svg>`;
        const svg = host.firstChild;
        for (const [slot, html] of S.slotItems) {
            const g = svg.getElementById ? svg.querySelector(`[id="${slot}"]`) : null;
            if (g) g.insertAdjacentHTML('beforeend', html);
        }
        // 트랙 정리: 속성별 키 목록 (첫 키 전에는 기본값 유지)
        const els = {};
        for (const id of Object.keys(S.base)) {
            const el = svg.querySelector(`[id="${id}"]`);
            if (!el) continue;
            const b = S.base[id];
            const props = {};
            for (const [t, p, e] of (S.keys[id] || []).slice().sort((a, b2) => a[0] - b2[0])) {
                for (const k of Object.keys(p)) (props[k] = props[k] || []).push([t, p[k], EASE[e] || EASE.io]);
            }
            for (const k of Object.keys(props)) {
                const arr = props[k];
                if (arr[0][0] > 0 && b[k] != null) arr.unshift([0, b[k], EASE.lin]);
            }
            const drawEl = b.draw != null ? el.querySelector('[pathLength]') : null;
            els[id] = { el, b, props, drawEl, last: '' };
        }
        const ev = S.ev.slice().sort((a, b) => a[0] - b[0]);
        return { svg, els, ev, uid, S, host, faceState: {}, visState: {}, capState: null };
    }

    function valueAt(arr, T) {
        if (T <= arr[0][0]) return arr[0][1];
        for (let i = 1; i < arr.length; i++) {
            const [t1, v1, e] = arr[i];
            if (T <= t1) {
                const [t0, v0] = arr[i - 1];
                const k = t1 === t0 ? 1 : e((T - t0) / (t1 - t0));
                return v0 + (v1 - v0) * k;
            }
        }
        return arr[arr.length - 1][1];
    }

    function render(A, T) {
        for (const id in A.els) {
            const it = A.els[id], b = it.b, p = it.props;
            const v = k => (p[k] ? valueAt(p[k], T) : b[k]);
            const x = v('x'), y = v('y'), r = v('r'), s = v('s'), sx = v('sx'), sy = v('sy'), o = v('o');
            const tf = `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${r.toFixed(1)}) scale(${(s * sx).toFixed(3)} ${(s * sy).toFixed(3)})`;
            const key = tf + '|' + o.toFixed(2);
            if (key !== it.last) {
                it.el.setAttribute('transform', tf);
                it.el.setAttribute('opacity', Math.max(0, Math.min(1, o)).toFixed(2));
                it.last = key;
            }
            if (it.drawEl) {
                const d = p.draw ? valueAt(p.draw, T) : b.draw;
                it.drawEl.style.strokeDashoffset = (1 - d).toFixed(3);
            }
        }
        // 이벤트: 시각 T까지의 마지막 상태
        const face = {}, vis = {};
        let cap = ['', ''];
        for (const [t, type, a, bb] of A.ev) {
            if (t > T) break;
            if (type === 'face') face[a] = bb;
            else if (type === 'vis') vis[a] = bb;
            else if (type === 'cap') cap = [a, bb];
        }
        for (const name of A.S.chars) {
            const f = face[name] || 'neutral';
            if (A.faceState[name] !== f) {
                A.faceState[name] = f;
                A.svg.querySelectorAll(`[id="${A.uid}-${name}.head"] > .fa-face`).forEach(g => { g.style.display = g.dataset.face === f ? '' : 'none'; });
            }
        }
        for (const id in A.els) {
            const name = id.slice(A.uid.length + 1);
            const want = vis[name] === undefined ? true : vis[name];
            if (A.visState[name] !== want) { A.visState[name] = want; A.els[id].el.style.display = want ? '' : 'none'; }
        }
        const ck = cap[0] + '|' + cap[1];
        if (A.capState !== ck) {
            A.capState = ck;
            const c = A.svg.querySelector(`[id="${A.uid}-cap"]`), sb = A.svg.querySelector(`[id="${A.uid}-sub"]`), hl = A.svg.querySelector(`[id="${A.uid}-hl"]`);
            c.textContent = cap[0]; sb.textContent = cap[1];
            let w = 0;
            try { w = cap[0] ? c.getComputedTextLength() : 0; } catch (e) { w = cap[0].length * 22; }
            hl.setAttribute('x', (W / 2 - w / 2 - 6).toFixed(1));
            hl.setAttribute('width', w ? (w + 12).toFixed(1) : 0);
        }
    }

    function loop(now) {
        const A = active;
        if (!A) return;
        if (!A.paused) {
            if (A.t0 == null) A.t0 = now - A.T * 1000;
            A.T = ((now - A.t0) / 1000) % (DUR + HOLD);
            if (now - (A.lastFrame || 0) >= 32) {      // 약 30fps로 제한 (저사양 폰 배려)
                A.lastFrame = now;
                render(A, Math.min(A.T, DUR));
                if (A.boil && now - (A.lastBoil || 0) > 140) {
                    A.lastBoil = now;
                    A.boilN = (A.boilN % 3) + 1;
                    A.drawG.setAttribute('filter', `url(#${A.uid}-boil${A.boilN})`);
                }
                if (A.bar) A.bar.style.transform = `scaleX(${(Math.min(A.T, DUR) / DUR).toFixed(3)})`;
            }
        }
        A.raf = requestAnimationFrame(loop);
    }

    function mount(host, sceneId) {
        stop();
        if (!host) return false;
        const box = document.createElement('div');
        box.className = 'fa-stage';
        host.innerHTML = '';
        host.appendChild(box);
        const A = build(box, sceneId);
        if (!A) { host.innerHTML = ''; host.hidden = true; return false; }
        host.hidden = false;
        A.drawG = A.svg.querySelector(`[id="${A.uid}-draw"]`);
        A.boil = !reduced();
        A.boilN = 1;
        A.T = 0;
        A.paused = reduced();               // 움직임 줄이기 설정이면 멈춘 상태로 시작
        const ui = document.createElement('div');
        ui.className = 'fa-ui-bar';
        ui.innerHTML = '<span class="fa-progress"><span></span></span><button type="button" class="fa-btn" aria-label="일시정지"></button>';
        host.appendChild(ui);
        A.bar = ui.querySelector('.fa-progress span');
        A.btn = ui.querySelector('.fa-btn');
        const paint = () => {
            A.btn.innerHTML = A.paused ? '<svg><use href="#i-play"/></svg>재생' : '<svg><use href="#i-pause"/></svg>멈춤';
            A.btn.setAttribute('aria-label', A.paused ? '애니메이션 재생' : '애니메이션 멈춤');
            host.classList.toggle('is-paused', A.paused);
        };
        const toggle = () => { A.paused = !A.paused; A.t0 = null; paint(); };
        A.btn.addEventListener('click', toggle);
        box.addEventListener('click', toggle);
        A.paint = paint;
        paint();
        render(A, A.paused ? DUR : 0);   // 멈춘 시작이면 마지막 장면을 보여 줌
        if (A.paused) A.T = DUR;
        active = A;
        A.raf = requestAnimationFrame(loop);
        // 글꼴이 늦게 오면 자막 밑줄 길이 다시 계산
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (active === A) { A.capState = null; render(A, Math.min(A.T, DUR)); } });
        return true;
    }
    function stop() {
        if (active) { cancelAnimationFrame(active.raf); active = null; }
    }
    function pause(v) { if (active) { active.paused = v; active.t0 = null; } }
    document.addEventListener('visibilitychange', () => { if (active && document.hidden && !active.paused) { active.paused = true; active.t0 = null; if (active.paint) active.paint(); } });

    window.FamilyAnim = { SCENES, mount, stop, pause, COL, FLOOR, has: id => !!SCENES[id], _render: (id, T, host) => { const A = build(host, id); if (A) render(A, T); return A; } };
})();
