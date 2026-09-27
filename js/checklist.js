// 购买检查清单：想加新条目，照格式在对应分组里加一行 ["标题", "小提示"]
const GROUPS = [
  { icon: "👀", title: "先看整体 · First look", items: [
    ["看光泽", "在自然光下看表面：翡翠好料是清亮的玻璃光泽，和田玉是柔和的油脂光泽。光泽发\"塑料感\"、蜡感太重要警惕。"],
    ["看颜色是否自然", "颜色要有过渡、有色根，不能像浮在表面；在不同光源下（店里灯光、自然光、手机手电）都看一看，店里的射灯会让颜色显得更好。"],
    ["看底子/质地", "底子是否干净，有没有明显的棉、黑点、癣、石花；和田玉看是否细腻、油润，有没有僵、水线。"],
  ]},
  { icon: "🔦", title: "打光细看 · Flashlight check", items: [
    ["打光看水头", "用手电从背面或侧面贴着照，看光能透进多深、光晕是否明亮均匀。"],
    ["查裂纹（重点）", "多角度打光，看光线是否在某处\"断开\"；再侧着看表面反光有没有断线；用指甲轻轻划过可疑处。手镯要转一整圈仔细查。"],
    ["分清\"纹\"和\"裂\"", "纹：摸不到、反光连续、光能穿过，一般无碍。裂：反光断开、光被截断，会影响价值和耐用。拿不准就问店员并请对方书面说明。"],
    ["看结构和颗粒", "打光观察颗粒粗细、有没有苍蝇翅；翡翠表面若有细密的网状纹路（酸蚀纹），要警惕 B 货。"],
  ]},
  { icon: "✋", title: "上手试试 · Try it on", items: [
    ["试戴", "手镯要试圈口，戴进去后留约一指宽的余量比较舒服；吊坠看大小比例是否合适；戒指注意镶嵌是否牢固、戒圈能否调整。"],
    ["检查雕工和抛光", "线条是否流畅、开脸（人物/佛像的脸）是否端正自然、抛光是否到位、边角有无崩口。"],
    ["检查镶嵌", "金属是否有印记（如 Au750 表示 18K 金），爪子是否扣紧，背面是否留有看石头的空间。"],
  ]},
  { icon: "📄", title: "问清楚 · Ask", items: [
    ["看证书", "要有权威机构证书（如国检 NGTC 或省级质检站）。翡翠应写\"翡翠\"或\"翡翠（天然）\"，写\"翡翠（处理）\"就是 B/C 货；和田玉证书写\"和田玉\"只说明是透闪石，不代表产地。"],
    ["核对证书与实物", "对比证书上的照片、重量、尺寸是否和实物一致，回家后可在机构官网用编号查询真伪。"],
    ["问产地和料子", "和田玉问清是新疆、青海、俄料还是韩料，是籽料还是山料；翡翠问种水等级。请店员把口头说法写在收据上。"],
    ["问退换政策", "几天内可退换？是否支持无理由退货？退货是否扣费？最好写在票据上。"],
    ["索要正规票据", "要发票或正规收据，写明品名、材质、重量、价格和店名。"],
  ]},
  { icon: "🧘", title: "买前冷静 · Before paying", items: [
    ["价格心里有数", "事先在几家店、线上比过价格；太便宜的\"高货\"基本不存在，谨防\"捡漏\"心理。"],
    ["确认自己真的喜欢", "离开柜台想一想：还会想着它吗？它适合我的日常穿搭吗？"],
    ["拍照留档", "拍下实物、证书、票据，方便以后保养、维权或保险。"],
  ]},
];

(function () {
  const KEY = "jade-checklist-v1";
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
    document.getElementById("done").textContent = n === boxes.length ? `全部完成 ✓ ${n}/${boxes.length}` : `已完成 ${n}/${boxes.length}`;
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
