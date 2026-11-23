/* 六线谱自检：每首歌每一行都要出得来音，且音都在合法位置 */
const path = require('path');
global.window = global;
const dir = path.resolve(__dirname, '..', 'assets');
require(path.join(dir, 'chords.js'));
require(path.join(dir, 'play.js'));
require(path.join(dir, 'songs.js'));
require(path.join(dir, 'tab.js'));

const { SONGS, Play, Tab, Chords } = global;

let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('  ✗ ' + m); } };

/* 1. 拍数分配 */
ok(Tab.splitBeats(1, 8).join() === '8', '1 个和弦应占满 8 拍');
ok(Tab.splitBeats(2, 8).join() === '4,4', '2 个和弦 4+4');
ok(Tab.splitBeats(3, 8).join() === '2,3,3', '3 个和弦 2+3+3，实际 ' + Tab.splitBeats(3, 8));
ok(Tab.splitBeats(4, 8).join() === '2,2,2,2', '4 个和弦 2+2+2+2');
ok(Tab.splitBeats(1, 6).join() === '6', '3/4 一行 6 拍');

/* 2. 一行 → 和弦序列 */
ok(Tab.chordsOf('[C]池塘[C]边').join() === 'C', '相邻重复和弦只算一次');
ok(Tab.chordsOf('[C]a[G]b[C]c').join() === 'C,G,C', '隔开的重复和弦要保留');
ok(Tab.chordsOf('没有和弦').length === 0, '纯文字行没有和弦');

/* 3. 全曲遍历 */
let lines = 0, notes = 0, empty = 0, badChord = [], maxPitches = 0;
const bad = new Set();

SONGS.forEach(song => {
  song.sections.forEach(sec => {
    const pat = Play.handFor(song, sec.n);
    const P = Play.PATTERNS[pat];
    sec.l.forEach(line => {
      if (!/\[/.test(line)) return;
      lines++;
      const L = Tab.layout(line, P, song.time);
      if (!L) { empty++; bad.add(song.title + ' / ' + sec.n); return; }

      if (L.notes.length === 0) { empty++; bad.add(song.title + ' / ' + sec.n); return; }
      notes += L.notes.length;

      L.notes.forEach(n => {
        if (n.s < 1 || n.s > 6) bad.add('弦号越界 ' + song.title);
        if (n.f < 0 || n.f > 15) bad.add('品数越界 ' + song.title + ' ' + n.f);
      });

      // 每个和弦都要有指法
      L.marks.forEach(m => {
        if (!Tab.fretsOf(m.name)) {
          badChord.push(song.title + ' ' + m.name);
          bad.add('无指法 ' + m.name + ' @ ' + song.title);
        }
      });

      // 同一个小节里，音不能超出两小节范围
      const maxG = L.grid * L.bars - 1;
      L.notes.forEach(n => { if (n.g > maxG) bad.add('越界 ' + song.title); });
      maxPitches = Math.max(maxPitches, L.notes.length);
    });
  });
});

ok(empty === 0, '有 ' + empty + ' 行出不来音：' + [...bad].slice(0, 6).join('；'));
ok(badChord.length === 0, '缺指法：' + [...new Set(badChord)].slice(0, 8).join('、'));

/* 4. SVG 结构 */
const P43 = Play.PATTERNS.p43;
const L = Tab.layout('[C]池塘边的榕树上[Am]知了在声声叫着夏天', P43, '4/4');
const svg = Tab.svg(L, P43, { time: '4/4' });
ok(svg.startsWith('<svg'), 'SVG 开头正确');
ok((svg.match(/<line/g) || []).length >= 6, '应有六根弦线');
ok(svg.includes('>0<') || svg.includes('>3<'), '应有品格数字');
ok(!svg.includes('NaN'), 'SVG 里不该有 NaN');
ok(!svg.includes('undefined'), 'SVG 里不该有 undefined');

/* 5. 扫弦：G 的六根弦都能弹，一次下扫应同时出 6 个音（C 有闷弦只出 5 个） */
const S8 = Play.PATTERNS.s8;
const LS = Tab.layout('[G]一段[D]一段', S8, '4/4');
const first = LS.notes.filter(n => n.g === 0).length;
ok(first === 6, 'G 的第一次下扫应有 6 个音，实际 ' + first);
ok(LS.notes.filter(n => n.g === 0).every(n => n.f >= 0), '下扫不该带出闷弦');

/* 6. 6/8：一小节两拍、每拍三个八分，分组必须是 3+3 而不是 2+2+2 */
ok(Tab.beatsPerBar('6/8') === 2, '6/8 一小节两拍（附点四分），实际 ' + Tab.beatsPerBar('6/8'));
ok(Tab.beatsPerBar('3/4') === 3, '3/4 一小节三拍');
ok(Tab.beatsPerBar('4/4') === 4, '4/4 一小节四拍');
ok(Tab.beatLabel('6/8', 78) === '附点四分 = 52', '6/8 的拍速标附点四分，实际 ' + Tab.beatLabel('6/8', 78));
ok(Tab.beatLabel('4/4', 100) === '四分音符 = 100', '4/4 标四分音符');
ok(!/[♩♪]/.test(Tab.beatLabel('4/4', 100) + Tab.beatLabel('6/8', 78)), '不要用 ♩／♪ 字形（浏览器会退成怪字形）');

const P6 = Play.PATTERNS.p6;
ok(P6.per === 3, '6/8 每拍三格（三个八分），实际 ' + P6.per);
const L6 = Tab.layout('[G]明天你是否会想起[D]昨天你写的日记', P6, '6/8');
ok(L6.bpb === 2 && L6.grid === 6, '6/8 网格应为 2×3=6，实际 ' + L6.bpb + '×' + P6.per);
ok(L6.bars === 2, '两个和弦占两小节');
ok(L6.marks.map(m => m.beats).join() === '2,2', '两个和弦各一拍组（=一小节 6 个八分）');
ok(L6.notes.length === 12, '两个和弦各六个音，实际 ' + L6.notes.length);
ok(L6.marks[1].beat === 2, '第二个和弦落在第二小节头上（第 3 个八分）');
ok(L6.notes.filter(n => n.g === 0).length === 1, '第一格只有根音一个音');
ok(L6.notes.filter(n => n.g < 6 && n.g >= 3).length >= 2, '后半小节有音（3 之后）');

/* 6/8 一小节的拍号刻线只该有一条：3+3 的中间 */
const svg6 = Tab.svg(L6, P6, { time: '6/8' });
const ticks6 = (svg6.match(/--t-tick/g) || []).length;
ok(ticks6 === 2, '两小节各一条中间刻线（3+3），实际 ' + ticks6);
ok(svg6.includes('>6<') && svg6.includes('>8<'), '拍号应写成 6 在上 8 在下');

/* 四个和弦的前奏行：每和弦半个小节（3 个八分），一个都不能丢 */
const L64 = Tab.layout('[G]   [D]   [Em]   [C]', P6, '6/8');
ok(L64.marks.length === 4, '前奏四个和弦都在，实际 ' + L64.marks.length);
ok(L64.marks.map(m => m.beats).join() === '1,1,1,1', '6/8 四和弦各半小节，实际 ' + L64.marks.map(m => m.beats));
ok(L64.notes.length === 12, '四和弦各三个音，实际 ' + L64.notes.length);

/* 6/8 扫弦：第二格留空，3+3 分组 */
const S6 = Play.PATTERNS.s6;
ok(S6.per === 3, '6/8 扫弦同样每拍三格');
const LS6 = Tab.layout('[G]一段[D]一段', S6, '6/8');
ok(LS6.notes.filter(n => n.g === 1).length === 0, '6/8 扫弦第二格是空（下·下上下上）');

/* 同桌的你：按 6/8 记谱，右手从头到尾分解 */
const tz = SONGS.find(s => s.id === 'tongzhuo');
ok(tz && tz.time === '6/8', '同桌的你应为 6/8 拍');
ok(Play.handFor(tz, '主歌') === 'p6', '同桌的你主歌用 p6');
ok(Play.handFor(tz, '副歌') === 'p6', '同桌的你副歌也是分解，不扫');

/* 同桌的你：和弦走向要对得上教程（C 调、不用变调夹） */
ok(tz.key === 'C' && tz.capo === 0, '同桌的你是 C 调、不夹，实际 ' + tz.key + '/' + tz.capo);
const tzSec = n => tz.sections.find(s => s.n === n);
const tzChords = n => [].concat.apply([], tzSec(n).l.map(Tab.chordsOf));
/* 连写两个一样的和弦会被合并成一个（占满两小节），所以前奏是七个和弦名 */
ok(tzChords('前奏').join(' ') === 'C Em G F Fm Gsus4 G',
  '前奏走向，实际 ' + tzChords('前奏').join(' '));
ok(tzChords('主歌').join(' ') === 'C Em F G C F G7 C',
  '主歌走向，实际 ' + tzChords('主歌').join(' '));
ok(tzChords('副歌').join(' ') === 'C Am Dm Am Em G G7 C',
  '副歌走向，实际 ' + tzChords('副歌').join(' '));
/* 八小节一段：四句词、每句两小节、每小节一个和弦 */
ok(tzSec('主歌').l.length === 4, '主歌四句词');
tzSec('主歌').l.forEach((ln, i) => {
  const L = Tab.layout(ln, P6, '6/8');
  ok(L.bars === 2 && L.marks.length === 2 && L.marks.every(m => m.beats === 2),
    '主歌第 ' + (i + 1) + ' 句两小节、每小节一个和弦');
});
/* F 换 Fm 是这首歌的记号，不能被顺手「改正」成 F */
ok(tzChords('前奏').includes('Fm'), '前奏保留 Fm（四级变小四级）');
ok(Chords.fretboard('Fm').frets.join() === '1,3,3,1,1,1', 'Fm 指法是 133111');
ok(Chords.fretboard('Gsus4').frets.join() === '3,3,0,0,1,3', 'Gsus4 指法是 330013');

console.log('');
console.log('行数 ' + lines + '，音符 ' + notes + '，单行最多 ' + maxPitches + ' 个音');
console.log('通过 ' + pass + ' 项，失败 ' + fail + ' 项');
process.exit(fail ? 1 : 0);
