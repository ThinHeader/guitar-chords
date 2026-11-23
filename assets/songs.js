/* ============================================================
 *  曲库：50 首
 *
 *  谱面用 ChordPro 的写法，方括号里是和弦，后面跟着歌词：
 *      [C]池塘边的榕树上 [G]知了在声声叫着夏天
 *  只有和弦没有歌词的行就是纯和弦行（前奏、间奏）。
 *
 *  key   = 手上按的调（配合 capo 才是实际音高）
 *  capo  = 建议变调夹品数
 *  level = 1 入门 / 2 进阶 / 3 技巧
 *
 *  说明：现代作品的歌词是版权内容，内置谱只标每段首句作为定位，
 *  完整歌词可以在详情页点段落右侧的笔自己补，存在本机浏览器里。
 *  标 publicDomain 的几首是传统曲目，歌词完整。
 * ============================================================ */
window.SONGS = [

/* ---------------- 中文 · 民谣与校园 ---------------- */
{
  id: 'tongnian', title: '童年', artist: '罗大佑', key: 'C', capo: 0, bpm: 104, time: '4/4', level: 1,
  tags: ['民谣', '校园', '中文'],
  tip: '全曲四个和弦循环。右手 4/4 分解用「根-3-2-3」，每小节换一个和弦，是最适合新手的第一个完整曲子。',
  sections: [
    { n: '前奏', l: ['[C]   [G]   [Am]   [Em]', '[F]   [C]   [F]   [G]'] },
    { n: '主歌 A', l: ['[C]池塘边的榕树上 [G]知了在声声叫着夏天', '[Am]操场边的秋千上 [Em]只有蝴蝶停在上面', '[F]黑板上老师的粉笔 [C]还在拼命唧唧喳喳写个不停', '[F]等待着下课 [G]等待着放学 等待[C]游戏的童年'] },
    { n: '主歌 B', l: ['[F]总是要等到睡觉前 [G]才知道功课只做了一点点', '[C]总是要等到考试以后 [Am]才知道该念的书都没有念', '[F]一寸光阴一寸金 [G]老师说过寸金难买寸光[C]阴'] },
    { n: '副歌', l: ['[F]阳光下蜻蜓飞过来 [G]一片片绿油油的稻田', '[C]水彩蜡笔和万花筒 [Am]画不出天边那一条彩虹', '[F]什么时候才能像高年级的同学 [G]有张成熟与长大的脸', '[C]一天又一天 [G]一年又一年 [C]盼望长大的童年'] }
  ]
},
{
  id: 'guangyin', title: '光阴的故事', artist: '罗大佑', key: 'G', capo: 0, bpm: 96, time: '4/4', level: 1,
  tags: ['民谣', '校园', '中文'],
  tip: 'G-Em-C-D 的经典走向，全程开放和弦。副歌前那个 C-D 是全曲唯一的推力，别抢拍。',
  sections: [
    { n: '前奏', l: ['[G]   [Em]   [C]   [D]'] },
    { n: '主歌', l: ['[G]春天的花开秋天的风 [Em]以及冬天的落阳', '[C]忧郁的青春年少的我 [D]曾经无知的这么想', '[G]风车在四季轮回的歌里 [Em]它天天的流转', '[C]风花雪月的诗句里 [D]我在年年的成长'] },
    { n: '副歌', l: ['[C]发黄的相片古老的信 [D]以及褪色的圣诞卡', '[G]年轻时为你写的歌 [Em]恐怕你早已忘了吧', '[C]过去的誓言就像那课本里 [D]缤纷的书签', '[C]刻画着多少美丽的诗 [D]可终究是一阵[G]烟'] }
  ]
},
{
  id: 'lianqu1990', title: '恋曲1990', artist: '罗大佑', key: 'G', capo: 0, bpm: 92, time: '4/4', level: 2,
  tags: ['民谣', '经典', '中文'],
  tip: '副歌的 C-D-G-Em 是全曲情绪高点，右手可以从分解切到扫弦，但别加快速度。',
  sections: [
    { n: '前奏', l: ['[G]   [D]   [Em]   [C]', '[G]   [D]   [C]   [D]'] },
    { n: '主歌', l: ['[G]乌溜溜的黑眼珠 [D]和你的笑脸', '[Em]怎么也难忘记你 [C]容颜的转变', '[G]轻飘飘的旧时光 [D]就这么溜走', '[C]转头回去看看时 [D]已匆匆数年'] },
    { n: '副歌', l: ['[C]苍茫茫的天涯路 [D]是你的漂泊', '[G]寻寻觅觅长相守 [Em]是我的脚步', '[C]黑漆漆的孤枕边 [D]是你的温柔', '[C]醒来时的清晨里 [D]是我的哀[G]愁'] }
  ]
},
{
  id: 'nideyangzi', title: '你的样子', artist: '罗大佑', key: 'Am', capo: 0, bpm: 84, time: '4/4', level: 2,
  tags: ['民谣', '经典', '中文'],
  tip: 'Am 调，全曲围绕 Am-F-C-G 转。副歌的 F-G-Am 三连要把尾音留住，别断得太干脆。',
  sections: [
    { n: '前奏', l: ['[Am]   [F]   [C]   [G]'] },
    { n: '主歌', l: ['[Am]我听到传来的谁的声音 [F]像那梦里呜咽中的小河', '[C]我看到远去的谁的步伐 [G]遮住告别时哀伤的眼神', '[Am]不明白的是为何你情愿 [F]让风尘刻画你的样子', '[C]就像早已忘情的世界 [G]曾经拥有你的名字我的声音'] },
    { n: '副歌', l: ['[F]那悲歌总会在梦中惊醒 [G]诉说一点哀伤过的往事', '[Am]那看似满不在乎转过身的 [F]是风干泪眼后萧瑟的影子', '[F]不明白的是为何人世间 [G]总不能溶解你的样子', '[F]是否来迟了明日的渊源 [G]早已写了你的笑容我的心情[Am]'] }
  ]
},
{
  id: 'tongzhuo', title: '同桌的你', artist: '老狼', key: 'C', capo: 0, bpm: 78, time: '6/8', level: 1,
  tags: ['民谣', '校园', '中文'],
  tip: '原调 C，用 C 调指法，不用变调夹。六八拍：一小节六个八分，两拍一组（3+3），' +
    '速度对附点四分（52），拿四分音符去打节拍器会快一倍。' +
    '前奏 C-C-Em-G-F-Fm-Gsus4-G——F 换 Fm 那一下（四级变大四级）是这首歌的苦味，别顺口弹回 F；' +
    '主歌 C-Em-F-G-C-F-G7-C，副歌 C-Am-Dm-Am-Em-G-G7-C，都是一段八小节，反复时只换词不换和弦。' +
    '右手一和弦一小节，根-3-2 · 1-2-3 六个音一轮：前奏主歌副歌全用分解，副歌也不扫。',
  sections: [
    {
      n: '前奏',
      l: ['[C]      [C]', '[Em]      [G]', '[F]      [Fm]', '[Gsus4]      [G]']
    },
    {
      n: '主歌',
      l: [
        '[C]明天你是否会想起 [Em]昨天你写的日记',
        '[F]明天你是否还惦记 [G]曾经最爱哭的你',
        '[C]老师们都已想不起 [F]猜不出问题的你',
        '[G7]我也是偶然翻相片 [C]才想起同桌的你'
      ],
      // 同一套八小节，反复时换的词。原谱就是两行词叠在同一行谱下面，
      // 这里排不出双行，就放在谱子后面依次列出。
      verses: [
        '老师们都已想不起，猜不出问题的你；我也是偶然翻相片，才想起同桌的你',
        '你从前总是很小心，问我借半块橡皮；你也曾无意中说起，喜欢和我在一起',
        '那时候天总是很蓝，日子总过得太慢；你总说毕业遥遥无期，转眼就各奔东西'
      ]
    },
    {
      n: '副歌',
      l: [
        '[C]谁娶了多愁善感的你 [Am]谁看了你的日记',
        '[Dm]谁把你的长发盘起 [Am]谁给你做的嫁衣',
        '[Em]谁遇到多愁善感的你 [G]谁安慰爱哭的你',
        '[G7]谁看了我给你写的信 [C]谁把它丢在风里'
      ],
      verses: ['谁遇到多愁善感的你，谁安慰爱哭的你；谁看了我给你写的信，谁把它丢在风里']
    },
    {
      n: '尾奏',
      l: ['[C]      [C]', '[Em]      [G]', '[F]      [Fm]', '[Gsus4]      [G]',
          '[C]      [Em]', '[F]      [G]', '[C]      [C]']
    }
  ]
},
{
  id: 'shangpu', title: '睡在我上铺的兄弟', artist: '老狼', key: 'G', capo: 0, bpm: 76, time: '4/4', level: 2,
  tags: ['民谣', '校园', '中文'],
  tip: '速度慢，右手的分解要留白——每小节最后半拍不要填满，才有宿舍夜谈的味道。',
  sections: [
    { n: '前奏', l: ['[G]   [D]   [Em]   [C]', '[G]   [D]   [C]   [D]'] },
    { n: '主歌', l: ['[G]睡在我上铺的兄弟 [D]无声无息的你', '[Em]你曾经问我的那些问题 [C]如今再没人问起', '[G]分给我烟抽的兄弟 [D]分给我快乐的往昔', '[C]你总是猜不对我手里的硬币 [D]摇摇头说这太神[G]秘'] },
    { n: '副歌', l: ['[C]你说每当你回头看夕阳红 [D]每当你又听到晚钟', '[G]从前的点点滴滴会涌起 [Em]在你来不及难过的心里', '[C]你来的信写得越来越客气 [D]关于爱情你只字不提', '[C]你说你现在有很多的朋友 [D]却再也不为那些事忧[G]愁'] }
  ]
},
{
  id: 'naxiehua', title: '那些花儿', artist: '朴树', key: 'G', capo: 0, bpm: 88, time: '4/4', level: 2,
  tags: ['民谣', '中文'],
  tip: '注意 D/F# 这个转位——它是 G 到 Em 之间的桥。低音从 G 走到 F#，整首曲子立刻不像练习曲了。',
  sections: [
    { n: '前奏', l: ['[G]   [D/F#]   [Em]   [C]', '[G]   [D]   [C]   [D]'] },
    { n: '主歌', l: ['[G]那片笑声让我想起 [D/F#]我的那些花儿', '[Em]在我生命每个角落 [C]静静为我开着', '[G]我曾以为我会永远 [D]守在她身旁', '[C]今天我们[G]已经离去 [C]在人海茫[D]茫'] },
    { n: '副歌', l: ['[C]她们都老了吧 [D]她们在哪里呀', '[G]我们就这样 [Em]各自奔天涯', '[C]啦……想她 [D]啦……她还在开吗', '[C]啦……去呀 [D]她们已经被风吹走 散落在天[G]涯'] }
  ]
},
{
  id: 'baihualin', title: '白桦林', artist: '朴树', key: 'Em', capo: 0, bpm: 76, time: '4/4', level: 2,
  tags: ['民谣', '中文'],
  tip: 'Em 调。手风琴式的长音要交给和弦本身，右手尽量简单——越少越冷。',
  sections: [
    { n: '前奏', l: ['[Em]   [C]   [G]   [D]', '[Em]   [C]   [D]   [Em]'] },
    { n: '主歌', l: ['[Em]静静的村庄飘着白的雪 [C]阴霾的天空下鸽子飞翔', '[G]白桦树刻着那两个名字 [D]他们发誓相爱用尽这一生', '[Em]有一天战火烧到了家乡 [C]小伙子拿起枪奔赴边疆', '[G]心上人你不要为我担心 [D]等着我回来在那片白桦[Em]林'] },
    { n: '副歌', l: ['[Em]天空依然阴霾依然有鸽子在飞翔 [C]谁来证明那些没有墓碑的爱情和生命', '[G]雪依然在下那村庄依然安详 [D]年轻的人们消逝在白桦林', '[C]噩耗声传来在那个午后 [D]心上人战死在远方沙[Em]场'] }
  ]
},
{
  id: 'pingfan', title: '平凡之路', artist: '朴树', key: 'C', capo: 0, bpm: 92, time: '4/4', level: 2,
  tags: ['民谣', '摇滚', '中文'],
  tip: '主歌很安静，副歌一进来就把右手换成扫弦。C-G-F 的 F 要弹满，那是整首歌的落点。',
  sections: [
    { n: '前奏', l: ['[C]   [G]   [Am]   [F]', '[C]   [G]   [F]   [F]'] },
    { n: '主歌', l: ['[C]徘徊着的 在路上的 [G]你要走吗', '[Am]易碎的 骄傲着 [F]那也曾是我的模样', '[C]沸腾着的 不安着的 [G]你要去哪', '[F]谜一样的 沉默着的 [C]故事你真的在听吗'] },
    { n: '副歌', l: ['[F]我曾经跨过山和大海 [C]也穿过人山人海', '[G]我曾经拥有着的一切 [Am]转眼都飘散如烟', '[F]我曾经失落失望失掉所有方向 [C]直到看见平凡才是唯一的答[G]案'] }
  ]
},
{
  id: 'lanlianhua', title: '蓝莲花', artist: '许巍', key: 'G', capo: 0, bpm: 96, time: '4/4', level: 2,
  tags: ['摇滚', '中文'],
  tip: 'G-D-Em-C 循环。副歌用闷音扫弦，右手掌根压在琴桥附近，会干净很多。',
  sections: [
    { n: '前奏', l: ['[G]   [D]   [Em]   [C]'] },
    { n: '主歌', l: ['[G]没有什么能够阻挡 [D]你对自由的向往', '[Em]天马行空的生涯 [C]你的心了无牵挂', '[G]穿过幽暗的岁月 [D]也曾感到彷徨', '[C]当你低头的瞬间 [D]才发觉脚下的[G]路'] },
    { n: '副歌', l: ['[G]心中那自由的世界 [D]如此的清澈高远', '[Em]盛开着永不凋零 [C]蓝莲[G]花', '[C]没有什么能够阻挡 [D]你对自由的向[G]往'] }
  ]
},
{
  id: 'cengjing', title: '曾经的你', artist: '许巍', key: 'G', capo: 0, bpm: 108, time: '4/4', level: 2,
  tags: ['摇滚', '中文'],
  tip: '速度偏快，扫弦用「下下上」就够，别在副歌里加花——这首歌的力量来自持续的推进。',
  sections: [
    { n: '前奏', l: ['[G]   [D]   [Em]   [C]'] },
    { n: '主歌', l: ['[G]曾梦想仗剑走天涯 [D]看一看世界的繁华', '[Em]年少的心总有些轻狂 [C]如今你四海为家', '[G]曾让你心疼的姑娘 [D]如今已悄然无踪影', '[C]爱情总让你渴望又感到烦恼 [D]曾让你遍体鳞伤'] },
    { n: '副歌', l: ['[C]Di li li li di li li li den da [D]走在勇往直前的路上', '[G]Di li li li di li li li den da [Em]有难过也有精彩', '[C]每一次难过的时候 [D]就独自看一看大海', '[C]总想起身边走在路上的朋友 [D]有多少正在醒来[G]'] }
  ]
},
{
  id: 'chengdu', title: '成都', artist: '赵雷', key: 'C', capo: 0, bpm: 82, time: '4/4', level: 2,
  tags: ['民谣', '中文'],
  tip: 'C-G-Am-Em / F-C-Dm-G，标准的 4536251。副歌 F-G-Em-Am 时右手换成半拍扫，情绪才起得来。',
  sections: [
    { n: '前奏', l: ['[C]   [G]   [Am]   [Em]', '[F]   [C]   [Dm]   [G]'] },
    { n: '主歌', l: ['[C]让我掉下眼泪的 [G]不止昨夜的酒', '[Am]让我依依不舍的 [Em]不止你的温柔', '[F]余路还要走多久 [C]你攥着我的手', '[Dm]让我感到为难的 [G]是挣扎的自[C]由'] },
    { n: '副歌', l: ['[F]和我在成都的街头走一走 [G]喔哦', '[Em]直到所有的灯都熄灭了也不停[Am]留', '[F]你会挽着我的衣袖 [G]我会把手揣进裤兜', '[F]走到玉林路的尽头 [G]坐在小酒馆的门[C]口'] }
  ]
},
{
  id: 'dongxiaojie', title: '董小姐', artist: '宋冬野', key: 'C', capo: 0, bpm: 88, time: '4/4', level: 1,
  tags: ['民谣', '中文'],
  tip: 'C-G-Am-F 四个和弦。唱的部分几乎全在说话，右手保持均匀的八分音符就好。',
  sections: [
    { n: '前奏', l: ['[C]   [G]   [Am]   [F]'] },
    { n: '主歌', l: ['[C]董小姐 [G]你从没忘记你的微笑', '[Am]就算你和我一样 [F]渴望着衰老', '[C]董小姐 [G]你嘴角向下的时候很美', '[Am]就像安和桥下 [F]清澈的水'] },
    { n: '副歌', l: ['[F]所以那些可能都不是真的 [G]董小姐', '[C]你才不是一个没有故事的 [Am]女同学', '[F]爱上一匹野马 [G]可我的家里没有草原', '[F]这让我感到绝望 [G]董小[C]姐'] }
  ]
},
{
  id: 'nanshan', title: '南山南', artist: '马頔', key: 'C', capo: 0, bpm: 80, time: '4/4', level: 2,
  tags: ['民谣', '中文'],
  tip: '副歌的 F-G-C-Am 要一路推到「南山南」三个字再收。最后一句转回 F-G 时别急。',
  sections: [
    { n: '前奏', l: ['[C]   [G]   [Am]   [F]', '[C]   [G]   [F]   [G]'] },
    { n: '主歌', l: ['[C]你在南方的艳阳里 [G]大雪纷飞', '[Am]我在北方的寒夜里 [F]四季如春', '[C]如果天黑之前来得及 [G]我要忘了你的眼睛', '[F]穷极一生做不完一场[G]梦'] },
    { n: '副歌', l: ['[F]他不再和谁谈论相逢的孤岛 [G]因为心里早已荒无人烟', '[C]他的心里再装不下一个家 [Am]做一个只对自己说谎的哑巴', '[F]他说你任何为人称道的美丽 [G]不及他第一次遇见你', '[F]时光苟延残喘无可奈何 [G]如果所有土地连在一起 走上一生只为拥抱[C]你'] }
  ]
},

/* ---------------- 中文 · 流行 ---------------- */
{
  id: 'qingtian', title: '晴天', artist: '周杰伦', key: 'G', capo: 0, bpm: 138, time: '4/4', level: 2,
  tags: ['流行', '中文'],
  tip: '主歌 G-D/F#-Em-Bm 里的 Bm 是横按，第一次弹会卡；先单独练那一小节，再连起来。',
  sections: [
    { n: '前奏', l: ['[G]   [D/F#]   [Em]   [Bm]', '[C]   [G/B]   [Am]   [D]'] },
    { n: '主歌', l: ['[G]故事的小黄花 [D/F#]从出生那年就飘着', '[Em]童年的荡秋千 [Bm]随记忆一直晃到现在', '[C]Re So So Si Do Si La [G/B]So La Si Si Si Si La Si La So', '[Am]吹着前奏望着天空 [D]我想起花瓣试着掉落'] },
    { n: '副歌', l: ['[C]刮风这天我试过握着你手 [D]但偏偏雨渐渐大到我看你不见', '[Bm]还要多久我才能在你身边 [Em]等到放晴的那天也许我会比较好一点', '[C]从前从前有个人爱你很久 [D]但偏偏风渐渐把距离吹得好远', '[C]好不容易又能再多爱一天 [D]但故事的最后你好像还是说了拜[G]拜'] }
  ]
},
{
  id: 'daoxiang', title: '稻香', artist: '周杰伦', key: 'C', capo: 0, bpm: 92, time: '4/4', level: 1,
  tags: ['流行', '中文'],
  tip: 'C-G-Am-Em / F-C-Dm-G，全开放和弦，是最适合练「弹唱同步」的一首。副歌可以加个 Cadd9 换掉 C。',
  sections: [
    { n: '前奏', l: ['[C]   [G]   [Am]   [Em]', '[F]   [C]   [Dm]   [G]'] },
    { n: '主歌', l: ['[C]对这个世界如果你有太多的抱怨 [G]跌倒了就不敢继续往前走', '[Am]为什么人要这么的脆弱堕落 [Em]请你打开电视看看', '[F]多少人为生命在努力勇敢的走下去 [C]我们是不是该知足', '[Dm]珍惜一切就算没有拥[G]有'] },
    { n: '副歌', l: ['[F]还记得你说家是唯一的城堡 [G]随着稻香河流继续奔跑', '[Em]微微笑 小时候的梦我知道 [Am]不要哭让萤火虫带着你逃跑', '[F]乡间的歌谣永远的依靠 [G]回家吧 回到最初的美[C]好'] }
  ]
},
{
  id: 'qilixiang', title: '七里香', artist: '周杰伦', key: 'G', capo: 0, bpm: 84, time: '4/4', level: 2,
  tags: ['流行', '中文'],
  tip: '整首都在 G-D/F#-Em-C 上打转。右手用「根-3-2-1-2-3」的六连分解，速度慢但别拖。',
  sections: [
    { n: '前奏', l: ['[G]   [D/F#]   [Em]   [C]'] },
    { n: '主歌', l: ['[G]窗外的麻雀 在电线杆上多嘴 [D/F#]你说这一句 很有夏天的感觉', '[Em]手中的铅笔 在纸上来来回回 [C]我用几行字形容你是我的谁', '[G]秋刀鱼的滋味 猫跟你都想了解 [D/F#]初恋的香味就这样被我们寻回'] },
    { n: '副歌', l: ['[C]雨下整夜 我的爱溢出就像雨水 [D]院子落叶 跟我的思念厚厚一叠', '[G]几句是非 也无法将我的热情冷却 [Em]你出现在我诗的每一页', '[C]雨下整夜 我的爱溢出就像雨水 [D]窗台蝴蝶 像诗里纷飞的美丽章节', '[C]我接着写 把永远爱你写进诗的结[G]尾'] }
  ]
},
{
  id: 'houlai', title: '后来', artist: '刘若英', key: 'C', capo: 0, bpm: 76, time: '4/4', level: 2,
  tags: ['流行', '经典', '中文'],
  tip: '主歌 C-G-Am-Em / F-C-Dm-G 是标准 4536251，副歌把第三个和弦换成 Em 让路给情绪。全程别加速。',
  sections: [
    { n: '前奏', l: ['[C]   [G]   [Am]   [Em]', '[F]   [C]   [Dm]   [G]'] },
    { n: '主歌', l: ['[C]后来 [G]我总算学会了如何去爱', '[Am]可惜你早已远去 [Em]消失在人海', '[F]后来 [C]终于在眼泪中明白', '[Dm]有些人一旦错过就不[G]在'] },
    { n: '副歌', l: ['[F]栀子花白花瓣 [G]落在我蓝色百褶裙上', '[Em]爱你 你轻声说 [Am]我低下头闻见一阵芬芳', '[F]那个永恒的夜晚 [G]十七岁仲夏 你吻我的那个夜晚', '[F]让我往后的时光 [G]每当有感叹 总想起当天的星[C]光'] }
  ]
},
{
  id: 'hongdou', title: '红豆', artist: '王菲', key: 'C', capo: 0, bpm: 76, time: '4/4', level: 2,
  tags: ['流行', '经典', '中文'],
  tip: '和弦里 C-Em-Am 那条线要弹得连贯，Em 不要按成 Em7——这里的空洞感是故意留的。',
  sections: [
    { n: '前奏', l: ['[C]   [Em]   [Am]   [F]', '[C]   [G]'] },
    { n: '主歌', l: ['[C]还没好好的感受 [Em]雪花绽放的气候', '[Am]我们一起颤抖 [F]会更明白什么是温[C]柔', '[C]还没跟你牵着手 [Em]走过荒芜的沙丘', '[Am]可能从此以后 [F]学会珍惜天长和地[G]久'] },
    { n: '副歌', l: ['[F]有时候 有时候 [G]我会相信一切有尽头', '[C]相聚离开都有时候 [Am]没有什么会永垂不朽', '[F]可是我 有时候 [G]宁愿选择留恋不放手', '[F]等到风景都看透 [G]也许你会陪我看细水长[C]流'] }
  ]
},
{
  id: 'chuanqi', title: '传奇', artist: '李健', key: 'C', capo: 0, bpm: 72, time: '4/4', level: 2,
  tags: ['流行', '中文'],
  tip: '速度慢，留白多。副歌的 F-G-C-Am 每小节只换一次，右手越简单越好，让人声在前面。',
  sections: [
    { n: '前奏', l: ['[C]   [G]   [Am]   [Em]', '[F]   [C]   [Dm]   [G]'] },
    { n: '主歌', l: ['[C]只是因为在人群中 [G]多看了你一眼', '[Am]再也没能忘掉你容颜 [Em]梦想着偶然能有一天再相见', '[F]从此我开始孤单思念 [C]想你时你在天边', '[Dm]想你时你在眼前 [G]想你时你在脑海 想你时你在心田'] },
    { n: '副歌', l: ['[F]宁愿相信我们前世有约 [G]今生的爱情故事不会再改变', '[C]宁愿用这一生等你发现 [Am]我一直在你身旁从未走远', '[F]只是因为在人群中多看了你一眼 [G]再也没能忘掉你容[C]颜'] }
  ]
},
{
  id: 'beijiaer', title: '贝加尔湖畔', artist: '李健', key: 'Am', capo: 0, bpm: 76, time: '4/4', level: 3,
  tags: ['民谣', '中文'],
  tip: 'Am-Em-F-C 之后落 Dm-Am-E，那个 E 是大三和弦（不是 Em），是整首歌唯一一处明亮，别按错。',
  sections: [
    { n: '前奏', l: ['[Am]   [Em]   [F]   [C]', '[Dm]   [Am]   [E]   [E]'] },
    { n: '主歌', l: ['[Am]在我的怀里 [Em]在你的眼里', '[F]那里春风沉醉 [C]那里绿草如茵', '[Dm]月光把爱恋 [Am]洒满了湖面', '[E]两个人的篝火 照亮整个夜[Am]晚'] },
    { n: '副歌', l: ['[F]多少年以后 [G]如云般游走', '[C]那变换的脚步 [Am]让我们难牵手', '[F]这一生一世 [G]有多少你我', '[Dm]被吞没在月光如水的夜[Am]里'] }
  ]
},
{
  id: 'shinian', title: '十年', artist: '陈奕迅', key: 'C', capo: 0, bpm: 76, time: '4/4', level: 2,
  tags: ['流行', '经典', '中文'],
  tip: '主歌用 G/B 而不是 G，低音半音下行（C-B-A-G）是这个编曲最讲究的地方。',
  sections: [
    { n: '前奏', l: ['[C]   [G/B]   [Am]   [Em]', '[F]   [C]   [Dm]   [G]'] },
    { n: '主歌', l: ['[C]如果那两个字没有颤抖 [G/B]我不会发现我难受', '[Am]怎么说出口 [Em]也不过是分手', '[F]如果对于明天没有要求 [C]牵牵手就像旅游', '[Dm]成千上万个门口 [G]总有一个人要先[C]走'] },
    { n: '副歌', l: ['[F]怀抱既然不能逗留 [G]何不在离开的时候', '[Em]一边享受 [Am]一边泪流', '[F]十年之前 我不认识你 [G]你不属于我', '[Em]我们还是一样 [Am]陪在一个陌生人左右', '[F]走过渐渐熟悉的街头 [G]十年之后 我们是朋友 [C]还可以问候'] }
  ]
},
{
  id: 'haojiu', title: '好久不见', artist: '陈奕迅', key: 'C', capo: 0, bpm: 72, time: '4/4', level: 2,
  tags: ['流行', '中文'],
  tip: '几乎全程弱弹。副歌不要加大力度，这首歌靠「忍住」而不是靠爆发。',
  sections: [
    { n: '前奏', l: ['[C]   [G/B]   [Am]   [Em]', '[F]   [C]   [Dm]   [G]'] },
    { n: '主歌', l: ['[C]我来到你的城市 [G/B]走过你来时的路', '[Am]想像着没我的日子 [Em]你是怎样的孤独', '[F]拿着你给的照片 [C]熟悉的那一条街', '[Dm]只是没了你的画面 [G]我们回不到那[C]天'] },
    { n: '副歌', l: ['[F]你会不会忽然的出现 [G]在街角的咖啡店', '[Em]我会带着笑脸 挥手寒暄 [Am]和你坐着聊聊天', '[F]我多么想和你见一面 [G]看看你最近改变', '[F]不再去说从前 只是寒暄 [G]对你说一句 只是说一句 好久不[C]见'] }
  ]
},
{
  id: 'haikuo', title: '海阔天空', artist: 'Beyond', key: 'C', capo: 0, bpm: 72, time: '4/4', level: 3,
  tags: ['摇滚', '经典', '中文'],
  tip: '主歌 Am-F-C-G 很暗，副歌 C-G-Am-F 一下打开。中间那个转折是全曲的支点，右手要在那里加重。',
  sections: [
    { n: '前奏', l: ['[Am]   [F]   [C]   [G]', '[Am]   [F]   [C]   [G]'] },
    { n: '主歌', l: ['[Am]今天我 寒夜里看雪飘过 [F]怀着冷却了的心窝漂远方', '[C]风雨里追赶 雾里分不清影踪 [G]天空海阔你与我可会变（谁没在变）', '[Am]多少次 迎着冷眼与嘲笑 [F]从没有放弃过心中的理想', '[C]一刹那恍惚 若有所失的感觉 [G]不知不觉已变淡 心里爱（谁明白我）'] },
    { n: '副歌', l: ['[C]原谅我这一生不羁放纵爱自由 [G]也会怕有一天会跌倒', '[Am]背弃了理想 谁人都可以 [F]哪会怕有一天只你共我', '[C]仍然自由自我 永远高唱我歌 [G]走遍千里'] }
  ]
},
{
  id: 'guanghui', title: '光辉岁月', artist: 'Beyond', key: 'C', capo: 0, bpm: 76, time: '4/4', level: 2,
  tags: ['摇滚', '经典', '中文'],
  tip: 'Am-F-C-G 四和弦，主副歌同一条线，全曲靠人声和鼓推。扫弦用十六分音符的「下-下上」更接近原版。',
  sections: [
    { n: '前奏', l: ['[Am]   [F]   [C]   [G]'] },
    { n: '主歌', l: ['[Am]钟声响起归家的讯号 [F]在他生命里 仿佛带点唏嘘', '[C]黑色肌肤给他的意义 [G]是一生奉献 肤色斗争中', '[Am]年月把拥有变做失去 [F]疲倦的双眼带着期望', '[C]今天只有残留的躯壳 [G]迎接光辉岁月 风雨中抱紧自由'] },
    { n: '副歌', l: ['[F]一生经过彷徨的挣扎 [G]自信可改变未来', '[C]问谁又能做到 [Am]可否不分肤色的界限', '[F]愿这土地里 不分你我高低 [G]缤纷色彩闪出的美丽 是因它没有分开每种色[C]彩'] }
  ]
},
{
  id: 'yujian', title: '遇见', artist: '孙燕姿', key: 'C', capo: 0, bpm: 72, time: '4/4', level: 2,
  tags: ['流行', '中文'],
  tip: '和《十年》同一条低音下行线（C-G/B-Am-Em）。副歌 F-G-Em-Am 时把 Dm-G 留住，收尾才有力。',
  sections: [
    { n: '前奏', l: ['[C]   [G/B]   [Am]   [Em]', '[F]   [C]   [Dm]   [G]'] },
    { n: '主歌', l: ['[C]听见 冬天的离开 [G/B]我在某年某月醒过来', '[Am]我想 我等 我期待 [Em]未来却不能因此安排', '[F]阴天 傍晚 车窗外 [C]未来有一个人在等待', '[Dm]向左向右向前看 [G]爱要拐几个弯才来'] },
    { n: '副歌', l: ['[F]我遇见谁 会有怎样的对白 [G]我等的人 他在多远的未来', '[Em]我听见风来自地铁和人海 [Am]我排着队 拿着爱的号码牌', '[F]我往前飞 飞过一片时间海 [G]我们也常在爱情里受伤害', '[F]我看着路 梦的入口有点窄 [G]我遇见你是最美丽的意[C]外'] }
  ]
},
{
  id: 'tonghua', title: '童话', artist: '光良', key: 'C', capo: 0, bpm: 68, time: '4/4', level: 1,
  tags: ['流行', '中文'],
  tip: '四个和弦，慢速。右手分解从头到尾不变，练「不看手」弹唱就靠它。',
  sections: [
    { n: '前奏', l: ['[C]   [G]   [Am]   [F]', '[C]   [G]   [F]   [G]'] },
    { n: '主歌', l: ['[C]忘了有多久 [G]再没听到你 [Am]对我说你最爱的故事', '[F]我想了很久 [C]我开始慌了 [G]是不是我又做错了什么', '[C]你哭着对我说 [G]童话里都是骗人的 [Am]我不可能是你的王子', '[F]也许你不会懂 [C]从你说爱我以后 [G]我的天空星星都亮了'] },
    { n: '副歌', l: ['[F]我愿变成童话里 [G]你爱的那个天使', '[Em]张开双手 [Am]变成翅膀守护你', '[F]你要相信 [G]相信我们会像童话故事里', '[F]幸福和快乐是结[G]局'] }
  ]
},
{
  id: 'xiaoxingyun', title: '小幸运', artist: '田馥甄', key: 'G', capo: 0, bpm: 76, time: '4/4', level: 2,
  tags: ['流行', '影视', '中文'],
  tip: 'G-D/F#-Em-C 的下行低音很关键，D/F# 别偷懒弹成 D，整首的呼吸就在那个 F# 上。',
  sections: [
    { n: '前奏', l: ['[G]   [D/F#]   [Em]   [C]', '[G]   [D/F#]   [C]   [C]'] },
    { n: '主歌', l: ['[G]我听见雨滴落在青青草地 [D/F#]我听见远方下课钟声响起', '[Em]可是我没有听见你的声音 [C]认真 呼唤我姓名', '[G]爱上你的时候还不懂感情 [D/F#]离别了才觉得刻骨铭心', '[C]为什么没有发现遇见了你 [D]是生命最好的事[G]情'] },
    { n: '副歌', l: ['[C]也许当时忙着微笑和哭泣 [D]忙着追逐天空中的流星', '[G]人理所当然的忘记 [Em]是谁风里雨里一直默默守护在原地', '[C]原来你是我最想留住的幸运 [D]原来我们和爱情曾经靠得那么近', '[C]那为我对抗世界的决定 [D]那陪我淋的雨 一幕幕都是你 [G]'] }
  ]
},
{
  id: 'nufang', title: '怒放的生命', artist: '汪峰', key: 'C', capo: 0, bpm: 100, time: '4/4', level: 2,
  tags: ['摇滚', '中文'],
  tip: '副歌全程强力和弦（只按根音加五度）更接近原版。想用开放和弦的话，扫弦力度要顶上去。',
  sections: [
    { n: '前奏', l: ['[Am]   [F]   [C]   [G]'] },
    { n: '主歌', l: ['[Am]曾经多少次跌倒在路上 [F]曾经多少次折断过翅膀', '[C]如今我已不再感到彷徨 [G]我想超越这平凡的生活', '[Am]曾经多少次失去了方向 [F]曾经多少次破灭了梦想', '[C]如今我已不再感到迷茫 [G]我要我的生命得到解放'] },
    { n: '副歌', l: ['[F]我想要怒放的生命 [G]就像飞翔在辽阔天空', '[C]就像穿行在无边的旷野 [Am]拥有挣脱一切的力量', '[F]我想要怒放的生命 [G]就像矗立在彩虹之巅', '[F]就像穿行在璀璨的星河 [G]拥有超越平凡的力量[Am]'] }
  ]
},
{
  id: 'yishengsuoai', title: '一生所爱', artist: '卢冠廷', key: 'Am', capo: 0, bpm: 68, time: '4/4', level: 3,
  tags: ['影视', '经典', '中文'],
  tip: 'Am-Em-F-G 一直循环，听起来简单，难在慢速下保持不晃。建议先用节拍器 60 弹稳，再回到 68。',
  sections: [
    { n: '前奏', l: ['[Am]   [Em]   [F]   [G]', '[Am]   [Em]   [F]   [G]'] },
    { n: '主歌', l: ['[Am]从前现在过去了再不来 [Em]红红落叶长埋尘土内', '[F]开始终结总是没变改 [G]天边的你飘泊白云外', '[Am]苦海翻起爱恨 [Em]在世间难逃避命运', '[F]相亲竟不可接近 [G]或我应该相信是缘分'] },
    { n: '副歌', l: ['[F]情人别后永远再不来 [G]无言独坐放眼尘世外', '[Am]鲜花虽会凋谢 [Em]但会再开', '[F]一生所爱隐约 [G]在白云外'] }
  ]
},

/* ---------------- 英文经典 ---------------- */
{
  id: 'hotel', title: 'Hotel California', artist: 'Eagles', key: 'Am', capo: 2, bpm: 74, time: '4/4', level: 3,
  tags: ['摇滚', '英文', '经典'],
  tip: '原调 Bm，用 Am 手型加变调夹 2 品就是原调。副歌前那段双吉他对话，单吉他可以用 Am-E7-F-C 走一遍代替。',
  sections: [
    { n: '前奏', l: ['[Am]   [E7]   [F]   [C]', '[Dm]   [E7]   [Am]   [Am]'] },
    { n: '主歌', l: ['[Am]On a dark desert highway, [E7]cool wind in my hair', '[F]Warm smell of colitas, [C]rising up through the air', '[Dm]Up ahead in the distance, [E7]I saw a shimmering light', '[Am]My head grew heavy and my sight grew dim, [E7]I had to stop for the night'] },
    { n: '副歌', l: ['[F]Welcome to the Hotel [C]California', '[Dm]Such a lovely place, [Am]such a lovely face', '[F]Plenty of room at the Hotel [C]California', '[Dm]Any time of year, [E7]you can find it [Am]here'] }
  ]
},
{
  id: 'letitbe', title: 'Let It Be', artist: 'The Beatles', key: 'C', capo: 0, bpm: 68, time: '4/4', level: 1,
  tags: ['英文', '经典', '入门'],
  tip: 'C-G-Am-F 加一个 G 回到 C。全曲只用四个开放和弦，是最经典的「第一次弹唱英文歌」。',
  sections: [
    { n: '前奏', l: ['[C]   [G]   [Am]   [F]', '[C]   [G]   [F]   [C]'] },
    { n: '主歌', l: ['[C]When I find myself in [G]times of trouble, [Am]Mother Mary [F]comes to me', '[C]Speaking words of [G]wisdom, let it [F]be [C]', '[C]And in my hour of [G]darkness, she is [Am]standing right in [F]front of me', '[C]Speaking words of [G]wisdom, let it [F]be [C]'] },
    { n: '副歌', l: ['[Am]Let it be, let it [G]be, let it [F]be, let it [C]be', '[C]Whisper words of [G]wisdom, let it [F]be [C]'] }
  ]
},
{
  id: 'heyjude', title: 'Hey Jude', artist: 'The Beatles', key: 'F', capo: 0, bpm: 74, time: '4/4', level: 2,
  tags: ['英文', '经典'],
  tip: 'F 是横按，如果按不住就先全部降成 C 调（用变调夹 5 品弹 C 手型），味道一样。',
  sections: [
    { n: '前奏', l: ['[F]   [C]   [C7]   [F]', '[Bb]   [F]   [C]   [C]'] },
    { n: '主歌', l: ['[F]Hey Jude, don\'t make it [C]bad', '[C7]Take a sad song and make it [F]better', '[Bb]Remember to let her into your [F]heart', '[C]Then you can start to make it [F]better'] },
    { n: '副歌', l: ['[F]Naa, na na [Bb]na na na [F]na, na na na [C]na, hey Jude', '[F]Naa, na na [Bb]na na na [F]na, na na na [C]na, hey [F]Jude'] }
  ]
},
{
  id: 'yesterday', title: 'Yesterday', artist: 'The Beatles', key: 'F', capo: 0, bpm: 96, time: '4/4', level: 3,
  tags: ['英文', '经典'],
  tip: '和弦换得很密，一小节两个。Dm-Dm/C 那一步是低音下行，右手只要轻轻拨根音就够。',
  sections: [
    { n: '前奏', l: ['[F]   [Em7]   [A7]   [Dm]   [Dm/C]   [Bb]   [C7]'] },
    { n: '主歌', l: ['[F]Yesterday, [Em7]all my [A7]troubles seemed so [Dm]far away [Dm/C]', '[Bb]Now it [C7]looks as though they\'re [F]here to stay', '[F]Oh, [A7]I be[Dm]lieve in [Bb]yester[C7]day'] },
    { n: '副歌', l: ['[Dm]Suddenly, [G7]I\'m not half the [Bb]man I used to [F]be', '[Am]There\'s a [D7]shadow hanging [Gm]over [C7]me', '[F]Oh, [A7]yester[Dm]day came [Bb]sudden[C7]ly'] }
  ]
},
{
  id: 'imagine', title: 'Imagine', artist: 'John Lennon', key: 'C', capo: 0, bpm: 76, time: '4/4', level: 2,
  tags: ['英文', '经典'],
  tip: 'Cmaj7 是这首歌的颜色，按法 x32000（小指不按）。不要把 Cmaj7 弹成 C，会立刻变得平淡。',
  sections: [
    { n: '前奏', l: ['[C]   [Cmaj7]   [F]   [C]', '[C]   [Cmaj7]   [F]   [C]'] },
    { n: '主歌', l: ['[C]Imagine there\'s [Cmaj7]no heaven [F]It\'s easy if you [C]try', '[C]No hell below [Cmaj7]us [F]Above us only [C]sky', '[F]Imagine all the [G]people [C]Living for to[G]day'] },
    { n: '副歌', l: ['[F]You may [G]say I\'m a [C]dreamer', '[F]But I\'m [G]not the only [C]one', '[F]I hope some [G]day you\'ll [C]join us', '[F]And the [G]world will [C]live as one'] }
  ]
},
{
  id: 'wonderwall', title: 'Wonderwall', artist: 'Oasis', key: 'Em', capo: 2, bpm: 88, time: '4/4', level: 2,
  tags: ['摇滚', '英文'],
  tip: '四个和弦循环到底：Em7-G-Dsus4-A7sus4。变调夹 2 品才是原调 F#m。右手是持续的八分扫弦，别停。',
  sections: [
    { n: '前奏', l: ['[Em7]   [G]   [Dsus4]   [A7sus4]', '[Em7]   [G]   [Dsus4]   [A7sus4]'] },
    { n: '主歌', l: ['[Em7]Today is gonna be the day [G]that they\'re gonna throw it back to you', '[Dsus4]By now you should\'ve somehow [A7sus4]realized what you gotta do', '[Em7]I don\'t believe that anybody [G]feels the way I do about you [Dsus4]now [A7sus4]'] },
    { n: '副歌', l: ['[C]And all the roads we [D]have to walk are [Em7]winding', '[C]And all the lights that [D]lead us there are [Em7]blinding', '[C]There are many [D]things that I would [Em7]like to say to you', '[C]But I don\'t know [D]how'] }
  ]
},
{
  id: 'wishyouwerehere', title: 'Wish You Were Here', artist: 'Pink Floyd', key: 'G', capo: 0, bpm: 60, time: '4/4', level: 3,
  tags: ['摇滚', '英文', '经典'],
  tip: 'Em7 的 1 品要按在 5 弦（020000 不够，用 022030 那种按法味道更对）。整首靠一把琴的呼吸撑着。',
  sections: [
    { n: '前奏', l: ['[Em7]   [G]   [Em7]   [G]', '[Em7]   [A7]   [Em7]   [A7]'] },
    { n: '主歌', l: ['[Em7]So, so you think you can [G]tell', '[Em7]Heaven from hell, [G]blue skies from pain', '[C]Can you tell a green [D]field from a cold steel [Am]rail', '[G]A smile from a veil, [D]do you think you can [C]tell'] },
    { n: '副歌', l: ['[C]How we wish, how we [D]wish you were [Am]here', '[G]We\'re just [C]two lost souls [D]swimming in a fish [Am]bowl', '[G]Year after [D]year'] }
  ]
},
{
  id: 'knockin', title: "Knockin' on Heaven's Door", artist: 'Bob Dylan', key: 'G', capo: 0, bpm: 68, time: '4/4', level: 1,
  tags: ['英文', '民谣', '入门'],
  tip: 'G-D-Am 三个和弦，全曲不动。想练扫弦节奏型，这首最适合反复磨。',
  sections: [
    { n: '前奏', l: ['[G]   [D]   [Am]   [Am]', '[G]   [D]   [C]   [C]'] },
    { n: '主歌', l: ['[G]Mama, take this badge off of [D]me', '[Am]I can\'t use it any[Am]more', '[G]It\'s gettin\' dark, too dark to [D]see', '[C]Feels like I\'m knockin\' on heaven\'s [C]door'] },
    { n: '副歌', l: ['[G]Knock, knock, knockin\' on [D]heaven\'s door', '[Am]Knock, knock, knockin\' on heaven\'s [Am]door', '[G]Knock, knock, knockin\' on [D]heaven\'s door', '[C]Knock, knock, knockin\' on heaven\'s [C]door'] }
  ]
},
{
  id: 'countryroads', title: 'Take Me Home, Country Roads', artist: 'John Denver', key: 'A', capo: 0, bpm: 92, time: '4/4', level: 2,
  tags: ['英文', '民谣', '经典'],
  tip: 'A-F#m-D-A 之后用 E-D-A-E 收。F#m 是横按，按不住可以用 F#m7（242222）换个按法过渡。',
  sections: [
    { n: '前奏', l: ['[A]   [F#m]   [D]   [A]', '[E]   [D]   [A]   [E]'] },
    { n: '主歌', l: ['[A]Almost heaven, [F#m]West Virginia, [D]Blue Ridge Mountains, [A]Shenandoah River', '[A]Life is old there, [F#m]older than the trees, [D]Younger than the mountains, [A]blowin\' like a breeze'] },
    { n: '副歌', l: ['[A]Country roads, take me [E]home, to the [F#m]place I be[D]long', '[A]West Virginia, mountain [E]mama, take me [D]home, country [A]roads'] }
  ]
},
{
  id: 'hallelujah', title: 'Hallelujah', artist: 'Leonard Cohen', key: 'C', capo: 0, bpm: 60, time: '4/4', level: 3,
  tags: ['英文', '经典'],
  tip: '6/8 拍的摇摆感用 4/4 弹会散，右手试着按三连音分组。副歌 F-G-C-G 要一路收着。',
  sections: [
    { n: '前奏', l: ['[C]   [Am]   [C]   [Am]', '[F]   [G]   [C]   [G]'] },
    { n: '主歌', l: ['[C]Now I\'ve heard there was a [Am]secret chord', '[C]That David played and it [Am]pleased the Lord', '[F]But you don\'t really [G]care for music, [C]do you [G]', '[C]Well it goes like this, the [F]fourth, the fifth', '[G]The minor fall and the [E7]major lift'] },
    { n: '副歌', l: ['[F]Halle[G]lujah, [C]Halle[G]lujah', '[F]Halle[G]lujah, [E7]Halle[Am]lu[G]jah'] }
  ]
},
{
  id: 'tearsinheaven', title: 'Tears in Heaven', artist: 'Eric Clapton', key: 'A', capo: 0, bpm: 76, time: '4/4', level: 3,
  tags: ['英文', '经典'],
  tip: 'E/G#（422100）是关键转位，低音从 A 走到 G# 再到 F#。这一段练顺了，整首就成立了。',
  sections: [
    { n: '前奏', l: ['[A]   [E/G#]   [F#m]   [A/E]', '[D]   [E]   [A]   [A]'] },
    { n: '主歌', l: ['[A]Would you know my [E/G#]name [F#m]if I saw you in [A/E]heaven', '[D]Would it be the [E]same [A]if I saw you in heaven', '[A]Would you help me [E/G#]stand [F#m]if I saw you in [A/E]heaven', '[D]Would you be the [E]same [A]if I saw you in heaven'] },
    { n: '副歌', l: ['[D]Time can [A]bring you [E]down, time can [F#m]bend your knees', '[D]Time can [A]break your [E]heart, have you [A]begging please'] }
  ]
},
{
  id: 'silence', title: 'The Sound of Silence', artist: 'Simon & Garfunkel', key: 'Am', capo: 0, bpm: 96, time: '4/4', level: 3,
  tags: ['英文', '民谣', '经典'],
  tip: 'Am-G-Am 的空旷感来自低音，右手只拨根音加一点点分解，别把每个和弦都填满。',
  sections: [
    { n: '前奏', l: ['[Am]   [G]   [Am]   [Am]', '[C]   [F]   [C]   [G]'] },
    { n: '主歌', l: ['[Am]Hello darkness, my old [G]friend, I\'ve come to [Am]talk with you again', '[C]Because a vision softly [F]creeping, left its seeds while I was [C]sleeping', '[C]And the vision that was planted in my [G]brain still remains', '[Am]Within the sound of [G]silence [Am]'] },
    { n: '副歌', l: ['[C]And in the naked light I [F]saw, ten thousand people maybe [C]more', '[C]People talking without [G]speaking, people hearing without [Am]listening', '[C]People writing songs that voices never [F]share, no one [C]dared', '[C]Disturb the sound of [G]silence [Am]'] }
  ]
},

/* ---------------- 传统 / 公有领域 ---------------- */
{
  id: 'scarborough', title: 'Scarborough Fair', artist: '英国传统民谣', key: 'Am', capo: 0, bpm: 76, time: '3/4', level: 2,
  tags: ['传统', '英文', '3/4拍'], publicDomain: true,
  tip: '3/4 拍，每小节三拍。和弦换在小节头上，第二拍不要抢——这是它听起来「古老」的原因。',
  sections: [
    { n: '前奏', l: ['[Am]   [G]   [Am]   [C]', '[Am]   [D]   [Am]   [Am]'] },
    { n: '主歌 1', l: ['[Am]Are you going to [G]Scarborough [Am]Fair?', '[C]Parsley, [Am]sage, rose[D]mary and [Am]thyme', '[Am]Remember me to [G]one who lives [Am]there', '[C]She once [Am]was a [D]true love of [Am]mine'] },
    { n: '主歌 2', l: ['[Am]Tell her to make me a [G]cambric [Am]shirt', '[C]Parsley, [Am]sage, rose[D]mary and [Am]thyme', '[Am]Without no seams nor [G]needle[Am]work', '[C]Then she\'ll [Am]be a [D]true love of [Am]mine'] }
  ]
},
{
  id: 'greensleeves', title: 'Greensleeves', artist: '英国传统民谣', key: 'Am', capo: 0, bpm: 92, time: '6/8', level: 2,
  tags: ['传统', '英文', '6/8拍'], publicDomain: true,
  tip: '6/8 拍，可以按「一二三 四五六」的两组三连弹。Am-G-Am-E7 的和声是全曲骨架。',
  sections: [
    { n: '主歌 1', l: ['[Am]Alas, my love, you [G]do me [Am]wrong', '[Am]To cast me off dis[E7]courteous[Am]ly', '[Am]And I have loved you [G]so long [Am]', '[C]Delighting [G]in your [Am]company'] },
    { n: '副歌', l: ['[C]Greensleeves was [G]all my [Am]joy', '[C]Greensleeves was my [G]delight', '[C]Greensleeves was my [G]heart of [Am]gold', '[Am]And who but my [E7]lady Green[Am]sleeves'] }
  ]
},
{
  id: 'amazinggrace', title: 'Amazing Grace', artist: '传统赞美诗', key: 'G', capo: 0, bpm: 68, time: '3/4', level: 1,
  tags: ['传统', '英文', '3/4拍'], publicDomain: true,
  tip: '三个和弦（G-C-D），3/4 拍。第一句「A-ma-zing grace」是弱起，别从小节头开始唱。',
  sections: [
    { n: '主歌 1', l: ['[G]Amazing grace, how [C]sweet the [G]sound', '[G]That saved a wretch like [D]me', '[G]I once was lost, but [C]now am [G]found', '[G]Was blind, but [D]now I [G]see'] },
    { n: '主歌 2', l: ['[G]\'Twas grace that taught my [C]heart to [G]fear', '[G]And grace my fears re[D]lieved', '[G]How precious did that [C]grace ap[G]pear', '[G]The hour I [D]first be[G]lieved'] }
  ]
},
{
  id: 'auld', title: 'Auld Lang Syne', artist: '苏格兰传统民谣', key: 'C', capo: 0, bpm: 76, time: '4/4', level: 1,
  tags: ['传统', '英文', '新年'], publicDomain: true,
  tip: '跨年那首。C-F-C-G 走完一句，弱起两拍进人声。',
  sections: [
    { n: '主歌 1', l: ['[C]Should auld acquaintance [F]be for[C]got', '[C]And never brought to [G]mind?', '[C]Should auld acquaintance [F]be for[C]got', '[G]And days of auld lang [C]syne?'] },
    { n: '副歌', l: ['[C]For auld lang [F]syne, my [C]dear', '[C]For auld lang [G]syne', '[C]We\'ll tak a cup o\' [F]kindness [C]yet', '[G]For days of auld lang [C]syne'] }
  ]
},
{
  id: 'rising', title: 'House of the Rising Sun', artist: '美国传统民谣', key: 'Am', capo: 0, bpm: 76, time: '6/8', level: 2,
  tags: ['传统', '英文', '6/8拍'], publicDomain: true,
  tip: 'Am-C-D-F / Am-E7 的循环，全程用轮指（琶音）弹，从低音弦一路扫上去，才是那个味道。',
  sections: [
    { n: '主歌 1', l: ['[Am]There is a [C]house in [D]New Or[F]leans', '[Am]They call the [E7]Rising [E7]Sun', '[Am]And it\'s been the [C]ruin of [D]many a poor [F]boy', '[Am]And God, I [E7]know I\'m [Am]one'] },
    { n: '主歌 2', l: ['[Am]My mother [C]was a [D]tailor [F]', '[Am]She sewed my [E7]new blue [E7]jeans', '[Am]My father [C]was a [D]gamblin\' [F]man', '[Am]Down in [E7]New Or[Am]leans'] }
  ]
},

/* ---------------- 日文 ---------------- */
{
  id: 'laputa', title: '天空之城（君をのせて）', artist: '久石让', key: 'Am', capo: 0, bpm: 68, time: '4/4', level: 3,
  tags: ['影视', '日文', '纯音乐'],
  tip: 'Am-C-Dm-Am / F-G-C-E。副歌那个 E 是大三和弦，是整首突然亮起来的地方。慢速，靠分解的连贯取胜。',
  sections: [
    { n: '前奏', l: ['[Am]   [C]   [Dm]   [Am]', '[F]   [G]   [C]   [E]'] },
    { n: '主歌', l: ['[Am]あの地平線 [C]輝くのは [Dm]どこかに君を [Am]かくしているから', '[F]たくさんの灯が [G]なつかしいのは [C]あのどれかひとつに [E]君がいるから'] },
    { n: '副歌', l: ['[F]さあ [G]出かけよう [C]ひときれのパン [Am]', '[F]ナイフ [G]ランプ [C]かばんに [E]つめこんで', '[F]父さんが残した [G]熱い想い [C]母さんがくれた [Am]あのまなざし', '[F]地球はまわる [G]君をかくして [Am]'] }
  ]
},
{
  id: 'spirited', title: '千与千寻（いつも何度でも）', artist: '木村弓', key: 'C', capo: 0, bpm: 72, time: '4/4', level: 2,
  tags: ['影视', '日文'],
  tip: 'C-G-Am-F 的走向非常规整，主歌到副歌之间不要换右手——整首的安静是连续的。',
  sections: [
    { n: '前奏', l: ['[C]   [G]   [Am]   [F]', '[C]   [G]   [F]   [C]'] },
    { n: '主歌', l: ['[C]呼んでいる [G]胸のどこか奥で [Am]いつも心躍る [F]夢を見たい', '[C]かなしみは [G]数えきれないけれど [F]その向こうできっと [G]あなたに会える'] },
    { n: '副歌', l: ['[F]繰り返すあやまちの [G]そのたびひとは [Em]ただ青い空の [Am]青さを知る', '[F]果てしなく [G]道は続いて見えるけれど [F]この両手は [G]光を抱け[C]る'] }
  ]
},
{
  id: 'sakura', title: '樱花（さくらさくら）', artist: '日本传统民谣', key: 'Am', capo: 0, bpm: 84, time: '4/4', level: 1,
  tags: ['传统', '日文', '入门'], publicDomain: true,
  tip: '日本五声音阶的曲子，用 Am-G-Am 就够。想更接近原味，把 B 音全部避开。',
  sections: [
    { n: '主歌 1', l: ['[Am]さくら [G]さくら [Am]やよいの空は', '[Am]見わたす [G]かぎり [Am]かすみか雲か', '[Am]匂いぞ [G]いずる [Am]いざや [G]いざや', '[Am]見にゆか[G]ん [Am]'] }
  ]
}

];
