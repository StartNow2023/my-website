// Glossary — to add a term, copy a line and edit it.
// [term, pinyin, category (Jadeite / Hetian / Both), explanation, Chinese (used only for search)]
const TERMS = [
  ["Floating flowers", "piāo huā", "Jadeite", "Color (usually green or blue-green) drifting through jadeite in wisps, bands or clouds, like flowers floating in water. Icy jadeite with floating flowers is very popular — judge the color and shape of the flowers and how clean the base is.", "飘花"],
  ["Gel-like glow", "qǐ jiāo", "Jadeite", "Jadeite with good texture and water looks plump and soft on the surface, like jelly. This \"gel\" feel is a sign of a fine texture; bean-type jadeite normally doesn't have it.", "起胶"],
  ["Floating glow", "yíng guāng", "Jadeite", "When fine icy or glass-type jadeite is turned, a soft bluish-white sheen seems to float across the surface, like moonlight. This is not the same as UV fluorescence, which is sometimes used as a hint of resin treatment but proves nothing by itself.", "荧光 莹光"],
  ["Skin color", "pí sè", "Hetian", "Color on the outside of nephrite seed material, formed as iron and manganese minerals seep in over a long time — golden-speckled, jujube-red, autumn-pear or black skin. Real skin fades gradually into the jade; fake skin is dyed and looks like it sits on top. Jadeite rough also has a \"skin\".", "皮色"],
  ["Cotton", "mián", "Both", "White, fluffy or cloudy inclusions inside jade, like tufts of cotton. A lot of cotton reduces transparency and beauty; a little fine cotton is very common and is also a sign of a natural stone.", "棉"],
  ["Lines", "wén", "Both", "Also \"stone lines\": natural fractures that healed while the stone formed. You can't feel them, the surface reflection is unbroken, and light passes through. They usually don't matter — \"lines are harmless\".", "纹 石纹"],
  ["Crack", "liè", "Both", "An open fracture. Your fingernail may catch on it, the surface reflection breaks, and a flashlight beam stops at it. Cracks lower value and durability — a cracked bangle can snap. \"A crack is an injury.\"", "裂"],
  ["Fissure", "liǔ", "Hetian", "The nephrite trade's word for cracks, often said together as \"liu lie\". Check carefully, especially on bangles and bead bracelets.", "绺 绺裂"],
  ["Texture & water", "zhǒng shuǐ", "Jadeite", "\"Zhong\" is how fine and dense the structure is; \"shui\" is transparency. They're usually mentioned together, as in \"good zhong shui\". See the Texture section above.", "种水"],
  ["Water", "shuǐ tóu", "Jadeite", "Jadeite's transparency. Good water looks clear and alive; poor water looks \"dry\" or dull. Traditionally, light reaching 3 mm in is \"one-fen water\".", "水头"],
  ["Base", "dǐ zi / dì zhāng", "Jadeite", "Everything in jadeite except the color — the \"background\". A clean, fine, clear base makes color look beautiful.", "底子 地张"],
  ["Color root", "sè gēn", "Jadeite", "Natural green often has a darker, concentrated spot that fades outward, like a root. Dyed Type C jadeite usually has none.", "色根"],
  ["Fly wings", "cāng ying chì", "Jadeite", "Flashes of light from crystal cleavage surfaces, like the wings of a fly. A feature of natural jadeite (Type B can show it too, so it isn't proof), easier to see in coarse grains.", "苍蝇翅 翠性"],
  ["Spring with color", "chūn dài cǎi", "Jadeite", "\"Spring\" means lavender and \"color\" means green: a piece with both lavender and green, considered very auspicious.", "春带彩"],
  ["Fortune, prosperity & longevity", "fú lù shòu", "Jadeite", "A piece with three colors — usually green, lavender (or red) and yellow/white — wishing for all three blessings.", "福禄寿"],
  ["Full green", "mǎn lǜ", "Jadeite", "Green all over, with no white base. Full green that is pure, even and translucent is extremely precious.", "满绿"],
  ["Dark patches", "xuǎn", "Jadeite", "Black or dark-green patches and streaks in jadeite. There's a saying that \"green follows black\" — green sometimes sits next to them. They spoil the look.", "癣"],
  ["Stone flowers", "shí huā", "Both", "Harder, more solid white clumps or spots than cotton, seen in both jadeite and nephrite.", "石花"],
  ["Porcelain base", "cí dǐ", "Jadeite", "A base that is white and opaque like porcelain — a sign of poor texture and water.", "瓷底"],
  ["Luster", "guāng zé", "Both", "Fine jadeite has a glassy luster — bright and cool; nephrite has an oily luster. Type B jadeite often looks resinous, a bit like plastic.", "光泽 玻璃光泽 蜡状光泽"],
  ["Oiliness", "yóu xìng", "Hetian", "Nephrite that looks softly moist, as if coated with a thin film of oil — a key sign of good material. \"Mutton-fat\" describes the very best.", "油性 油润"],
  ["Mutton-fat white", "yáng zhī bái yù", "Hetian", "The top grade of white nephrite: very white, extremely fine and oily like congealed fat. True mutton-fat is very rare, and the name is often misused — check the certificate and the stone itself.", "羊脂白玉"],
  ["Water lines", "shuǐ xiàn", "Hetian", "More transparent lines or bands in the material, common in Qinghai jade, and seen as making the texture less even.", "水线"],
  ["Stiff spots", "jiāng", "Hetian", "Also \"stone brain\": white, opaque, coarse parts of the jade that look like ordinary rock.", "僵 石脑"],
  ["Infiltration color", "qìn sè", "Hetian", "Color from outside substances seeping into jade over a long time, common on antique and excavated pieces. Artificial \"aging\" exists too — be careful.", "沁色"],
  ["Sugar color", "táng sè", "Hetian", "Yellow-brown to red-brown areas in nephrite, from iron seeping in along cracks. A piece that is all sugar color is called sugar jade.", "糖色"],
  ["Black specks", "hēi diǎn", "Hetian", "Small black dots common in green nephrite (mostly chromite and similar minerals). The fewer the better.", "黑点"],
  ["Color-play carving", "qiào sè", "Both", "Using the different colors in one stone for different parts of a design — skin for a melon vine, green for a leaf. Done well, it greatly raises the value.", "俏色"],
  ["Flashlight test", "dǎ dēng", "Both", "Shining a small flashlight through jade from the back or side to check water, cracks and structure. Check cracks from several angles.", "打灯"],
  ["Bangle size", "quān kǒu", "Both", "The inner diameter of a bangle in millimeters. It just needs to pass over the widest part of your hand — try it on in the shop if you can.", "圈口"],
  ["Bangle shapes", "zhèng quān / guì fēi", "Both", "Round bangles are perfectly circular; \"imperial consort\" bangles are oval and follow the wrist; flat bangles are flat inside and round outside for comfort. There are also round-bar and square bangles.", "正圈 贵妃 扁口"],
  ["Cabochon", "dàn miàn", "Both", "A smooth, domed oval — the shape that best shows texture, water and color. Common in rings and pendants.", "蛋面"],
  ["Cut vs. rough gamble", "míng liào / dǔ shí", "Jadeite", "Cut material has been opened so you can see inside; \"gambling stones\" are uncut rough with skin, and you can only guess what's inside — very risky.", "明料 赌石"],
  ["Old mine / new mine", "lǎo kēng / xīn kēng", "Jadeite", "Today these describe quality rather than the mine's age: \"old mine\" means a dense, mature texture; \"new mine\" means a looser, younger texture.", "老坑 新坑"],
  ["Grayish / dull", "fàn huī / fā mèn", "Jadeite", "Color that isn't bright and has a gray cast, or poor transparency that makes a piece look lifeless.", "泛灰 发闷"],
];

(function () {
  const gl = document.getElementById("gl");
  const q = document.getElementById("q");
  const empty = document.getElementById("gl-empty");
  const filter = document.getElementById("g-filter");
  const LABEL = { Jadeite: "Jadeite", Hetian: "Hetian jade", Both: "Both" };
  let cat = "";

  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const hi = (s, k) => {
    const t = esc(s);
    if (!k) return t;
    const ek = esc(k).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return t.replace(new RegExp(ek, "gi"), (m) => `<mark>${m}</mark>`);
  };

  function render() {
    const k = q.value.trim();
    const kl = k.toLowerCase();
    const list = TERMS.filter(([n, py, c, d, zh]) =>
      (!cat || c === cat) && (!kl || [n, py, d, zh].join(" ").toLowerCase().includes(kl))
    );
    gl.innerHTML = list
      .map(([n, py, c, d]) => `
        <div class="card term">
          <h4>${hi(n, k)}<span class="py">${hi(py, k)}</span></h4>
          <span class="tag${c === "Hetian" ? " gold" : ""}">${LABEL[c]}</span>
          <p>${hi(d, k)}</p>
        </div>`)
      .join("");
    empty.hidden = list.length > 0;
  }

  q.addEventListener("input", render);
  filter.addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    cat = b.dataset.k;
    filter.querySelectorAll(".chip").forEach((x) => x.classList.toggle("on", x === b));
    render();
  });
  render();
})();
