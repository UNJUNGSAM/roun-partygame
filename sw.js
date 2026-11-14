// =============================================================
// 로운네 파티게임 — 서비스 워커 (오프라인 준비)
// - 앱 파일(html/css/js): 인터넷이 되면 항상 새 파일을 받고, 안 되면 저장해 둔 파일로 엽니다.
// - 글꼴·라이브러리: 바뀌지 않으므로 저장해 둔 파일을 먼저 씁니다.
// 파일 구성을 크게 바꾸면 VERSION 숫자를 올려 주세요 (옛 저장분이 지워집니다).
// =============================================================
const VERSION = 'partygame-v2';
const CORE = [
    './', 'index.html', 'styles.css', 'questions.js', 'characters.js', 'games-offline.js',
    'fonts/fonts.css', 'fonts/LINESeedKR-Bd.woff2', 'fonts/outfit-latin-wght-normal.woff2',
    'vendor/confetti.browser.js', 'manifest.webmanifest', 'icons/icon-192.png'
];
// 본문 글꼴 조각 92개 — 설치 뒤 뒤에서 천천히 받아 둠 (실패해도 설치는 성공)
const BODY_FONT = Array.from({ length: 92 }, (_, i) => `fonts/pretendard/PretendardVariable.subset.${i}.woff2`);

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(VERSION).then((cache) => cache.addAll(CORE)).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        const keys = await caches.keys();
        await Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)));
        await self.clients.claim();
        const cache = await caches.open(VERSION);
        for (const url of BODY_FONT) {
            try { if (!(await cache.match(url))) await cache.add(url); } catch (e) { /* 다음 방문 때 다시 시도 */ }
        }
    })());
});

self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);
    if (url.origin !== self.location.origin) return;

    const isStatic = url.pathname.includes('/fonts/') || url.pathname.includes('/vendor/') || url.pathname.includes('/icons/');
    if (isStatic) {
        event.respondWith((async () => {
            const cache = await caches.open(VERSION);
            const hit = await cache.match(req);
            if (hit) return hit;
            const res = await fetch(req);
            if (res.ok) cache.put(req, res.clone());
            return res;
        })());
        return;
    }

    event.respondWith((async () => {
        const cache = await caches.open(VERSION);
        try {
            const res = await fetch(req);
            if (res.ok) cache.put(req, res.clone());
            return res;
        } catch (e) {
            const hit = await cache.match(req, { ignoreSearch: true });
            if (hit) return hit;
            if (req.mode === 'navigate') {
                const shell = await cache.match('index.html');
                if (shell) return shell;
            }
            throw e;
        }
    })());
});
