/* 右手引擎自检：node test/play_test.js */
const path = require('path');
global.window = global;
const dir = path.resolve(__dirname, '..', 'assets');
require(path.join(dir, 'chords.js'));
require(path.join(dir, 'play.js'));
require(path.join(dir, 'songs.js'));

const C = global.Chords;
const P = global.Play;
const SONGS = global.SONGS;

let pass = 0, fail = 0;
function ok(cond, msg) {
  if (cond) { pass++; }
  else { fail++; console.log('FAIL ' + msg); }
}

/* 1. 童年：主歌分解、副歌扫弦 */
const tn = SONGS.find(s => s.id === 'tongnian');
ok(P.handFor(tn, '主歌 A') === 'p43', '童年主歌应为 p43，实际 ' + P.handFor(tn, '主歌 A'));
ok(P.handFor(tn, '副歌') === 's8', '童年副歌应为 s8');
ok(P.handFor(tn, '前奏') === 'p43', '童年前奏应为 p43');

/* 2. 原调 = 谱面调 + 变调夹 */
const hotel = SONGS.find(s => s.id === 'hotel');
ok(C.transpose(hotel.key, hotel.capo) === 'Bm', 'Hotel 原调应为 Bm，实际 ' + C.transpose(hotel.key, hotel.capo));
const wall = SONGS.find(s => s.id === 'wonderwall');
ok(C.transpose(wall.key, wall.capo) === 'F#m', 'Wonderwall 原调应为 F#m，实际 ' + C.transpose(wall.key, wall.capo));
ok(C.transpose(tn.key, tn.capo) === 'C', '童年原调应为 C');

/* 4. 弦位谱逐格核对：行是弦（第一行是一弦），列是音符 */
function parseTab(html) {
  const cols = Number(/--c:(\d+)/.exec(html)[1]);
  const cells = [...html.matchAll(/<i class="[^"]*">([^<]*)<\/i>/g)].map(m => m[1]);
  const rows = [];
  for (let r = 0; r < 6; r++) rows.push(cells.slice(r * cols, (r + 1) * cols));
  return rows;
}
function expectTab(chord, patKey, spec, label) {
  const rows = parseTab(P.tabHtml(chord, P.PATTERNS[patKey]));
  Object.keys(spec).forEach(function (strNo) {
    const want = spec[strNo];
    const got = rows[Number(strNo) - 1];   // rows[0] 是一弦
    ok(JSON.stringify(got) === JSON.stringify(want),
      label + ' ' + strNo + '弦：期望 ' + JSON.stringify(want) + ' 实际 ' + JSON.stringify(got));
  });
}
const blank = n => new Array(n).fill('');
const put = (n, map) => { const a = blank(n); Object.keys(map).forEach(k => a[Number(k)] = map[k]); return a; };

expectTab('C', 'p43', {
  1: put(8, { 4: '0' }),
  2: put(8, { 2: '1', 6: '1' }),
  3: put(8, { 1: '0', 3: '0', 5: '0', 7: '0' }),
  4: blank(8),
  5: put(8, { 0: '3' }),
  6: blank(8)
}, 'C 根-3-2-3');

expectTab('D', 'p43', {
  1: put(8, { 4: '2' }),
  2: put(8, { 2: '3', 6: '3' }),
  3: put(8, { 1: '2', 3: '2', 5: '2', 7: '2' }),
  4: put(8, { 0: '0' }),
  5: blank(8),
  6: blank(8)
}, 'D 根-3-2-3');

expectTab('G', 'p43', {
  1: put(8, { 4: '3' }),
  2: put(8, { 2: '0', 6: '0' }),
  3: put(8, { 1: '0', 3: '0', 5: '0', 7: '0' }),
  6: put(8, { 0: '3' })
}, 'G 根-3-2-3');

expectTab('Am', 'palt', {
  1: blank(8),
  2: put(8, { 2: '1', 6: '1' }),
  3: put(8, { 1: '2', 3: '2', 5: '2', 7: '2' }),
  5: put(8, { 0: '0', 4: '0' })
}, 'Am 交替低音');
ok(P.bassText('C') === '根音在5弦3品', 'bassText(C) 实际 ' + P.bassText('C'));
ok(P.bassText('G') === '根音在6弦3品', 'bassText(G) 实际 ' + P.bassText('G'));
ok(P.bassText('D') === '根音在4弦空弦', 'bassText(D) 实际 ' + P.bassText('D'));

/* 4. 每一首、每一段都能算出演奏型、能出谱，且不出现 × / NaN / undefined */
let pickRows = 0, strumRows = 0, badCells = [];
SONGS.forEach(song => {
  song.sections.forEach(sec => {
    const pat = P.resolve(song, sec.n);
    ok(!!pat, song.title + '/' + sec.n + ' 没有演奏型');
    if (!pat) return;
    if (pat.type === 'pick') {
      pickRows++;
      const chord = P.firstChord(sec.l);
      if (!chord) return;
      const html = P.tabHtml(chord, pat);
      if (!html) badCells.push(song.title + ' ' + sec.n + ' 无指法图 ' + chord);
      if (html.includes('×')) badCells.push(song.title + ' ' + sec.n + ' 拨到了闷弦 ' + chord + ' / ' + pat.name);
      if (/NaN|undefined/.test(html)) badCells.push(song.title + ' ' + sec.n + ' 含 NaN/undefined');
    } else {
      strumRows++;
      if (/NaN|undefined/.test(P.strumHtml(pat))) badCells.push(song.title + ' 扫弦渲染异常');
    }
  });
});
ok(badCells.length === 0, '弦位谱异常：\n  ' + badCells.slice(0, 12).join('\n  '));

/* 5. 面板：不能出现 undefined，分组数不超过段数 */
let panelBad = 0;
SONGS.forEach(song => {
  const h = P.panel(song, { semi: 0, flat: C.prefersFlat(song.key), linesOf: i => song.sections[i].l });
  if (/undefined|NaN/.test(h)) { panelBad++; console.log('  panel 异常：' + song.title); }
});
ok(panelBad === 0, '有 ' + panelBad + ' 首面板渲染异常');

/* 6. 变调后面板仍然正确（和弦名跟着变） */
const pHotel = P.panel(hotel, { semi: 2, flat: false, linesOf: i => hotel.sections[i].l });
ok(pHotel.includes('Bm'), 'Hotel +2 后应出现 Bm');

/* 7. 所有拨弦型的弦号都在 1..6 */
Object.keys(P.PATTERNS).forEach(k => {
  const p = P.PATTERNS[k];
  p.steps.forEach(st => {
    if (typeof st === 'number') ok(st >= 1 && st <= 6, k + ' 弦号越界 ' + st);
  });
});

console.log('\n拨弦段 ' + pickRows + ' / 扫弦段 ' + strumRows + '，断言 ' + (pass + fail) + ' 条，失败 ' + fail);
process.exit(fail ? 1 : 0);
