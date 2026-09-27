// Inspiration wall: reads data/styles.csv and shows the pieces
(function () {
  // Default order of the filter buttons; any new style in the table is added at the end
  const STYLE_ORDER = ["Bangle", "Pendant", "Ring", "Earrings", "Bracelet", "Handpiece"];
  const TYPE_ORDER = ["Jadeite", "Hetian Jade"];

  const $ = (id) => document.getElementById(id);
  const state = { style: "All", type: "All" };
  // Filters can be preset from a link, e.g. styles.html?type=Jadeite
  const params = new URLSearchParams(location.search);
  if (params.get("type")) state.type = params.get("type");
  if (params.get("style")) state.style = params.get("style");
  let items = [];

  // Small CSV parser: handles quotes, and commas / line breaks inside quotes
  function parseCSV(text) {
    text = text.replace(/^\uFEFF/, "");
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
      head.forEach((h, k) => (o[h.toLowerCase()] = (r[k] || "").trim()));
      return o;
    });
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  const label = (v) => v;

  function buildChips(el, key, order) {
    const found = [...new Set(items.map((it) => it[key === "style" ? "style" : "type"]).filter(Boolean))];
    const values = ["All", ...order.filter((v) => found.includes(v)), ...found.filter((v) => !order.includes(v))];
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
      (it) => (state.style === "All" || it["style"] === state.style) && (state.type === "All" || it["type"] === state.type)
    );
    $("wall").innerHTML = list
      .map(
        (it) => `
      <button class="pin card" data-i="${items.indexOf(it)}">
        <img src="${esc(it["image"])}" alt="${esc(it["name"])}" loading="lazy">
        <div class="body">
          <div class="tags"><span class="tag">${esc(it["style"])}</span><span class="tag gold">${esc(it["type"])}</span></div>
          <h3>${esc(it["name"])}</h3>
          <p class="why">${esc(it["why"])}</p>
        </div>
      </button>`
      )
      .join("");
    $("empty").hidden = list.length > 0;
    $("count").textContent = `${list.length} piece${list.length === 1 ? "" : "s"}`;
  }

  function open(it) {
    $("lb-img").src = it["image"];
    $("lb-img").alt = it["name"];
    $("lb-title").textContent = it["name"];
    $("lb-why").textContent = it["why"];
    $("lb-detail").textContent = it["details"] || "—";
    $("lb-tags").innerHTML = `<span class="tag">${esc(it["style"])}</span> <span class="tag gold">${esc(it["type"])}</span>`;
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
      items = parseCSV(t).filter((it) => it["image"] || it["name"]);
      buildChips($("f-style"), "style", STYLE_ORDER);
      buildChips($("f-type"), "type", TYPE_ORDER);
      render();
    })
    .catch(() => {
      $("wall").innerHTML = "";
      $("empty").hidden = false;
      $("empty").textContent = "Couldn't load data/styles.csv. If you opened the file directly on your computer, view it on GitHub Pages or through a local server instead.";
    });
})();
