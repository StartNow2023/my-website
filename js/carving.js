// Carving motifs — to add one, copy an entry and edit it.
// { name, meaning: one-line wish, text: explanation, tip: optional }
const MOTIFS = [
  { name: "Safety Clasp", meaning: "Peace and safety · A life complete",
    text: "A round disc with a hole in the middle, descended from the ancient \"bi\" disc. The round outside stands for completeness and tolerance; the hole for \"leaving room\". The classic protective charm, suitable for anyone.",
    tip: "A plain safety clasp shows the material best — focus on texture, water and cracks." },
  { name: "Gourd", meaning: "Fortune and prosperity · Many descendants",
    text: "\"Hulu\" (gourd) sounds like \"fulu\" — fortune and rank. Its long vines and many seeds stand for a thriving family; traditionally it's also believed to absorb bad luck and protect the home.",
    tip: "Often carved with vines and leaves: \"fortune and prosperity for ten thousand generations\"." },
  { name: "Ruyi Scepter", meaning: "Everything as you wish",
    text: "The ruyi began as a back-scratcher — literally \"as you wish\" — and became an auspicious object with a head shaped like a lingzhi mushroom or a cloud. It wishes that everything goes your way.",
    tip: "Often combined with other motifs, as in \"safe and as you wish\"." },
  { name: "Pixiu", meaning: "Brings wealth · Wards off evil",
    text: "A mythical beast said to eat gold and silver and never let anything out, so it became a symbol for attracting and keeping wealth — and for driving away evil.",
    tip: "Folk custom says to wear it with the head facing outward. It's only custom — no need to be strict." },
  { name: "Guanyin", meaning: "Compassion · Protection",
    text: "The bodhisattva of compassion and wisdom; wearing Guanyin wishes for protection and a peaceful life. A folk saying goes \"men wear Guanyin, women wear Buddha\" — Guanyin for a calm temperament.",
    tip: "A religious motif: choose one with a well-proportioned, gentle face. No need to follow the gender saying." },
  { name: "Laughing Buddha", meaning: "Always smiling · A big-hearted spirit",
    text: "Maitreya, with his round belly and broad smile, stands for generosity, carefree happiness and plenty of blessings. In the saying \"women wear Buddha\", \"fo\" (Buddha) sounds like \"fu\" (blessing).",
    tip: "The face is the test of the carver's skill — the smile should look natural." },
  { name: "Bamboo", meaning: "Rising step by step · Integrity",
    text: "Bamboo grows taller joint by joint, wishing for steady progress in study and career. Hollow yet jointed, it also stands for humility and strength of character.",
    tip: "Bamboo bangles and pendants make lovely gifts for students and people starting a new job." },
  { name: "Leaf", meaning: "Success in your career",
    text: "\"Ye\" (leaf) sounds like \"ye\" (career, achievement), wishing for success. \"Yi ye\" (one leaf) also sounds like \"one night\", as in \"famous overnight\". And \"golden branches, jade leaves\" is a lovely image in itself.",
    tip: "A simple shape — perfect for pieces with floating flowers or a touch of green." },
  { name: "Melon", meaning: "Blessings · A long family line",
    text: "The melon stands for plentiful blessings. Its long vines and many seeds recall the old phrase \"melons and gourds in an endless line\" — a thriving, continuing family.",
    tip: "Nephrite seed material often uses its skin color for the melon vine — beautifully subtle." },
  { name: "Bean Pod", meaning: "Safety through all four seasons",
    text: "Green beans are called \"four-season beans\", so a pod wishes for safety and health all year round. The number of beans matters too: three for success in exams, four for the four seasons.",
    tip: "Round and cute — ideal as a small pendant." },
  { name: "Cicada", meaning: "Sudden success · Wealth at your waist",
    text: "Cicadas spend years underground before emerging to sing — a symbol of patient preparation followed by brilliant success. Worn at the waist, \"yao chan\" sounds like \"wealth wrapped around the waist\".",
    tip: "Han-dynasty jade cicadas carved with \"eight cuts\" make this one of the oldest motifs." },
  { name: "Fish", meaning: "Abundance every year",
    text: "\"Yu\" (fish) sounds like \"yu\" (surplus), wishing for abundance. A carp also recalls \"the carp leaping over the dragon gate\" — rising to great success.",
    tip: "A pair of fish often means a happy couple." },
  { name: "Chinese Cabbage", meaning: "Gathering wealth · A clean conscience",
    text: "\"Baicai\" (cabbage) sounds like \"a hundred fortunes\". Its clean white and green also stand for living honestly.",
    tip: "Often carved with a little insect, as in \"a hundred fortunes come together\"." },
  { name: "Peach", meaning: "Health and long life",
    text: "Legend says the peaches of the Queen Mother of the West grant immortality, so the peach became the symbol of long life — a good gift for elders.",
    tip: "Paired with bats, it means \"both blessings and longevity\"." },
  { name: "Dragon & Phoenix", meaning: "A happy marriage",
    text: "The dragon stands for power and strength, the phoenix for beauty and good fortune. Together they wish for a happy marriage — a classic wedding motif.",
    tip: "Dragon-and-phoenix plaques and bangles are popular wedding gifts." },
  { name: "Lotus", meaning: "Purity · Continuous abundance",
    text: "The lotus rises unstained from the mud, a symbol of purity. \"Lian\" (lotus) sounds like \"continuous\"; with a fish it means \"abundance year after year\". Its many seeds also wish for many children.",
    tip: "A common auspicious symbol in Buddhism." },
];

(function () {
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  document.getElementById("motifs").innerHTML = MOTIFS.map((m) => `
    <article class="card motif">
      <div class="glyph">${esc(m.name[0])}</div>
      <h3>${esc(m.name)}</h3>
      <div class="meaning">${esc(m.meaning)}</div>
      <p>${esc(m.text)}</p>
      ${m.tip ? `<div class="tip">💡 ${esc(m.tip)}</div>` : ""}
    </article>`).join("");
})();
