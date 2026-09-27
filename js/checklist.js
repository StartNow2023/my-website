// Shopping checklist — to add an item, add ["Title", "Tip"] to a group below.
const GROUPS = [
  { icon: "👀", title: "First look", items: [
    ["Check the luster", "Look at the surface in daylight: fine jadeite has a bright, glassy luster; Hetian jade has a soft, oily one. Be wary of a plastic-like or overly waxy shine."],
    ["Is the color natural?", "Color should shade gradually and have a root, not float on the surface. Look under different lights — shop lamp, daylight, your phone torch. Shop spotlights make color look better than it is."],
    ["Check the base / texture", "Is the base clean? Any obvious cotton, black specks, dark patches or stone flowers? For nephrite, is it fine and oily, with no stiff spots or water lines?"],
  ]},
  { icon: "🔦", title: "Flashlight check", items: [
    ["Shine a light for transparency", "Hold a flashlight against the back or side: how deep does the light go, and is the glow bright and even?"],
    ["Look for cracks (important!)", "Shine from several angles and see if the light \"stops\" somewhere; tilt the piece to see if the surface reflection breaks; run a fingernail over anything suspicious. Turn a bangle all the way round."],
    ["Tell lines from cracks", "Lines: can't be felt, reflection unbroken, light passes through — usually fine. Cracks: reflection breaks, light is cut off — they hurt value and durability. If unsure, ask the seller to explain in writing."],
    ["Look at structure and grain", "Check how coarse the grains are and whether you see fly wings. A fine web of lines on jadeite's surface (acid etching) is a warning sign of Type B."],
  ]},
  { icon: "✋", title: "Try it on", items: [
    ["Try it on", "For a bangle, check the size — about a finger's width of room once it's on is comfortable. For a pendant, check the proportions; for a ring, check the setting is secure and whether it can be resized."],
    ["Check carving and polish", "Are the lines smooth? Is the face of a figure well-proportioned and natural? Is the polish even, with no chipped edges?"],
    ["Check the setting", "Is the metal stamped (e.g. Au750 for 18k gold)? Are the prongs tight? Is the back open enough to see the stone?"],
  ]},
  { icon: "📄", title: "Ask", items: [
    ["Ask for the certificate", "It should come from an accredited lab (e.g. NGTC, GIA, or a provincial testing center). Jadeite should say \"jadeite\" or \"jadeite (natural)\" — \"jadeite (treated)\" means Type B/C. For nephrite, \"Hetian jade\" only means tremolite, not where it's from."],
    ["Match the certificate to the piece", "Compare the photo, weight and size on the certificate with the piece. At home, look up the number on the lab's website."],
    ["Ask about origin and material", "For nephrite: Xinjiang, Qinghai, Russian or Korean? Seed or mountain material? For jadeite: what texture grade? Ask for what the seller says to be written on the receipt."],
    ["Ask about returns", "How many days to return or exchange? No-questions-asked returns? Any fees? Get it written on the receipt."],
    ["Get a proper receipt", "An invoice or receipt with the item name, material, weight, price and shop name."],
  ]},
  { icon: "🧘", title: "Before paying", items: [
    ["Know the price range", "Compare prices at a few shops and online beforehand. A cheap \"top-grade\" piece basically doesn't exist — beware the bargain-hunting mindset."],
    ["Make sure I really love it", "Step away from the counter for a moment: am I still thinking about it? Does it suit what I wear every day?"],
    ["Take photos", "Photograph the piece, certificate and receipt — useful for care, disputes or insurance later."],
  ]},
];

(function () {
  const KEY = "jade-checklist-en-v1";
  const list = document.getElementById("list");
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) {}

  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  list.innerHTML = GROUPS.map((g, gi) => `
    <section class="card check-group">
      <h3>${g.icon} ${esc(g.title)}</h3>
      ${g.items.map(([t, tip], ii) => {
        const id = `c-${gi}-${ii}`;
        return `<label class="check-item" for="${id}">
          <input type="checkbox" id="${id}" data-k="${esc(t)}" ${saved[t] ? "checked" : ""}>
          <span class="box"></span>
          <span class="t"><b>${esc(t)}</b><small>${esc(tip)}</small></span>
        </label>`;
      }).join("")}
    </section>`).join("");

  const boxes = [...list.querySelectorAll("input")];
  function update() {
    const n = boxes.filter((b) => b.checked).length;
    document.getElementById("bar").style.width = `${(n / boxes.length) * 100}%`;
    document.getElementById("done").textContent = n === boxes.length ? `All done ✓ ${n}/${boxes.length}` : `${n} of ${boxes.length} done`;
  }
  list.addEventListener("change", (e) => {
    if (e.target.type !== "checkbox") return;
    if (e.target.checked) saved[e.target.dataset.k] = 1; else delete saved[e.target.dataset.k];
    try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (err) {}
    update();
  });
  document.getElementById("reset").onclick = () => {
    boxes.forEach((b) => (b.checked = false));
    saved = {};
    try { localStorage.removeItem(KEY); } catch (err) {}
    update();
  };
  update();
})();
