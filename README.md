# 喃喃玉语 · Whispers of Jade

我的翡翠与和田玉个人网站：喜欢的款式、玉石知识、雕刻寓意、种水小测验、购买检查清单。
纯静态网页（HTML + CSS + JS），不需要安装任何东西，直接用 GitHub Pages 发布。

网址（开启 Pages 后）：**https://startnow2023.github.io/my-website/**

---

## 一、怎么添加新款式（最常用）

只需要两步，全部可以在 GitHub 网页上完成：

**第 1 步：上传图片**

1. 打开仓库里的 `images/styles/` 文件夹
2. 点右上角 **Add file → Upload files**，把图片拖进去
3. 文件名建议用英文或数字，不要有空格，例如 `bangle-2026-01.jpg`
4. 点 **Commit changes** 保存

> 小建议：图片宽度 1000 像素左右就够了，太大的图片会让网页变慢。jpg、png、webp 都可以。

**第 2 步：在表格里加一行**

1. 打开 `data/styles.csv`，点右上角的 ✏️ 铅笔图标编辑
2. 在最后加一行，按这个顺序填 6 项，用英文逗号 `,` 隔开：

```
图片,名称,款式,种类,我喜欢它哪里,详细说明
images/styles/bangle-2026-01.jpg,糯冰飘花手镯,手镯,翡翠,颜色很淡很温柔,圈口 55mm，贵妃镯型
```

3. 点 **Commit changes** 保存，等 1～2 分钟刷新网站就能看到

**填写注意：**

- **款式**：写 手镯 / 吊坠 / 戒指 / 耳饰 / 手串 / 把件 之一；写别的新词（如"胸针"）也可以，网站会自动多出一个筛选按钮
- **种类**：写 翡翠 或 和田玉
- 如果某一格的文字里**需要用英文逗号或换行**，就把这一整格用英文双引号 `"…"` 包起来。中文逗号"，"随便用，不需要包
- 想删除示例：直接删掉对应的行，再删掉 `images/styles/` 里对应的占位图即可

## 二、怎么开启 GitHub Pages（只需做一次）

1. 先把这个分支的改动合并到 `main` 分支（在 GitHub 上打开 Pull Request 并点 **Merge**）
2. 进入仓库页面 → 顶部 **Settings**（设置）
3. 左侧菜单点 **Pages**
4. 在 **Build and deployment** 下：
   - Source 选 **Deploy from a branch**
   - Branch 选 **main**，文件夹选 **/ (root)**，点 **Save**
5. 等 1～3 分钟，页面顶部会显示网址：
   **https://startnow2023.github.io/my-website/**

> 仓库需要是 Public（公开）才能免费使用 Pages。

## 三、其他内容在哪里改

| 想改什么 | 改哪个文件 |
| --- | --- |
| 喜欢的款式 | `data/styles.csv` + `images/styles/` |
| 行话速查词条 | `js/knowledge.js` 顶部的列表 |
| 知识正文（种水色、籽料山料、保养等） | `knowledge.html` |
| 雕刻题材卡片 | `js/carving.js` 顶部的列表 |
| 小测验题目 | `js/quiz.js` 顶部的 `QUESTIONS` |
| 购买检查清单 | `js/checklist.js` 顶部的 `GROUPS` |
| 颜色、字体等样式 | `css/style.css` 最上面的 `:root` |
| 解剖学习路线（8 个阶段） | `js/anatomy-roadmap.js` 顶部的 `STAGES` |
| 方位术语说明、术语小测验 | `js/anatomy-terms.js` 顶部的 `TERMS`、`QUESTIONS` |
| 骨骼说明、"摸一摸"清单 | `js/anatomy-bones.js` 顶部的 `BONES`、`LANDMARKS` |

## 四、解剖学习栏目

入口是 `anatomy.html`（学习路线），按《系统解剖学》的顺序分 8 个阶段，每个阶段一个页面、配一个小测验：

| 阶段 | 页面 |
| --- | --- |
| 0 方位术语 | `anatomy-terms.html` |
| 1 骨骼 | `anatomy-bones.html` |
| 2～7 关节、肌肉、内脏、脉管、感觉器、神经 | 还没做 |

**以后加新阶段**：照着 `anatomy-bones.html` 复制一个新页面，然后在 `js/anatomy-roadmap.js` 里给对应阶段填上 `href`，路线页就会出现"开始学习"按钮。

**关于版权**：栏目里的骨骼图、人形图都是用代码自己画的简化示意图，文字是自己整理的笔记。以后要加图，只用自己画的，或者 OpenStax、Wikimedia Commons 上注明可以使用的图，并在图下写上出处；不要直接用教材、图谱或其他网站的图。

## 五、在自己电脑上预览（可选）

直接双击打开 html 文件时，"我喜欢的款式"读不到表格（浏览器的安全限制）。可以在文件夹里运行：

```
python3 -m http.server
```

然后浏览器打开 http://localhost:8000 。不预览也没关系，推到 GitHub 上看就行。
