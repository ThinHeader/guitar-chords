/* ============================================================
 *  曲谱站前端：hash 路由 + 列表 + 详情
 * ============================================================ */
(function () {
  'use strict';

  var SONGS = window.SONGS;
  var C = window.Chords;
  var P = window.Play;
  var Tab = window.Tab;
  var esc = C.esc;

  /* ---------------- 本地存储 ---------------- */
  var store = {
    get: function (k, d) {
      try {
        var v = localStorage.getItem(k);
        return v === null ? d : JSON.parse(v);
      } catch (e) { return d; }
    },
    set: function (k, v) {
      try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* 隐私模式 */ }
    },
    del: function (k) {
      try { localStorage.removeItem(k); } catch (e) { /* ignore */ }
    }
  };

  /* ---------------- 预处理：每首曲子用到的和弦 ---------------- */
  var byId = {};
  SONGS.forEach(function (s) {
    var seen = [];
    var re = /\[([^\]]+)\]/g, m;
    s.sections.forEach(function (sec) {
      sec.l.forEach(function (line) {
        re.lastIndex = 0;
        while ((m = re.exec(line))) {
          if (seen.indexOf(m[1]) < 0) seen.push(m[1]);
        }
      });
    });
    s._chords = seen;
    s._hay = [s.title, s.artist, s.key, s.tags.join(' '), seen.join(' ')]
      .join(' ').toLowerCase();
    byId[s.id] = s;
  });

  /* ---------------- 列表筛选状态 ---------------- */
  var filter = { q: '', level: 0, tag: '全部', fav: false };

  var TAGS = ['全部', '中文', '英文', '日文', '民谣', '摇滚', '流行', '影视', '传统'];

  function favs() { return store.get('cs_fav', []); }
  function isFav(id) { return favs().indexOf(id) >= 0; }
  function toggleFav(id) {
    var list = favs();
    var i = list.indexOf(id);
    if (i >= 0) list.splice(i, 1); else list.push(id);
    store.set('cs_fav', list);
    return i < 0;
  }

  function matches(s) {
    if (filter.level && s.level !== filter.level) return false;
    if (filter.fav && !isFav(s.id)) return false;
    if (filter.tag !== '全部' && s.tags.indexOf(filter.tag) < 0) return false;
    if (filter.q && s._hay.indexOf(filter.q) < 0) return false;
    return true;
  }

  function stars(n) {
    var out = '';
    for (var i = 1; i <= 3; i++) out += '<i class="' + (i <= n ? 'on' : '') + '"></i>';
    return '<span class="stars" title="难度 ' + n + '/3">' + out + '</span>';
  }

  /* ============================================================
   *  列表页
   * ============================================================ */
  function renderList(keepScroll) {
    var list = SONGS.filter(matches);
    var keys = {};
    SONGS.forEach(function (s) { keys[C.transpose(s.key, 0)] = 1; });

    var html = '';
    html += '<section class="hero">';
    html += '<h1>五十首，够弹很久</h1>';
    html += '<p class="hero-sub">和弦谱 + 指法图 + 变调。手上的调、夹几品、每段怎么走，都写在上面。</p>';
    html += '<div class="hero-stats">';
    html += '<div><b>' + SONGS.length + '</b><span>首曲目</span></div>';
    html += '<div><b>' + Object.keys(keys).length + '</b><span>种调性</span></div>';
    html += '<div><b>1257</b><span>处和弦</span></div>';
    html += '</div>';
    html += '</section>';

    html += '<div class="bar">';
    html += '<div class="chips">';
    TAGS.forEach(function (t) {
      html += '<button class="chip' + (filter.tag === t ? ' on' : '') + '" data-tag="' + t + '">' + t + '</button>';
    });
    html += '</div>';
    html += '<div class="chips">';
    [0, 1, 2, 3].forEach(function (l) {
      var label = l === 0 ? '全部难度' : (l === 1 ? '入门' : l === 2 ? '进阶' : '技巧');
      html += '<button class="chip' + (filter.level === l ? ' on' : '') + '" data-level="' + l + '">' + label + '</button>';
    });
    html += '<button class="chip fav' + (filter.fav ? ' on' : '') + '" data-fav="1">♡ 收藏</button>';
    html += '</div>';
    html += '</div>';

    if (!list.length) {
      html += '<div class="empty"><p>没有符合条件的曲目。</p><button class="link" data-reset="1">清空筛选</button></div>';
    } else {
      html += '<div class="grid">';
      list.forEach(function (s) {
        html += '<a class="card" href="#/s/' + s.id + '">';
        html += '<div class="card-key"><b>' + esc(s.key) + '</b>' +
          (s.capo ? '<span>夹' + s.capo + '</span>' : '') + '</div>';
        html += '<div class="card-body">';
        html += '<h3>' + esc(s.title) + (isFav(s.id) ? ' <em class="pin">♡</em>' : '') + '</h3>';
        html += '<p class="card-artist">' + esc(s.artist) + '</p>';
        html += '<div class="card-meta">' + stars(s.level) +
          '<span class="dot"></span><span>' + s.bpm + ' BPM</span>' +
          '<span class="dot"></span><span>' + s.time + '</span></div>';
        html += '</div></a>';
      });
      html += '</div>';
    }

    html += '<p class="footnote">现代作品的歌词为版权内容，内置谱只标每段首句作为定位；' +
      '点段落右侧的笔可以自己补全，歌词只存在你这台设备的浏览器里。</p>';

    document.getElementById('view').innerHTML = html;
    if (!keepScroll) window.scrollTo(0, 0);
  }

  /* ============================================================
   *  行解析：把 [C]歌词[G]歌词 拆成块
   * ============================================================ */
  function parseLine(line) {
    var out = [];
    var cur = null;
    var re = /\[([^\]]+)\]/g;
    var last = 0, m;
    while ((m = re.exec(line))) {
      if (cur) cur.text += line.slice(last, m.index);
      else if (line.slice(last, m.index)) out.push({ chord: null, text: line.slice(last, m.index) });
      cur = { chord: m[1], text: '' };
      out.push(cur);
      last = re.lastIndex;
    }
    var tail = line.slice(last);
    if (cur) cur.text += tail;
    else if (tail) out.push({ chord: null, text: tail });
    return out;
  }

  function isProgRow(chunks) {
    for (var i = 0; i < chunks.length; i++) {
      if (!chunks[i].chord) return false;
      if (chunks[i].text.trim()) return false;
    }
    return chunks.length > 0;
  }

  /// 行尾/行首的空格会被 HTML 折叠掉，中英文都会因此粘在一起。
  /// 换成不换行空格，词边界就保住了——数据里写了空格的地方才出现空隙。
  function keepEdgeSpaces(text) {
    var nbsp = '\u00A0';
    return text
      .replace(/^ +/, function (m) { return new Array(m.length + 1).join(nbsp); })
      .replace(/ +$/, function (m) { return new Array(m.length + 1).join(nbsp); });
  }

  function lineHtml(line, semi, flat) {
    var chunks = parseLine(line);
    if (isProgRow(chunks)) {
      return '<div class="prog">' + chunks.map(function (c) {
        return '<span class="prog-cell">' + esc(C.transpose(c.chord, semi, flat)) + '</span>';
      }).join('') + '</div>';
    }
    return '<div class="line">' + chunks.map(function (c) {
      var head = c.chord
        ? '<b class="ch">' + esc(C.transpose(c.chord, semi, flat)) + '</b>'
        : '<b class="ch"></b>';
      var body = c.text ? '<i>' + esc(keepEdgeSpaces(c.text)) + '</i>' : '';
      return '<span class="ck">' + head + body + '</span>';
    }).join('') + '</div>';
  }

  /* ============================================================
   *  详情页
   * ============================================================ */
  var detail = {
    song: null,
    semi: 0,
    dia: true,
    tab: true,
    size: 1,
    scroll: false
  };

  function customLines(songId, idx) {
    return store.get('cs_ly:' + songId + ':' + idx, null);
  }

  function effectiveLines(song, idx) {
    var custom = customLines(song.id, idx);
    return custom || song.sections[idx].l;
  }

  function renderSong(id) {
    var song = byId[id];
    if (!song) { location.hash = '#/'; return; }

    stopScroll();
    detail.song = song;
    detail.semi = store.get('cs_tr:' + id, 0) || 0;
    detail.size = store.get('cs_fs', 1) || 1;

    var flat = C.prefersFlat(song.key);
    // 原调 = 原版录音的调 = 谱面指法的调 + 变调夹。童年 原调 C / 夹 0；
    // Hotel California 是 Am 指法夹 2 品，原调 Bm，两者不能混为一谈。
    var origKey = C.transpose(song.key, song.capo, flat);
    var shapeKey = C.transpose(song.key, detail.semi, flat);

    var html = '';
    html += '<div class="detail' + (detail.tab ? '' : ' no-tab') + '">';

    /* 头部 */
    html += '<div class="d-head">';
    html += '<a class="back" href="#/">‹ 曲库</a>';
    html += '<div class="d-title"><h1>' + esc(song.title) + '</h1>';
    html += '<p>' + esc(song.artist) + '</p></div>';
    html += '<button class="heart' + (isFav(song.id) ? ' on' : '') + '" data-fav-song="1" aria-label="收藏">♡</button>';
    html += '</div>';

    html += '<div class="d-keys">';
    html += '<span class="k"><i>原调</i>' + esc(origKey) + '</span>';
    html += '<span class="k" id="k-shape"><i>谱面</i>' + esc(shapeKey) + ' 调指法</span>';
    html += '<span class="k capo' + (song.capo ? '' : ' no') + '"><i>变调夹</i>' +
      (song.capo ? '夹 ' + song.capo + ' 品' : '不用夹') + '</span>';
    html += '<span class="k">' + Tab.beatLabel(song.time, song.bpm) + '</span>';
    html += '<span class="k">' + song.time + '</span>';
    html += '<span class="k">' + ['入门', '进阶', '技巧'][song.level - 1] + '</span>';
    html += '</div>';

    html += '<p class="keys-note" id="keys-note">' + keyNote(song, origKey, shapeKey) + '</p>';

    if (song.tip) {
      html += '<div class="tip"><span class="tip-i">!</span><p>' + esc(song.tip) + '</p></div>';
    }

    /* 工具栏 */
    html += '<div class="tools">';
    html += '<div class="tool"><button data-act="tr-dn">−</button>' +
      '<span class="tool-val" id="tr-val">原调</span>' +
      '<button data-act="tr-up">＋</button></div>';
    html += '<div class="tool"><button data-act="fs-dn">A−</button>' +
      '<span class="tool-val" id="fs-val">' + Math.round(detail.size * 100) + '%</span>' +
      '<button data-act="fs-up">A＋</button></div>';
    html += '<button class="tool-btn' + (detail.tab ? ' on' : '') + '" data-act="tab">六线谱</button>';
    html += '<button class="tool-btn' + (detail.dia ? ' on' : '') + '" data-act="dia">指法图</button>';
    html += '<button class="tool-btn" data-act="scroll" id="scroll-btn">自动滚动</button>';
    html += '<button class="tool-btn" data-act="print">打印</button>';
    html += '</div>';

    /* 指法速查 */
    html += '<section class="dias" id="dias"></section>';

    /* 谱面 */
    html += '<div class="sheet" id="sheet" style="--fs:' + detail.size + '">';
    song.sections.forEach(function (sec, i) {
      var custom = !!customLines(song.id, i);
      var pat = P.resolve(song, sec.n);
      html += '<section class="sec">';
      html += '<div class="sec-head"><h2>' + esc(sec.n) + '</h2>';
      html += '<b class="hand-badge ' + pat.type + '" title="这一段右手怎么弹">' +
        (pat.type === 'pick' ? '分解' : '扫弦') + '<em>' + esc(pat.name) + '</em></b>';
      html += '<button class="pen' + (custom ? ' on' : '') + '" data-edit="' + i + '" title="补录歌词">✎</button></div>';
      html += '<div class="sec-body" data-body="' + i + '">' + sheetBody(song, i) + '</div>';
      html += '</section>';
    });
    html += '</div>';

    /* 上下首 */
    var idx = SONGS.indexOf(song);
    var prev = SONGS[(idx - 1 + SONGS.length) % SONGS.length];
    var next = SONGS[(idx + 1) % SONGS.length];
    html += '<nav class="pager">';
    html += '<a href="#/s/' + prev.id + '"><span>上一首</span><b>' + esc(prev.title) + '</b></a>';
    html += '<a href="#/s/' + next.id + '"><span>下一首</span><b>' + esc(next.title) + '</b></a>';
    html += '</nav>';

    html += '</div>';

    document.getElementById('view').innerHTML = html;
    paintDias();
    paintTranspose();
    window.scrollTo(0, 0);
  }

  /// 「原调 C」是什么意思、要不要夹变调夹——把这句话直接写出来，
  /// 不要让人对着两个调名自己推。
  function keyNote(song, origKey, shapeKey) {
    var capo = song.capo;
    var out = '「原调 ' + esc(origKey) + '」是原版录音的音高。';
    if (detail.semi === 0) {
      if (capo) {
        out += '这份谱用 <b>' + esc(shapeKey) + ' 调指法</b>写成，' +
          '<b>变调夹夹第 ' + capo + ' 品</b>：夹上再照谱按，出来的才是 ' +
          esc(origKey) + '；不夹会低 ' + capo + ' 个半音。';
      } else {
        out += '谱面上的和弦就是 <b>' + esc(shapeKey) + ' 调指法</b>，' +
          '<b>不用变调夹</b>，直接弹就是这个调。';
      }
      return out;
    }
    out += '你把谱面调到了 <b>' + esc(shapeKey) + ' 调</b>（' +
      (detail.semi > 0 ? '+' : '') + detail.semi + ' 个半音），照谱弹就是 ' +
      esc(shapeKey) + ' 调。要唱原调，把谱面调回 ' + esc(origKey) +
      (capo ? ' 并夹 ' + capo + ' 品。' : ' 再来。');
    return out;
  }

  /// 一段的谱面：每一句歌词上面压一格六线谱，下面跟这一句的词。
  /// 变调改的是和弦名和品格数字，所以这里必须整段重建而不是改文字。
  function sheetBody(song, idx) {
    var lines = effectiveLines(song, idx);
    var pat = P.resolve(song, song.sections[idx].n);
    var flat = C.prefersFlat(song.key);
    var keyName = '1 = ' + C.transpose(song.key, detail.semi, flat);
    var out = '';

    lines.forEach(function (l, li) {
      out += Tab.block(l, {
        pat: pat,
        time: song.time,
        bpm: song.bpm,
        capo: song.capo,
        keyName: keyName,
        semi: detail.semi,
        flat: flat,
        transpose: true,
        head: li === 0
      });
      // 纯和弦行（前奏那种只写进行的）谱子上已经标了和弦名，
      // 再列一遍小方块只是重复
      if (!isProgRow(parseLine(l))) out += lineHtml(l, detail.semi, flat);
    });

    // 同一套和弦、反复时换的词。原谱是把两行词叠在同一行谱下面，
    // 网页排不出双行，就依次列在谱子后面并标上段号——省得反复时
    // 到处找第二段词在哪。
    var verses = song.sections[idx].verses;
    if (verses && verses.length) {
      var mark = ['②', '③', '④', '⑤', '⑥'];
      out += '<div class="verses">' + verses.map(function (v, i) {
        return '<p><b>' + (mark[i] || (i + 2)) + '</b>' + esc(v) + '</p>';
      }).join('') + '</div>';
    }
    return out;
  }

  function paintDias() {
    var song = detail.song;
    var box = document.getElementById('dias');
    if (!box) return;
    if (!detail.dia) { box.innerHTML = ''; box.style.display = 'none'; return; }
    box.style.display = '';
    var flat = C.prefersFlat(song.key);
    var html = '<div class="dias-head">本曲用到的和弦 · ' + song._chords.length + ' 个</div><div class="dias-row">';
    song._chords.forEach(function (name) {
      html += C.svg(C.transpose(name, detail.semi, flat), {
        accent: '#4fd1c5', ink: '#c9d1d9', mute: '#5b6673'
      });
    });
    html += '</div>';
    box.innerHTML = html;
  }

  function paintTranspose() {
    var song = detail.song;
    var flat = C.prefersFlat(song.key);
    var shown = C.transpose(song.key, detail.semi, flat);
    var orig = C.transpose(song.key, song.capo, flat);
    var el = document.getElementById('tr-val');
    if (el) {
      el.textContent = detail.semi === 0
        ? '谱面 ' + shown
        : (detail.semi > 0 ? '+' : '') + detail.semi + ' → ' + shown;
      el.classList.toggle('mod', detail.semi !== 0);
    }
    var ks = document.getElementById('k-shape');
    if (ks) ks.innerHTML = '<i>谱面</i>' + esc(shown) + ' 调指法';
    var kn = document.getElementById('keys-note');
    if (kn) kn.innerHTML = keyNote(song, orig, shown);
    // 变调改的不只是和弦名，六线谱里的品格数字也要跟着变，
    // 所以整段谱面重建；正在补录歌词时跳过，免得把输入框抽掉。
    if (!document.querySelector('.sec-body .editor')) {
      song.sections.forEach(function (sec, i) {
        var box = document.querySelector('.sec-body[data-body="' + i + '"]');
        if (box) box.innerHTML = sheetBody(song, i);
      });
    }
    var fs = document.getElementById('fs-val');
    if (fs) fs.textContent = Math.round(detail.size * 100) + '%';
    var sheet = document.getElementById('sheet');
    if (sheet) sheet.style.setProperty('--fs', detail.size);

    paintDias();
  }

  /* ---------------- 自动滚动 ---------------- */
  var raf = null, lastT = 0, acc = 0, speed = 0.7;

  function startScroll() {
    if (raf) return;
    detail.scroll = true;
    lastT = 0; acc = 0;
    var btn = document.getElementById('scroll-btn');
    if (btn) btn.classList.add('on');
    raf = requestAnimationFrame(tick);
  }

  function stopScroll() {
    detail.scroll = false;
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    var btn = document.getElementById('scroll-btn');
    if (btn) btn.classList.remove('on');
  }

  function tick(t) {
    if (!detail.scroll) return;
    if (!lastT) lastT = t;
    var dt = Math.min(64, t - lastT);
    lastT = t;
    acc += speed * dt / 16.7;
    var px = Math.floor(acc);
    if (px > 0) {
      acc -= px;
      var before = window.scrollY;
      window.scrollBy(0, px);
      if (window.scrollY === before) { stopScroll(); return; }  // 到底了
    }
    raf = requestAnimationFrame(tick);
  }

  /* ---------------- 歌词补录 ---------------- */
  function openEditor(idx) {
    var song = detail.song;
    var body = document.querySelector('#sheet [data-body="' + idx + '"]');
    if (!body) return;
    var lines = effectiveLines(song, idx);
    var wrap = document.createElement('div');
    wrap.className = 'editor';
    wrap.innerHTML =
      '<p class="editor-hint">方括号里写和弦，紧跟歌词。一行一句，保存后只存在本机。</p>' +
      '<textarea spellcheck="false"></textarea>' +
      '<div class="editor-bar"><button class="ghost" data-ed-cancel="1">取消</button>' +
      '<button class="ghost danger" data-ed-reset="1">恢复默认</button>' +
      '<button class="primary" data-ed-save="1">保存</button></div>';
    var ta = wrap.querySelector('textarea');
    ta.value = lines.join('\n');
    body.innerHTML = '';
    body.appendChild(wrap);
    ta.focus();

    // 编辑器必须先离开 DOM，否则 paintTranspose 的「编辑中不重绘」保护
    // 会把这一段一直留在 textarea 状态。
    wrap.querySelector('[data-ed-cancel]').onclick = function () {
      wrap.remove();
      paintTranspose();
    };
    wrap.querySelector('[data-ed-save]').onclick = function () {
      var v = ta.value.split('\n').map(function (x) { return x.trim(); }).filter(Boolean);
      if (v.length) store.set('cs_ly:' + song.id + ':' + idx, v);
      else store.del('cs_ly:' + song.id + ':' + idx);
      var pen = document.querySelector('[data-edit="' + idx + '"]');
      if (pen) pen.classList.toggle('on', !!v.length);
      wrap.remove();
      paintTranspose();
    };
    wrap.querySelector('[data-ed-reset]').onclick = function () {
      store.del('cs_ly:' + song.id + ':' + idx);
      var pen = document.querySelector('[data-edit="' + idx + '"]');
      if (pen) pen.classList.remove('on');
      wrap.remove();
      paintTranspose();
    };
  }

  /* ============================================================
   *  事件
   * ============================================================ */
  function boot() {
    var q = document.getElementById('q');
    var clear = document.getElementById('q-clear');
    q.addEventListener('input', function () {
      filter.q = q.value.trim().toLowerCase();
      clear.hidden = !q.value;
      if (!location.hash || location.hash === '#/') renderList(true);
      else { location.hash = '#/'; }
    });
    clear.addEventListener('click', function () {
      q.value = ''; filter.q = ''; clear.hidden = true; q.focus();
      if (location.hash === '#/' || !location.hash) renderList();
    });

    document.getElementById('view').addEventListener('click', function (e) {
      var t = e.target.closest('[data-tag],[data-level],[data-fav],[data-reset],[data-act],[data-edit],[data-fav-song]');
      if (!t) return;

      if (t.dataset.tag !== undefined && t.dataset.tag !== '') {
        filter.tag = t.dataset.tag; renderList(); return;
      }
      if (t.hasAttribute('data-level')) {
        filter.level = Number(t.dataset.level); renderList(); return;
      }
      if (t.hasAttribute('data-fav')) {
        filter.fav = !filter.fav; renderList(); return;
      }
      if (t.hasAttribute('data-reset')) {
        filter = { q: '', level: 0, tag: '全部', fav: false };
        document.getElementById('q').value = '';
        renderList(); return;
      }
      if (t.hasAttribute('data-fav-song')) {
        var on = toggleFav(detail.song.id);
        t.classList.toggle('on', on);
        return;
      }
      if (t.hasAttribute('data-edit')) {
        openEditor(Number(t.dataset.edit)); return;
      }
      if (t.dataset.act) { act(t.dataset.act); }
    });

    window.addEventListener('hashchange', route);
    document.addEventListener('keydown', onKey);
    route();
  }

  function act(a) {
    var song = detail.song;
    if (a === 'tr-up' || a === 'tr-dn') {
      detail.semi = Math.max(-6, Math.min(6, detail.semi + (a === 'tr-up' ? 1 : -1)));
      store.set('cs_tr:' + song.id, detail.semi);
      paintTranspose();
    } else if (a === 'fs-up' || a === 'fs-dn') {
      detail.size = Math.max(0.8, Math.min(1.6, +(detail.size + (a === 'fs-up' ? 0.1 : -0.1)).toFixed(2)));
      store.set('cs_fs', detail.size);
      paintTranspose();
    } else if (a === 'tab') {
      detail.tab = !detail.tab;
      var wrap = document.querySelector('.detail');
      if (wrap) wrap.classList.toggle('no-tab', !detail.tab);
      var hbtn = document.querySelector('[data-act="tab"]');
      if (hbtn) hbtn.classList.toggle('on', detail.tab);
    } else if (a === 'dia') {
      detail.dia = !detail.dia;
      paintDias();
      var btn = document.querySelector('[data-act="dia"]');
      if (btn) btn.classList.toggle('on', detail.dia);
    } else if (a === 'scroll') {
      if (detail.scroll) stopScroll(); else startScroll();
    } else if (a === 'print') {
      stopScroll();
      window.print();
    }
  }

  function onKey(e) {
    if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
    var song = detail.song;
    if (!song) return;
    if (e.key === '+' || e.key === '=') { act('tr-up'); e.preventDefault(); }
    else if (e.key === '-' || e.key === '_') { act('tr-dn'); e.preventDefault(); }
    else if (e.key === ' ') {
      if (detail.scroll) stopScroll(); else startScroll();
      e.preventDefault();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      var i = SONGS.indexOf(song);
      var n = (i + (e.key === 'ArrowRight' ? 1 : -1) + SONGS.length) % SONGS.length;
      location.hash = '#/s/' + SONGS[n].id;
    }
  }

  function route() {
    var h = location.hash || '#/';
    var m = /^#\/s\/(.+)$/.exec(h);
    if (m) renderSong(decodeURIComponent(m[1]));
    else renderList();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
