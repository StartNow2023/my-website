// 猜种水小测验
// 每题：a = 正确答案；tint = 示意图颜色；desc = 描述；why = 解释
const OPTIONS = ["玻璃种", "冰种", "糯种", "豆种"];

// 示意图参数：透明度越低越透；blur 越大越朦胧；grain 是颗粒感
const LOOK = {
  "玻璃种": { op: 0.12, blur: 0, grain: 0, freq: 0.9 },
  "冰种":   { op: 0.38, blur: 2, grain: 0.18, freq: 0.05 },
  "糯种":   { op: 0.72, blur: 7, grain: 0.08, freq: 0.9 },
  "豆种":   { op: 0.8, blur: 9, grain: 0.75, freq: 0.12 },
};

const QUESTIONS = [
  { a: "玻璃种", tint: "#dcebe4", desc: "一只无色手镯，隔着镯子能清楚地看到背后报纸上的小字，表面像玻璃一样反光，转动时浮起一层蓝白色光晕。",
    why: "能清晰透视字迹、强玻璃光泽、起荧光，都是玻璃种的典型特征。" },
  { a: "豆种", tint: "#7fb68c", desc: "一个绿色吊坠，颜色挺鲜，但仔细看能看到一粒一粒像绿豆的晶体颗粒，打光只能透进一点点。",
    why: "肉眼可见粗颗粒、透明度低，这正是\"豆种\"名字的来历。豆种带绿很常见，俗称\"豆绿\"。" },
  { a: "糯种", tint: "#e6ede4", desc: "一块半透明的蛋面，看起来像一碗煮熟的糯米汤，质地细腻柔和，看不到颗粒，但也看不清背后的东西。",
    why: "像糯米汤一样的半透明、细腻温润、无明显颗粒，是糯种的特点。" },
  { a: "冰种", tint: "#d8ebe6", desc: "一块平安扣，清亮通透，像一块冰，隔着它能看到背后物体的轮廓但有点模糊，里面有几丝细小的白色棉絮。",
    why: "通透但不及玻璃种那样纯净清晰，带少量棉，这是冰种的样子。" },
  { a: "豆种", tint: "#b9cdb5", desc: "价格很亲民的手镯，质地看起来有点\"干\"，光泽偏弱，灯下能看到很多片状闪光（苍蝇翅）和颗粒感。",
    why: "颗粒粗时苍蝇翅明显、光泽弱、显干，是豆种常见表现。" },
  { a: "冰种", tint: "#b7ddc8", desc: "一只淡绿色手镯，颜色均匀清淡，底子透亮，像晴天的湖水。打灯光晕明亮，能透得比较深。",
    why: "这是\"晴水\"：淡绿均匀配通透底子。晴水一般要求冰种左右的种水才出效果。" },
  { a: "糯种", tint: "#d9cde8", desc: "一只淡紫色手镯，看上去柔柔的、有点像果冻但不太透，细腻看不出颗粒，打灯光能透进一些但比较散。",
    why: "紫罗兰翡翠多见于糯种、豆种。细腻无颗粒、半透明、光散开，更接近糯种（也可能是\"糯冰\"）。" },
  { a: "玻璃种", tint: "#e8f0ec", desc: "一对耳坠，放在白纸上几乎看不出颜色，内部极其纯净，没有棉，光打进去像打进了玻璃，整体闪闪发亮。",
    why: "极高透明度、几乎无杂质、晶莹剔透，是玻璃种的表现。" },
  { a: "冰种", tint: "#e0ece6", desc: "一件叶子吊坠，透明度很好，可以看见背后手指的影子，但没有玻璃那种\"完全透明\"的感觉，表面胶感很好。",
    why: "透明度高、起胶，但达不到玻璃种的纯净通透，通常归为冰种（高冰）。" },
  { a: "糯种", tint: "#cfdfcf", desc: "一块温润的挂件，整体不太透，但质地很细腻，有一种软糯的感觉，灯光下看不出颗粒。",
    why: "\"不太透但很细腻\"——这就是糯种的精髓，和豆种的区别在于看不到颗粒。" },
];

(function () {
  const box = document.getElementById("quiz");
  let order, idx, score;

  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };

  function visual(q) {
    const L = LOOK[q.a];
    const grain = L.grain
      ? `<svg class="grain" style="opacity:${L.grain}" width="100%" height="100%"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="${L.freq}" numOctaves="2" seed="${idx + 3}"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -2.2 1.4"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`
      : "";
    return `
      <div class="q-visual" aria-hidden="true">
        <div class="behind">玉石之美</div>
        <div class="stone" style="background:${q.tint};opacity:${L.op};backdrop-filter:blur(${L.blur}px);-webkit-backdrop-filter:blur(${L.blur}px)"></div>
        ${grain}
        <div class="shine"></div>
        <span class="cap">示意：透过玉看后面的字</span>
      </div>`;
  }

  function start() {
    order = shuffle(QUESTIONS);
    idx = 0; score = 0;
    show();
  }

  function show() {
    const q = order[idx];
    box.innerHTML = `
      <div class="q-meta"><span>第 ${idx + 1} / ${order.length} 题</span><span>得分 ${score}</span></div>
      <div class="progress"><span style="width:${(idx / order.length) * 100}%"></span></div>
      ${visual(q)}
      <p class="q-text">${q.desc}</p>
      <div class="options">${OPTIONS.map((o) => `<button class="option" data-o="${o}">${o}</button>`).join("")}</div>
      <div id="fb"></div>`;
    box.querySelector(".options").onclick = (e) => {
      const b = e.target.closest(".option");
      if (b && !b.disabled) answer(b.dataset.o);
    };
  }

  function answer(pick) {
    const q = order[idx];
    const ok = pick === q.a;
    if (ok) score++;
    box.querySelectorAll(".option").forEach((b) => {
      b.disabled = true;
      if (b.dataset.o === q.a) b.classList.add("right");
      else if (b.dataset.o === pick) b.classList.add("wrong");
    });
    box.querySelector(".q-meta span:last-child").textContent = `得分 ${score}`;
    const last = idx === order.length - 1;
    box.querySelector("#fb").innerHTML = `
      <div class="feedback ${ok ? "ok" : "no"}">
        <b>${ok ? "✓ 答对了！" : `✗ 不对哦，正确答案是「${q.a}」`}</b>${q.why}
      </div>
      <div style="text-align:right"><button class="btn" id="next">${last ? "查看成绩" : "下一题 →"}</button></div>`;
    const next = box.querySelector("#next");
    next.focus({ preventScroll: true });
    next.onclick = () => { if (last) result(); else { idx++; show(); box.scrollIntoView({ behavior: "smooth", block: "start" }); } };
  }

  function result() {
    const n = order.length;
    const pct = score / n;
    const msg = pct === 1 ? "满分！眼力了得，可以出师了 🎉"
      : pct >= 0.8 ? "很棒！已经很会看种水了。"
      : pct >= 0.5 ? "不错，再多看看实物会更准。"
      : "刚入门没关系，去「知识」页再复习一下种水吧～";
    box.innerHTML = `
      <div class="result">
        <div class="progress"><span style="width:100%"></span></div>
        <p style="color:var(--muted);margin:24px 0 0">你的得分</p>
        <div class="score">${score} / ${n}</div>
        <p>${msg}</p>
        <p style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:20px">
          <button class="btn" id="again">再来一次</button>
          <a class="btn ghost" href="knowledge.html#feicui">复习种水</a>
        </p>
      </div>`;
    box.querySelector("#again").onclick = start;
  }

  start();
})();
