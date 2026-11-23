/* ============================================================
 *  和弦引擎：解析 / 变调 / 指法图
 *  没有任何依赖，可以单独引在别的页面里用。
 * ============================================================ */
(function (global) {
  'use strict';

  var SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  var FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
  var NATURAL = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

  function pc(name) {
    if (!name) return -1;
    var v = NATURAL[name[0]];
    if (v === undefined) return -1;
    if (name[1] === '#') v += 1;
    else if (name[1] === 'b') v -= 1;
    return ((v % 12) + 12) % 12;
  }

  function noteName(i, flat) {
    return (flat ? FLAT : SHARP)[((i % 12) + 12) % 12];
  }

  /** 'Am7/G' -> { root:'A', quality:'m7', bass:'G' } */
  function parse(name) {
    var m = /^([A-G][#b]?)([^/]*)(?:\/([A-G][#b]?))?$/.exec(String(name).trim());
    if (!m) return null;
    return { root: m[1], quality: m[2] || '', bass: m[3] || null };
  }

  function isChordToken(s) {
    return !!parse(s);
  }

  function transpose(name, semis, flat) {
    var p = parse(name);
    if (!p) return name;
    if (!semis) return name;
    var out = noteName(pc(p.root) + semis, flat) + p.quality;
    if (p.bass) out += '/' + noteName(pc(p.bass) + semis, flat);
    return out;
  }

  /** 判断一个调性名，用来决定变调后用 # 还是 b 记谱 */
  function prefersFlat(key) {
    return /b/.test(key || '');
  }

  /* ------------------------------------------------------------
   *  手写指法表
   *  六个字符 = 六弦到一弦（低 E -> 高 e）
   *  x = 不弹，0 = 空弦，数字 = 品
   * ------------------------------------------------------------ */
  var SHAPES = {
    C: 'x32010', 'C#': 'x46664', D: 'xx0232', Eb: 'x68886',
    E: '022100', F: '133211', 'F#': '244322', G: '320003',
    Ab: '466544', A: 'x02220', Bb: 'x13331', B: 'x24442',

    Cm: 'x35543', 'C#m': 'x46654', Dm: 'xx0231', Ebm: 'x68876',
    Em: '022000', Fm: '133111', 'F#m': '244222', Gm: '355333',
    'G#m': '466444', Am: 'x02210', Bbm: 'x13321', Bm: 'x24432',

    C7: 'x32310', 'C#7': 'x46464', D7: 'xx0212', Eb7: 'x68686',
    E7: '020100', F7: '131211', 'F#7': '242322', G7: '320001',
    Ab7: '464544', A7: 'x02020', Bb7: 'x13121', B7: 'x21202',

    Cmaj7: 'x32000', Dmaj7: 'xx0222', Emaj7: '021100', Fmaj7: 'xx3210',
    Gmaj7: '320002', Amaj7: 'x02120', Bmaj7: 'x24342', Bbmaj7: 'x13231',

    Am7: 'x02010', Bm7: 'x20202', Cm7: 'x35343', Dm7: 'xx0211',
    Em7: '020000', Fm7: '131111', 'F#m7': '242222', Gm7: '353333',
    'G#m7': '464444', Bbm7: 'x13121', 'C#m7': 'x46454',

    Csus4: 'x33010', Dsus4: 'xx0233', Esus4: '022200', Fsus4: '133311',
    Gsus4: '330013', Asus4: 'x02230', Bsus4: 'x24452',
    Dsus2: 'xx0230', Asus2: 'x02200', Esus2: '024400',

    Cadd9: 'x32030', Dadd9: 'xx0230', Gadd9: '320203', Aadd9: 'x02200',
    A7sus4: 'x02030', D7sus4: 'xx0213', E7sus4: '020200',

    'C/G': '332010', 'C/E': '032010', 'C/B': 'x22010',
    'D/F#': '2x0232', 'Dm/F': '1x0231', 'Dm/C': 'x30231',
    'G/B': 'x20033', 'G/F#': '2x0003', 'Am/G': '3x2210',
    'Am/E': '002210', 'Em/G': '322000', 'F/A': 'x03211',
    'A/C#': 'x42220', 'Em/B': 'x22000', 'E/G#': '422100',
    'D/A': 'x00232', 'A/E': '002220'
  };

  /* 封闭和弦：E 形（根音在六弦）与 A 形（根音在五弦）。
     任何调都能据此得到一张正确的指法图，不必手写 12 x 7 个。 */
  var E_SHAPE = {
    '': [0, 2, 2, 1, 0, 0],
    m: [0, 2, 2, 0, 0, 0],
    '7': [0, 2, 0, 1, 0, 0],
    maj7: [0, 2, 1, 1, 0, 0],
    m7: [0, 2, 0, 0, 0, 0],
    sus4: [0, 2, 2, 2, 0, 0],
    '7sus4': [0, 2, 0, 2, 0, 0]
  };
  var A_SHAPE = {
    '': [0, 2, 2, 2, 0],
    m: [0, 2, 2, 1, 0],
    '7': [0, 2, 0, 2, 0],
    maj7: [0, 2, 1, 2, 0],
    m7: [0, 2, 0, 1, 0],
    sus4: [0, 2, 2, 3, 0],
    '7sus4': [0, 2, 0, 3, 0]
  };

  var E_ROOT = 4;  // 六弦空弦 E
  var A_ROOT = 9;  // 五弦空弦 A

  function build(root, quality) {
    var target = pc(root);
    if (target < 0) return null;
    var f6 = (target - E_ROOT + 12) % 12;
    var f5 = (target - A_ROOT + 12) % 12;
    if (f6 === 0) f6 = 12;
    if (f5 === 0) f5 = 12;

    // A 形更省手（少按一根弦），但位置太高时退回 E 形
    var useA = f5 <= f6 && f5 <= 9;
    var offsets = useA ? A_SHAPE[quality] : E_SHAPE[quality];
    if (!offsets) return null;
    var base = useA ? f5 : f6;
    var frets = useA ? [null] : [];
    for (var k = 0; k < offsets.length; k++) frets.push(base + offsets[k]);
    if (frets.length < 6) frets.unshift(null);
    return frets;
  }

  function toFrets(str) {
    var out = [];
    for (var i = 0; i < str.length; i++) {
      var c = str[i];
      out.push(c === 'x' ? -1 : Number(c));
    }
    return out;
  }

  /** 找指法：先查手写表，再按形状生成 */
  function fretboard(name) {
    if (!name) return null;
    var direct = SHAPES[name];
    if (direct) return { frets: toFrets(direct), exact: true };

    var p = parse(name);
    if (!p) return null;
    var canon = noteName(pc(p.root), false) + p.quality;
    if (SHAPES[canon]) return { frets: toFrets(SHAPES[canon]), exact: true };

    var gen = build(noteName(pc(p.root), false), p.quality);
    if (gen) return { frets: gen, exact: false };

    // 斜杠和弦没单独收录时，退回根音的形状并标注低音
    if (p.bass) {
      var rootOnly = fretboard(noteName(pc(p.root), false) + p.quality);
      if (rootOnly) return { frets: rootOnly.frets, exact: false, over: p.bass };
    }
    return null;
  }

  /** 从指法推断横按：0 起算的弦索引，0 = 六弦 */
  function inferBarre(frets) {
    var positive = [];
    for (var i = 0; i < frets.length; i++) {
      if (frets[i] > 0) positive.push([i, frets[i]]);
    }
    if (positive.length < 2) return null;
    var min = Math.min.apply(null, positive.map(function (x) { return x[1]; }));
    var at = positive.filter(function (x) { return x[1] === min; }).map(function (x) { return x[0]; });
    if (at.length < 2) return null;
    var from = Math.min.apply(null, at);
    var to = Math.max.apply(null, at);
    // 横按的两端必须落在六弦/五弦与一弦上，否则只是三根弦的指型
    if (from > 1 || to !== 5) return null;
    for (var j = from; j <= to; j++) {
      if (frets[j] <= 0) return null;
      if (frets[j] < min) return null;
    }
    return { fret: min, from: from, to: to };
  }

  /* ------------------------------------------------------------
   *  指法图（SVG）
   * ------------------------------------------------------------ */
  var GAP_X = 14;
  var GAP_Y = 17;
  var PAD_L = 16;
  var PAD_T = 27;
  var PAD_R = 9;
  var PAD_B = 11;

  function svg(name, opts) {
    opts = opts || {};
    var fb = fretboard(name);
    if (!fb) {
      return '<div class="dia dia-none"><span>' + esc(name) + '</span></div>';
    }
    var frets = fb.frets;
    var played = frets.filter(function (f) { return f > 0; });
    var hasOpen = frets.some(function (f) { return f === 0; });
    var maxF = played.length ? Math.max.apply(null, played) : 1;
    var minF = played.length ? Math.min.apply(null, played) : 1;
    var base = (hasOpen || minF <= 1) ? 1 : minF;
    var bars = Math.max(5, maxF - base + 1);

    var w = PAD_L + 5 * GAP_X + PAD_R;
    var h = PAD_T + bars * GAP_Y + PAD_B;
    var barre = inferBarre(frets);
    var accent = opts.accent || '#4fd1c5';
    var ink = opts.ink || '#c9d1d9';
    var mute = opts.mute || '#5b6673';
    var fretInk = opts.fret || '#39454f';
    var stringInk = opts.string || '#2c3742';

    function x(i) { return PAD_L + i * GAP_X; }
    function yLine(k) { return PAD_T + k * GAP_Y; }
    function yDot(f) { return PAD_T + (f - base + 0.5) * GAP_Y; }

    var out = [];
    out.push('<svg class="dia-svg" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h +
      '" role="img" aria-label="' + esc(name) + ' 指法图">');

    // 指板底色，把六根弦圈成一个整体
    out.push('<rect x="' + x(0) + '" y="' + yLine(0) + '" width="' + (5 * GAP_X) + '" height="' +
      (bars * GAP_Y) + '" fill="rgba(255,255,255,.022)"/>');

    // 品丝
    for (var k = 1; k <= bars; k++) {
      out.push('<line x1="' + x(0) + '" y1="' + yLine(k) + '" x2="' + x(5) + '" y2="' + yLine(k) +
        '" stroke="' + fretInk + '" stroke-width="1"/>');
    }
    // 琴枕：只有从第 1 品开始画时才加粗
    out.push('<line x1="' + x(0) + '" y1="' + yLine(0) + '" x2="' + x(5) + '" y2="' + yLine(0) +
      '" stroke="' + (base === 1 ? ink : fretInk) + '" stroke-width="' + (base === 1 ? 2.4 : 1) +
      '" stroke-linecap="round"/>');
    // 弦
    for (var i = 0; i < 6; i++) {
      out.push('<line x1="' + x(i) + '" y1="' + yLine(0) + '" x2="' + x(i) + '" y2="' + yLine(bars) +
        '" stroke="' + stringInk + '" stroke-width="1"/>');
    }
    // 把位号
    if (base > 1) {
      out.push('<text x="' + (x(0) - 5) + '" y="' + (yLine(1) + 4) + '" text-anchor="end" font-size="10" fill="' +
        accent + '" font-family="ui-monospace,monospace">' + base + '</text>');
    }
    // 空弦 / 闷弦
    for (var s = 0; s < 6; s++) {
      var f = frets[s];
      var cx = x(s), cy = PAD_T - 9;
      if (f === -1) {
        out.push('<path d="M' + (cx - 3.4) + ' ' + (cy - 3.4) + 'l6.8 6.8M' + (cx + 3.4) + ' ' + (cy - 3.4) +
          'l-6.8 6.8" stroke="' + mute + '" stroke-width="1.4" stroke-linecap="round"/>');
      } else if (f === 0) {
        out.push('<circle cx="' + cx + '" cy="' + cy + '" r="3.2" fill="none" stroke="' + ink +
          '" stroke-width="1.4"/>');
      }
    }
    // 横按
    if (barre) {
      var bx1 = x(barre.from), bx2 = x(barre.to);
      var by = yDot(barre.fret);
      out.push('<rect x="' + (bx1 - 5.2) + '" y="' + (by - 5.2) + '" width="' + (bx2 - bx1 + 10.4) +
        '" height="10.4" rx="5.2" fill="' + accent + '"/>');
    }
    // 按弦点（横按覆盖的跳过，避免叠成一团）
    for (var s2 = 0; s2 < 6; s2++) {
      var f2 = frets[s2];
      if (f2 <= 0) continue;
      if (barre && f2 === barre.fret && s2 >= barre.from && s2 <= barre.to) continue;
      out.push('<circle cx="' + x(s2) + '" cy="' + yDot(f2) + '" r="5.1" fill="' + accent + '"/>');
      out.push('<circle cx="' + (x(s2) - 1.3) + '" cy="' + (yDot(f2) - 1.4) + '" r="1.5" fill="rgba(255,255,255,.34)"/>');
    }
    out.push('</svg>');

    var label = '<div class="dia-name">' + esc(name) +
      (fb.over ? '<em>/' + esc(fb.over) + '</em>' : '') + '</div>';
    return '<div class="dia" data-chord="' + esc(name) + '">' + label + out.join('') + '</div>';
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  global.Chords = {
    pc: pc,
    noteName: noteName,
    parse: parse,
    isChord: isChordToken,
    transpose: transpose,
    prefersFlat: prefersFlat,
    fretboard: fretboard,
    svg: svg,
    esc: esc
  };
})(window);
