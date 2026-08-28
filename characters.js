// =============================================================
// 로운네 파티게임 — 팀 캐릭터 (오리지널 동물 아바타 10종)
// 모든 캐릭터는 같은 눈/볼/입 모듈을 공유해 한 세트처럼 보입니다.
// names: 팀 이름 자동 추천 풀 (사용자가 자유롭게 수정 가능)
// =============================================================
(function () {
    // 공용 얼굴 모듈 — 눈(하이라이트 포함) + 볼터치 + 미소
    const EYES = '<circle cx="36" cy="52" r="4" fill="#2E2430"/><circle cx="60" cy="52" r="4" fill="#2E2430"/><circle cx="37.4" cy="50.6" r="1.5" fill="#FFF"/><circle cx="61.4" cy="50.6" r="1.5" fill="#FFF"/>';
    const CHEEKS = '<ellipse cx="25" cy="61" rx="5.5" ry="4" fill="#FF8FA5" opacity=".5"/><ellipse cx="71" cy="61" rx="5.5" ry="4" fill="#FF8FA5" opacity=".5"/>';
    const SMILE = '<path d="M43 61 q5 5 10 0" stroke="#2E2430" stroke-width="2.6" stroke-linecap="round" fill="none"/>';
    const FACE = EYES + CHEEKS + SMILE;

    window.TEAM_CHARS = [
        {
            id: 'fox', label: '여우', color: '#FF8B4A',
            names: ['불꽃여우단', '사막여우즈', '꾀돌이여우', '여우비팀', '주황돌풍'],
            svg: '<circle cx="48" cy="48" r="48" fill="#FFE1C7"/>'
               + '<path d="M22 36 L15 13 L37 24 Z" fill="#FF8B4A"/><path d="M74 36 L81 13 L59 24 Z" fill="#FF8B4A"/>'
               + '<path d="M23 31 L19 19 L31 25 Z" fill="#FFD9BC"/><path d="M73 31 L77 19 L65 25 Z" fill="#FFD9BC"/>'
               + '<ellipse cx="48" cy="53" rx="30" ry="26" fill="#FF9A57"/>'
               + '<ellipse cx="48" cy="63" rx="15" ry="11" fill="#FFF3E2"/>'
               + '<circle cx="48" cy="57" r="2.8" fill="#2E2430"/>' + FACE
        },
        {
            id: 'panda', label: '판다', color: '#6B7280',
            names: ['대나무판다', '뒹굴판다단', '흑백요원', '판다뭉치', '쿵푸꿈나무'],
            svg: '<circle cx="48" cy="48" r="48" fill="#E9F3EA"/>'
               + '<circle cx="24" cy="27" r="10" fill="#3B3543"/><circle cx="72" cy="27" r="10" fill="#3B3543"/>'
               + '<ellipse cx="48" cy="53" rx="30" ry="26" fill="#FFFFFF"/>'
               + '<ellipse cx="35" cy="51" rx="8.5" ry="10" fill="#3B3543" transform="rotate(-14 35 51)"/>'
               + '<ellipse cx="61" cy="51" rx="8.5" ry="10" fill="#3B3543" transform="rotate(14 61 51)"/>'
               + '<circle cx="36.5" cy="52" r="3.4" fill="#FFF"/><circle cx="59.5" cy="52" r="3.4" fill="#FFF"/>'
               + '<circle cx="37" cy="52.5" r="1.8" fill="#2E2430"/><circle cx="60" cy="52.5" r="1.8" fill="#2E2430"/>'
               + '<ellipse cx="48" cy="63" rx="7" ry="5" fill="#F2EDE4"/><circle cx="48" cy="61" r="2.6" fill="#2E2430"/>'
               + CHEEKS + SMILE
        },
        {
            id: 'bunny', label: '토끼', color: '#FF8FB3',
            names: ['당근특공대', '깡총깡총즈', '달토끼팀', '솜뭉치토끼', '귀쫑긋클럽'],
            svg: '<circle cx="48" cy="48" r="48" fill="#FFE7F0"/>'
               + '<rect x="27" y="6" width="14" height="34" rx="7" fill="#FFFFFF"/><rect x="55" y="6" width="14" height="34" rx="7" fill="#FFFFFF"/>'
               + '<rect x="31" y="11" width="6" height="24" rx="3" fill="#FFB7CE"/><rect x="59" y="11" width="6" height="24" rx="3" fill="#FFB7CE"/>'
               + '<ellipse cx="48" cy="54" rx="29" ry="25" fill="#FFFFFF"/>'
               + '<path d="M48 58 l-3 -4 h6 Z" fill="#FF8FB3"/>' + FACE
        },
        {
            id: 'cat', label: '고양이', color: '#FFB637',
            names: ['냥냥펀치', '츄르원정대', '골목대장냥', '야옹클럽', '치즈냥즈'],
            svg: '<circle cx="48" cy="48" r="48" fill="#FFF1CF"/>'
               + '<path d="M23 38 L18 15 L40 26 Z" fill="#FFB637"/><path d="M73 38 L78 15 L56 26 Z" fill="#FFB637"/>'
               + '<path d="M25 33 L22 21 L33 27 Z" fill="#FFD9E4"/><path d="M71 33 L74 21 L63 27 Z" fill="#FFD9E4"/>'
               + '<ellipse cx="48" cy="53" rx="30" ry="26" fill="#FFC24B"/>'
               + '<path d="M40 31 q2 -4 4 0 M52 31 q2 -4 4 0" stroke="#F59E0B" stroke-width="2.6" stroke-linecap="round" fill="none"/>'
               + '<ellipse cx="48" cy="63" rx="12" ry="8" fill="#FFF6E5"/>'
               + '<path d="M48 58 l-2.6 -3.4 h5.2 Z" fill="#E8836F"/>' + FACE
        },
        {
            id: 'puppy', label: '강아지', color: '#8FA9FF',
            names: ['멍뭉파워', '꼬리풍차단', '산책왕멍즈', '간식수호대', '왈왈브라더스'],
            svg: '<circle cx="48" cy="48" r="48" fill="#EAF0FF"/>'
               + '<ellipse cx="20" cy="46" rx="10" ry="17" fill="#B98A63" transform="rotate(12 20 46)"/>'
               + '<ellipse cx="76" cy="46" rx="10" ry="17" fill="#B98A63" transform="rotate(-12 76 46)"/>'
               + '<ellipse cx="48" cy="53" rx="29" ry="26" fill="#EFCB9C"/>'
               + '<ellipse cx="48" cy="64" rx="13" ry="9" fill="#FBEED9"/>'
               + '<ellipse cx="48" cy="57" rx="3.4" ry="2.8" fill="#2E2430"/>'
               + '<ellipse cx="38" cy="36" rx="6" ry="4.5" fill="#D9AC77" opacity=".7"/>' + FACE
        },
        {
            id: 'chick', label: '병아리', color: '#F5C518',
            names: ['삐약삐약즈', '병아리콩팀', '노랑콩알단', '알에서방금', '삐약특공대'],
            svg: '<circle cx="48" cy="48" r="48" fill="#FFF7D1"/>'
               + '<path d="M44 17 q-3 -8 3 -10 M48 16 q0 -9 6 -9" stroke="#E8B009" stroke-width="2.6" stroke-linecap="round" fill="none"/>'
               + '<circle cx="48" cy="54" r="28" fill="#FFD84D"/>'
               + '<path d="M48 60 l-5 -4.5 5 -3 5 3 Z" fill="#FF9F43"/>'
               + '<path d="M22 58 q-6 3 -4 9 M74 58 q6 3 4 9" stroke="#E8B009" stroke-width="3" stroke-linecap="round" fill="none"/>'
               + EYES + CHEEKS
        },
        {
            id: 'frog', label: '개구리', color: '#4CB963',
            names: ['개굴천재단', '폴짝폴짝즈', '연못챔피언', '개굴합창단', '초록번개'],
            svg: '<circle cx="48" cy="48" r="48" fill="#E2F6E4"/>'
               + '<circle cx="30" cy="30" r="12" fill="#6CC777"/><circle cx="66" cy="30" r="12" fill="#6CC777"/>'
               + '<circle cx="30" cy="29" r="6.5" fill="#FFF"/><circle cx="66" cy="29" r="6.5" fill="#FFF"/>'
               + '<circle cx="30.6" cy="29.6" r="3.2" fill="#2E2430"/><circle cx="66.6" cy="29.6" r="3.2" fill="#2E2430"/>'
               + '<ellipse cx="48" cy="56" rx="30" ry="24" fill="#6CC777"/>'
               + '<path d="M38 60 q10 8 20 0" stroke="#2E2430" stroke-width="2.6" stroke-linecap="round" fill="none"/>'
               + '<ellipse cx="27" cy="63" rx="5.5" ry="4" fill="#FF8FA5" opacity=".45"/><ellipse cx="69" cy="63" rx="5.5" ry="4" fill="#FF8FA5" opacity=".45"/>'
        },
        {
            id: 'bear', label: '곰', color: '#A9744F',
            names: ['꿀단지곰돌이', '겨울잠금지', '곰발바닥팀', '숲속불도저', '포근포근즈'],
            svg: '<circle cx="48" cy="48" r="48" fill="#F4E9DC"/>'
               + '<circle cx="25" cy="28" r="10" fill="#B98A63"/><circle cx="71" cy="28" r="10" fill="#B98A63"/>'
               + '<circle cx="25" cy="28" r="5" fill="#E8C9A8"/><circle cx="71" cy="28" r="5" fill="#E8C9A8"/>'
               + '<ellipse cx="48" cy="53" rx="30" ry="26" fill="#C39468"/>'
               + '<ellipse cx="48" cy="63" rx="14" ry="10" fill="#F2DEC3"/>'
               + '<ellipse cx="48" cy="57" rx="3.6" ry="3" fill="#2E2430"/>' + FACE
        },
        {
            id: 'penguin', label: '펭귄', color: '#35507A',
            names: ['뒤뚱뒤뚱즈', '남극신사단', '얼음땡펭귄', '눈보라펭귄', '펭펭원정대'],
            svg: '<circle cx="48" cy="48" r="48" fill="#E1F0FA"/>'
               + '<ellipse cx="48" cy="52" rx="30" ry="27" fill="#3E4A5E"/>'
               + '<ellipse cx="48" cy="58" rx="21" ry="18" fill="#FFFFFF"/>'
               + '<path d="M48 56 l-5.5 -4 5.5 -3.4 5.5 3.4 Z" fill="#FF9F43"/>'
               + '<path d="M17 52 q-4 8 2 13 M79 52 q4 8 -2 13" stroke="#3E4A5E" stroke-width="4" stroke-linecap="round" fill="none"/>'
               + EYES + CHEEKS
        },
        {
            id: 'unicorn', label: '유니콘', color: '#A78BFA',
            names: ['무지개유니콘', '뿔빛기사단', '반짝별똥별', '꿈나라특급', '구름위질주'],
            svg: '<circle cx="48" cy="48" r="48" fill="#F3EBFF"/>'
               + '<path d="M48 4 L43 24 L55 24 Z" fill="#FFC24B"/>'
               + '<path d="M28 22 q-8 2 -9 12 q7 1 12 -4 M68 22 q8 2 9 12 q-7 1 -12 -4" fill="#C9B2FF"/>'
               + '<path d="M22 34 L18 18 L34 26 Z" fill="#FFFFFF"/><path d="M74 34 L78 18 L62 26 Z" fill="#FFFFFF"/>'
               + '<ellipse cx="48" cy="54" rx="29" ry="25" fill="#FFFFFF"/>'
               + '<path d="M25 40 q-7 6 -5 15 q8 -1 11 -8 M71 40 q7 6 5 15 q-8 -1 -11 -8" fill="#FFB7E0"/>'
               + '<path d="M48 58 l-3 -4 h6 Z" fill="#FFB7E0"/>' + FACE
        }
    ];
})();
