// 첫 화면 히어로 일러스트 생성기 — 좌표를 계산해 SVG 문자열을 만든다
// (테마 색을 따르는 부분은 class로: .ill-accent = 강조색, .ill-tint = 강조 틴트)
const f = n => Math.round(n * 10) / 10;
const C = { terra:'#c67139', terraDeep:'#b2622d', sage:'#728157', sageDeep:'#56633f', blue:'#5b7d8c', plum:'#8a6a86', gold:'#b8952f', cream:'#fffdf6', soft:'#ebddc5', ink:'#201e1d', ink7:'#474238', line:'#c0b6a5' };
let o = [];
const W = 640, H = 480;
o.push(`<svg class="hero-art" viewBox="0 0 ${W} ${H}" role="img" aria-label="줄무늬 파티 텐트와 팀 풍선, 색종이가 날리는 그림">`);
o.push(`<defs><clipPath id="hero-roof"><path d="M320 112 C262 138 196 200 150 268 L490 268 C444 200 378 138 320 112 Z"/></clipPath><clipPath id="hero-wall"><path d="M178 262 H462 L474 432 H166 Z"/></clipPath></defs>`);
// 바닥 + 뒤 원
o.push(`<circle class="ill-tint" cx="320" cy="262" r="186"/>`);
o.push(`<ellipse cx="320" cy="440" rx="304" ry="34" fill="${C.soft}"/>`);

// 가랜드 (2차 베지어 위에 삼각 깃발)
function garland(p0, p1, p2, n, colors, start = 0) {
  const B = t => [ (1-t)*(1-t)*p0[0] + 2*(1-t)*t*p1[0] + t*t*p2[0], (1-t)*(1-t)*p0[1] + 2*(1-t)*t*p1[1] + t*t*p2[1] ];
  const D = t => [ 2*(1-t)*(p1[0]-p0[0]) + 2*t*(p2[0]-p1[0]), 2*(1-t)*(p1[1]-p0[1]) + 2*t*(p2[1]-p1[1]) ];
  o.push(`<path d="M${p0} Q${p1} ${p2}" fill="none" stroke="${C.line}" stroke-width="3" stroke-linecap="round"/>`);
  for (let i = 0; i < n; i++) {
    const t = (i + 0.7) / (n + 0.4), [x, y] = B(t), [dx, dy] = D(t), a = Math.atan2(dy, dx) * 180 / Math.PI;
    o.push(`<path d="M-13 0 H13 L0 26 Z" fill="${colors[(i + start) % colors.length]}" transform="translate(${f(x)} ${f(y)}) rotate(${f(a)})"/>`);
  }
}
const gc = [C.terra, C.gold, C.sage, C.blue, C.plum];
garland([-6, 44], [150, 132], [320, 74], 6, gc, 0);
garland([320, 74], [490, 132], [646, 44], 6, gc, 2);

// 텐트 — 지붕(줄무늬) · 처마 물결 · 벽 · 입구 · 깃발
o.push(`<g>`);
o.push(`<path d="M178 262 H462 L474 432 H166 Z" fill="${C.cream}"/>`);
o.push(`<g clip-path="url(#hero-wall)">`);
for (let k = 0; k < 5; k += 2) o.push(`<rect class="ill-accent" x="${150 + 68 * k}" y="262" width="68" height="176"/>`);
o.push(`</g>`);
// 입구
o.push(`<path d="M270 432 V386 a50 50 0 0 1 100 0 V432 Z" fill="${C.ink7}"/>`);
o.push(`<path d="M270 432 V386 a50 50 0 0 1 50 -50 C317 372 300 408 270 432 Z" fill="${C.cream}"/>`);
o.push(`<path d="M370 432 V386 a50 50 0 0 0 -50 -50 C323 372 340 408 370 432 Z" fill="${C.cream}"/>`);
// 지붕
o.push(`<path d="M320 112 C262 138 196 200 150 268 L490 268 C444 200 378 138 320 112 Z" fill="${C.cream}"/>`);
o.push(`<g clip-path="url(#hero-roof)">`);
for (let k = 0; k < 5; k += 2) o.push(`<path class="ill-accent" d="M320 104 L${150 + 68 * k} 272 H${150 + 68 * (k + 1)} Z"/>`);
o.push(`</g>`);
// 처마 물결 (지붕 줄무늬와 엇갈린 색)
for (let k = 0; k < 5; k++) {
  const x = 150 + 68 * k;
  o.push(`<path ${k % 2 ? 'class="ill-accent"' : `fill="${C.cream}"`} d="M${x} 266 a34 30 0 0 0 68 0 Z"/>`);
}
// 간판
o.push(`<rect x="230" y="286" width="180" height="42" rx="21" fill="${C.ink}"/>`);
o.push(`<text x="320" y="314" text-anchor="middle" font-family="'LINE Seed KR','Pretendard',sans-serif" font-weight="700" font-size="19" letter-spacing="-0.3" fill="${C.cream}">로운네 파티게임</text>`);
// 깃대 + 깃발
o.push(`<path d="M320 112 V66" stroke="${C.ink7}" stroke-width="5" stroke-linecap="round"/>`);
o.push(`<path d="M322 66 L362 80 L322 96 Z" fill="${C.gold}"/>`);
o.push(`</g>`);

// 풍선 (팀 이니셜)
function balloon(x, y, color, letter, cls, s = 1, lean = 0) {
  const rx = 40 * s, ry = 48 * s, sy = y + ry;
  o.push(`<g class="hero-balloon ${cls}">`);
  o.push(`<path d="M${x} ${f(sy + 10 * s)} C${f(x + 16 * s + lean)} ${f(sy + 50 * s)} ${f(x - 14 * s + lean)} ${f(sy + 84 * s)} ${f(x + lean * 1.6)} ${f(sy + 124 * s)}" fill="none" stroke="${C.line}" stroke-width="2.5" stroke-linecap="round"/>`);
  o.push(`<path d="M${f(x - 8 * s)} ${f(sy + 11 * s)} L${x} ${f(sy - 3 * s)} L${f(x + 8 * s)} ${f(sy + 11 * s)} Z" fill="${color}"/>`);
  o.push(`<ellipse cx="${x}" cy="${y}" rx="${f(rx)}" ry="${f(ry)}" fill="${color}"/>`);
  o.push(`<ellipse cx="${f(x - rx * 0.42)}" cy="${f(y - ry * 0.42)}" rx="${f(rx * 0.2)}" ry="${f(ry * 0.3)}" fill="#fff" opacity=".28" transform="rotate(28 ${f(x - rx * 0.42)} ${f(y - ry * 0.42)})"/>`);
  o.push(`<text x="${x}" y="${f(y + 13 * s)}" text-anchor="middle" font-family="'Outfit',sans-serif" font-weight="800" font-size="${f(36 * s)}" fill="#fff">${letter}</text>`);
  o.push(`</g>`);
}
balloon(92, 196, C.terra, 'A', 'b1', 1, -6);
balloon(552, 176, C.sage, 'B', 'b2', 1.06, 8);
balloon(46, 322, C.blue, 'C', 'b3', 0.74, -4);
balloon(604, 306, C.plum, 'D', 'b4', 0.8, 4);

// 색종이
const conf = [
  [208,66,C.terra,20],[236,118,C.blue,-30],[420,60,C.sage,35],[452,116,C.plum,-15],[156,118,C.gold,50],[498,84,C.terra,-40],
  [118,96,C.sage,-20],[540,60,C.gold,15],[26,150,C.plum,40],[618,148,C.blue,-35],[176,214,C.gold,-12],[470,210,C.terra,28]
];
conf.forEach(([x, y, c, r], i) => {
  if (i % 3 === 0) o.push(`<circle cx="${x}" cy="${y}" r="6" fill="${c}"/>`);
  else o.push(`<rect x="${x - 9}" y="${y - 4}" width="18" height="8" rx="4" fill="${c}" transform="rotate(${r} ${x} ${y})"/>`);
});
// 반짝이 (4각 별)
const star = (x, y, r, c, cls = '') => o.push(`<path class="hero-spark ${cls}" d="M${x} ${y - r} Q${x} ${y} ${x + r} ${y} Q${x} ${y} ${x} ${y + r} Q${x} ${y} ${x - r} ${y} Q${x} ${y} ${x} ${y - r} Z" fill="${c}"/>`);
star(268, 50, 13, C.gold, 's1'); star(584, 108, 11, C.gold, 's3'); star(30, 232, 10, C.terra, 's2'); star(612, 232, 8, C.gold, 's1');

// 소품: 스톱워치 (왼쪽) · 초성 말풍선 (오른쪽)
o.push(`<g transform="translate(92 398) scale(.9)"><rect x="-7" y="-52" width="14" height="14" rx="4" fill="${C.ink7}"/><circle r="36" fill="${C.blue}"/><circle r="26" fill="${C.cream}"/><path d="M0 -15 V0 L11 8" fill="none" stroke="${C.ink7}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>`);
o.push(`<g transform="translate(546 396) scale(.92)"><path d="M-58 -38 h116 a14 14 0 0 1 14 14 v36 a14 14 0 0 1 -14 14 h-66 l-20 20 v-20 h-30 a14 14 0 0 1 -14 -14 v-36 a14 14 0 0 1 14 -14 Z" fill="${C.cream}"/><text x="0" y="5" text-anchor="middle" font-family="'LINE Seed KR','Pretendard',sans-serif" font-weight="700" font-size="30" letter-spacing="5" fill="${C.ink}">ㅍㅌ</text></g>`);
o.push(`</svg>`);
const svg = o.join('\n');
// 사용법: node tools/hero-art.js > 결과를 index.html의 HERO-ART 주석 사이에 붙여 넣기
process.stdout.write(svg + '\n');
