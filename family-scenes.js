// =============================================================
// 로운네 파티게임 — 가족 놀이 10초 애니메이션 대본 (놀이 id별)
// 등장인물은 B급 '인간 이모티콘' 가족(family-anim.js): 이름 a=아이, b=엄마, c=아빠, d=할머니 / 리본=딸, 안경=할아버지.
// 시간은 초 단위(0~10). s.char / s.prop로 등장시키고, s.key로 움직이고,
// s.face로 표정, s.cap으로 자막, s.burst로 효과 글자를 띄웁니다. (그림 도구는 family-anim.js)
// =============================================================
(function () {
    'use strict';
    const FA = window.FamilyAnim;
    if (!FA) return;
    const C = FA.COL, F = FA.FLOOR, S = FA.SCENES;

    /* ================= 휴지 챌린지 ================= */
    S['tissue-throw'] = (s) => {
        s.char('a', 95, F, { shirt: C.terra, face: 'smug' })
         .char('b', 318, F, { shirt: C.sage, acc: ['glasses'], flip: true })
         .prop('th', 'tissue', 6, 30, { parent: 'a.handR', s: 0.8 })
         .prop('t', 'tissue', 140, 198, { hidden: true, layer: 'front' })
         .prop('m', 'measure', 100, F + 30, { hidden: true, args: [104] });
        s.cap(0, '휴지 한 장, 펼친 채로 던지기!', '구기거나 접으면 안 돼요');
        s.key('a.armR', [0, { r: 15 }], [1.1, { r: -160 }, 'io'], [1.45, { r: -80 }, 'o'], [2.4, { r: -60 }], [3.2, { r: 10 }, 'io']);
        s.face(1.0, 'a', 'focus').hide(1.45, 'th').show(1.45, 't');
        s.key('t', [1.45, { x: 142, y: 196 }], [2.2, { x: 178, y: 166 }, 'o'], [3.2, { x: 192 }, 'io'], [4.2, { x: 182 }, 'io'], [5.0, { x: 200 }, 'io'], [5.7, { x: 206 }, 'io']);
        s.key('t', [2.2, { y: 166 }], [5.7, { y: F + 16 }, 'io']);
        s.wiggle('t', 'r', 2.2, 5.3, 28, 0.8);
        s.burst(1.55, 186, 140, '휘익~');
        s.face(2.5, 'a', 'shock').cap(2.6, '어라…? 안 날아가요');
        s.face(3.1, 'b', 'laugh').wiggle('b', 'r', 3.1, 6.6, 5, 0.25).burst(3.3, 248, 128, 'ㅋㅋㅋㅋㅋ', { color: C.sage });
        s.show(6.0, 'm').burst(6.2, 168, 236, '고작 1m…', { size: 18, lines: false });
        s.face(6.0, 'a', 'cry');
        s.face(8.2, 'a', 'laugh').face(8.2, 'b', 'proud');
        s.end(8.2, '가장 멀리 날린 사람이 이겨요!');
    };

    S['tissue-forehead'] = (s) => {
        s.prop('mat', 'mat', 200, F + 18)
         .char('a', 262, F - 12, { shirt: C.blue, r: -90 })
         .prop('t', 'tissue', 0, -70, { parent: 'a.face', s: 1.1 })
         .char('b', 350, F, { shirt: C.gold, flip: true, face: 'nervous' });
        s.cap(0, '이마에 휴지 올리고 누워요', '이불이나 매트 위에서');
        s.face(0, 'a', 'closed');
        s.cap(2.0, '손 안 쓰고 일어나기!').face(2.0, 'a', 'strain');
        s.key('a', [2.0, { r: -90, y: F - 12 }], [3.4, { r: -55, y: F - 8 }, 'io'], [4.2, { r: -48 }, 'io'], [5.6, { r: 0, y: F }, 'io']);
        s.wiggle('a.armL', 'r', 2.0, 5.6, 40, 0.35).wiggle('a.armR', 'r', 2.0, 5.6, 40, 0.35);
        s.wiggle('t', 'r', 3.0, 5.8, 14, 0.5);
        s.burst(2.7, 140, 150, '끄응…');
        s.burst(4.3, 230, 120, '흔들흔들', { size: 19 });
        s.face(5.9, 'a', 'proud').face(5.9, 'b', 'laugh').cheer('b', 5.9, 8.0);
        s.burst(6.0, 200, 112, '성공!', { size: 30, color: C.terra });
        s.cap(6.0, '휴지가 안 떨어지면 성공!');
        s.end(8.4, '가장 빨리 일어난 팀이 이겨요!', '떨어지면 다시 누워요');
    };

    S['tissue-blow'] = (s) => {
        s.char('a', 200, F, { shirt: C.sage })
         .char('b', 340, F, { shirt: C.terra, flip: true, acc: ['ribbon'] })
         .prop('t', 'tissue', 212, 104, { layer: 'front' });
        s.cap(0, '입김만으로 휴지 띄우기!', '손이나 몸에 닿으면 안 돼요');
        s.key('a.armR', [0, { r: -170 }], [0.9, { r: -170 }], [1.3, { r: 10 }, 'io']);
        s.face(0.9, 'a', 'blow');
        s.wiggle('t', 'y', 1.1, 6.6, 9, 1.2, 104).wiggle('t', 'x', 1.1, 6.6, 16, 2.2, 200).wiggle('t', 'r', 1.1, 6.6, 22, 0.9);
        s.wiggle('a', 'x', 1.1, 6.6, 12, 2.2, 200).wiggle('a.head', 'r', 1.1, 6.6, 6, 1.1);
        s.burst(1.5, 140, 150, '후~').burst(3.0, 268, 108, '후우~').burst(4.5, 140, 140, '후~!');
        s.face(1.2, 'b', 'focus').burst(3.2, 60, 175, '3초!', { color: C.sage, lines: false }).burst(5.0, 60, 175, '7초!', { color: C.sage, lines: false });
        s.cap(2.2, '보는 사람이 초를 세요', '하나, 둘, 셋…');
        s.key('t', [6.7, { x: 200, y: 104, r: 0 }], [7.3, { x: 201, y: 158, r: 0 }, 'i']);
        s.face(7.3, 'a', 'shock').burst(7.35, 280, 132, '철썩!', { size: 28 }).cap(7.0, '앗, 얼굴에 철썩!');
        s.face(7.6, 'b', 'laugh').burst(7.7, 340, 112, 'ㅋㅋㅋㅋ', { size: 20, color: C.sage });
        s.end(8.5, '가장 오래 띄운 사람 승!');
    };

    S['tissue-pull'] = (s) => {
        s.char('a', 160, F, { shirt: C.plum, face: 'smug' })
         .prop('tb', 'table', 200, 214, { layer: 'front', args: [260] })
         .prop('bx', 'tissueBox', 238, 214, { layer: 'front', s: 0.85 });
        const tt = [1.2, 1.75, 2.25, 2.7, 3.1, 3.5, 3.85, 4.2, 4.55, 4.9, 5.25, 5.6];
        tt.forEach((t, i) => {
            const n = 't' + i, side = i % 2 ? 1 : -1, tx = 225 + side * (30 + (i * 23) % 120);
            s.prop(n, 'tissue', 238, 190, { layer: 'front', hidden: true, s: 0.8 });
            s.show(t, n).arc(n, t, t + 0.75, [238, 186], [tx, F + 14], 60 + (i % 3) * 12, side * 260);
        });
        s.key('a.armL', [0, { r: 25 }]);
        s.wiggle('a.armR', 'r', 1.0, 5.9, 18, 0.42, -128);
        s.face(1.0, 'a', 'focus').face(3.2, 'a', 'strain').face(6.0, 'a', 'proud');
        s.cap(0, '한 손으로 한 장씩 뽑기!', '30초 동안');
        s.burst(1.4, 335, 140, '1장').burst(3.2, 335, 140, '6장!').burst(5.0, 335, 140, '11장!!', { color: C.terra });
        s.cap(3.0, '점점 빨라져요!');
        s.end(7.8, '가장 많이 뽑은 팀 승!', '뽑은 휴지는 다른 놀이에 다시 써요');
    };

    S['tissue-roll'] = (s) => {
        s.prop('st', 'strip', 84, F + 18, { sx: 1 })
         .char('a', 52, F, { shirt: C.gold })
         .prop('r', 'roll', 84, F + 4, { layer: 'front' })
         .prop('gap', `<rect x="-4" y="-6" width="8" height="12" fill="#f8f1e2"/>`, 252, F + 18, { hidden: true })
         .prop('m', 'measure', 84, F + 32, { hidden: true, args: [166] });
        s.cap(0, '두루마리를 굴려서 풀어요', '끝을 손으로 잡고');
        s.key('a.armR', [0, { r: 20 }], [0.9, { r: -40 }, 'io'], [1.3, { r: -80 }, 'o']);
        s.key('r', [1.2, { x: 84, r: 0, s: 1 }], [5.4, { x: 340, r: 1260, s: 0.72 }, 'o']);
        s.key('st', [1.2, { sx: 1 }], [5.4, { sx: 256 }, 'o']);
        s.face(1.2, 'a', 'focus').face(2.6, 'a', 'laugh').cap(2.4, '끊기지 않게 길~게!');
        s.burst(2.0, 200, 210, '데굴데굴~');
        s.show(6.2, 'gap').burst(6.25, 252, 236, '툭!', { size: 28 }).face(6.3, 'a', 'shock').cap(6.2, '툭! 끊어지면 거기까지');
        s.show(6.9, 'm').face(7.2, 'a', 'cry');
        s.end(8.3, '가장 길게 풀린 팀 승!');
    };

    S['tissue-mummy'] = (s) => {
        s.char('b', 108, F, { shirt: C.terra, face: 'laugh' })
         .char('m', 200, F, { shirt: C.blue, face: 'shock' })
         .char('c', 292, F, { shirt: C.sage, flip: true, face: 'laugh', acc: ['glasses'] });
        const wraps = [[F + 6, 0.5, 4], [F - 12, 0.5, -5], [F - 28, 0.54, 4], [F - 46, 0.58, -3], [F - 114, 0.78, 5], [F - 130, 0.62, -6]];
        wraps.forEach(([y, sx, r], i) => {
            const n = 'w' + i, t = 1.3 + i * 0.6;
            s.prop(n, 'wrap', 200, y, { layer: 'front', sx: 0, r });
            s.key(n, [t, { sx: 0 }], [t + 0.35, { sx: sx }, 'back']);
        });
        s.wiggle('b.armR', 'r', 1.2, 5.0, 40, 0.4, -90).wiggle('c.armR', 'r', 1.2, 5.0, 40, 0.4, -90);
        s.wiggle('b', 'x', 1.2, 5.0, 8, 0.8, 108).wiggle('c', 'x', 1.2, 5.0, 8, 0.8, 292);
        s.cap(0, '1분 안에 미라 만들기!', '팀원 한 명을 휴지로 감아요');
        s.burst(1.6, 60, 150, '빙글빙글', { size: 19 });
        s.cap(3.4, '코와 입은 감지 마세요!');
        s.key('m', [5.6, { sx: 1 }], [5.9, { sx: -1 }, 'io'], [6.2, { sx: 1 }, 'io'], [6.5, { sx: -1 }, 'io'], [6.8, { sx: 1 }, 'io']);
        s.face(6.8, 'm', 'proud').burst(6.9, 200, 104, '짜잔!', { size: 30, color: C.terra });
        s.cheer('b', 6.9, 8.6).cheer('c', 6.9, 8.6);
        s.end(8.4, '가장 멋진 미라 팀 승!', '다른 팀이 투표해요');
    };

    S['tissue-coin'] = (s) => {
        s.char('a', 72, F, { shirt: C.terra, face: 'nervous' })
         .char('b', 328, F, { shirt: C.plum, flip: true, face: 'nervous' })
         .prop('tb', 'table', 200, 236, { layer: 'front', args: [360] })
         .prop('g', 'glass', 200, 236, { layer: 'front', s: 2.1 })
         .prop('tp', `<path d="M-36 -4 q18 -5 36 0 q18 5 36 0 v7 q-18 -5 -36 0 q-18 5 -36 0z" fill="#fffdf6" stroke="#2a2622" stroke-width="2"/>`, 200, 164, { layer: 'front' })
         .prop('cn', 'coin', 200, 158, { layer: 'front', s: 1.5 });
        const holes = [[174, 164, 1.8, 'a'], [226, 165, 3.0, 'b'], [186, 166, 4.2, 'a'], [214, 163, 5.4, 'b']];
        holes.forEach(([x, y, t, who], i) => {
            s.prop('h' + i, `<circle r="3" fill="#2a2622"/>`, x, y, { layer: 'front', hidden: true });
            s.show(t, 'h' + i).burst(t, x + (who === 'a' ? -18 : 18), y - 30, '콕', { size: 18, lines: false });
            s.key(who + '.armR', [t - 0.5, { r: 10 }], [t - 0.1, { r: -105 }, 'io'], [t + 0.4, { r: 10 }, 'io']);
        });
        s.cap(0, '컵 위 휴지에 동전을 올리고', '고무줄로 휴지를 팽팽하게');
        s.cap(1.6, '돌아가며 콕! 구멍 하나씩');
        s.cap(5.0, '조마조마…').face(5.0, 'a', 'strain');
        s.key('b.armR', [6.0, { r: 10 }], [6.3, { r: -105 }, 'io'], [6.8, { r: 10 }, 'io']);
        s.key('cn', [6.35, { y: 158, r: 0 }], [6.85, { y: 226, r: 40 }, 'i']);
        s.burst(6.5, 268, 150, '툭!', { size: 28 }).face(6.4, 'b', 'shock').face(7.1, 'b', 'cry').face(6.9, 'a', 'laugh');
        s.cap(6.4, '동전을 떨어뜨리면 져요!');
        s.end(8.3, '동전을 지킨 팀 승!', '이쑤시개는 어른과 함께');
    };

    S['tube-bowling'] = (s) => {
        s.char('a', 66, F, { shirt: C.blue, face: 'smug' })
         .prop('bl', 'sock', 96, F + 8, { layer: 'front', hidden: true });
        const tubes = [[288, F + 20], [310, F + 20], [332, F + 20], [299, F - 4], [321, F - 4], [310, F - 28]];
        tubes.forEach(([x, y], i) => {
            s.prop('tu' + i, 'tube', x, y, { layer: 'back' });
            s.arc('tu' + i, 2.75 + i * 0.03, 3.55 + i * 0.05, [x, y], [236 + i * 25, F + 20], 40 + i * 8, (i % 2 ? 1 : -1) * (200 + i * 40));
        });
        s.cap(0, '다 쓴 휴지심을 쌓아요', '양말 뭉치를 공으로');
        s.key('a.armR', [0.6, { r: 30 }], [1.1, { r: -50 }, 'io'], [1.4, { r: -30 }]);
        s.face(0.9, 'a', 'focus').show(1.25, 'bl');
        s.key('bl', [1.25, { x: 96, r: 0 }], [2.8, { x: 298, r: 900 }, 'o']).key('bl', [2.8, { x: 298 }], [3.4, { x: 318 }, 'o']);
        s.cap(1.3, '데굴데굴~ 굴려서!');
        s.burst(2.85, 300, 160, '와장창!', { size: 30, color: C.terra });
        s.face(3.0, 'a', 'shock').face(3.6, 'a', 'laugh').jump('a', 3.6, 26).jump('a', 4.2, 18);
        s.burst(4.4, 200, 160, '6개 다!', { color: C.sage });
        s.cap(4.2, '쓰러뜨린 개수가 점수');
        s.end(7.8, '팀원 점수를 더해서 승부!');
    };

    /* ================= 탁자 챌린지 ================= */
    S['flip-cup'] = (s) => {
        s.char('a', 120, F, { shirt: C.terra })
         .char('b', 285, F, { shirt: C.sage, flip: true, acc: ['ribbon'] })
         .prop('tb', 'table', 200, 214, { layer: 'front', args: [320] })
         .prop('c1', 'cup', 160, 214, { layer: 'front' })
         .prop('c2', 'cup', 245, 214, { layer: 'front' });
        s.cap(0, '탁자 끝 컵을 손가락으로 톡!', '컵 입구가 위로');
        s.key('a.armR', [0.6, { r: 10 }], [1.0, { r: -60 }, 'io'], [1.15, { r: -95 }, 'o'], [1.8, { r: 10 }, 'io']);
        s.burst(1.1, 138, 186, '톡!', { size: 20, lines: false });
        s.arc('c1', 1.15, 1.85, [160, 214], [160, 188], 46, 180);
        s.burst(1.95, 160, 150, '성공!', { color: C.sage }).face(1.95, 'a', 'proud');
        s.cap(1.9, '뒤집혀서 서면 다음 사람!');
        s.key('b.armR', [2.6, { r: 10 }], [3.0, { r: -60 }, 'io'], [3.15, { r: -95 }, 'o'], [3.8, { r: 10 }, 'io']);
        s.arc('c2', 3.15, 3.8, [245, 214], [236, 202], 40, -270);
        s.key('c2', [3.8, { x: 236, r: -270 }], [4.4, { x: 214, r: -450 }, 'o']);
        s.burst(3.9, 205, 160, '또르르~', { size: 19 }).face(3.9, 'b', 'shock').face(4.4, 'b', 'cry');
        s.cap(3.9, '실패하면 다시 톡!');
        s.key('c2', [4.79, { x: 214, y: 202, r: -450 }], [4.8, { x: 245, y: 214, r: 0 }, 'step']);
        s.key('b.armR', [5.0, { r: 10 }], [5.4, { r: -60 }, 'io'], [5.55, { r: -95 }, 'o'], [6.2, { r: 10 }, 'io']);
        s.arc('c2', 5.55, 6.25, [245, 214], [245, 188], 46, 180);
        s.face(6.3, 'b', 'proud').face(6.3, 'a', 'laugh').cheer('a', 6.3, 7.8).cheer('b', 6.3, 7.8);
        s.burst(6.35, 245, 150, '성공!', { color: C.sage });
        s.end(8.0, '마지막 사람까지 먼저 끝낸 팀 승!');
    };

    S['pingpong-cup'] = (s) => {
        s.char('a', 84, F, { shirt: C.gold, face: 'smug' })
         .prop('tb', 'table', 220, 214, { layer: 'front', args: [320] })
         .prop('k1', 'cup', 300, 214, { layer: 'front' }).prop('k2', 'cup', 324, 214, { layer: 'front' }).prop('k3', 'cup', 348, 214, { layer: 'front' })
         .prop('b1', 'ball', 128, 200, { layer: 'front', hidden: true })
         .prop('b2', 'ball', 128, 200, { layer: 'front', hidden: true })
         .prop('x', 'xmark', 348, 160, { layer: 'fx', hidden: true });
        s.cap(0, '탁구공을 한 번 튕겨서!');
        s.key('a.armR', [0.5, { r: 10 }], [1.0, { r: -140 }, 'io'], [1.3, { r: -70 }, 'o'], [2.0, { r: 10 }, 'io']);
        s.face(0.9, 'a', 'focus').show(1.3, 'b1');
        s.arc('b1', 1.3, 1.85, [128, 200], [220, 206], 44).arc('b1', 1.85, 2.45, [220, 206], [324, 186], 54);
        s.key('b1', [2.45, { y: 186 }], [2.65, { y: 204 }, 'i']).hide(2.7, 'b1');
        s.burst(1.9, 220, 182, '통!', { size: 20, lines: false }).burst(2.65, 324, 150, '쏙!', { color: C.terra });
        s.face(2.7, 'a', 'proud').cap(2.7, '컵에 쏙 들어가면 1점');
        s.key('a.armR', [3.4, { r: 10 }], [3.8, { r: -140 }, 'io'], [4.1, { r: -70 }, 'o'], [4.8, { r: 10 }, 'io']);
        s.show(4.1, 'b2').arc('b2', 4.1, 4.9, [128, 200], [348, 186], 70).key('b2', [4.9, { y: 186 }], [5.1, { y: 204 }, 'i']).hide(5.15, 'b2');
        s.show(5.2, 'x').burst(5.25, 290, 132, '무효!', { color: C.red }).face(5.2, 'a', 'shock');
        s.cap(5.2, '바로 넣으면 안 세요', '꼭 한 번 튕겨야 해요');
        s.face(6.6, 'a', 'laugh');
        s.end(7.9, '1분 동안 많이 넣은 팀 승!');
    };

    S['bottle-flip'] = (s) => {
        s.char('a', 110, F, { shirt: C.blue, face: 'smug' })
         .char('b', 292, F, { shirt: C.terra, flip: true })
         .prop('tb', 'table', 200, 214, { layer: 'front', args: [320] })
         .prop('bt', 'bottle', 150, 222, { layer: 'front', s: 0.8, r: -20 })
         .prop('bt2', 'bottle', 250, 222, { layer: 'front', s: 0.8, r: 20, hidden: true });
        s.cap(0, '물병을 휙! 한 바퀴', '뚜껑은 꼭 닫아요');
        s.key('a.armR', [0.4, { r: 10 }], [0.9, { r: -110 }, 'io'], [1.2, { r: -40 }, 'o'], [1.8, { r: 10 }, 'io']);
        s.key('bt', [0.4, { x: 150, y: 222, r: -20 }], [0.9, { x: 150, y: 204, r: -40 }, 'io']);
        s.arc('bt', 1.2, 2.1, [150, 204], [165, 214], 72, 380);
        s.burst(2.15, 165, 132, '탁!', { size: 30 }).face(2.2, 'a', 'proud').cheer('a', 2.2, 3.4);
        s.cap(2.1, '똑바로 서면 성공!');
        s.show(3.4, 'bt2');
        s.key('b.armR', [3.4, { r: 10 }], [3.9, { r: -110 }, 'io'], [4.2, { r: -40 }, 'o'], [4.8, { r: 10 }, 'io']);
        s.key('bt2', [3.4, { x: 250, y: 222, r: 20 }], [3.9, { x: 250, y: 204, r: 40 }, 'io']);
        s.arc('bt2', 4.2, 5.0, [250, 204], [236, 210], 70, -300);
        s.key('bt2', [5.0, { r: -300 + 40, x: 236, y: 210 }], [5.2, { r: -450, y: 206 }, 'i'], [6.0, { r: -630, x: 205 }, 'o']);
        s.burst(5.2, 270, 168, '데굴데굴', { size: 19 }).face(5.1, 'b', 'shock').face(6.0, 'b', 'cry');
        s.cap(5.1, '넘어지면 다음 사람');
        s.face(6.4, 'a', 'laugh');
        s.end(7.8, '1분 동안 많이 세운 팀 승!');
    };

    S['ball-blow'] = (s) => {
        const xs = [120, 160, 200, 240, 280];
        s.char('a', 66, F, { shirt: C.plum })
         .prop('tb', 'table', 214, 214, { layer: 'front', args: [320] });
        xs.forEach((x, i) => s.prop('k' + i, 'cup', x, 214, { layer: 'front' }));
        s.prop('bl', 'ball', 120, 181, { layer: 'front' });
        s.cap(0, '입김으로 탁구공을 옆 컵으로!');
        s.key('a', [0.6, { r: 0 }], [1.0, { r: 14 }, 'io']);
        s.face(1.0, 'a', 'blow');
        const hop = [1.4, 2.7, 4.0, 5.3];
        hop.forEach((t, i) => {
            s.arc('bl', t, t + 0.55, [xs[i], 181], [xs[i + 1], 181], 22);
            s.burst(t, xs[i] + 4, 148, '후~', { size: 18, lines: false });
        });
        s.cap(1.4, '후~ 폴짝!', '손을 대면 안 돼요');
        s.face(6.0, 'a', 'proud').key('a', [6.0, { r: 14 }], [6.4, { r: 0 }, 'io']).cheer('a', 6.4, 7.8);
        s.burst(6.0, 280, 138, '성공!', { size: 28, color: C.terra });
        s.end(7.8, '마지막 컵까지 먼저 간 팀 승!', '물컵에 띄우면 더 쉬워요');
    };

    S['balloon-cups'] = (s) => {
        const xs = [220, 252, 284, 316, 348];
        s.char('a', 104, F, { shirt: C.sage })
         .prop('tb', 'table', 240, 214, { layer: 'front', args: [300] });
        xs.forEach((x, i) => s.prop('k' + i, 'cup', x, 188, { layer: 'front', r: 180 }));
        s.prop('bn', 'balloonBare', 150, 200, { layer: 'front', s: 1.3, r: 90, args: [C.red] });
        s.cap(0, '풍선을 묶지 말고 잡아요');
        s.key('a.armR', [0, { r: -75 }]).key('a.armL', [0, { r: -40 }]);
        s.face(0.6, 'a', 'focus');
        s.cap(1.0, '빠지는 바람으로 컵을 쓰러뜨려요');
        s.burst(1.1, 192, 176, '피쉬~', { size: 18, lines: false });
        [1.7, 2.5, 3.3, 4.1].forEach((t, i) => {
            s.key('k' + i, [t, { r: 180, y: 188, x: xs[i] }], [t + 0.3, { r: 270, y: 202, x: xs[i] + 12 }, 'i']);
            s.burst(t + 0.1, xs[i], 150, '톡', { size: 17, lines: false });
        });
        s.key('bn', [1.0, { s: 1.3 }], [4.8, { s: 0.8 }, 'lin']);
        s.key('bn', [5.0, { x: 150, y: 200, r: 90 }], [5.4, { x: 250, y: 120, r: 300 }, 'o'], [5.8, { x: 340, y: 160, r: 520 }, 'io'], [6.3, { x: 200, y: 95, r: 760 }, 'io'], [6.8, { x: 60, y: 140, r: 980, s: 0.5 }, 'io']);
        s.face(5.0, 'a', 'shock').burst(5.3, 300, 110, '피유우~!', { color: C.red }).cap(5.0, '앗! 놓치면 날아가요');
        s.face(7.0, 'a', 'laugh');
        s.end(8.0, '1분에 많이 쓰러뜨린 팀 승!');
    };

    S['cookie-face'] = (s) => {
        s.char('a', 200, F + 92, { shirt: C.gold, s: 1.7 })
         .prop('ck', 'cookie', 0, -74, { parent: 'a.face' });
        s.cap(0, '이마에 과자를 올리고', '고개를 뒤로 젖혀요');
        s.key('a.head', [0.4, { r: 0 }], [1.0, { r: -14 }, 'io']);
        s.wiggle('a.head', 'r', 1.2, 6.6, 9, 0.7, -14);
        s.key('ck', [1.2, { x: 0, y: -74 }], [2.2, { x: 4, y: -64 }, 'io'], [3.0, { x: -3, y: -58 }, 'io'], [3.8, { x: 3, y: -50 }, 'io'], [4.6, { x: -4, y: -45 }, 'io'], [5.4, { x: 2, y: -36 }, 'io'], [6.2, { x: 0, y: -29 }, 'io'], [6.9, { x: 0, y: -19 }, 'io']);
        s.wiggle('ck', 'r', 1.2, 6.8, 20, 0.6);
        s.face(1.2, 'a', 'focus').face(2.6, 'a', 'strain').face(4.0, 'a', 'focus').face(5.2, 'a', 'blow').face(6.2, 'a', 'shock');
        s.cap(1.2, '손 없이 얼굴만 꿈틀꿈틀');
        s.burst(1.9, 82, 160, '꿈틀꿈틀', { size: 19 }).burst(4.5, 322, 150, '으으…');
        s.hide(7.0, 'ck').face(7.0, 'a', 'laugh').key('a.head', [6.9, { r: -14 }], [7.2, { r: 0 }, 'io']);
        s.burst(7.05, 312, 140, '냠!', { size: 32, color: C.terra });
        s.end(7.8, '먼저 먹은 사람 승!');
    };

    S['straw-paper'] = (s) => {
        const cols = [C.terra, C.blue, C.gold, C.sage];
        s.char('a', 128, F, { shirt: C.blue, face: 'focus' })
         .prop('sw', 'straw', 6, -18, { parent: 'a.face', r: 110, s: 0.62 })
         .prop('tb', 'table', 200, 214, { layer: 'front', args: [320] })
         .prop('p1', 'plate', 130, 212, { layer: 'front' }).prop('p2', 'plate', 270, 212, { layer: 'front' });
        [[120, 206], [131, 207], [141, 205], [126, 203]].forEach(([x, y], i) => s.prop('q' + i, 'bit', x, y, { layer: 'front', s: 1.4, args: [cols[i]] }));
        const trips = [[1.0, 2.6, 0], [3.2, 4.5, 1], [5.0, 6.0, 2]];
        trips.forEach(([t0, t1, i]) => {
            const back = t0 - 0.6;
            if (i > 0) s.key('a', [back, { x: 268 }], [t0, { x: 128 }, 'io']);
            s.key('q' + i, [t0, { x: [120, 131, 141][i], y: [206, 207, 205][i] }], [t0 + 0.25, { x: 130, y: 209 }, 'o']);
            s.key('a', [t0 + 0.3, { x: 128 }], [t1 - 0.25, { x: 268 }, 'io']);
            s.key('q' + i, [t0 + 0.3, { x: 130 }], [t1 - 0.25, { x: 270 }, 'io']);
            s.key('q' + i, [t1 - 0.2, { y: 209 }], [t1, { y: 206 + i, x: 262 + i * 6 }, 'i']);
            s.burst(t0 + 0.1, 92, 168, '쭉~', { size: 19, lines: false }).burst(t1 - 0.1, 300, 172, '툭', { size: 18, lines: false });
        });
        s.cap(0, '빨대로 쭉! 종이를 붙여서');
        s.cap(2.5, '옆 접시에 툭!', '손은 쓰면 안 돼요');
        s.face(6.2, 'a', 'proud');
        s.end(7.6, '1분 동안 많이 옮긴 팀 승!');
    };

    S['cup-tower'] = (s) => {
        s.char('a', 84, F, { shirt: C.terra, face: 'smug' })
         .prop('tb', 'table', 228, 214, { layer: 'front', args: [300] });
        const pos = [[161, 214], [187, 214], [213, 214], [239, 214], [174, 188], [200, 188], [226, 188], [187, 162], [213, 162], [200, 136]];
        pos.forEach(([x, y], i) => {
            const n = 'k' + i, sy = 214 - (9 - i) * 3, t = 1.0 + i * 0.3, back = 5.0 + (9 - i) * 0.18;
            s.prop(n, 'cup', 330, sy, { layer: 'front' });
            s.arc(n, t, t + 0.3, [330, sy], [x, y], 24);
            s.arc(n, back, back + 0.22, [x, y], [330, sy], 14);
        });
        s.cap(0, '컵 10개로 피라미드!', '4 - 3 - 2 - 1');
        s.wiggle('a.armR', 'r', 1.0, 4.0, 30, 0.3, -100).wiggle('a.armR', 'r', 5.0, 6.8, 30, 0.3, -100);
        s.face(1.0, 'a', 'focus').face(4.2, 'a', 'proud').face(5.0, 'a', 'strain').face(7.0, 'a', 'proud');
        s.burst(4.2, 312, 150, '완성!', { color: C.sage }).cap(4.3, '다 쌓으면…');
        s.cap(4.9, '다시 한 줄로 포개기!');
        s.burst(7.0, 300, 150, '7초!', { size: 28, color: C.terra }).cheer('a', 7.0, 8.4);
        s.end(7.8, '가장 빨리 포갠 팀 승!', '어린이는 6개(3-2-1)로');
    };

    S['cap-curling'] = (s) => {
        s.char('a', 44, F, { shirt: C.red })
         .char('b', 128, F, { shirt: C.blue, acc: ['glasses'] })
         .prop('tb', 'table', 210, 214, { layer: 'front', args: [360] })
         .prop('tg', 'target', 318, 210, { layer: 'front' })
         .prop('c1', 'capRed', 80, 209, { layer: 'front' })
         .prop('c2', 'capBlue', 150, 209, { layer: 'front', hidden: true });
        s.cap(0, '병뚜껑을 톡! 튕겨서');
        s.key('a.armR', [0.6, { r: 10 }], [1.0, { r: -75 }, 'io'], [1.3, { r: 10 }, 'io']);
        s.key('c1', [1.0, { x: 80 }], [2.2, { x: 302 }, 'o3']);
        s.burst(1.0, 92, 182, '톡!', { size: 18, lines: false }).face(2.3, 'a', 'proud');
        s.cap(2.2, '과녁 한가운데로!');
        s.show(3.1, 'c2').key('b.armR', [3.1, { r: 10 }], [3.5, { r: -75 }, 'io'], [3.8, { r: 10 }, 'io']);
        s.key('c2', [3.5, { x: 150 }], [4.4, { x: 302 }, 'lin'], [4.9, { x: 318 }, 'o3']);
        s.key('c1', [4.4, { x: 302 }], [5.0, { x: 372 }, 'o3']);
        s.burst(4.42, 300, 178, '딱!', { size: 28 }).face(4.6, 'a', 'shock').face(5.3, 'a', 'cry').face(4.8, 'b', 'laugh');
        s.cap(4.4, '상대 뚜껑을 밀어내도 돼요');
        s.face(6.2, 'b', 'proud').cheer('b', 6.2, 7.6);
        s.end(7.8, '과녁에 가장 가까운 팀 승!');
    };

    /* ================= 몸 챌린지 ================= */
    S['butt-writing'] = (s) => {
        s.prop('tr', 'trail', 22, 104, { draw: 0, layer: 'fx', s: 0.9 })
         .char('a', 150, F, { shirt: C.plum, face: 'back' })
         .char('b', 272, F, { shirt: C.terra, flip: true, face: 'puzzled' })
         .char('c', 350, F, { shirt: C.sage, flip: true, acc: ['ribbon'], face: 'puzzled' });
        s.cap(0, '엉덩이로 글자 쓰기!', '팀원에게 등을 돌리고');
        s.key('tr', [1.2, { draw: 0 }], [5.2, { draw: 1 }, 'lin']);
        s.key('a', [1.2, { x: 150 }], [2.2, { x: 136 }, 'io'], [3.2, { x: 160 }, 'io'], [4.2, { x: 140 }, 'io'], [5.2, { x: 156 }, 'io'], [5.8, { x: 150 }, 'io']);
        s.wiggle('a', 'r', 1.2, 5.6, 9, 0.4);
        s.key('a', [1.2, { sy: 1 }], [1.5, { sy: 0.92 }], [5.6, { sy: 0.92 }], [6.0, { sy: 1 }]);
        s.burst(1.6, 222, 220, '씰룩씰룩', { size: 19 });
        s.cap(1.4, '공중에 크게 쓱싹쓱싹');
        s.prop('q1', 'bubble', 268, 112, { hidden: true, args: ['사…자?', 70], layer: 'fx' });
        s.prop('q2', 'bubble', 348, 120, { hidden: true, args: ['사과!', 62], layer: 'fx' });
        s.show(5.4, 'q1').hide(7.0, 'q1').show(6.4, 'q2').hide(8.3, 'q2');
        s.cap(5.4, '팀원은 글자를 맞혀요');
        s.face(6.4, 'c', 'shout').face(7.2, 'a', 'proud').face(7.2, 'b', 'laugh').face(7.2, 'c', 'laugh');
        s.burst(7.2, 222, 112, '정답!', { size: 30, color: C.terra });
        s.end(8.4, '1분 동안 많이 맞힌 팀 승!');
    };
    S['rubber-face'] = (s) => {
        s.char('a', 200, F + 92, { shirt: C.terra, s: 1.7 })
         .prop('bd', 'band', 0, -34, { parent: 'a.face' });
        s.cap(0, '머리끈을 코에 걸고', '느슨한 머리끈을 써요');
        s.key('bd', [1.2, { y: -34, sx: 1 }], [2.0, { y: -28 }, 'back'], [2.8, { y: -28 }], [3.4, { y: -21 }, 'back'], [4.2, { y: -21 }], [4.8, { y: -12, sx: 0.92 }, 'back'], [5.6, { y: -12 }], [6.3, { y: 2, sx: 0.66 }, 'back']);
        s.wiggle('a.head', 'r', 1.2, 6.3, 11, 0.36);
        s.face(1.2, 'a', 'strain').face(2.3, 'a', 'focus').face(3.4, 'a', 'shout').face(4.4, 'a', 'nervous').face(5.4, 'a', 'strain');
        s.cap(1.2, '손 없이 얼굴만 꿈틀꿈틀!');
        s.burst(1.8, 84, 150, '꿈틀!').burst(3.5, 318, 150, '으아아').burst(5.2, 84, 170, '쭈욱~');
        s.face(6.4, 'a', 'proud').burst(6.5, 316, 122, '성공!', { size: 30, color: C.terra });
        s.cap(6.4, '목까지 내려오면 성공!');
        s.end(7.8, '먼저 내린 사람 승!');
    };

    S['shake-box'] = (s) => {
        s.char('a', 200, F, { shirt: C.gold, face: 'back' })
         .prop('bx', 'box', 0, -26, { parent: 'a.back' })
         .prop('n1', 'note8', 92, 132, { layer: 'fx', hidden: true }).prop('n2', 'note8', 312, 126, { layer: 'fx', hidden: true });
        const land = [[118, 1.6], [286, 2.6], [150, 3.4], [258, 4.3], [206, 5.4]];
        land.forEach(([x, t], i) => {
            s.prop('bl' + i, 'ball', 200, 236, { layer: 'front', hidden: true });
            s.show(t, 'bl' + i).arc('bl' + i, t, t + 0.7, [200, 236], [x, F + 14], 50 + i * 6, 0);
        });
        s.cap(0, '빈 휴지 곽을 허리에 묶고', '탁구공 5개를 넣어요');
        s.show(1.0, 'n1').show(1.0, 'n2').wiggle('n1', 'y', 1.0, 6.2, 8, 0.6, 132).wiggle('n2', 'y', 1.0, 6.2, 8, 0.6, 126);
        s.wiggle('a', 'r', 1.0, 6.0, 13, 0.32).wiggle('a', 'x', 1.0, 6.0, 9, 0.64, 200);
        s.wiggle('a.armL', 'r', 1.0, 6.0, 30, 0.64, 60).wiggle('a.armR', 'r', 1.0, 6.0, 30, 0.64, -60);
        s.cap(1.0, '엉덩이만 흔들흔들!', '점프·손 금지');
        s.burst(1.3, 92, 200, '흔들흔들~', { size: 19 });
        s.cap(3.6, '공이 하나씩 퐁퐁');
        s.burst(3.5, 318, 190, '3개!', { color: C.sage, lines: false });
        s.hide(6.2, 'n1').hide(6.2, 'n2').hide(6.2, 'bx').face(6.2, 'a', 'proud').burst(6.0, 300, 150, '다 뺐다!', { color: C.terra });
        s.end(7.8, '먼저 다 뺀 사람 승!');
    };

    S['spoon-nose'] = (s) => {
        s.char('a', 128, F, { shirt: C.blue, face: 'closed' })
         .char('b', 288, F, { shirt: C.terra, flip: true, face: 'smug', acc: ['ribbon'] })
         .prop('sp', 'spoon', 0, -28, { parent: 'a.face', s: 1.3, hidden: true })
         .prop('sh', 'spoon', 10, 26, { parent: 'a.handR', r: -150, s: 1.2 })
         .prop('sf', 'spoon', 128, 186, { layer: 'front', hidden: true, s: 1.3 });
        s.cap(0, '숟가락에 입김 호~', '그다음 콧등에 착!');
        s.key('a.armR', [0, { r: -150 }], [1.2, { r: -150 }], [1.5, { r: 10 }, 'io']);
        s.burst(0.4, 196, 160, '호~', { size: 18, lines: false });
        s.hide(1.3, 'sh').show(1.3, 'sp').cap(1.3, '콧등에 착! 버티기');
        s.face(2.2, 'b', 'focus').burst(2.3, 232, 116, '메롱~', { color: C.terra }).wiggle('b', 'r', 2.2, 5.2, 8, 0.4);
        s.face(3.4, 'b', 'shout').face(4.4, 'b', 'laugh').jump('b', 3.6, 18).jump('b', 4.6, 18);
        s.face(2.6, 'a', 'strain').face(4.0, 'a', 'nervous').cap(2.4, '웃기면 떨어져요…');
        s.face(5.4, 'a', 'laugh').hide(5.5, 'sp').show(5.5, 'sf');
        s.key('sf', [5.5, { x: 128, y: 186, r: 0 }], [6.1, { x: 150, y: F + 14, r: 200 }, 'i']);
        s.burst(6.1, 186, 236, '땡그랑!', { size: 24 });
        s.face(6.3, 'b', 'proud').cheer('b', 6.3, 7.8);
        s.end(7.8, '마지막까지 버틴 사람 승!');
    };

    S['balloon-keep'] = (s) => {
        s.char('a', 84, F, { shirt: C.terra }).char('b', 200, F, { shirt: C.sage, acc: ['glasses'] }).char('c', 316, F, { shirt: C.blue, acc: ['ribbon'] })
         .prop('bn', 'balloon', 84, 100, { layer: 'front', args: [C.gold], s: 0.9 });
        const path = [[84, 'a'], [200, 'b'], [316, 'c'], [200, 'b'], [84, 'a'], [200, 'b'], [316, 'c']];
        for (let i = 0; i < path.length - 1; i++) {
            const t = 0.8 + i * 0.75, [x0] = path[i], [x1, who] = path[i + 1];
            s.arc('bn', t, t + 0.75, [x0, 100], [x1, 100], 14, (i % 2 ? 1 : -1) * 25);
            s.key(path[i][1] + '.armR', [t - 0.25, { r: 10 }], [t, { r: -165 }, 'o'], [t + 0.35, { r: 10 }, 'io']);
            s.burst(t + 0.05, x0 + 32, 104, (i + 1) + '번', { size: 18, lines: false, dur: 0.5 });
        }
        s.cap(0, '풍선이 바닥에 닿지 않게!');
        s.cap(1.6, '같은 사람이 연달아 치면 안 돼요');
        s.face(1.0, 'a', 'focus').face(1.0, 'b', 'focus').face(1.0, 'c', 'focus');
        s.key('bn', [5.3, { x: 316, y: 100, r: 0 }], [6.4, { x: 262, y: F - 10, r: 50 }, 'io']);
        s.face(6.0, 'c', 'shock').face(6.0, 'b', 'shock').burst(6.45, 262, 210, '통…', { size: 22 });
        s.cap(6.3, '바닥에 닿으면 끝!');
        s.face(7.0, 'a', 'laugh').face(7.0, 'b', 'laugh').face(7.0, 'c', 'cry');
        s.end(8.0, '가장 많이 친 팀 승!');
    };

    S['balloon-knees'] = (s) => {
        s.prop('cn', 'cone', 338, F + 20, { layer: 'front' })
         .char('b', 40, F, { shirt: C.plum, face: 'nervous' })
         .char('a', 112, F, { shirt: C.terra, face: 'strain' })
         .prop('ba', 'balloonBare', 0, -12, { parent: 'a.back', s: 0.55, args: [C.red] })
         .prop('bb', 'balloonBare', 0, -12, { parent: 'b.back', s: 0.55, args: [C.red], hidden: true });
        s.cap(0, '무릎 사이에 풍선을 끼고');
        s.walk('a', 112, 318, 0.8, 3.0, { leg: 10, bob: 3, steps: 12 });
        s.key('a', [3.05, { sx: 1 }], [3.2, { sx: -1 }, 'step']);
        s.walk('a', 318, 112, 3.3, 5.4, { leg: 10, bob: 3, steps: 12 });
        s.cap(0.9, '반환점까지 종종걸음!', '손은 쓰면 안 돼요');
        s.burst(1.4, 200, 150, '종종종종', { size: 20 }).burst(3.0, 290, 130, '뒤뚱뒤뚱', { size: 20 });
        s.cap(5.4, '다음 사람에게 쏙!');
        s.hide(5.6, 'ba').show(5.7, 'bb').burst(5.65, 76, 112, '패스!', { color: C.sage });
        s.face(5.7, 'a', 'proud').face(5.9, 'b', 'strain');
        s.key('a', [5.75, { sx: -1 }], [5.8, { sx: 1 }, 'step']).walk('a', 112, 336, 5.85, 7.1, { leg: 16, bob: 3, steps: 6 });
        s.walk('b', 40, 220, 6.2, 7.8, { leg: 10, bob: 3, steps: 9 });
        s.end(8.2, '가장 먼저 돌아온 팀 승!');
    };

    S['newspaper-island'] = (s) => {
        s.prop('np', 'newspaper', 200, F + 20, { layer: 'back' })
         .char('a', 158, F, { shirt: C.terra }).char('b', 200, F, { shirt: C.sage, acc: ['ribbon'] }).char('c', 242, F, { shirt: C.blue, acc: ['glasses'] });
        s.cap(0, '신문지 위에 모두 올라서요');
        s.cap(1.4, '가위바위보 지면 반으로!');
        s.burst(1.5, 330, 150, '졌다!', { color: C.red });
        s.key('np', [2.0, { sx: 1 }], [2.5, { sx: 0.55 }, 'io']);
        s.key('a', [2.4, { x: 158 }], [2.9, { x: 180 }, 'io']).key('c', [2.4, { x: 242 }], [2.9, { x: 220 }, 'io']);
        s.key('b', [2.4, { y: F }], [2.9, { y: F - 34 }, 'back']);
        s.face(2.5, 'b', 'shock').face(2.9, 'a', 'strain').face(2.9, 'c', 'strain');
        s.cap(3.6, '또 반으로! 꼭 붙어요');
        s.key('np', [3.8, { sx: 0.55 }], [4.3, { sx: 0.3 }, 'io']);
        s.key('a', [4.2, { x: 180 }], [4.7, { x: 190 }, 'io']).key('c', [4.2, { x: 220, r: 0 }], [4.7, { x: 212, r: 8 }, 'io']);
        s.key('a.legL', [4.4, { r: 0 }], [4.8, { r: 70 }, 'io']);
        s.wiggle('a', 'r', 4.8, 6.0, 4, 0.3).wiggle('b', 'r', 4.8, 6.0, 5, 0.34);
        s.key('c', [5.6, { x: 212, r: 8 }], [6.1, { x: 262, r: 28 }, 'io'], [6.4, { x: 274, r: 0 }, 'o']);
        s.face(5.8, 'c', 'shock').face(6.4, 'c', 'cry').burst(6.3, 330, 150, '탈락!', { color: C.red });
        s.cap(5.8, '밖으로 나가면 탈락');
        s.face(6.8, 'a', 'proud').face(6.8, 'b', 'laugh');
        s.end(7.9, '끝까지 버틴 팀 승!');
    };

    S['spoon-relay'] = (s) => {
        s.char('a', 64, F, { shirt: C.gold, face: 'strain' })
         .prop('sa', 'spoonFlat', 6, -20, { parent: 'a.face' })
         .prop('ba', 'ball', 12, -27, { parent: 'a.face', s: 0.8 })
         .char('b', 300, F, { shirt: C.blue, flip: true, face: 'nervous' })
         .prop('sb', 'spoonFlat', 6, -20, { parent: 'b.face' })
         .prop('bb', 'ball', 12, -27, { parent: 'b.face', s: 0.8, hidden: true })
         .prop('bf', 'ball', 240, 183, { layer: 'front', hidden: true, s: 0.8 });
        s.cap(0, '숟가락을 입에 물고', '손은 뒤로!');
        s.key('a.armL', [0, { r: 30 }]).key('a.armR', [0, { r: -30 }]);
        s.walk('a', 64, 230, 0.8, 4.0, { leg: 14, bob: 2, steps: 10 });
        s.wiggle('a.head', 'r', 0.8, 4.0, 4, 0.5);
        s.cap(1.0, '탁구공을 떨어뜨리지 말고');
        s.burst(2.0, 150, 132, '조심조심', { size: 20 });
        s.cap(4.2, '다음 사람 숟가락으로 쏙!');
        s.hide(4.3, 'ba').show(4.3, 'bf').arc('bf', 4.3, 4.9, [244, 183], [286, 183], 16).hide(4.95, 'bf').show(4.95, 'bb');
        s.burst(5.0, 265, 106, '전달 성공!', { color: C.sage }).face(5.0, 'a', 'proud').face(5.0, 'b', 'focus');
        s.key('b', [5.4, { sx: -1 }], [5.5, { sx: 1 }, 'step']);
        s.walk('b', 300, 348, 5.7, 7.2, { leg: 14, bob: 2, steps: 6 });
        s.end(7.8, '가장 먼저 돌아온 팀 승!');
    };

    /* ================= 말·눈치·그림 ================= */
    S['blind-drawing'] = (s) => {
        s.char('m', 310, F, { shirt: C.plum, flip: true, face: 'smug', acc: ['ribbon'] })
         .char('a', 92, F, { shirt: C.sage, face: 'neutral' })
         .prop('pp', 'paper', 170, 210, { layer: 'front', s: 1.1 })
         .prop('dr', 'drawing', 170, 210, { layer: 'front', draw: 0, s: 1.1 });
        s.key('m.armR', [0, { r: 30 }]).key('m.armL', [0, { r: -150 }]);
        s.cap(0, '모델을 10초 보고 눈을 감아요');
        s.face(1.4, 'a', 'closed').cap(1.4, '눈 감고 쓱쓱 그리기!', '눈을 뜨면 안 돼요');
        s.wiggle('a.armR', 'r', 1.5, 5.8, 22, 0.3, -70);
        s.key('dr', [1.5, { draw: 0 }], [5.8, { draw: 1 }, 'lin']);
        s.burst(2.0, 60, 130, '쓱쓱', { size: 19 }).burst(4.2, 60, 130, '여긴 코…?', { size: 18 });
        s.key('pp', [6.0, { x: 170, y: 210, s: 1.1 }], [6.5, { x: 200, y: 190, s: 1.7 }, 'back']).key('dr', [6.0, { x: 170, y: 210, s: 1.1 }], [6.5, { x: 200, y: 190, s: 1.7 }, 'back']);
        s.cap(6.0, '짜잔! 공개!').face(6.0, 'a', 'proud');
        s.face(6.5, 'm', 'shock').burst(6.6, 318, 110, '누구야?!', { color: C.red }).face(7.3, 'm', 'laugh').face(7.3, 'a', 'laugh').burst(7.4, 300, 104, 'ㅋㅋㅋㅋㅋ', { color: C.sage });
        s.end(8.0, '가장 닮은 그림 승!', '가장 웃긴 그림 상도 좋아요');
    };

    S['nunchi'] = (s) => {
        const xs = [['a', 66, C.terra, []], ['b', 156, C.sage, ['glasses']], ['c', 246, C.blue, []], ['d', 336, C.plum, ['ribbon']]];
        xs.forEach(([n, x, col, acc]) => { s.char(n, x, F + 10, { shirt: col, acc, face: 'nervous', sy: 1 }); s.key(n, [0, { sy: 0.82, y: F + 12 }]); });
        s.cap(0, '모두 앉아서 눈치 보기…');
        const up = (n, t, x, num, col) => {
            s.key(n, [t, { sy: 0.82, y: F + 12 }], [t + 0.2, { sy: 1.05, y: F - 18 }, 'o'], [t + 0.45, { sy: 1, y: F }, 'i']);
            s.burst(t + 0.15, x, 96, num, { size: 30, color: col || '#2a2622', lines: false });
        };
        s.cap(1.1, '아무나 "1!" 하고 일어나요');
        up('b', 1.2, 156, '1!'); s.face(1.4, 'b', 'proud');
        up('d', 2.4, 336, '2!'); s.face(2.6, 'd', 'proud');
        up('a', 3.8, 66, '3!', C.red); up('c', 3.8, 246, '3!', C.red);
        s.face(4.1, 'a', 'shock').face(4.1, 'c', 'shock').burst(4.4, 156, 150, '겹쳤다!', { size: 28, color: C.red });
        s.cap(4.2, '같은 숫자를 외치면 걸려요!');
        s.face(5.4, 'a', 'cry').face(5.4, 'c', 'cry').face(5.4, 'b', 'laugh').face(5.4, 'd', 'laugh');
        s.end(7.6, '걸린 사람이 적은 팀 승!');
    };

    S['silent-shout'] = (s) => {
        s.char('a', 74, F, { shirt: C.terra })
         .char('b', 200, F, { shirt: C.sage, acc: ['phones'], flip: true, face: 'puzzled' })
         .char('c', 326, F, { shirt: C.blue, acc: ['phones'], flip: true, face: 'puzzled' })
         .prop('nt', 'note', 74, 104, { layer: 'fx', hidden: true, args: ['떡볶이'], s: 1.3 })
         .prop('q1', 'bubble', 128, 104, { layer: 'fx', hidden: true, args: ['떡볶이!!', 80] })
         .prop('q2', 'bubble', 256, 104, { layer: 'fx', hidden: true, args: ['떡…뽀끼?', 82] })
         .prop('q3', 'bubble', 300, 104, { layer: 'fx', hidden: true, args: ['똑딱이!', 72] })
         .prop('m1', 'note8', 246, 140, { layer: 'fx' }).prop('m2', 'note8', 368, 140, { layer: 'fx' });
        s.wiggle('m1', 'y', 0, 6.4, 6, 0.5, 140).wiggle('m2', 'y', 0, 6.4, 6, 0.5, 140);
        s.cap(0, '헤드폰 음악 때문에 안 들려요');
        s.show(0.5, 'nt').hide(1.6, 'nt');
        s.face(1.8, 'a', 'shout').show(1.8, 'q1').hide(3.2, 'q1').key('a.armR', [1.8, { r: -120 }], [3.2, { r: 10 }, 'io']);
        s.cap(1.8, '입 모양만 보고 전달!');
        s.face(3.4, 'b', 'shout').show(3.4, 'q2').hide(4.8, 'q2').face(3.4, 'a', 'neutral');
        s.face(5.0, 'c', 'shout').show(5.0, 'q3').hide(6.4, 'q3').face(5.0, 'b', 'puzzled');
        s.cap(5.0, '마지막 사람이 외치면…');
        s.face(6.4, 'a', 'laugh').face(6.4, 'b', 'laugh').face(6.4, 'c', 'laugh').burst(6.5, 200, 104, 'ㅋㅋㅋㅋㅋㅋ', { size: 28, color: C.red });
        s.end(7.8, '정확히 전달한 팀 승!');
    };

    S['one-voice'] = (s) => {
        s.char('h', 54, F, { shirt: C.gold, face: 'smug' })
         .char('a', 190, F, { shirt: C.terra, flip: true })
         .char('b', 268, F, { shirt: C.sage, flip: true, acc: ['ribbon'] })
         .char('c', 346, F, { shirt: C.blue, flip: true, acc: ['glasses'] })
         .prop('hq1', 'bubble', 96, 104, { layer: 'fx', args: ['짜장 vs 짬뽕?', 118] })
         .prop('hq2', 'bubble', 96, 104, { layer: 'fx', hidden: true, args: ['산 vs 바다?', 104] })
         .prop('r1', 'bubble', 190, 104, { layer: 'fx', hidden: true, args: ['짜장!', 56] })
         .prop('r2', 'bubble', 268, 104, { layer: 'fx', hidden: true, args: ['짜장!', 56] })
         .prop('r3', 'bubble', 346, 104, { layer: 'fx', hidden: true, args: ['짬뽕!', 56] })
         .prop('s1', 'bubble', 190, 104, { layer: 'fx', hidden: true, args: ['바다!', 56] })
         .prop('s2', 'bubble', 268, 104, { layer: 'fx', hidden: true, args: ['바다!', 56] })
         .prop('s3', 'bubble', 346, 104, { layer: 'fx', hidden: true, args: ['바다!', 56] });
        s.cap(0, '둘 중 하나를 골라요');
        s.hide(1.5, 'hq1').cap(1.5, '하나, 둘, 셋! 동시에 외치기');
        ['a', 'b', 'c'].forEach((n, i) => { s.face(1.7, n, 'shout').show(1.7, 'r' + (i + 1)).hide(3.4, 'r' + (i + 1)); });
        s.face(2.6, 'c', 'shock').face(2.6, 'a', 'puzzled').face(2.6, 'b', 'puzzled').burst(2.7, 300, 150, '땡!', { color: C.red });
        s.show(3.8, 'hq2').hide(5.0, 'hq2');
        ['a', 'b', 'c'].forEach((n, i) => { s.face(5.2, n, 'shout').show(5.2, 's' + (i + 1)).hide(6.6, 's' + (i + 1)); });
        s.cap(5.2, '모두 같으면 1점!');
        ['a', 'b', 'c'].forEach(n => s.face(6.6, n, 'laugh').cheer(n, 6.6, 8.0));
        s.burst(6.7, 268, 104, '이구동성!', { size: 28, color: C.terra });
        s.end(8.0, '같은 답이 많은 팀 승!');
    };

    S['forehead-word'] = (s) => {
        s.char('a', 126, F, { shirt: C.blue, face: 'puzzled' })
         .prop('nt', 'note', 0, -66, { parent: 'a.face', args: ['펭귄'], s: 1.1 })
         .char('b', 292, F, { shirt: C.terra, flip: true, face: 'smug', acc: ['ribbon'] })
         .prop('q1', 'bubble', 140, 100, { layer: 'fx', hidden: true, args: ['먹는 거예요?', 104] })
         .prop('q2', 'bubble', 280, 100, { layer: 'fx', hidden: true, args: ['아니요!', 66] })
         .prop('q3', 'bubble', 140, 100, { layer: 'fx', hidden: true, args: ['동물이에요?', 100] })
         .prop('q4', 'bubble', 280, 100, { layer: 'fx', hidden: true, args: ['네!', 46] })
         .prop('q5', 'bubble', 140, 100, { layer: 'fx', hidden: true, args: ['펭귄!', 60] });
        s.cap(0, '이마의 낱말, 나만 몰라요');
        s.show(1.2, 'q1').hide(2.3, 'q1').show(2.3, 'q2').hide(3.3, 'q2').cap(1.2, '예·아니요로만 답해요');
        s.show(3.4, 'q3').hide(4.5, 'q3').show(4.5, 'q4').hide(5.5, 'q4');
        s.face(4.6, 'a', 'focus').face(5.5, 'a', 'shout').show(5.6, 'q5').hide(7.0, 'q5');
        s.face(6.2, 'b', 'laugh').face(6.2, 'a', 'proud').burst(6.3, 212, 150, '정답!', { size: 30, color: C.terra });
        s.end(7.8, '적은 질문으로 맞힌 팀 승!');
    };

    S['fold-finger'] = (s) => {
        const P = [['a', 72, C.terra, ['glasses'], 2], ['b', 200, C.sage, ['ribbon'], 4], ['c', 328, C.blue, [], 3]];
        P.forEach(([n, x, col, acc, start]) => {
            s.char(n, x, F, { shirt: col, acc, face: 'nervous' });
            s.key(n + '.armR', [0, { r: -160 }]);
            for (let k = 0; k <= 5; k++) s.prop(n + 'h' + k, 'hand' + k, x + 40, 118, { layer: 'fx', hidden: k !== start, s: 1.2 });
        });
        const fold = (n, t, from) => { s.hide(t, n + 'h' + from).show(t, n + 'h' + (from - 1)).burst(t, (n === 'a' ? 72 : n === 'b' ? 200 : 328) - 30, 112, '접!', { size: 20, lines: false, dur: 0.6 }); };
        s.cap(0, '"○○한 사람 접어!"', '해당하면 손가락 하나 접기');
        s.cap(1.3, '안경 쓴 사람 접어!');
        fold('a', 2.0, 2); s.face(2.0, 'a', 'shock');
        s.cap(3.2, '아침밥 먹은 사람 접어!');
        fold('a', 3.9, 1); fold('c', 3.9, 3);
        s.face(4.1, 'a', 'cry').burst(4.3, 72, 110, '탈락!', { color: C.red }).cap(4.3, '다 접으면 탈락!');
        s.face(4.4, 'b', 'smug').face(4.4, 'c', 'strain');
        s.face(6.0, 'b', 'proud').cheer('b', 6.0, 7.6);
        s.end(7.6, '끝까지 남은 사람 승!', '겉모습 말고 오늘 한 일로 정해요');
    };

    S['rps-minus-one'] = (s) => {
        s.char('a', 112, F, { shirt: C.terra })
         .char('b', 288, F, { shirt: C.blue, flip: true, acc: ['glasses'] })
         .prop('aL', 'rock', 66, 114, { layer: 'fx', hidden: true, s: 1.2 }).prop('aR', 'paperHand', 158, 114, { layer: 'fx', hidden: true, s: 1.2 })
         .prop('bL', 'scissors', 242, 114, { layer: 'fx', hidden: true, s: 1.2 }).prop('bR', 'rock', 334, 114, { layer: 'fx', hidden: true, s: 1.2 });
        s.cap(0, '두 손으로 가위바위보!');
        ['a', 'b'].forEach(n => s.key(n + '.armL', [0.6, { r: 20 }], [1.0, { r: 150 }, 'back']).key(n + '.armR', [0.6, { r: -20 }], [1.0, { r: -150 }, 'back']));
        s.burst(0.7, 200, 168, '가위바위보!', { size: 20, lines: false });
        ['aL', 'aR', 'bL', 'bR'].forEach(n => s.show(1.0, n));
        s.face(1.0, 'a', 'focus').face(1.0, 'b', 'focus');
        s.cap(2.4, '"하나 빼기!"');
        s.burst(2.5, 200, 168, '하나 빼기!', { size: 20, color: C.terra, lines: false });
        s.hide(3.0, 'aL').key('a.armL', [3.0, { r: 150 }], [3.3, { r: 20 }, 'io']);
        s.hide(3.0, 'bL').key('b.armL', [3.0, { r: 150 }], [3.3, { r: 20 }, 'io']);
        s.cap(3.4, '남은 손으로 승부!', '보 vs 바위');
        s.face(4.0, 'a', 'proud').face(4.0, 'b', 'cry').burst(4.1, 200, 168, '이겼다!', { color: C.sage, lines: false });
        s.cheer('a', 4.4, 6.0);
        s.end(7.6, '먼저 3번 이긴 사람 승!');
    };

})();
