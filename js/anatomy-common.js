// 解剖学习 · 公用小工具：转义、打乱顺序、小测验
const AN = {};

AN.esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

AN.shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

// 小测验：build() 每次返回一组题目 [{ q, options, a, why, visual? }]
// review = { href, text } 结束后"去复习"按钮
AN.quiz = function (box, build, review) {
  let order, idx, score;

  function start() {
    order = build();
    idx = 0; score = 0;
    show();
  }

  function show() {
    const q = order[idx];
    box.innerHTML = `
      <div class="q-meta"><span>第 ${idx + 1} / ${order.length} 题</span><span>得分 ${score}</span></div>
      <div class="progress"><span style="width:${(idx / order.length) * 100}%"></span></div>
      ${q.visual || ""}
      <p class="q-text">${AN.esc(q.q)}</p>
      <div class="options">${AN.shuffle(q.options).map((o) => `<button class="option" data-o="${AN.esc(o)}">${AN.esc(o)}</button>`).join("")}</div>
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
        <b>${ok ? "✓ 答对了！Correct" : `✗ 不对哦，正确答案是「${AN.esc(q.a)}」`}</b>${AN.esc(q.why)}
      </div>
      <div style="text-align:right"><button class="btn" id="next">${last ? "查看成绩 See score" : "下一题 Next →"}</button></div>`;
    const next = box.querySelector("#next");
    next.focus({ preventScroll: true });
    next.onclick = () => { if (last) result(); else { idx++; show(); box.scrollIntoView({ behavior: "smooth", block: "start" }); } };
  }

  function result() {
    const n = order.length;
    const pct = score / n;
    const msg = pct === 1 ? "满分！这一阶段可以过关了 🎉"
      : pct >= 0.8 ? "很棒！再复习一下错的那几题就稳了。"
      : pct >= 0.5 ? "不错，把上面的内容再看一遍，然后再来一次。"
      : "刚开始没关系，回到上面慢慢看，再来挑战～";
    box.innerHTML = `
      <div class="result">
        <div class="progress"><span style="width:100%"></span></div>
        <p style="color:var(--muted);margin:24px 0 0">你的得分 Your score</p>
        <div class="score">${score} / ${n}</div>
        <p>${msg}</p>
        <p style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:20px">
          <button class="btn" id="again">再来一次 Try again</button>
          <a class="btn ghost" href="${review.href}">${review.text}</a>
        </p>
      </div>`;
    box.querySelector("#again").onclick = start;
  }

  start();
};

// 本地保存的勾选状态（只存在自己的浏览器里）
AN.store = (key) => ({
  get() { try { return JSON.parse(localStorage.getItem(key)) || {}; } catch (e) { return {}; } },
  set(v) { try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) {} },
  clear() { try { localStorage.removeItem(key); } catch (e) {} },
});
