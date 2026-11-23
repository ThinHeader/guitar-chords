/* ============================================================
 *  右手引擎：这一句是扫弦还是分解、拨的是第几弦第几品
 *
 *  光写和弦名只解决了左手——同一个 C 可以是六下扫弦，也可以是
 *  八个音的分解。所以每段配一个「演奏型」，并把分解型算成真正的
 *  弦位谱：横线是六根弦，数字是品，0 是空弦。
 *
 *  拨弦型里 s 的取值：
 *      'r'  根音弦（这个和弦按法里最低的那根能弹的弦）
 *      'a'  五度低音（交替低音用，六弦根音时取四弦，五弦根音时取六弦）
 *      1-6  弦号，1 是一弦（最细那根）
 * ============================================================ */
(function (global) {
  'use strict';

  var C = global.Chords;
  var DOWN = 'D', UP = 'U';

  /* ------------------------------------------------------------
   *  演奏型
   *  per = 每拍几个格子（2 = 八分音符，4 = 十六分）
   * ------------------------------------------------------------ */
  var PATTERNS = {
    p43: {
      type: 'pick', name: '根-3-2-3', sub: '八分 · 4/4', per: 2,
      steps: ['r', 3, 2, 3, 1, 3, 2, 3]
    },
    palt: {
      type: 'pick', name: '根-3-2-3 · 五-3-2-3', sub: '八分 · 交替低音', per: 2,
      steps: ['r', 3, 2, 3, 'a', 3, 2, 3]
    },
    p3: {
      type: 'pick', name: '根-3-2 · 1-3-2', sub: '八分 · 3/4', per: 2,
      steps: ['r', 3, 2, 1, 3, 2]
    },
    p6: {
      type: 'pick', name: '根-3-2 · 1-2-3', sub: '八分 · 6/8（3+3）', per: 3,
      steps: ['r', 3, 2, 1, 2, 3]
    },
    s8: {
      type: 'strum', name: '下 下上 上下上', sub: '八分 · 4/4', per: 2,
      steps: [DOWN, null, DOWN, UP, null, UP, DOWN, UP]
    },
    s16: {
      type: 'strum', name: '下 下上 上下上（十六分）', sub: '十六分 · 4/4', per: 4,
      steps: [DOWN, null, DOWN, UP, null, UP, DOWN, UP,
              DOWN, null, DOWN, UP, null, UP, DOWN, UP]
    },
    s3: {
      type: 'strum', name: '下 下上 下上', sub: '八分 · 3/4', per: 2,
      steps: [DOWN, null, DOWN, UP, DOWN, UP]
    },
    s6: {
      // 6/8 的扫弦是「下 · 下上 下上」：第二格留空，三下两上正好
      // 卡在 3+3 的两组里。六个音全填成上下交替就成了 4/4 味。
      type: 'strum', name: '下 下上 下上', sub: '八分 · 6/8（3+3）', per: 3,
      steps: [DOWN, null, DOWN, UP, DOWN, UP]
    }
  };

  /* ------------------------------------------------------------
   *  个别曲子的右手跟默认不同：指弹、交替低音、整首扫弦的摇滚
   *  pick / strum = 主歌与副歌各用什么；intro = 前奏间奏用什么
   * ------------------------------------------------------------ */
  var BY_ID = {
    // 指弹 / 分解特征明显
    tongzhuo: { pick: 'p6', strum: 'p6', intro: 'p6' },   // 6/8 的校园民谣，副歌也不扫
    hotel: { pick: 'palt', strum: 's8', intro: 'palt' },
    yesterday: { pick: 'palt' },
    tearsinheaven: { pick: 'palt', intro: 'palt' },
    silence: { pick: 'p43', intro: 'p43' },
    wishyouwerehere: { pick: 'p43', intro: 'p43' },
    hallelujah: { pick: 'p43', intro: 'p43' },
    laputa: { pick: 'p43', intro: 'p43' },
    spirited: { pick: 'p43', intro: 'p43' },
    sakura: { pick: 'p43', intro: 'p43' },
    // 一上来就扫、主歌也在扫的
    lanlianhua: { pick: 's8' },
    nufang: { pick: 's8' },
    haikuo: { pick: 's8' },
    guanghui: { pick: 's8' },
    cengjing: { pick: 's8' },
    knockin: { pick: 's8' },
    countryroads: { intro: 's8' },
    wonderwall: { pick: 's8', strum: 's16', intro: 's8' }
  };

  function defaults(song) {
    if (song.time === '3/4') return { pick: 'p3', strum: 's3' };
    if (song.time === '6/8') return { pick: 'p6', strum: 's6' };
    if (song.level >= 3) return { pick: 'palt', strum: 's16' };
    return { pick: 'p43', strum: 's8' };
  }

  /// 这一段用哪个演奏型：副歌扫、前奏按曲子习惯、其余按主歌
  function handFor(song, secName) {
    var o = BY_ID[song.id] || {};
    var d = defaults(song);
    var name = String(secName || '');
    if (/副歌|chorus/i.test(name)) return o.strum || d.strum;
    if (/前奏|间奏|尾奏|solo/i.test(name)) return o.intro || o.pick || d.pick;
    return o.pick || d.pick;
  }

  function firstChord(lines) {
    if (!lines) return null;
    for (var i = 0; i < lines.length; i++) {
      var m = /\[([A-G][^\]]*)\]/.exec(lines[i]);
      if (m) return m[1].trim();
    }
    return null;
  }

  /* ------------------------------------------------------------
   *  弦位谱
   * ------------------------------------------------------------ */
  /// 根音弦：这个按法里最低的那根能弹的弦。C 是五弦，G 是六弦。
  function bassOf(frets) {
    for (var i = 0; i < 6; i++) if (frets[i] >= 0) return i;
    return 5;
  }

  /// 交替低音的另一根：六弦起手换四弦，五弦起手换六弦（拿不到就退回根音）
  function altOf(frets, bass) {
    if (bass === 0) return frets[2] >= 0 ? 2 : (frets[1] >= 0 ? 1 : 0);
    return frets[0] >= 0 ? 0 : bass;
  }

  function stepString(step, bass, alt) {
    if (step === null) return -1;
    if (step === 'r') return bass;
    if (step === 'a') return alt;
    return 6 - step;   // 弦号 1..6 → 数组下标（0 是六弦）
  }

  function tabHtml(chord, pat) {
    var fb = C.fretboard(chord);
    if (!fb) return '';
    var f = fb.frets;
    var bass = bassOf(f);
    var alt = altOf(f, bass);
    var cols = pat.steps.length;

    var html = '<div class="tab" style="--c:' + cols + ';--per:' + pat.per + '">';
    for (var s = 5; s >= 0; s--) {
      html += '<b class="ts">' + (6 - s) + '</b>';
      for (var k = 0; k < cols; k++) {
        var idx = stepString(pat.steps[k], bass, alt);
        var on = idx === s;
        var cls = 'c' + (k % pat.per === 0 ? ' b' : '') +
          (on ? (s === bass ? ' r' : ' n') : '');
        html += '<i class="' + cls + '">' + (on ? (f[s] < 0 ? '×' : f[s]) : '') + '</i>';
      }
    }
    html += '</div>';
    return html;
  }

  function strumHtml(pat) {
    var html = '<div class="strokes" style="--c:' + pat.steps.length + ';--per:' + pat.per + '">';
    pat.steps.forEach(function (st, k) {
      var cls = 'st' + (k % pat.per === 0 ? ' b' : '') +
        (st === UP ? ' up' : st === DOWN ? ' down' : ' rest');
      html += '<i class="' + cls + '">' + (st === UP ? '↑' : st === DOWN ? '↓' : '·') + '</i>';
    });
    html += '</div>';
    return html;
  }

  /// 「根音 = 5 弦 3 品」——扫弦之外最常被问的就是这一句
  function bassText(chord) {
    var fb = C.fretboard(chord);
    if (!fb) return '';
    var bass = bassOf(fb.frets);
    var fret = fb.frets[bass];
    return '根音在' + (6 - bass) + '弦' + (fret === 0 ? '空弦' : fret + '品');
  }

  /* ------------------------------------------------------------
   *  整块面板
   * ------------------------------------------------------------ */
  function panel(song, opts) {
    opts = opts || {};
    var semi = opts.semi || 0;
    var flat = !!opts.flat;
    var linesOf = opts.linesOf || function (i) { return song.sections[i].l; };

    // 同一段里换个型就多一行；同型的几段合并成一行，免得重复四遍
    var order = [], byKey = {};
    song.sections.forEach(function (sec, i) {
      var key = handFor(song, sec.n);
      var g = byKey[key];
      if (!g) {
        g = byKey[key] = { key: key, pat: PATTERNS[key], secs: [], chord: null };
        order.push(g);
      }
      if (g.secs.indexOf(sec.n) < 0) g.secs.push(sec.n);
      if (!g.chord) g.chord = firstChord(linesOf(i));
    });

    var out = '<div class="hands-head"><b>右手怎么弹</b><span>' + order.length +
      ' 种型 · 每段标题旁边也标了</span></div>';

    order.forEach(function (g) {
      var chord = g.chord ? C.transpose(g.chord, semi, flat) : null;
      var isPick = g.pat.type === 'pick';
      out += '<div class="hand-row ' + g.pat.type + '">';
      out += '<div class="hand-line">';
      out += '<b class="hand-badge ' + g.pat.type + '">' + (isPick ? '分解' : '扫弦') + '</b>';
      out += '<span class="hand-secs">' + g.secs.map(C.esc).join(' · ') + '</span>';
      out += '<span class="hand-name">' + C.esc(g.pat.name) +
        ' <em>' + C.esc(g.pat.sub) + '</em></span>';
      out += '</div>';
      out += '<div class="hand-body">';
      out += isPick && chord ? tabHtml(chord, g.pat) : strumHtml(g.pat);
      out += '</div>';
      if (isPick && chord) {
        out += '<p class="hand-cap">以 <b>' + C.esc(chord) + '</b> 为例 · ' +
          bassText(chord) + '</p>';
      }
      out += '</div>';
    });

    var hasPick = order.some(function (g) { return g.pat.type === 'pick'; });
    var hasStrum = order.some(function (g) { return g.pat.type === 'strum'; });
    var note = '';
    if (hasPick) {
      note += '标「分解」的段一根根拨：六条横线是六根弦（最上面是一弦），数字是按第几品，' +
        '0 是空弦，绿色是根音。';
    }
    if (hasStrum) {
      note += '标「扫弦」的段整片扫下去，箭头是方向，点是不扫。';
    }
    note += '换和弦时右手型不变，按法跟着换。';
    out += '<p class="hands-note">' + note + '</p>';
    return out;
  }

  global.Play = {
    PATTERNS: PATTERNS,
    handFor: handFor,
    panel: panel,
    tabHtml: tabHtml,
    strumHtml: strumHtml,
    bassOf: bassOf,
    altOf: altOf,
    stepString: stepString,
    firstChord: firstChord,
    bassText: bassText,
    resolve: function (song, secName) { return PATTERNS[handFor(song, secName)]; }
  };
})(window);
