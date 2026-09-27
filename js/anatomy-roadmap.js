// 解剖学习路线：想改某个阶段的内容，改下面 STAGES 里对应的一项
// 新做好一个阶段的页面后，把 href 填上页面文件名，卡片就会出现"开始学习"按钮
const STAGES = [
  { n: 0, title: "方位术语", en: "Anatomical Terms", href: "anatomy-terms.html",
    learn: "解剖学姿势，上下、前后、内侧外侧、近侧远侧，三个切面",
    goal: "能用术语说出\"锁骨在胸骨的哪一侧\"" },
  { n: 1, title: "骨骼", en: "Bones", href: "anatomy-bones.html",
    learn: "全身主要的骨头、骨性标志",
    goal: "能在自己身上摸出十几个骨性标志" },
  { n: 2, title: "关节", en: "Joints",
    learn: "肩、肘、髋、膝等大关节的结构和活动方式",
    goal: "知道膝关节为什么只能弯、不能往侧面转" },
  { n: 3, title: "肌肉", en: "Muscles",
    learn: "主要肌肉的起点、止点和作用",
    goal: "看到一个动作，能说出是哪块肌肉在发力" },
  { n: 4, title: "内脏", en: "Viscera",
    learn: "消化、呼吸、泌尿、生殖系统",
    goal: "能说出食物从嘴到肛门经过哪些器官" },
  { n: 5, title: "脉管", en: "Heart & Vessels",
    learn: "心脏结构、主要动脉和静脉、血液循环路线",
    goal: "能画出体循环和肺循环" },
  { n: 6, title: "感觉器", en: "Sense Organs",
    learn: "眼、耳的结构",
    goal: "知道光和声音是怎么被接收的" },
  { n: 7, title: "神经", en: "Nervous System",
    learn: "脑、脊髓、主要的周围神经",
    goal: "知道\"手麻\"大概和哪条神经有关" },
];

(function () {
  const box = document.getElementById("stages");
  const store = AN.store("anatomy-stages-v1");
  let saved = store.get();

  box.innerHTML = STAGES.map((s) => `
    <article class="card stage${s.href ? "" : " soon"}${saved[s.n] ? " done" : ""}" data-n="${s.n}">
      <div class="stage-no">${s.n}</div>
      <div>
        <h3>${AN.esc(s.title)} <span class="en">${AN.esc(s.en)}</span></h3>
        <p><b>学什么：</b>${AN.esc(s.learn)}</p>
        <p><b>过关标准：</b>${AN.esc(s.goal)}</p>
        <div class="stage-foot">
          <label class="check-item" for="st-${s.n}">
            <input type="checkbox" id="st-${s.n}" data-n="${s.n}" ${saved[s.n] ? "checked" : ""}>
            <span class="box"></span><span class="t"><b>我学会了</b></span>
          </label>
          ${s.href ? `<a class="btn" href="${s.href}">开始学习 Start →</a>` : `<span class="tag gold">页面还在做 · 可以先看书学</span>`}
        </div>
      </div>
    </article>`).join("");

  const boxes = [...box.querySelectorAll("input")];
  function update() {
    const n = boxes.filter((b) => b.checked).length;
    document.getElementById("st-bar").style.width = `${(n / boxes.length) * 100}%`;
    document.getElementById("st-done").textContent = n === boxes.length ? `全部学完 🎉 ${n}/${boxes.length}` : `已学会 ${n}/${boxes.length} 个阶段`;
  }
  box.addEventListener("change", (e) => {
    if (e.target.type !== "checkbox") return;
    const n = e.target.dataset.n;
    if (e.target.checked) saved[n] = 1; else delete saved[n];
    e.target.closest(".stage").classList.toggle("done", e.target.checked);
    store.set(saved);
    update();
  });
  update();
})();
