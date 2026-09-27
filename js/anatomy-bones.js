// 第 1 阶段 · 骨骼
// 想改骨头的说明文字：改下面 BONES 里对应的一项
// { id, name: 名称, en: 英文, group: 分类, count: 数量, short: 一句话,
//   desc: 在哪/长什么样, feel: 在身上怎么摸到(可不写), tip: 小知识(可不写), zoom: 小测验放大的区域(可不写) }
const BONES = [
  // ---------- 颅骨 ----------
  { id: "skull", name: "颅骨", en: "Skull", group: "颅骨", count: "23 块（不含听小骨）", zoom: "head",
    short: "包住脑、构成脸的一组骨头。",
    desc: "像一顶\"头盔\"。分两部分：上后方保护脑的脑颅骨 8 块（额骨、顶骨、枕骨、颞骨、蝶骨、筛骨），前下方构成脸的面颅骨 15 块。成年后大部分颅骨之间是不能活动的\"缝\"。下颌骨也属于面颅骨，图上单独标了出来。",
    feel: "额头是额骨；后脑勺正中最突出的点是枕外隆凸；脸颊两侧的颧骨也能摸到。",
    tip: "婴儿的颅骨还没长牢，头顶有一块软软的\"囟门\"，前囟一般在 1～2 岁闭合。" },
  { id: "mandible", name: "下颌骨", en: "Mandible", group: "颅骨", count: "1 块", zoom: "head",
    short: "下巴骨，颅骨里唯一靠关节活动的骨。",
    desc: "面颅骨中最大的一块，呈马蹄形，下牙都长在它上面。它通过颞下颌关节和颅骨相连，说话、咀嚼都靠它上下左右活动。",
    feel: "下巴；耳垂下方往前的\"拐角\"是下颌角。手指放在耳朵前方，张嘴闭嘴，能感觉到下颌骨在滑动——那里就是颞下颌关节。",
    tip: "下颌角的位置和角度，决定了一个人看起来是\"方脸\"还是\"尖脸\"。" },

  // ---------- 躯干骨 ----------
  { id: "cervical", name: "颈椎", en: "Cervical Vertebrae", group: "躯干骨", count: "7 块", zoom: "head",
    short: "脖子里的 7 块椎骨，最灵活。",
    desc: "脖子里的脊椎，个头小、活动最灵活。第 1 颈椎叫寰椎，第 2 颈椎叫枢椎，点头和转头主要靠它们。",
    feel: "低头时，后颈正中最凸出的骨点通常是第 7 颈椎的棘突（叫\"隆椎\"），常用来往下数椎骨。",
    tip: "口诀：颈 7、胸 12、腰 5，再加骶骨、尾骨各 1 块。长颈鹿的颈椎也是 7 块，只是每一块都特别长。" },
  { id: "thoracic", name: "胸椎", en: "Thoracic Vertebrae", group: "躯干骨", count: "12 块", zoom: "trunk",
    short: "胸部的 12 块椎骨，每块连一对肋骨。",
    desc: "胸部的脊椎，每一块都和一对肋骨相连，一起围成胸廓。因为有肋骨\"拉着\"，它比颈椎、腰椎稳定，活动度小。正面图里它躲在胸骨和肋骨后面，选中后会透出来。",
    feel: "背部正中一个个的小突起，就是胸椎的棘突。",
    tip: "12 块胸椎对应 12 对肋骨，数量一一对应，很好记。" },
  { id: "lumbar", name: "腰椎", en: "Lumbar Vertebrae", group: "躯干骨", count: "5 块", zoom: "trunk",
    short: "腰部的 5 块椎骨，最粗大、承重最多。",
    desc: "腰部的脊椎，是所有椎骨中最粗大的，因为它要承受整个上半身的重量。腰痛、腰椎间盘突出常发生在这里。",
    feel: "两侧髂嵴最高点的连线，大约平对第 4 腰椎的棘突——医生做腰椎穿刺时就用这个方法找位置。",
    tip: "从上往下，椎骨一块比一块大：越往下，要扛的重量越多。" },
  { id: "sacrum", name: "骶骨", en: "Sacrum", group: "躯干骨", count: "1 块（5 块骶椎融合）", zoom: "pelvis",
    short: "脊柱下端的倒三角形骨，骨盆的后壁。",
    desc: "上面承接腰椎，下面连着尾骨，左右和两块髋骨相连，一起组成骨盆。表面有几对小孔（骶孔），是神经穿出的通道。",
    feel: "腰的正下方、臀部正中那块平平的骨面。",
    tip: "小时候是 5 块分开的骶椎，成年后才长成一整块。" },
  { id: "coccyx", name: "尾骨", en: "Coccyx", group: "躯干骨", count: "1 块（3～5 块尾椎融合）", zoom: "pelvis",
    short: "俗称\"尾巴骨\"，脊柱最末端。",
    desc: "脊柱最下端的小骨，是人类祖先的尾巴退化后留下的痕迹。虽然小，但有好几块肌肉和韧带附着在上面。",
    feel: "两侧臀部之间、最下方的尖端。一屁股坐到地上时最容易伤到它。",
    tip: "成人脊柱一共 26 块：颈椎 7 + 胸椎 12 + 腰椎 5 + 骶骨 1 + 尾骨 1。" },
  { id: "sternum", name: "胸骨", en: "Sternum", group: "躯干骨", count: "1 块", zoom: "trunk",
    short: "胸前正中的扁骨，像一把短剑。",
    desc: "从上到下分三段：胸骨柄、胸骨体和下端小小的剑突。两侧通过肋软骨和肋骨相连。",
    feel: "两侧锁骨之间的凹陷叫颈静脉切迹；从这里往下约 5 厘米，能摸到一条横行的隆起，叫胸骨角，它两侧连着第 2 肋，是数肋骨的起点。",
    tip: "心肺复苏（CPR）按压的位置，就在胸骨的下半部。" },
  { id: "ribs", name: "肋骨", en: "Ribs", group: "躯干骨", count: "12 对（24 根）", zoom: "trunk",
    short: "12 对弯弯的扁骨，围成保护心肺的\"笼子\"。",
    desc: "后端连胸椎，前端通过肋软骨（图上浅蓝色的部分）连到胸骨。第 1～7 对直接连胸骨，叫真肋；第 8～12 对叫假肋，其中第 8～10 对连到上一根肋的软骨上，第 11、12 对前端是游离的，叫浮肋。肋软骨让胸廓有弹性，呼吸时能扩张。",
    feel: "胸前下方、两侧斜向外下的弧形边缘是肋弓，深吸一口气更容易摸到。",
    tip: "男女都是 12 对肋骨——\"男人少一根肋骨\"只是传说。" },

  // ---------- 上肢骨 ----------
  { id: "clavicle", name: "锁骨", en: "Clavicle", group: "上肢骨", count: "1 对", zoom: "trunk",
    short: "胸前上方横着的 S 形长骨。",
    desc: "内侧连胸骨，外侧连肩胛骨的肩峰。它是上肢和躯干之间唯一的骨性连接，像一根撑杆把肩膀撑开。",
    feel: "从胸骨上端向两侧肩膀摸，一整根都在皮肤下面，全长都能摸到。",
    tip: "锁骨是最容易骨折的骨头之一：摔倒时用手撑地，力量会一路传到锁骨。" },
  { id: "scapula", name: "肩胛骨", en: "Scapula", group: "上肢骨", count: "1 对", zoom: "trunk",
    short: "背上的三角形扁骨，俗称\"蝴蝶骨\"。",
    desc: "贴在背部上外侧、第 2～7 肋的后面。外侧的关节盂和肱骨头组成肩关节；背面有一条横行的骨嵴叫肩胛冈，向外延伸成肩峰。它主要在身体后面，正面图里只露出外侧一点，选中后会透出来。",
    feel: "肩膀最外上方的骨点是肩峰；双臂自然下垂时，肩胛骨下角大约平对第 7 肋，是在背后数肋骨的标志。",
    tip: "肩胛骨不和躯干直接\"焊\"在一起，主要靠肌肉固定，所以它能上下左右滑动，手臂才能举过头顶。" },
  { id: "humerus", name: "肱骨", en: "Humerus", group: "上肢骨", count: "1 对",
    short: "上臂里唯一的一根长骨。",
    desc: "上端圆圆的肱骨头和肩胛骨组成肩关节；下端又宽又扁，和桡骨、尺骨组成肘关节。",
    feel: "肘部内外两侧各有一个突起：内上髁和外上髁。",
    tip: "胳膊肘撞到会像过电一样发麻，是因为尺神经正好从内上髁后方经过——就是俗称的\"麻筋\"。\"肱\"读 gōng。" },
  { id: "radius", name: "桡骨", en: "Radius", group: "上肢骨", count: "1 对",
    short: "前臂外侧（拇指侧）的长骨。",
    desc: "前臂两根骨头中靠外侧（拇指这一侧）的那根。上端细、下端粗，下端和腕骨组成腕关节。翻转手掌时，桡骨绕着尺骨转。",
    feel: "手腕拇指一侧的骨突是桡骨茎突；在它内侧、手腕掌面能摸到脉搏跳动（桡动脉），就是\"把脉\"的位置。",
    tip: "手掌朝前站好：拇指一侧是桡骨，小指一侧是尺骨。\"桡\"读 ráo。" },
  { id: "ulna", name: "尺骨", en: "Ulna", group: "上肢骨", count: "1 对",
    short: "前臂内侧（小指侧）的长骨。",
    desc: "前臂内侧（小指这一侧）的长骨。和桡骨正好相反，它上端粗大、下端细小，上端像扳手一样钩住肱骨下端，是肘关节稳定的关键。",
    feel: "弯曲手肘时，肘尖就是尺骨上端的鹰嘴；手腕背面小指侧那颗小圆骨是尺骨头。",
    tip: "桡骨\"上细下粗\"，尺骨\"上粗下细\"，两根正好互补。" },
  { id: "carpals", name: "腕骨", en: "Carpal Bones", group: "上肢骨", count: "每侧 8 块", zoom: "hand",
    short: "手腕里的 8 块小短骨，排成两排。",
    desc: "每排 4 块。近侧一排（靠前臂）：手舟骨、月骨、三角骨、豌豆骨；远侧一排（靠手掌）：大多角骨、小多角骨、头状骨、钩骨。它们之间有很多小关节，让手腕灵活转动。",
    feel: "手腕掌面、小指一侧的腕横纹附近，能摸到一颗像小豌豆的骨——豌豆骨。",
    tip: "口诀：舟月三角豆，大小头状钩（从拇指侧往小指侧，先近排、后远排）。" },
  { id: "metacarpals", name: "掌骨", en: "Metacarpals", group: "上肢骨", count: "每侧 5 块", zoom: "hand",
    short: "手掌里的 5 根小长骨。",
    desc: "从拇指侧起依次叫第 1～5 掌骨。第 1 掌骨最短最粗，活动范围大，所以拇指能和其他手指对捏。",
    feel: "握拳时，手背上突出的一排\"骨节\"就是掌骨头。",
    tip: "用拳头打硬东西时，第 5 掌骨（小指那根）最容易骨折，医学上叫\"拳击手骨折\"。" },
  { id: "phalanges-h", name: "指骨", en: "Phalanges (Hand)", group: "上肢骨", count: "每侧 14 块", zoom: "hand",
    short: "手指的骨头：拇指 2 节，其余各 3 节。",
    desc: "拇指 2 节（近节、远节），其余四指各 3 节（近节、中节、远节）：2 + 4 × 3 = 14。",
    feel: "弯曲手指时，能摸到一节一节的指骨和中间的指间关节。",
    tip: "一只手 27 块骨：腕骨 8 + 掌骨 5 + 指骨 14。两只手就有 54 块，超过全身骨头的四分之一。" },

  // ---------- 下肢骨 ----------
  { id: "hip", name: "髋骨", en: "Hip Bone", group: "下肢骨", count: "1 对", zoom: "pelvis",
    short: "骨盆两侧的大骨，由髂骨、坐骨、耻骨长成。",
    desc: "由髂骨、坐骨、耻骨三块骨在青春期（约 15～16 岁）融合而成。外侧的深窝叫髋臼，和股骨头组成髋关节。左右髋骨加上骶骨、尾骨，围成骨盆。",
    feel: "双手叉腰摸到的弧形骨缘是髂嵴；沿着它往前摸到的尽头骨突是髂前上棘；坐下时硌着椅子的是坐骨结节。",
    tip: "女性的骨盆一般更宽、更浅，这是为了适应分娩。" },
  { id: "femur", name: "股骨", en: "Femur", group: "下肢骨", count: "1 对",
    short: "大腿骨，人体最长、最粗壮的骨。",
    desc: "长度约占身高的四分之一。上端的股骨头和髋臼组成髋关节，股骨头下面较细的一段叫股骨颈；下端膨大，和胫骨、髌骨组成膝关节。",
    feel: "大腿外侧上端能摸到一个大骨突，叫大转子，走路或抬腿时能感觉到它在动。",
    tip: "老年人摔倒后最常见的骨折之一，就是股骨颈骨折。" },
  { id: "patella", name: "髌骨", en: "Patella", group: "下肢骨", count: "1 对",
    short: "膝盖骨，人体最大的籽骨。",
    desc: "膝盖前面的三角形小骨，包在大腿前面股四头肌的肌腱里。它像一个滑轮，让伸膝更省力，也保护膝关节。",
    feel: "腿伸直、大腿放松时，能把髌骨左右推动。",
    tip: "新生儿的髌骨还是软骨，要到 3～6 岁才开始变成骨头。\"髌\"读 bìn。" },
  { id: "tibia", name: "胫骨", en: "Tibia", group: "下肢骨", count: "1 对",
    short: "小腿内侧粗壮的长骨，主要承重。",
    desc: "承受小腿绝大部分的体重。上端宽大的平台和股骨组成膝关节，下端向内突出形成内踝。",
    feel: "小腿正前方从膝下到脚踝的骨嵴就是胫骨前缘，俗称\"迎面骨\"——这里皮下没有肌肉保护，所以磕到特别疼。脚踝内侧的突起是内踝。",
    tip: "\"胫\"读 jìng。" },
  { id: "fibula", name: "腓骨", en: "Fibula", group: "下肢骨", count: "1 对",
    short: "小腿外侧细长的骨，几乎不承重。",
    desc: "主要供肌肉附着，下端形成外踝，帮助稳定踝关节。",
    feel: "膝盖外下方能摸到腓骨头；脚踝外侧的突起是外踝。对比一下：外踝比内踝更低、更靠后。",
    tip: "\"腓\"读 féi。因为它不怎么承重，医生有时会取一段腓骨，去修复身体其他地方的骨缺损。" },
  { id: "tarsals", name: "跗骨", en: "Tarsal Bones", group: "下肢骨", count: "每侧 7 块", zoom: "foot",
    short: "脚后半部分的 7 块短骨，包括脚后跟。",
    desc: "距骨、跟骨、足舟骨、骰骨和 3 块楔骨（内侧、中间、外侧）。距骨在最上面，和胫骨、腓骨组成踝关节；跟骨最大，就是脚后跟（正面图里它藏在后面）。",
    feel: "脚后跟就是跟骨，跟腱（阿基里斯腱）就附着在它上面。",
    tip: "\"跗\"读 fū。" },
  { id: "metatarsals", name: "跖骨", en: "Metatarsals", group: "下肢骨", count: "每侧 5 块", zoom: "foot",
    short: "脚掌中部的 5 根小长骨。",
    desc: "和手上的掌骨很像，从大脚趾侧起依次叫第 1～5 跖骨。跗骨和跖骨一起拱成足弓，让走路、跑跳更有弹性。",
    feel: "脚背上能摸到一根根的跖骨；脚外侧边缘中间，能摸到第 5 跖骨底的突起。",
    tip: "\"跖\"读 zhí。长时间走路、跑步，跖骨容易出现\"疲劳骨折\"。" },
  { id: "phalanges-f", name: "趾骨", en: "Phalanges (Foot)", group: "下肢骨", count: "每侧 14 块", zoom: "foot",
    short: "脚趾的骨头：大脚趾 2 节，其余各 3 节。",
    desc: "排列和手指一样：大脚趾 2 节，其余四趾各 3 节。不过趾骨比指骨短小得多，小脚趾的中节和远节有时会长在一起。",
    feel: "弯曲脚趾时，能摸到趾骨和趾间关节。",
    tip: "一只脚 26 块骨：跗骨 7 + 跖骨 5 + 趾骨 14。两只手加两只脚一共 106 块，超过全身骨头的一半！" },
];

// 在自己身上摸一摸：想加新条目，照格式加一行 ["名称", "怎么找"]
const LANDMARKS = [
  { icon: "🙂", title: "头颈 · 躯干", items: [
    ["枕外隆凸", "后脑勺正中、靠近发际线上方最突出的骨点。"],
    ["下颌角", "耳垂下方、下巴骨的\"拐角\"。"],
    ["第 7 颈椎棘突（隆椎）", "低头，后颈正中最凸出的那个骨点。"],
    ["颈静脉切迹", "两侧锁骨内端之间、胸骨上端的小凹陷。"],
    ["胸骨角", "从颈静脉切迹往下约 5 厘米的横行隆起，两侧连着第 2 肋。"],
    ["肋弓", "胸前下方两侧斜向外下的弧形边缘，深吸气时更明显。"],
  ]},
  { icon: "💪", title: "上肢", items: [
    ["锁骨", "从胸骨上端向肩膀方向摸，一整根都在皮下。"],
    ["肩峰", "肩膀最外上方的骨点。"],
    ["肱骨内上髁、外上髁", "肘部内外两侧的突起。内上髁后方就是\"麻筋\"（尺神经），轻轻按就好。"],
    ["尺骨鹰嘴", "弯曲手肘时的肘尖。"],
    ["桡骨茎突", "手腕拇指一侧的骨突。"],
    ["尺骨头", "手背腕部、小指一侧的小圆骨。"],
  ]},
  { icon: "🦵", title: "下肢", items: [
    ["髂嵴", "双手叉腰时摸到的弧形骨缘。"],
    ["髂前上棘", "沿髂嵴往前摸到的尽头骨突，大约在系腰带的位置。"],
    ["股骨大转子", "大腿外侧上端的大骨突，抬腿时能感觉它在动。"],
    ["髌骨", "腿伸直、放松，能左右推动的膝盖骨。"],
    ["胫骨前缘", "小腿正前方的骨嵴（迎面骨）。"],
    ["内踝和外踝", "脚踝两侧的突起。比一比：外踝更低、更靠后。"],
    ["跟骨", "脚后跟。"],
  ]},
];

/* ================= 骨骼图（本站自绘的简化示意图） =================
   坐标系：宽 300、高 675，人体中线 x = 150。
   只画图上左边这一侧（人物的右侧），再镜像到另一侧。 */
const SK_W = 300, SK_H = 675;
const SK_ZOOM = {
  head: "92 0 116 150",
  trunk: "58 88 184 290",
  pelvis: "84 282 132 118",
  hand: "26 356 72 104",
  foot: "98 588 56 86",
};

(function () {
  const f = (n) => Math.round(n * 10) / 10;
  // 基本形状：C 圆、E 椭圆、R 圆角矩形、K 两头圆的\"骨棒\"、P 任意路径、S 描边线条
  const C = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}"/>`;
  const E = (cx, cy, rx, ry, rot = 0) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"${rot ? ` transform="rotate(${rot} ${cx} ${cy})"` : ""}/>`;
  const R = (x, y, w, h, r) => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${r}"/>`;
  const P = (d) => `<path d="${d}"/>`;
  function K(x1, y1, x2, y2, w1, w2 = w1) {
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len, ny = dx / len;
    const a = w1 / 2, b = w2 / 2;
    return `<path d="M${f(x1 + nx * a)},${f(y1 + ny * a)} L${f(x2 + nx * b)},${f(y2 + ny * b)} L${f(x2 - nx * b)},${f(y2 - ny * b)} L${f(x1 - nx * a)},${f(y1 - ny * a)} Z"/>` + C(x1, y1, f(a)) + C(x2, y2, f(b));
  }
  // 一串首尾相接、中间留一点关节缝的小骨棒（指骨、趾骨用）
  function chain(pts, w, gap = 1.3) {
    let out = "";
    for (let i = 0; i < pts.length - 1; i++) {
      const [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
      const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
      const g = (gap + w / 2) / len;
      out += K(x1 + dx * g, y1 + dy * g, x2 - dx * (w / 2 / len), y2 - dy * (w / 2 / len), w, w * 0.85);
    }
    return out;
  }

  // 每块骨：[形状列表]；S 描边线条用 {s: 路径, w: 粗细, cls}
  const MID = {}, SIDE = {};

  // ---- 颅骨 ----
  MID.skull = {
    body: [P("M150,12 C173,12 185,28 185,50 C185,61 182,69 178,75 L173,80 C169,86 162,89 150,89 C138,89 131,86 127,80 L122,75 C118,69 115,61 115,50 C115,28 127,12 150,12 Z")],
    detail: `<ellipse class="hole" cx="137" cy="56" rx="9.5" ry="8.5"/><ellipse class="hole" cx="163" cy="56" rx="9.5" ry="8.5"/>
      <path class="hole" d="M150,63 C146,69 144,75 146,78 L154,78 C156,75 154,69 150,63 Z"/>
      <path class="ln" d="M137,83.5 H163 M141,81 V86 M145.5,81 V86.5 M150,81 V87 M154.5,81 V86.5 M159,81 V86 M121,68 C126,70 128,72 128,76 M179,68 C174,70 172,72 172,76"/>`,
  };
  MID.mandible = {
    body: [P("M123,72 L126,72 L129,84 C133,88 141,89.5 150,89.5 C159,89.5 167,88 171,84 L174,72 L177,72 L177,86 C176,97 164,106 150,106 C136,106 124,97 123,86 Z")],
    detail: `<path class="ln" d="M137,92.5 H163 M141,90 V95 M145.5,90 V95.5 M150,90 V96 M154.5,90 V95.5 M159,90 V95"/>`,
  };

  // ---- 脊柱 ----
  MID.cervical = { body: [0, 1, 2, 3, 4, 5, 6].map((i) => R(141 - i * 0.3, 92 + i * 6.3, 18 + i * 0.6, 5.2, 2)) };
  MID.thoracic = { body: Array.from({ length: 12 }, (_, i) => R(139 - i * 0.2, 134 + i * 9.4, 22 + i * 0.4, 8, 2.5)) };
  MID.lumbar = {
    body: Array.from({ length: 5 }, (_, i) => {
      const y = 248 + i * 12.2, w = 28 + i;
      return R(150 - w / 2, y, w, 10.4, 3) + K(150 - w / 2, y + 5, 150 - w / 2 - 8 + i * 0.6, y + 5 + i * 0.4, 4.2, 3) + K(150 + w / 2, y + 5, 150 + w / 2 + 8 - i * 0.6, y + 5 + i * 0.4, 4.2, 3);
    }),
  };
  MID.sacrum = {
    body: [P("M131,310 C140,307 160,307 169,310 C168,326 162,342 155,352 L145,352 C138,342 132,326 131,310 Z")],
    detail: `<g class="hole">${[0, 1, 2, 3].map((i) => C(142 + i * 1.6, 318 + i * 8.5, 1.8 - i * 0.2) + C(158 - i * 1.6, 318 + i * 8.5, 1.8 - i * 0.2)).join("")}</g>
      <path class="ln" d="M137,322 H163 M140,331 H160 M143,340 H157"/>`,
  };
  MID.coccyx = { body: [R(145.5, 353.5, 9, 3.6, 1.5), R(146.5, 358, 7, 3, 1.3), R(147.5, 361.8, 5, 2.6, 1.2)] };

  // ---- 胸骨 ----
  MID.sternum = {
    body: [
      P("M137,150 Q150,155 163,150 L161,158 L157,169 L143,169 L139,158 Z"),
      P("M143,171 L157,171 L159,221 C155,224 145,224 141,221 Z"),
      P("M145,224 L155,224 L151.5,237 L148.5,237 Z"),
    ],
  };

  // ---- 肩胛骨（在身体后面） ----
  SIDE.scapula = {
    body: [P("M91,140 C101,137 112,140 122,147 L129,151 C129,175 125,200 115,225 C109,208 101,186 97,168 C92,165 89,160 90,155 C87,150 87,144 91,140 Z")],
    detail: `<path class="ln" d="M96,150 C104,150 112,152 124,160"/>`,
  };

  // ---- 肋骨：远处（后半段）颜色深一点，近处（前半段）连着肋软骨 ----
  (function () {
    const hw = [21, 32, 40, 46, 50, 53, 55, 55, 54, 51, 46, 36];
    const sternalY = [156, 170, 180, 190, 199, 208, 217];
    const far = [], near = [], cart = [];
    for (let i = 0; i < 12; i++) {
      const ys = 138 + i * 9.4;          // 后端（连胸椎）
      const xl = 150 - hw[i], yl = ys + 13;  // 最外侧
      far.push({ s: `M138,${f(ys)} C${f(138 - hw[i] * 0.45)},${f(ys - 4)} ${xl},${f(yl - hw[i] * 0.4)} ${xl},${f(yl)}`, w: i < 1 ? 4 : 4.6 });
      if (i < 7) { // 真肋：前端连胸骨
        const ya = sternalY[i];
        const xe = 150 - 13 - Math.min(i, 4) * 2.5;
        near.push({ s: `M${xl},${f(yl)} C${xl},${f(yl + hw[i] * 0.35)} ${f(xl + hw[i] * 0.45)},${f(ya + 2)} ${f(xe)},${f(ya)}`, w: i < 1 ? 4 : 4.6 });
        cart.push({ s: `M${f(xe)},${f(ya)} L142,${f(ya - 0.5)}`, w: 4 });
      } else if (i < 10) { // 第 8～10 肋：软骨连到上一根
        const end = [[118, 238], [112, 250], [107, 260]][i - 7];
        near.push({ s: `M${xl},${f(yl)} C${xl},${f(yl + 14)} ${f(end[0] - 6)},${f(end[1] + 2)} ${end[0]},${end[1]}`, w: 4.4 });
        const to = [[140, 222], [120, 236], [114, 248]][i - 7];
        cart.push({ s: `M${end[0]},${end[1]} C${f((end[0] + to[0]) / 2)},${f(end[1] - 2)} ${f(to[0] - 3)},${f(to[1] + 4)} ${to[0]},${to[1]}`, w: 3.6 });
      } else { // 浮肋：前端游离
        const end = [[103, 262], [116, 262]][i - 10];
        near.push({ s: `M${xl},${f(yl)} C${xl},${f(yl + 8)} ${f(end[0] - 2)},${f(end[1] - 4)} ${end[0]},${end[1]}`, w: 4 });
      }
    }
    SIDE.ribs = { layers: [{ cls: "far", shapes: far }, { shapes: near }, { cls: "cart", shapes: cart }] };
  })();

  SIDE.clavicle = { layers: [{ shapes: [{ s: "M141,151 C130,156 118,146 107,146 C100,146 95,143 90,141", w: 6.5 }] }] };

  // ---- 上肢 ----
  SIDE.humerus = {
    body: [C(94, 159, 9.5), K(91, 166, 80, 258, 11, 9.5), P("M76,254 C73,259 68,262 66,266 C66,271 70,276 74,278 C79,280 85,280 90,278 C94,275 96,269 95,264 C93,259 88,256 86,252 Z")],
  };
  SIDE.ulna = { body: [E(86, 285, 5.5, 8), K(85, 288, 73, 364, 7, 4), C(73, 366, 3.8)] };
  SIDE.radius = { body: [E(72, 283, 5.8, 3.2), K(72, 285, 60, 362, 5.2, 9), P("M53,360 L67,360 C69,366 68,371 64,373 L55,375 C51,376 50,371 51,366 Z")] };
  SIDE.carpals = {
    body: [E(55, 379, 3.4, 3, -20), E(62, 380, 3.2, 3.1), E(68.5, 379.5, 3, 2.8), C(74, 380.5, 2.2),
      E(51.5, 387, 3, 3.2, 20), E(57.5, 388, 2.8, 3), E(63.8, 388.5, 3.2, 3.6), E(70, 387.5, 3, 3.2)],
  };
  SIDE.metacarpals = {
    body: [K(49, 392, 43, 405, 4.2, 3.4), K(56.5, 393, 55, 416, 3.4, 3.2), K(63, 394, 63, 418, 3.6, 3.3), K(69, 393, 70, 415, 3.3, 3.1), K(74, 391.5, 77, 411, 3.2, 3)],
  };
  SIDE["phalanges-h"] = {
    body: [
      chain([[43, 405], [39, 416], [37, 425]], 3.2),
      chain([[55, 416], [54, 429], [53.5, 438], [53, 445]], 2.9),
      chain([[63, 418], [63, 432], [63, 442], [63, 449]], 3),
      chain([[70, 415], [71, 428], [71.5, 437], [72, 444]], 2.8),
      chain([[77, 411], [79, 421], [80, 428], [81, 434]], 2.5),
    ],
  };

  // ---- 下肢 ----
  SIDE.hip = {
    body: [P("M139,304 C126,296 104,295 93,303 C89,307 91,315 96,320 C103,327 109,335 111,344 C112,353 115,362 119,371 C123,380 131,383 135,379 C139,374 143,371 148,371 L148,362 C143,360 137,356 135,351 C134,343 136,332 140,320 Z")],
    detail: `<ellipse class="hole" cx="131" cy="364" rx="5.5" ry="7" transform="rotate(-15 131 364)"/><path class="ln" d="M104,306 C112,312 120,322 126,336"/>`,
  };
  SIDE.femur = {
    body: [C(117, 346, 8.5), K(116, 347, 104, 357, 9.5, 10), E(101, 358, 6.5, 9, -10), K(106, 362, 124, 490, 12, 11),
      C(118.5, 500, 8.2), C(133, 500, 8.2), E(126, 496, 12, 7)],
  };
  SIDE.patella = { body: [P("M119,489 C121,484 131,484 133,489 C134,496 130,505 126,506 C122,505 118,496 119,489 Z")] };
  SIDE.fibula = { body: [C(111.5, 524, 4.2), K(111.5, 526, 116, 604, 4.2, 3.6), E(116.5, 606, 3.8, 6.5)] };
  SIDE.tibia = {
    body: [E(126.5, 518, 15.5, 5.5), K(126, 521, 131, 594, 13, 10), E(137.5, 598, 4.2, 6.5, -10), E(130.5, 598, 7.5, 4)],
    detail: `<path class="ln" d="M127,530 C127,550 128,570 130,590"/>`,
  };
  SIDE.tarsals = {
    body: [E(127, 609, 9, 5.5), E(113.5, 616, 4.2, 5.5), E(132.5, 617.5, 6.5, 3.4), E(116.5, 625, 4.2, 4.6),
      E(123, 626, 3, 4.2), E(129, 626, 3, 4.2), E(136, 625.5, 3.6, 4.4)],
  };
  SIDE.metatarsals = {
    body: [K(137, 632, 139, 648, 5.2, 4.6), K(130, 632, 130.5, 650, 3.6, 3.2), K(124, 632, 123, 649, 3.4, 3), K(118.5, 631, 116.5, 647, 3.3, 3), K(114, 629.5, 110, 644, 3.4, 3)],
  };
  SIDE["phalanges-f"] = {
    body: [
      chain([[139, 648], [140, 656], [140.5, 663]], 4.4),
      chain([[130.5, 650], [130.8, 656], [131, 660.5], [131.2, 664]], 2.9),
      chain([[123, 649], [122.8, 654.5], [122.6, 658.5], [122.5, 662]], 2.7),
      chain([[116.5, 647], [115.8, 652], [115.4, 656], [115, 659]], 2.6),
      chain([[110, 644], [108.8, 648.5], [108.2, 652], [107.8, 655]], 2.4),
    ],
  };

  // 画的先后顺序（后画的盖在上面）
  const ORDER = ["scapula", "cervical", "thoracic", "lumbar", "sacrum", "coccyx", "hip", "ribs", "sternum", "clavicle",
    "mandible", "skull", "humerus", "ulna", "radius", "carpals", "metacarpals", "phalanges-h",
    "tarsals", "fibula", "tibia", "femur", "patella", "metatarsals", "phalanges-f"];

  function shapes(list, cls) {
    const edge = [], fill = [];
    list.forEach((s) => {
      if (typeof s === "string") { edge.push(s); fill.push(s); return; }
      edge.push(`<path class="s" d="${s.s}" style="stroke-width:${f(s.w + 2.4)}px"/>`);
      fill.push(`<path class="s" d="${s.s}" style="stroke-width:${s.w}px"/>`);
    });
    const c = cls ? ` ${cls}` : "";
    return `<g class="e${c}">${edge.join("")}</g><g class="f${c}">${fill.join("")}</g>`;
  }
  function groupHTML(id, def, mirror) {
    const layers = def.layers || [{ shapes: def.body }];
    const inner = layers.map((l) => shapes(l.shapes, l.cls)).join("") + (def.detail ? `<g class="d">${def.detail}</g>` : "");
    return `<g class="b" data-bone="${id}"${mirror ? ` transform="matrix(-1 0 0 1 ${SK_W} 0)"` : ""}>${inner}</g>`;
  }
  const BODY = ORDER.map((id) => MID[id] ? groupHTML(id, MID[id]) : groupHTML(id, SIDE[id]) + groupHTML(id, SIDE[id], true)).join("");

  // 生成骨骼图。opt.sel 选中的骨；opt.zoom 放大区域
  window.skeletonSVG = function (opt = {}) {
    const vb = opt.zoom && SK_ZOOM[opt.zoom] ? SK_ZOOM[opt.zoom] : `0 0 ${SK_W} ${SK_H}`;
    return `<svg class="sk${opt.sel ? " sel" : ""}${opt.zoom ? " z-" + opt.zoom : ""}${opt.cls ? " " + opt.cls : ""}" viewBox="${vb}" role="img" aria-label="${opt.label || "人体骨骼正面示意图"}">
      ${BODY}<g class="top"></g></svg>`;
  };
  // 把某块骨高亮，并复制一份放到最上层，这样被挡住的骨也能看清
  window.skeletonSelect = function (svg, id) {
    const top = svg.querySelector(".top");
    top.innerHTML = "";
    svg.querySelectorAll(".b.on").forEach((g) => g.classList.remove("on"));
    svg.classList.toggle("sel", !!id);
    if (!id) return;
    svg.querySelectorAll(`.b[data-bone="${id}"]`).forEach((g) => {
      g.classList.add("on");
      const c = g.cloneNode(true);
      c.removeAttribute("data-bone");
      top.appendChild(c);
    });
  };
})();

/* ================= 页面交互 ================= */
(function () {
  const byId = Object.fromEntries(BONES.map((b) => [b.id, b]));
  const GROUPS = ["颅骨", "躯干骨", "上肢骨", "下肢骨"];

  // ---- 点一点，认骨头 ----
  const fig = document.getElementById("sk-fig");
  const info = document.getElementById("sk-info");
  const cap = document.getElementById("sk-cap");
  const list = document.getElementById("sk-list");
  if (fig) {
    fig.innerHTML = skeletonSVG({ label: "人体骨骼正面示意图，点击骨头查看说明" });
    const svg = fig.querySelector("svg");
    list.innerHTML = GROUPS.map((g) => `
      <div class="sk-group"><span class="label">${g}</span><div class="chips">
        ${BONES.filter((b) => b.group === g).map((b) => `<button class="chip" data-bone="${b.id}">${AN.esc(b.name)}</button>`).join("")}
      </div></div>`).join("");

    let cur = null;
    function select(id) {
      cur = id === cur ? null : id;
      skeletonSelect(svg, cur);
      list.querySelectorAll(".chip").forEach((c) => c.classList.toggle("on", c.dataset.bone === cur));
      const b = byId[cur];
      if (!b) {
        cap.innerHTML = "点一下图上的骨头试试 👆";
        info.innerHTML = `<p class="sk-empty">点击左边骨骼图上的任意一块骨头，或者下面的名字，看看它叫什么、在哪里、怎么在自己身上摸到。</p>`;
        return;
      }
      cap.innerHTML = `<b>${AN.esc(b.name)}</b> <span class="en">${AN.esc(b.en)}</span> · ${AN.esc(b.count)}`;
      info.innerHTML = `
        <div class="tags"><span class="tag">${AN.esc(b.group)}</span><span class="tag gold">${AN.esc(b.count)}</span></div>
        <h3>${AN.esc(b.name)} <span class="en">${AN.esc(b.en)}</span></h3>
        <p class="sk-short">${AN.esc(b.short)}</p>
        <h4>在哪里 · 长什么样</h4><p>${AN.esc(b.desc)}</p>
        ${b.feel ? `<h4>✋ 在自己身上摸一摸</h4><p>${AN.esc(b.feel)}</p>` : ""}
        ${b.tip ? `<div class="tip">💡 ${AN.esc(b.tip)}</div>` : ""}`;
    }
    svg.addEventListener("click", (e) => {
      const g = e.target.closest("[data-bone]");
      select(g ? g.dataset.bone : cur);
    });
    list.addEventListener("click", (e) => {
      const c = e.target.closest(".chip");
      if (c) select(c.dataset.bone);
    });
    select(null);
  }

  // ---- 在自己身上摸一摸（勾选会保存在自己的浏览器里） ----
  const lm = document.getElementById("lm-list");
  if (lm) {
    const store = AN.store("anatomy-landmarks-v1");
    let saved = store.get();
    lm.innerHTML = LANDMARKS.map((g, gi) => `
      <section class="card check-group">
        <h3>${g.icon} ${AN.esc(g.title)}</h3>
        ${g.items.map(([t, tip], ii) => `
          <label class="check-item" for="lm-${gi}-${ii}">
            <input type="checkbox" id="lm-${gi}-${ii}" data-k="${AN.esc(t)}" ${saved[t] ? "checked" : ""}>
            <span class="box"></span>
            <span class="t"><b>${AN.esc(t)}</b><small>${AN.esc(tip)}</small></span>
          </label>`).join("")}
      </section>`).join("");
    const boxes = [...lm.querySelectorAll("input")];
    const update = () => {
      const n = boxes.filter((b) => b.checked).length;
      document.getElementById("lm-bar").style.width = `${(n / boxes.length) * 100}%`;
      document.getElementById("lm-done").textContent = n === boxes.length ? `全部摸到了 ✓ ${n}/${boxes.length}` : `已摸到 ${n}/${boxes.length}`;
    };
    lm.addEventListener("change", (e) => {
      if (e.target.type !== "checkbox") return;
      if (e.target.checked) saved[e.target.dataset.k] = 1; else delete saved[e.target.dataset.k];
      store.set(saved);
      update();
    });
    document.getElementById("lm-reset").onclick = () => {
      boxes.forEach((b) => (b.checked = false));
      saved = {};
      store.clear();
      update();
    };
    update();
  }

  // ---- 看图认骨小测验：随机抽 10 块骨，干扰项尽量选同一类的 ----
  const qbox = document.getElementById("quiz");
  if (qbox) {
    AN.quiz(qbox, () => AN.shuffle(BONES).slice(0, 10).map((b) => {
      const same = AN.shuffle(BONES.filter((x) => x.id !== b.id && x.group === b.group));
      const other = AN.shuffle(BONES.filter((x) => x.id !== b.id && x.group !== b.group));
      const wrong = same.concat(other).slice(0, 3).map((x) => x.name);
      const svg = skeletonSVG({ sel: true, zoom: b.zoom, cls: "sk-quiz", label: "骨骼示意图，其中一块骨被高亮" });
      return {
        q: "图中绿色高亮的是哪块骨？",
        options: [b.name].concat(wrong),
        a: b.name,
        why: `${b.name}（${b.count}）：${b.short}`,
        visual: `<div class="q-sk" data-bone="${b.id}">${svg}</div>`,
      };
    }), { href: "#explore", text: "回去认骨头 Review" });

    // 题目换页时，把高亮画上去
    new MutationObserver(() => {
      const v = qbox.querySelector(".q-sk");
      if (v && !v.dataset.done) { v.dataset.done = 1; skeletonSelect(v.querySelector("svg"), v.dataset.bone); }
    }).observe(qbox, { childList: true });
    const v = qbox.querySelector(".q-sk");
    if (v) { v.dataset.done = 1; skeletonSelect(v.querySelector("svg"), v.dataset.bone); }
  }
})();
