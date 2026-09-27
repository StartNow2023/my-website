// 第 0 阶段 · 方位术语
// 想改术语说明：改下面 TERMS 里对应的一项
// { id, name: 名称, en: 英文, also: 别名(可不写), mean: 意思, eg: 例子, fig: 用哪张示意图 }
const TERMS = [
  { id: "updown", name: "上 / 下", en: "Superior / Inferior", also: "也叫颅侧 / 尾侧（Cranial / Caudal）",
    mean: "靠近头的为上，靠近脚的为下。", eg: "心在膈的上方；膀胱在肚脐的下方。" },
  { id: "antpost", name: "前 / 后", en: "Anterior / Posterior", also: "也叫腹侧 / 背侧（Ventral / Dorsal）",
    mean: "靠近身体腹面（肚子那一面）的为前，靠近背面的为后。", eg: "胸骨在心的前方，脊柱在心的后方。" },
  { id: "medlat", name: "内侧 / 外侧", en: "Medial / Lateral",
    mean: "以身体的正中线为准：离正中线近的为内侧，远的为外侧。", eg: "眼在鼻的外侧、耳的内侧；按解剖学姿势，小指在拇指的内侧。" },
  { id: "inout", name: "内 / 外", en: "Internal / External",
    mean: "用来描述空腔器官或体腔：靠近腔里面的为内，远离腔的为外。注意它和\"内侧 / 外侧\"不是一回事——一个看离\"腔\"近不近，一个看离\"正中线\"近不近。", eg: "心脏壁最里面一层叫心内膜，最外面一层叫心外膜。" },
  { id: "supdeep", name: "浅 / 深", en: "Superficial / Deep",
    mean: "以体表为准：离皮肤近的为浅，离皮肤远、往身体里面去的为深。", eg: "皮肤在肌肉的浅面，骨在肌肉的深面。" },
  { id: "proxdist", name: "近侧 / 远侧", en: "Proximal / Distal",
    mean: "主要用于四肢：离肢体根部（和躯干相连的地方）近的为近侧，远的为远侧。", eg: "肘在腕的近侧；手指在手掌的远侧；膝在踝的近侧。" },
  { id: "ulnrad", name: "尺侧 / 桡侧", en: "Ulnar / Radial",
    mean: "前臂和手专用的内侧 / 外侧：内侧（小指这边）叫尺侧，外侧（拇指这边）叫桡侧，因为前臂的尺骨、桡骨正好在这两边。", eg: "小指在手的尺侧，拇指在手的桡侧。" },
  { id: "tibfib", name: "胫侧 / 腓侧", en: "Tibial / Fibular",
    mean: "小腿专用的内侧 / 外侧：内侧叫胫侧，外侧叫腓侧，因为小腿的胫骨、腓骨正好在这两边。", eg: "大脚趾在足的胫侧，小脚趾在足的腓侧。" },
];

// 小测验题目：想加新题，照格式加一项即可（options 里第一个不必是答案，会自动打乱）
const QUESTIONS = [
  { q: "在解剖学姿势中，两只手的手掌朝向哪里？", options: ["朝前", "朝后", "朝向身体", "随便都行"], a: "朝前",
    why: "解剖学姿势要求上肢下垂、手掌朝前。这样前臂的桡骨和尺骨是并排的，描述起来不会乱。" },
  { q: "鼻子在眼睛的哪一侧？", options: ["内侧", "外侧"], a: "内侧",
    why: "鼻子在正中线上，比眼睛更靠近正中线，所以鼻在眼的内侧。" },
  { q: "手腕在肘关节的——", options: ["远侧", "近侧"], a: "远侧",
    why: "离上肢根部（肩）越远越\"远侧\"。手腕比肘离肩更远。" },
  { q: "皮肤在肌肉的——", options: ["浅面", "深面"], a: "浅面",
    why: "离体表近的是浅。皮肤在最外面，所以在肌肉的浅面。" },
  { q: "按解剖学姿势站好，拇指在手的哪一侧？", options: ["外侧（桡侧）", "内侧（尺侧）"], a: "外侧（桡侧）",
    why: "手掌朝前时，拇指离正中线更远，在外侧，也就是桡侧。" },
  { q: "把身体纵向切成左、右两部分的切面叫——", options: ["矢状面", "冠状面", "水平面"], a: "矢状面",
    why: "矢状面是前后方向的竖切面，把身体分成左右两部分；正好从正中切开的叫正中矢状面。" },
  { q: "把身体纵向切成前、后两部分的切面叫——", options: ["冠状面", "矢状面", "水平面"], a: "冠状面",
    why: "冠状面（也叫额状面）是左右方向的竖切面，把身体分成前、后两部分。" },
  { q: "做 CT 时看到的\"一层一层\"的横截面图像，多数属于——", options: ["水平面（横断面）", "矢状面", "冠状面"], a: "水平面（横断面）",
    why: "CT 通常是一层层横着扫描的，图像就是水平面，也叫横断面。" },
  { q: "胸骨在脊柱的——", options: ["前方", "后方"], a: "前方",
    why: "胸骨在胸前正中，脊柱在背后，所以胸骨在脊柱的前方（腹侧）。" },
  { q: "看一张面对你的人体图，图上这个人的\"右肩\"在你的哪一边？", options: ["我的左边", "我的右边"], a: "我的左边",
    why: "解剖学里的左右，永远是指被描述的那个人自己的左右。他面对着你，所以他的右边在你的左边。" },
  { q: "心脏在膈的——", options: ["上方", "下方"], a: "上方",
    why: "膈是胸腔和腹腔之间的\"隔板\"。心在胸腔里，所以在膈的上方。" },
  { q: "描述\"心内膜在心脏壁的最里层\"，用的是哪一对术语？", options: ["内 / 外", "内侧 / 外侧"], a: "内 / 外",
    why: "描述空腔器官的里外用\"内 / 外\"；\"内侧 / 外侧\"是看离正中线的远近。" },
  { q: "小脚趾在足的——", options: ["腓侧（外侧）", "胫侧（内侧）"], a: "腓侧（外侧）",
    why: "小脚趾离正中线更远，在外侧。小腿的外侧是腓骨，所以叫腓侧。" },
];

/* ================= 示意图（本站自绘） ================= */
(function () {
  const W = 260, H = 440;
  const C = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}"/>`;
  const E = (cx, cy, rx, ry, rot = 0) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"${rot ? ` transform="rotate(${rot} ${cx} ${cy})"` : ""}/>`;
  const P = (d) => `<path d="${d}"/>`;
  const f = (n) => Math.round(n * 10) / 10;
  function K(x1, y1, x2, y2, w1, w2 = w1) {
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len, ny = dx / len, a = w1 / 2, b = w2 / 2;
    return `<path d="M${f(x1 + nx * a)},${f(y1 + ny * a)} L${f(x2 + nx * b)},${f(y2 + ny * b)} L${f(x2 - nx * b)},${f(y2 - ny * b)} L${f(x1 - nx * a)},${f(y1 - ny * a)} Z"/>` + C(x1, y1, f(a)) + C(x2, y2, f(b));
  }
  const mirror = (s) => `<g transform="matrix(-1 0 0 1 ${W} 0)">${s}</g>`;

  // 正面人形（手掌朝前、拇指朝外）
  const halfFront = E(84, 104, 14, 13) + K(83, 108, 72, 190, 19, 14) + K(72, 190, 62, 270, 14, 11) +
    E(59, 290, 10, 19, 6) + K(53, 276, 45, 293, 6.5, 5.5) + K(117, 244, 112, 338, 30, 20) + K(112, 338, 111, 408, 20, 12) + E(108, 418, 12, 10);
  const FRONT = E(130, 42, 22, 27) + K(130, 64, 130, 84, 17, 19) +
    P("M100,86 C112,80 148,80 160,86 C172,90 177,98 176,110 L170,152 C165,172 157,184 155,196 C159,210 164,222 164,236 L160,254 L100,254 L96,236 C96,222 101,210 105,196 C103,184 95,172 90,152 L84,110 C83,98 88,90 100,86 Z") +
    halfFront + mirror(halfFront);
  // 侧面人形（面朝右）
  const SIDE = E(131, 42, 23, 27) + P("M150,34 L163,50 L151,53 Z") + K(126, 64, 124, 86, 17, 19) +
    P("M108,86 L144,86 C152,98 155,122 151,142 C147,162 149,182 151,198 C155,216 153,234 146,252 L106,252 C99,236 97,216 102,198 C106,178 104,152 104,132 C104,112 104,96 108,86 Z") +
    K(126, 98, 126, 190, 20, 15) + K(126, 190, 129, 270, 15, 11) + E(131, 290, 8, 19) +
    K(126, 238, 128, 340, 38, 22) + K(128, 340, 124, 408, 22, 13) + E(138, 420, 22, 8);

  // 右前臂和手（手掌朝前：拇指在图的左边）
  const FOREARM = K(130, 14, 128, 262, 72, 58) + E(128, 302, 40, 46) + K(94, 290, 68, 338, 18, 15) +
    K(107, 330, 104, 392, 15, 13) + K(124, 334, 124, 402, 15, 13) + K(141, 332, 144, 394, 14, 12) + K(157, 322, 162, 374, 12, 11);
  // 右小腿和脚（正面：大脚趾在图的右边，靠近身体正中线）
  const SHIN = K(128, 14, 130, 322, 72, 40) + E(132, 356, 44, 26) +
    C(164, 380, 10) + C(146, 385, 7.5) + C(130, 387, 7) + C(115, 385, 6.5) + C(101, 380, 6);
  const bones = (s) => `<g class="bn-e">${s}</g><g class="bn-f">${s}</g>`;

  function sil(body, clip) {
    // clip = [{ id, x, y, w, h, cls }]：把人形分块染色（切面图用）
    if (!clip) return `<g class="e">${body}</g><g class="f">${body}</g>`;
    return `<defs>${clip.map((c) => `<clipPath id="${c.id}"><rect x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}"/></clipPath>`).join("")}</defs>
      <g class="e">${body}</g>${clip.map((c) => `<g class="f ${c.cls}" clip-path="url(#${c.id})">${body}</g>`).join("")}`;
  }
  const arrowHead = (x, y, ang) => `<path class="ah" d="M0,0 L-11,-6 L-11,6 Z" transform="translate(${x} ${y}) rotate(${ang})"/>`;
  // 双向箭头
  function dbl(x1, y1, x2, y2) {
    const ang = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    return `<line class="arrow" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>` + arrowHead(x2, y2, ang) + arrowHead(x1, y1, ang + 180);
  }
  function one(x1, y1, x2, y2) {
    const ang = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    return `<line class="arrow" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>` + arrowHead(x2, y2, ang);
  }
  const T = (x, y, s, size = 15, anchor = "middle", cls = "") => `<text x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}"${cls ? ` class="${cls}"` : ""}>${s}</text>`;
  const svg = (inner, vb = `0 0 ${W} ${H}`, label = "") => `<svg class="fig-sil" viewBox="${vb}" role="img" aria-label="${label}">${inner}</svg>`;

  const FIG = {
    pose: () => svg(sil(FRONT) + `<line class="guide" x1="130" y1="4" x2="130" y2="436"/>`, `0 0 ${W} ${H}`, "解剖学姿势示意图"),
    updown: () => svg(sil(FRONT) + dbl(236, 24, 236, 416) + T(236, 16, "上") + T(236, 436, "下") +
      T(214, 52, "Superior", 11, "end", "en2") + T(214, 406, "Inferior", 11, "end", "en2"), undefined, "上下示意图"),
    antpost: () => svg(sil(SIDE) + dbl(34, 160, 226, 160) + T(34, 146, "后", 15, "start") + T(226, 146, "前", 15, "end") +
      T(34, 184, "Posterior（背侧）", 11, "start", "en2") + T(226, 184, "Anterior（腹侧）", 11, "end", "en2") + T(250, 436, "侧面图 · 面朝右 →", 12, "end"), undefined, "前后示意图（侧面）"),
    medlat: () => svg(sil(FRONT) + `<line class="guide" x1="130" y1="4" x2="130" y2="436"/>` + T(130, 438, "正中线", 12) +
      one(138, 150, 246, 150) + one(122, 150, 14, 150) + T(246, 138, "外侧", 15, "end") + T(14, 138, "外侧", 15, "start") +
      T(246, 170, "Lateral", 11, "end", "en2") + T(14, 170, "Lateral", 11, "start", "en2") +
      T(130, 184, "内侧", 15) + T(130, 200, "Medial", 11, "middle", "en2"),
      undefined, "内侧外侧示意图"),
    inout: () => svg(`<g class="e">${C(130, 200, 90)}</g><g class="f">${C(130, 200, 90)}</g>
      <circle cx="130" cy="200" r="55" fill="none" stroke="#e3a99a" stroke-width="7"/>
      <circle cx="130" cy="200" r="87" fill="none" stroke="#d9bf86" stroke-width="6"/>
      <circle cx="130" cy="200" r="51.5" fill="#fffdf8"/>` +
      T(130, 190, "腔", 17) + T(130, 207, "Cavity", 11, "middle", "en2") + T(130, 100, "空腔器官的壁", 13) +
      one(190, 236, 150, 236) + one(190, 236, 238, 236) + T(152, 256, "内", 16) + T(236, 256, "外", 16) +
      T(130, 318, "内：靠近腔　外：远离腔", 13) +
      T(130, 340, "例：心脏壁里层（粉）= 心内膜", 12) + T(130, 358, "外层（金）= 心外膜", 12),
      `0 84 ${W} 284`, "内外示意图：空腔器官的横截面"),
    supdeep: () => svg(`<circle cx="130" cy="200" r="96" fill="#f2dcc8" stroke="#c9a88c" stroke-width="2"/>
      <circle cx="130" cy="200" r="88" fill="#f7ecd2"/><circle cx="130" cy="200" r="72" fill="#dfb3a6"/>
      <path d="M130,128 V178 M79,149 L114,184 M181,149 L146,184" stroke="#c99a8d" stroke-width="1.5" fill="none"/>
      <circle cx="130" cy="200" r="22" fill="#f3ebd9" stroke="#a39374" stroke-width="2"/><circle cx="130" cy="200" r="10" fill="#ecd3a9"/>
      <path d="M62,128 L72,141" stroke="#8a7a60" stroke-width="1.2"/>` +
      one(148, 218, 226, 296) + T(250, 322, "由深到浅 →", 13, "end") +
      T(130, 94, "皮肤（最浅）", 13) + T(14, 122, "皮下脂肪", 12, "start") + T(178, 205, "肌肉", 13) + T(130, 242, "骨（最深）", 12) +
      T(14, 322, "大腿横截面", 12, "start"), `0 76 ${W} 256`, "浅深示意图：大腿横截面"),
    proxdist: () => svg(sil(FRONT) + one(82, 104, 54, 306) + one(148, 250, 154, 424) +
      T(96, 100, "近侧", 13, "start") + T(40, 324, "远侧", 13, "start") + T(170, 262, "近侧", 13, "start") + T(170, 424, "远侧", 13, "start") +
      T(96, 116, "Proximal", 10, "start", "en2") + T(40, 338, "Distal", 10, "start", "en2"), undefined, "近侧远侧示意图"),
    ulnrad: () => svg(sil(FOREARM) + bones(K(113, 26, 107, 252, 9, 19) + K(148, 22, 151, 252, 18, 9)) +
      T(107, 120, "桡骨", 12) + T(150, 120, "尺骨", 12) +
      one(92, 180, 22, 180) + one(168, 180, 238, 180) + T(24, 166, "桡侧", 16, "start") + T(236, 166, "尺侧", 16, "end") +
      T(24, 200, "拇指侧", 12, "start") + T(236, 200, "小指侧", 12, "end") + T(130, 434, "人物的右前臂 · 手掌朝前", 12), undefined, "尺侧桡侧示意图"),
    tibfib: () => svg(sil(SHIN) + bones(K(140, 26, 141, 318, 28, 17) + E(146, 318, 6, 10) + K(104, 36, 109, 330, 9, 9) + E(108, 334, 6, 10)) +
      T(140, 150, "胫骨", 12) + T(106, 190, "腓骨", 12) +
      one(92, 240, 22, 240) + one(168, 240, 238, 240) + T(24, 226, "腓侧", 16, "start") + T(236, 226, "胫侧", 16, "end") +
      T(24, 260, "外侧", 12, "start") + T(236, 260, "内侧", 12, "end") + T(130, 434, "人物的右小腿 · 正面", 12), undefined, "胫侧腓侧示意图"),
  };

  // 三个切面
  const PLANES = [
    { name: "矢状面", en: "Sagittal Plane", text: "前后方向的竖切面，把身体分成<b>左、右</b>两部分。正好从正中间切开、分成左右对称两半的，叫<b>正中矢状面</b>。（图上的人面对着你，所以他的右半边在左边。）",
      fig: () => svg(sil(FRONT, [{ id: "pl-a", x: 0, y: 0, w: 130, h: H, cls: "a" }, { id: "pl-b", x: 130, y: 0, w: 130, h: H, cls: "b" }]) +
        `<line class="cut" x1="130" y1="0" x2="130" y2="440"/>` + T(56, 40, "右", 18) + T(204, 40, "左", 18), undefined, "矢状面示意图") },
    { name: "冠状面", en: "Coronal (Frontal) Plane", text: "左右方向的竖切面，把身体分成<b>前、后</b>两部分。也叫<b>额状面</b>，因为它和额头平行。",
      fig: () => svg(sil(SIDE, [{ id: "pl-c", x: 0, y: 0, w: 127, h: H, cls: "b" }, { id: "pl-d", x: 127, y: 0, w: 133, h: H, cls: "a" }]) +
        `<line class="cut" x1="127" y1="0" x2="127" y2="440"/>` + T(62, 40, "后", 18) + T(200, 40, "前", 18), undefined, "冠状面示意图") },
    { name: "水平面", en: "Horizontal (Transverse) Plane", text: "和地面平行的横切面，把身体分成<b>上、下</b>两部分。也叫<b>横断面</b>，CT 图像大多就是这个方向。",
      fig: () => svg(sil(FRONT, [{ id: "pl-e", x: 0, y: 0, w: W, h: 200, cls: "a" }, { id: "pl-f", x: 0, y: 200, w: W, h: 240, cls: "b" }]) +
        `<line class="cut" x1="0" y1="200" x2="260" y2="200"/>` + T(222, 188, "上", 18) + T(222, 226, "下", 18), undefined, "水平面示意图") },
  ];

  /* ---------- 页面 ---------- */
  document.getElementById("pose-fig").innerHTML = FIG.pose();

  const chips = document.getElementById("term-chips");
  const fig = document.getElementById("term-fig");
  const text = document.getElementById("term-text");
  chips.innerHTML = TERMS.map((t) => `<button class="chip" data-t="${t.id}">${AN.esc(t.name)}</button>`).join("");
  function show(id) {
    const t = TERMS.find((x) => x.id === id);
    chips.querySelectorAll(".chip").forEach((c) => c.classList.toggle("on", c.dataset.t === id));
    fig.innerHTML = FIG[id]();
    text.innerHTML = `
      <h3>${AN.esc(t.name)} <span class="en">${AN.esc(t.en)}</span></h3>
      ${t.also ? `<p style="color:var(--muted);font-size:.92rem">${AN.esc(t.also)}</p>` : ""}
      <h4>意思</h4><p>${AN.esc(t.mean)}</p>
      <h4>例子</h4><p>${AN.esc(t.eg)}</p>`;
  }
  chips.addEventListener("click", (e) => { const c = e.target.closest(".chip"); if (c) show(c.dataset.t); });
  show(TERMS[0].id);

  document.getElementById("plane-cards").innerHTML = PLANES.map((p) => `
    <div class="card">${p.fig()}<h3>${p.name} <span class="en">${p.en}</span></h3><p>${p.text}</p></div>`).join("");

  document.getElementById("term-table").innerHTML = `
    <tr><th>术语</th><th>英文</th><th>意思</th><th>例子</th></tr>
    ${TERMS.map((t) => `<tr><td><b>${AN.esc(t.name)}</b></td><td>${AN.esc(t.en)}</td><td>${AN.esc(t.mean)}</td><td>${AN.esc(t.eg)}</td></tr>`).join("")}`;

  AN.quiz(document.getElementById("quiz"), () => AN.shuffle(QUESTIONS).slice(0, 10), { href: "#terms", text: "复习术语 Review" });
})();
