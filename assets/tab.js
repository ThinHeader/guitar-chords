/* ============================================================
 *  六线谱渲染
 *
 *  一行歌词 = 两小节（窄屏拆成两块，各一小节，字才不会缩成蚂蚁）。
 *  六条横线是六根弦，最上面是一弦，线上的数字是第几品，0 是空弦。
 *  数字落在拍位上：4/4 一小节 4 拍、3/4 分 3 拍、6/8 分 2 拍（每拍
 *  三个八分），每拍再按演奏型细分成格，所以哪一下落在半拍上一眼
 *  看得出来，不用猜。
 *
 *  与 play.js 的分工：play.js 出「这一段用什么型」，这里把型摊到
 *  小节、拍、弦、品上并画出来。
 * ============================================================ */
(function (global) {
  'use strict';

  var C = global.Chords;

  var PAD_L = 28;      // 左侧留白（弦号）
  var PAD_R = 10;
  var BAR_W = 262;     // 一小节宽
  var GAP = 10;        // 小节之间
  var NB_PAD = 13;     // 小节内左右留白
  var TOP = 66;        // 一弦的 y
  var LH = 14;         // 线距
  var TAIL = 16;       // 谱线下方（扫弦箭头）留白
  var HEIGHT = TOP + LH * 5 + TAIL + 6;

  // 颜色全部走 CSS 变量：打印时要换成白底深墨，内联十六进制改不了
  var INK = 'var(--t-ink)';
  var ACCENT = 'var(--t-accent)';
  var WARM = 'var(--t-warm)';
  var WIRE = 'var(--t-wire)';
  var BARLINE = 'var(--t-bar)';

  var PC = {
    C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5,
    'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11
  };

  function pcOf(n) {
    if (!n) return -1;
    var m = /^([A-G])([#b]?)/.exec(String(n).trim());
    if (!m) return -1;
    var k = m[1] + m[2];
    return k in PC ? PC[k] : -1;
  }

  /// 每小节几拍。
  /// 6/8 的「一拍」是附点四分（三个八分），一小节两拍，所以是 2 —— 不是 3。
  /// 按 3 算的话拍号刻线会落在 2+2+2 上，那是 3/4 的分组，弹出来就是
  /// 「一二三 一二三」的四四拍感，正好是 6/8 最容易被听出来的错。
  function beatsPerBar(time) {
    if (time === '6/8') return 2;
    if (time === '3/4') return 3;
    return 4;
  }

  /// 一拍是几分音符。写中文而不是 ♩／♪：这两个字符在多数系统里没有
  /// 等宽字体，Chrome 会退回到一个怪字形，页面上看着像「J.」。
  function beatLabel(time, bpm) {
    if (time === '6/8') return '附点四分 = ' + Math.round(bpm * 2 / 3);
    return '四分音符 = ' + bpm;
  }

  function chordsOf(line) {
    var out = [], re = /\[([^\]]+)\]/g, m, prev = null;
    while ((m = re.exec(line))) {
      var n = m[1].trim();
      if (!n || n === prev) continue;
      out.push(n);
      prev = n;
    }
    return out;
  }

  /// 8 拍分给 3 个和弦 → 2+3+3，余数补在后面，每个和弦至少一拍
  function splitBeats(n, total) {
    if (n <= 0) return [];
    if (n > total) n = total;
    var base = Math.floor(total / n);
    var extra = total - base * n;
    var out = [];
    for (var i = 0; i < n; i++) out.push(base + (i >= n - extra ? 1 : 0));
    return out;
  }

  function fretsOf(name) {
    var fb = C.fretboard(name);
    if (!fb) return null;
    var f = [];
    for (var i = 0; i < 6; i++) {
      var v = fb.frets[i];
      f.push(v === null || v === undefined ? -1 : v);
    }
    // 斜杠和弦：把低音补到六弦上（D/F# → 六弦 2 品）
    if (fb.over) {
      var t = pcOf(fb.over);
      if (t >= 0) {
        var fret = (t - 4 + 12) % 12;   // 六弦空弦是 E
        if (fret >= 0 && fret <= 7 && f[0] < 0) f[0] = fret;
      }
    }
    return f;
  }

  function bassOf(f) {
    for (var i = 0; i < 6; i++) if (f[i] >= 0) return i;
    return 5;
  }

  function altOf(f, bass) {
    if (bass === 0) return f[2] >= 0 ? 2 : (f[1] >= 0 ? 1 : 0);
    return f[0] >= 0 ? 0 : bass;
  }

  function stepString(step, bass, alt) {
    if (step === null || step === undefined) return -1;
    if (step === 'r') return bass;
    if (step === 'a') return alt;
    return 6 - step;      // 弦号 1..6 → 下标（0 是六弦）
  }

  /* ------------------------------------------------------------
   *  一行歌词 → 事件
   *  g 是全局格号，s 是弦号 1..6，f 是品
   * ------------------------------------------------------------ */
  function layout(line, pat, time, opts) {
    opts = opts || {};
    var chords = chordsOf(line);
    if (!chords.length) return null;

    var bpb = beatsPerBar(time);
    var per = pat.per;
    var grid = bpb * per;
    // 一行至少两小节；和弦多到两小节塞不下（6/8 两小节只有 4 拍）就多开
    // 一节，免得第五个和弦被 splitBeats 悄悄吞掉。
    var bars = Math.max(2, Math.ceil(chords.length / bpb));
    var totalBeats = bpb * bars;
    var beats = splitBeats(chords.length, totalBeats);

    var notes = [], marks = [];
    var beat = 0;

    for (var i = 0; i < chords.length; i++) {
      // 先把和弦名转到当前调，再按转过的名字取指法——
      // 顺序反了就会出现「名字变了、品格还是原调」的谱。
      var name = opts.transpose
        ? C.transpose(chords[i], opts.semi || 0, opts.flat)
        : chords[i];
      var f = fretsOf(name);
      var len = beats[i] || 1;
      marks.push({ beat: beat, name: name, beats: len });

      if (f) {
        var bass = bassOf(f);
        var alt = altOf(f, bass);
        for (var k = 0; k < len * per; k++) {
          var g = beat * per + k;
          // 每个和弦都从头起手：一小节里换和弦时，新和弦照样从根音开始，
          // 而不是接着上一个和弦的节奏型往下走——那样新和弦会从一弦半路
          // 起手，看着对、弹起来找不到低音。
          var step = pat.steps[k % pat.steps.length];
          if (step === null || step === undefined) continue;
          if (pat.type === 'strum') {
            for (var s = 6; s >= 1; s--) {
              var fr = f[6 - s];
              if (fr < 0) continue;
              notes.push({ g: g, s: s, f: fr, bass: s === 6 - bass, dir: step });
            }
          } else {
            var idx = stepString(step, bass, alt);
            if (idx < 0 || f[idx] < 0) continue;
            notes.push({ g: g, s: 6 - idx, f: f[idx], bass: idx === bass });
          }
        }
      }
      beat += len;
    }

    return { bars: bars, grid: grid, bpb: bpb, notes: notes, marks: marks, total: totalBeats };
  }

  /* ------------------------------------------------------------
   *  小指法图（和弦名下面那一小块）
   * ------------------------------------------------------------ */
  function miniChord(name, cx, y) {
    var f = fretsOf(name);
    if (!f) return '';

    var played = f.filter(function (v) { return v > 0; });
    var minF = played.length ? Math.min.apply(null, played) : 1;
    var open = f.some(function (v) { return v === 0; });
    var base = (open || minF <= 1) ? 1 : minF;
    var rows = 4;

    var SW = 5.6, SH = 7;
    var w = SW * 5, h = SH * rows;
    var x0 = cx - w / 2, y0 = y;

    var out = [];
    if (base === 1) {
      out.push('<rect x="' + (x0 - 0.7) + '" y="' + (y0 - 1.4) + '" width="' + (w + 1.4) +
        '" height="2.2" rx="1" style="fill:' + WIRE + '"/>');
    }
    for (var r = 1; r <= rows; r++) {
      out.push('<line x1="' + x0 + '" y1="' + (y0 + r * SH) + '" x2="' + (x0 + w) + '" y2="' +
        (y0 + r * SH) + '" stroke="' + WIRE + '" stroke-width="1"/>');
    }
    for (var c = 0; c < 6; c++) {
      out.push('<line x1="' + (x0 + c * SW) + '" y1="' + y0 + '" x2="' + (x0 + c * SW) +
        '" y2="' + (y0 + h) + '" style="stroke:' + WIRE + '" stroke-width="1"/>');
    }
    if (base > 1) {
      out.push('<text x="' + (x0 - 2) + '" y="' + (y0 + SH * 0.8) + '" text-anchor="end" font-size="7" style="fill:' +
        WARM + '" font-family="ui-monospace,monospace">' + base + '</text>');
    }
    for (var s = 0; s < 6; s++) {
      var fr = f[s];
      var sx = x0 + s * SW;
      if (fr === -1) {
        out.push('<path d="M' + (sx - 2) + ' ' + (y0 - 6.5) + 'l4 4M' + (sx + 2) + ' ' + (y0 - 6.5) +
          'l-4 4" style="stroke:var(--t-mute)" stroke-width="1.1" stroke-linecap="round"/>');
      } else if (fr === 0) {
        out.push('<circle cx="' + sx + '" cy="' + (y0 - 4.5) + '" r="1.9" fill="none" style="stroke:var(--t-mute)" stroke-width="1.1"/>');
      } else if (fr - base < rows) {
        out.push('<circle cx="' + sx + '" cy="' + (y0 + (fr - base + 0.5) * SH) + '" r="2.1" style="fill:' + ACCENT + '"/>');
      }
    }
    return out.join('');
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* ------------------------------------------------------------
   *  画一块（from 起 count 个小节）
   * ------------------------------------------------------------ */
  function svgOf(L, pat, opts) {
    opts = opts || {};
    var from = opts.from || 0;
    var count = opts.count || L.bars;
    var barW = BAR_W, gap = GAP;
    var totalW = PAD_L + count * barW + (count - 1) * gap + PAD_R;
    var u = (barW - NB_PAD * 2) / L.grid;
    var lineBottom = TOP + LH * 5;

    function barX(b) { return PAD_L + (b - from) * (barW + gap); }
    function noteX(g) {
      var b = Math.floor(g / L.grid) - from;
      return barX(b + from) + NB_PAD + (g % L.grid + 0.5) * u;
    }
    function stringY(s) { return TOP + (s - 1) * LH; }

    var out = [];
    out.push('<svg class="tab-svg" viewBox="0 0 ' + totalW + ' ' + HEIGHT +
      '" width="' + totalW + '" height="' + HEIGHT +
      '" preserveAspectRatio="xMinYMin meet" role="img" aria-label="六线谱">');

    for (var s = 1; s <= 6; s++) {
      out.push('<line x1="' + (PAD_L - 3) + '" y1="' + stringY(s) + '" x2="' +
        (totalW - PAD_R + 3) + '" y2="' + stringY(s) + '" style="stroke:' + WIRE + '" stroke-width="1"/>');
    }

    // 小节线：最后一条是下一小节的起始线
    for (var b = 0; b <= count; b++) {
      var lx = barX(from + b - 1) + barW;
      if (b === 0) lx = barX(from);
      out.push('<line x1="' + lx + '" y1="' + (TOP - 9) + '" x2="' + lx + '" y2="' + (lineBottom + 9) +
        '" style="stroke:' + BARLINE + '" stroke-width="' + (b === 0 && from === 0 ? 2 : 1.3) + '"/>');
    }

    // 每拍的位置刻度，让「第几拍」不用数格子
    for (var bb = from; bb < from + count; bb++) {
      for (var p = 1; p < L.bpb; p++) {
        var tx = barX(bb) + NB_PAD + p * u * pat.per;
        out.push('<line x1="' + tx + '" y1="' + (lineBottom + 2) + '" x2="' + tx + '" y2="' +
          (lineBottom + 6) + '" style="stroke:var(--t-tick)" stroke-width="1"/>');
      }
    }

    // 拍号只在整段的第一块左侧写一次
    if (from === 0) {
      var t = (opts.time || '4/4').split('/');
      if (t.length === 2) {
        out.push('<text x="' + (PAD_L - 13) + '" y="' + (TOP + LH * 1.6) + '" text-anchor="middle" ' +
          'font-size="13" style="fill:' + INK + '" font-family="ui-monospace,monospace" opacity=".78">' + esc(t[0]) + '</text>');
        out.push('<text x="' + (PAD_L - 13) + '" y="' + (TOP + LH * 3.2) + '" text-anchor="middle" ' +
          'font-size="13" style="fill:' + INK + '" font-family="ui-monospace,monospace" opacity=".78">' + esc(t[1]) + '</text>');
      }
    }

    // 和弦名 + 指法图。跨小节的和弦在下一小节开头补个名字（不带图）
    function markAt(m, barIdx, withFig) {
      var name = m.name;
      var p = Math.max(0, m.beat - barIdx * L.bpb);
      var cx = barX(barIdx) + NB_PAD + (p * pat.per + 0.5) * u;
      var right = barX(barIdx) + barW - 8;
      if (cx + 54 > right) cx = right - 54;
      var mid = Math.round(cx) + 14;
      var g = '<text x="' + mid + '" y="15" text-anchor="middle" font-size="14" font-weight="700" ' +
        'style="fill:' + WARM + '" font-family="ui-sans-serif,-apple-system,sans-serif">' + esc(name) + '</text>';
      if (withFig) g += miniChord(name, mid, 24);
      return g;
    }

    for (var bar = from; bar < from + count; bar++) {
      var inBar = [], spanning = null;
      L.marks.forEach(function (m) {
        var mb = Math.floor(m.beat / L.bpb);
        if (mb === bar) inBar.push(m);
        else if (mb < bar && m.beat + m.beats > bar * L.bpb) spanning = m;
      });
      if (inBar.length) {
        inBar.forEach(function (m) { out.push(markAt(m, bar, true)); });
      } else if (spanning) {
        out.push(markAt({ beat: bar * L.bpb, name: spanning.name }, bar, true));
      }
    }

    // 音符
    L.notes.forEach(function (n) {
      var b = Math.floor(n.g / L.grid);
      if (b < from || b >= from + count) return;
      var x = noteX(n.g);
      var y = stringY(n.s);
      out.push('<text x="' + x + '" y="' + (y + 4.6) + '" text-anchor="middle" font-size="14" ' +
        'font-family="ui-monospace,monospace" ' +
        'style="paint-order:stroke;stroke:var(--t-halo);stroke-width:2.8;stroke-linejoin:round;fill:' +
        (n.bass ? ACCENT : INK) + '">' + n.f + '</text>');
    });

    // 扫弦段在谱线下方标 ↓ ↑：只看数字分不出上下扫，
    // 而上下扫正是扫弦节奏型里最容易做错的地方。
    if (pat.type === 'strum') {
      var seenS = {};
      L.notes.forEach(function (n) {
        var b = Math.floor(n.g / L.grid);
        if (b < from || b >= from + count) return;
        if (seenS[n.g]) return;
        seenS[n.g] = 1;
        out.push('<text x="' + noteX(n.g) + '" y="' + (lineBottom + 11) + '" text-anchor="middle" ' +
          'font-size="10.5" style="fill:' + ACCENT + '" font-family="ui-sans-serif,sans-serif">' +
          (n.dir === 'U' ? '↑' : '↓') + '</text>');
      });
    }

    out.push('</svg>');
    return out.join('');
  }

  /* ------------------------------------------------------------
   *  对外：一格（可带谱头）
   * ------------------------------------------------------------ */
  function headHtml(opts, pat) {
    return '<div class="tab-head">' +
      '<span>' + esc(beatLabel(opts.time || '4/4', opts.bpm || 90)) + '</span>' +
      '<span>变调夹 <b>' + (opts.capo ? '夹 ' + opts.capo + ' 品' : '不用夹') + '</b></span>' +
      '<span class="tab-key">' + esc(opts.keyName || '') + '</span>' +
      '<span>' + esc(opts.time || '4/4') + '</span>' +
      '<span class="tab-hand">' + esc(pat.name) + '</span>' +
      '</div>';
  }

  function block(line, opts) {
    opts = opts || {};
    var pat = opts.pat;
    if (!pat) return '';
    var L = layout(line, pat, opts.time || '4/4', opts);
    if (!L) return '';

    return '<div class="tab-block">' +
      (opts.head === false ? '' : headHtml(opts, pat)) +
      svgOf(L, pat, opts) + '</div>';
  }

  global.Tab = {
    block: block,
    layout: layout,
    chordsOf: chordsOf,
    fretsOf: fretsOf,
    splitBeats: splitBeats,
    beatsPerBar: beatsPerBar,
    beatLabel: beatLabel,
    svg: svgOf
  };
})(window);
