// =============================================================
// 문제 데이터 검증 도구 — questions.js 수정 후 반드시 실행하세요:
//   node tools/validate.js
// 검사 항목:
//   1) 초성퀴즈: q가 정답 a의 실제 초성과 일치하는지 (괄호 병기 제외)
//   2) 네글자퀴즈: q/a가 각각 2글자인지
//   3) 카테고리 내부 중복 문제
//   4) 카테고리 문제 수가 라운드 상한(ROUND_CAP)보다 적지 않은지
// =============================================================
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, '..', 'questions.js'), 'utf8');
const window = {};
eval(src);
const DB = window.GAME_DB;
if (!DB) { console.error('오류: questions.js에서 GAME_DB를 찾지 못했습니다.'); process.exit(1); }

// index.html의 ROUND_CAP과 동일하게 유지할 것
const ROUND_CAP = { speed: 30, body: 25, chosung: 12 };

const CHO = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
function toChosung(str) {
    let out = '';
    for (const ch of str) {
        const c = ch.codePointAt(0);
        if (c >= 0xAC00 && c <= 0xD7A3) out += CHO[Math.floor((c - 0xAC00) / 588)];
        else if (!/\s/.test(ch)) out += ch; // 숫자·영문은 그대로, 공백·줄바꿈 무시
    }
    return out;
}
const norm = s => String(s).replace(/\s+/g, '');

const errors = [];
const warnings = [];

// 1. 초성 일치 검사
for (const [cat, items] of Object.entries(DB.chosung || {})) {
    for (const it of items) {
        const expected = toChosung(String(it.a).replace(/\([^)]*\)/g, '')); // "비비큐(BBQ)치킨" → 괄호 제외
        if (expected !== norm(it.q)) {
            errors.push(`[초성/${cat}] q="${norm(it.q)}" 정답="${it.a}" → 올바른 초성="${expected}"`);
        }
        if (!it.h) warnings.push(`[초성/${cat}] "${it.a}" 힌트(h) 없음`);
    }
}

// 2. 네글자 글자 수 검사
for (const [cat, items] of Object.entries(DB.fourLetter || {})) {
    for (const it of items) {
        if (String(it.q).length !== 2 || String(it.a).length !== 2) {
            errors.push(`[네글자/${cat}] "${it.q}"+"${it.a}" — 앞뒤 각각 2글자여야 함`);
        }
    }
}

// 3. 카테고리 내부 중복 검사 (공백 무시, 제시어+정답 기준)
for (const [game, cats] of Object.entries(DB)) {
    for (const [cat, items] of Object.entries(cats)) {
        const seen = new Set();
        for (const it of items) {
            const k = typeof it === 'string' ? norm(it) : norm(it.q) + '|' + norm(it.a !== undefined ? it.a : it.q);
            if (seen.has(k)) errors.push(`[${game}/${cat}] 중복: "${typeof it === 'string' ? it : it.q}"`);
            seen.add(k);
        }
    }
}

// 3-1. 이어말하기 난이도(d) 검사 — 1 순한맛 / 2 보통 / 3 매운맛
const tierCount = { 1: 0, 2: 0, 3: 0 };
for (const [cat, items] of Object.entries(DB.relay || {})) {
    for (const it of items) {
        if (typeof it === 'string') { tierCount[2]++; continue; } // d 없으면 보통 취급
        const d = it.d === undefined ? 2 : it.d;
        if (![1, 2, 3].includes(d)) errors.push(`[relay/${cat}] "${it.q}" — d는 1·2·3만 가능 (현재: ${it.d})`);
        else tierCount[d]++;
    }
}

// 4. 카테고리 크기 검사 (라운드 상한 미달이면 만점 기회가 줄어듦)
for (const [game, cap] of Object.entries(ROUND_CAP)) {
    for (const [cat, items] of Object.entries(DB[game] || {})) {
        if (items.length < cap) warnings.push(`[${game}/${cat}] 문제 ${items.length}개 < 라운드 상한 ${cap}개 — 증량 권장`);
    }
}

// 결과 출력
console.log('=== 문제 데이터 검증 결과 ===');
for (const [game, cats] of Object.entries(DB)) {
    const total = Object.values(cats).reduce((s, a) => s + a.length, 0);
    console.log(`${game}: ${Object.keys(cats).length}개 주제, ${total}문제`);
}
console.log(`relay 난이도: 순한맛 ${tierCount[1]} · 보통 ${tierCount[2]} · 매운맛 ${tierCount[3]}`);
console.log('');
if (warnings.length) {
    console.log('⚠ 경고 (배포는 가능):');
    warnings.forEach(w => console.log('  ' + w));
    console.log('');
}
if (errors.length) {
    console.error('✗ 오류 — 수정 후 다시 실행하세요:');
    errors.forEach(e => console.error('  ' + e));
    process.exit(1);
}
console.log('✓ 오류 0건 — 배포 가능합니다.');
