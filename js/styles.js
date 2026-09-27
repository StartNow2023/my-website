// 灵感墙：读取 data/styles.csv 并展示
(function () {
  // 筛选按钮的默认顺序；表格里出现的新款式会自动排在后面
  const STYLE_ORDER = ["手镯", "吊坠", "戒指", "耳饰", "手串", "把件"];
  const TYPE_ORDER = ["翡翠", "和田玉"];

  const $ = (id) => document.getElementById(id);
  const state = { style: "全部", type: "全部" };
  // 支持从首页带参数进来，例如 styles.html?type=翡翠
  const params = new URLSearchParams(location.search);
  if (params.get("type")) state.type = params.get("type");
  if (params.get("style")) state.style = params.get("style");
  let items = [];

  // 简单可靠的 CSV 解析：支持引号、引号内的逗号和换行
  function parseCSV(text) {
    text = text.replace(/^﻿/, "");
    const rows = [];
    let row = [], field = "", i = 0, q = false;
    while (i < text.length) {
      const c = text[i];
      if (q) {
        if (c === '"') {
          if (text[i + 1] === '"') { field += '"'; i++; } else q = false;
        } else field += c;
      } else if (c === '"') q = true;
      else if (c === ",") { row.push(field); field = ""; }
      else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        row.push(field); rows.push(row); row = []; field = "";
      } else field += c;
      i++;
    }
    if (field !== "" || row.length) { row.push(field); rows.push(row); }
    const nonEmpty = rows.filter((r) => r.some((v) => v.trim() !== ""));
    const head = nonEmpty.shift().map((h) => h.trim());
    return nonEmpty.map((r) => {
      const o = {};
      head.forEach((h, k) => (o[h] = (r[k] || "").trim()));
      return o;
    });
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  const label = (v) => v;

  function buildChips(el, key, order) {
    const found = [...new Set(items.map((it) => it[key === "style" ? "款式" : "种类"]).filter(Boolean))];
    const values = ["全部", ...order.filter((v) => found.includes(v)), ...found.filter((v) => !order.includes(v))];
    el.innerHTML = values
      .map((v) => `<button class="chip${v === state[key] ? " on" : ""}" data-v="${esc(v)}">${esc(label(v))}</button>`)
      .join("");
    el.onclick = (e) => {
      const b = e.target.closest(".chip");
      if (!b) return;
      state[key] = b.dataset.v;
      el.querySelectorAll(".chip").forEach((c) => c.classList.toggle("on", c === b));
      render();
    };
  }

  function render() {
    const list = items.filter(
      (it) => (state.style === "全部" || it["款式"] === state.style) && (state.type === "全部" || it["种类"] === state.type)
    );
    $("wall").innerHTML = list
      .map(
        (it) => `
      <button class="pin card" data-i="${items.indexOf(it)}">
        <img src="${esc(it["图片"])}" alt="${esc(it["名称"])}" loading="lazy">
        <div class="body">
          <div class="tags"><span class="tag">${esc(it["款式"])}</span><span class="tag gold">${esc(it["种类"])}</span></div>
          <h3>${esc(it["名称"])}</h3>
          <p class="why">${esc(it["我喜欢它哪里"])}</p>
        </div>
      </button>`
      )
      .join("");
    $("empty").hidden = list.length > 0;
    $("count").textContent = `共 ${list.length} 件`;
  }

  function open(it) {
    $("lb-img").src = it["图片"];
    $("lb-img").alt = it["名称"];
    $("lb-title").textContent = it["名称"];
    $("lb-why").textContent = it["我喜欢它哪里"];
    $("lb-detail").textContent = it["详细说明"] || "（暂无）";
    $("lb-tags").innerHTML = `<span class="tag">${esc(it["款式"])}</span> <span class="tag gold">${esc(it["种类"])}</span>`;
    const d = $("lightbox");
    if (d.showModal) d.showModal(); else d.setAttribute("open", "");
  }
  function close() {
    const d = $("lightbox");
    if (d.close) d.close(); else d.removeAttribute("open");
  }

  $("wall").addEventListener("click", (e) => {
    const p = e.target.closest(".pin");
    if (p) open(items[+p.dataset.i]);
  });
  $("lb-close").onclick = close;
  $("lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox") close(); });

  fetch("data/styles.csv", { cache: "no-cache" })
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.text(); })
    .then((t) => {
      items = parseCSV(t).filter((it) => it["图片"] || it["名称"]);
      buildChips($("f-style"), "style", STYLE_ORDER);
      buildChips($("f-type"), "type", TYPE_ORDER);
      render();
    })
    .catch(() => {
      $("wall").innerHTML = "";
      $("empty").hidden = false;
      $("empty").textContent = "读取 data/styles.csv 失败。如果是在电脑上直接双击打开的网页，请发布到 GitHub Pages 后再看，或用本地服务器打开。";
    });
})();
