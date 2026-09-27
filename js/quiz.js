// Texture quiz
// Each question: a = correct answer; tint = sketch color; desc = description; why = explanation
const OPTIONS = ["Glass", "Icy", "Glutinous", "Bean"];

// Sketch settings: lower opacity = clearer; more blur = hazier; grain = graininess
const LOOK = {
  "Glass":     { op: 0.12, blur: 0, grain: 0, freq: 0.9 },
  "Icy":       { op: 0.38, blur: 2, grain: 0.18, freq: 0.05 },
  "Glutinous": { op: 0.72, blur: 7, grain: 0.08, freq: 0.9 },
  "Bean":      { op: 0.8, blur: 9, grain: 0.75, freq: 0.12 },
};

const QUESTIONS = [
  { a: "Glass", tint: "#dcebe4", desc: "A colorless bangle. Through it you can clearly read the small print of a newspaper behind it. The surface reflects like glass, and a bluish-white glow floats across it as it turns.",
    why: "Reading print clearly through it, a strong glassy luster and a floating glow are all classic signs of glass type." },
  { a: "Bean", tint: "#7fb68c", desc: "A green pendant with quite a bright color — but look closely and you can see individual crystal grains, like little green beans. A flashlight only gets a short way in.",
    why: "Visible coarse grains and low transparency are exactly where \"bean type\" gets its name. Bean jadeite is often green (\"bean green\")." },
  { a: "Glutinous", tint: "#e6ede4", desc: "A translucent cabochon that looks like a bowl of cooked glutinous-rice soup. Smooth and soft, no visible grains — but you can't see through to what's behind it.",
    why: "Translucent like rice soup, fine and mellow, with no visible grains — that's glutinous type." },
  { a: "Icy", tint: "#d8ebe6", desc: "A safety clasp that is clear and bright, like a piece of ice. You can see the outline of things behind it, a little blurred, and there are a few fine white wisps of cotton inside.",
    why: "Clear but not as pure and sharp as glass type, with a little cotton — that's what icy type looks like." },
  { a: "Bean", tint: "#b9cdb5", desc: "A very affordable bangle. It looks a bit \"dry\", the luster is weak, and under a light you can see lots of flashes (fly wings) and a grainy feel.",
    why: "Coarse grains make fly wings obvious, with weak luster and a dry look — typical of bean type." },
  { a: "Icy", tint: "#b7ddc8", desc: "A pale green bangle. The color is light and even, the base is bright and clear, like a lake on a sunny day. A flashlight glow is bright and goes deep.",
    why: "This is \"clear-water green\": an even pale green on a clear base. It usually needs an icy-grade texture to look like this." },
  { a: "Glutinous", tint: "#d9cde8", desc: "A pale lavender bangle. It looks soft, a bit like jelly but not very clear, fine with no visible grains; a flashlight gets in a little but the light spreads out.",
    why: "Lavender jadeite is usually glutinous or bean. Fine with no grains, translucent, light spreading — closer to glutinous (possibly glutinous-icy)." },
  { a: "Glass", tint: "#e8f0ec", desc: "A pair of earrings that look almost colorless on white paper. Inside it's extremely clean with no cotton; light goes in as if into glass, and the whole thing sparkles.",
    why: "Very high transparency, almost no inclusions, crystal clear — glass type." },
  { a: "Icy", tint: "#e0ece6", desc: "A leaf pendant with very good transparency — you can see the shadow of a finger behind it — but it isn't \"completely transparent\" like glass. The surface has a lovely gel-like feel.",
    why: "High transparency and a gel-like glow, but not the purity of glass type — usually graded icy (high-icy)." },
  { a: "Glutinous", tint: "#cfdfcf", desc: "A mellow pendant. Not very transparent overall, but very fine, with a soft, sticky-rice feel; no grains under a light.",
    why: "\"Not very clear but very fine\" is the essence of glutinous type — unlike bean type, you can't see any grains." },
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
        <div class="behind">JADE</div>
        <div class="stone" style="background:${q.tint};opacity:${L.op};backdrop-filter:blur(${L.blur}px);-webkit-backdrop-filter:blur(${L.blur}px)"></div>
        ${grain}
        <div class="shine"></div>
        <span class="cap">Sketch: looking at text through the stone</span>
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
      <div class="q-meta"><span>Question ${idx + 1} of ${order.length}</span><span>Score ${score}</span></div>
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
    box.querySelector(".q-meta span:last-child").textContent = `Score ${score}`;
    const last = idx === order.length - 1;
    box.querySelector("#fb").innerHTML = `
      <div class="feedback ${ok ? "ok" : "no"}">
        <b>${ok ? "✓ Correct!" : `✗ Not quite — the answer is ${q.a}.`}</b>${q.why}
      </div>
      <div style="text-align:right"><button class="btn" id="next">${last ? "See my score" : "Next →"}</button></div>`;
    const next = box.querySelector("#next");
    next.focus({ preventScroll: true });
    next.onclick = () => { if (last) result(); else { idx++; show(); box.scrollIntoView({ behavior: "smooth", block: "start" }); } };
  }

  function result() {
    const n = order.length;
    const pct = score / n;
    const msg = pct === 1 ? "Perfect score — you have a real eye for jade! 🎉"
      : pct >= 0.8 ? "Great job — you already read texture well."
      : pct >= 0.5 ? "Not bad! Looking at more real pieces will sharpen your eye."
      : "Just starting out is fine — have another look at the Texture section.";
    box.innerHTML = `
      <div class="result">
        <div class="progress"><span style="width:100%"></span></div>
        <p style="color:var(--muted);margin:24px 0 0">Your score</p>
        <div class="score">${score} / ${n}</div>
        <p>${msg}</p>
        <p style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:20px">
          <button class="btn" id="again">Try again</button>
          <a class="btn ghost" href="knowledge.html#fc-zhong">Review texture</a>
        </p>
      </div>`;
    box.querySelector("#again").onclick = start;
  }

  start();
})();
