# 文涛奇物录 · 内容文件可维护版

这是 GitHub Pages 可直接部署的静态个人网站版本。它已经从单个 `index.html` 升级为“样式 / 逻辑 / 内容”分离结构，后续日常更新主要改 `content/` 目录里的 JSON 文件，不需要反复修改复杂 HTML。

## 目录结构

```text
index.html              # 网站入口，放在 GitHub 仓库根目录
404.html                # GitHub Pages 兜底页
.nojekyll               # 禁用 Jekyll，确保静态文件原样发布
README.md               # 维护说明
css/
  style.css             # 全站视觉样式和响应式规则
js/
  main.js               # 读取 content/*.json 并渲染页面
content/
  site.json             # 网站名称、首页文案、SEO、页脚
  nav.json              # 顶部导航目录
  rooms.json            # 三个主栏目 / 柜门 / 详细分区
  entries.json          # 随笔、文章、编目列表
  stats.json            # 统计数字和信息柜
  contact.json          # 邮箱、社交链接、底部联系方式
assets/
  images/               # 以后新增图片放这里，目前可为空
```

---

## 最常改哪里？

### 1. 网站名称在哪里改？

改：`content/site.json`

常用字段：

```json
{
  "title": "文涛奇物录 · Wentao's Folio of Curiosities",
  "siteTitle": "文涛奇物录 · Wentao's Folio of Curiosities",
  "sealLines": ["文涛", "奇物录"],
  "description": "文涛奇物录：把工具、影像与作品放进同一个个人档案柜。"
}
```

字段说明：

- `title`：浏览器标签页标题。
- `siteTitle`：页面主标题。
- `sealLines`：左上角印章里的中文站名。
- `description`：搜索引擎和分享摘要。
- `heroTitle`：首页大标题，换行用 `\n`。
- `heroDeck`：首页大标题下面的说明文字。
- `footer.lastUpdate`：底部最后更新时间。

---

### 2. 顶部目录在哪里改？

改：`content/nav.json`

示例：

```json
[
  { "label": "首页 HOME", "href": "#home" },
  { "label": "关于 ABOUT", "href": "#about" },
  { "label": "档案 ARCHIVE", "href": "#archive" },
  { "label": "随笔 NOTES", "href": "#notes" },
  { "label": "联系 CONTACT", "href": "#contact" }
]
```

注意：

- `href` 必须对应页面里真实存在的 `id`。
- 目前稳定可用的锚点包括：
  - `#home`
  - `#about`
  - `#archive`
  - `#tool-arsenal`
  - `#motion-log`
  - `#curio-box`
  - `#notes`
  - `#contact`

如果新增导航，比如：

```json
{ "label": "项目 PROJECTS", "href": "#projects" }
```

就还需要在页面结构里新增 `id="projects"` 的区域；如果只是日常维护，建议先不要新增结构，先改已有栏目内容。

---

### 3. 三个主栏目在哪里改？

改：`content/rooms.json`

每个栏目对应一个“柜门”和一个详细内容区。

常用字段：

```json
{
  "id": "tool-arsenal",
  "plate": "PL. I",
  "roman": "I",
  "title": "工具库",
  "titleEn": "TOOL ARSENAL",
  "summary": "记录长期使用与持续关注的工具、软件、硬件与方法论。",
  "detailTitle": "工具库 · 把长期使用的工具变成索引",
  "detailSummary": "这里用于收藏软件、硬件、自动化脚本、AI 工作流和方法论。"
}
```

字段说明：

- `id`：跳转锚点，改它会影响链接，谨慎修改。
- `title`：中文栏目名。
- `titleEn`：英文栏目名。
- `summary`：首页卡片上的短说明。
- `detailTitle`：详细区标题。
- `detailSummary`：详细区说明。
- `specs`：详细区下面的三个小内容块。
- `links`：该详细区底部按钮。

---

### 4. 文章 / 随笔 / 编目列表在哪里新增？

改：`content/entries.json`

示例：

```json
{
  "number": "06",
  "title": "新文章标题",
  "category": "随笔 / NOTES",
  "date": "2026.05.20"
}
```

新增文章时，把新对象加到数组里即可：

```json
[
  {
    "number": "01",
    "title": "我如何整理灵感：从混乱到可检索",
    "category": "方法论 / METHOD",
    "date": "2026.05.18"
  },
  {
    "number": "02",
    "title": "新的文章标题",
    "category": "工具 / TOOLS",
    "date": "2026.05.20"
  }
]
```

注意 JSON 规则：

- 使用英文双引号 `"`。
- 每一项之间用英文逗号 `,`。
- 最后一项后面不要多写逗号。
- 不能写注释。

---

### 5. 统计数字在哪里改？

改：`content/stats.json`

例如：

```json
{
  "label": "归档条目",
  "labelEn": "ITEMS ARCHIVED",
  "value": "317"
}
```

把 `value` 改成新的数字即可。

---

### 6. 邮箱和社交链接在哪里改？

改：`content/contact.json`

常用字段：

```json
{
  "email": "hello@example.com",
  "social": [
    { "label": "Home", "href": "#home" },
    { "label": "Archive", "href": "#archive" },
    { "label": "Notes", "href": "#notes" }
  ]
}
```

如果要改邮箱：

```json
"email": "yourname@example.com"
```

如果要加 GitHub：

```json
{ "label": "GitHub", "href": "https://github.com/你的用户名" }
```

---

### 7. 样式在哪里改？

改：`css/style.css`

这里控制：

- 字体；
- 黑白线框风格；
- 首页布局；
- 移动端适配；
- 卡片、目录、按钮、页脚样式。

如果只是日常更新内容，通常不要改 `css/style.css`。

---

## 本地预览

因为网站通过 `fetch('./content/*.json')` 读取内容，直接双击 `index.html` 可能会被浏览器的 `file://` 安全限制拦截。

请用本地服务器预览。

在项目根目录运行：

```bash
python3 -m http.server 8000
```

然后打开：

```text
http://127.0.0.1:8000/
```

如果你用 VS Code，也可以使用 Live Server 插件。

---

## 部署到 GitHub Pages

1. 新建或打开 GitHub 仓库。
2. 把本包里的所有文件放到仓库根目录。
3. 确保 `index.html` 在根目录，不要多套一层文件夹。
4. Commit 并推送。
5. 进入 GitHub 仓库：`Settings` → `Pages`。
6. Source 选择：`Deploy from a branch`。
7. Branch 选择：`main` 和 `/root`。
8. 保存后等待 GitHub Pages 构建完成。

---

## 日常更新流程

推荐流程：

1. 在 GitHub 网页端打开对应 JSON 文件。
2. 点击右上角铅笔按钮编辑。
3. 修改内容。
4. 点击 `Commit changes`。
5. 等 GitHub Pages 自动更新。

常见需求对应文件：

| 需求 | 修改文件 |
|---|---|
| 改网站名字 | `content/site.json` |
| 改首页大标题 | `content/site.json` |
| 改顶部导航 | `content/nav.json` |
| 改三个主栏目 | `content/rooms.json` |
| 新增文章/随笔 | `content/entries.json` |
| 改统计数字 | `content/stats.json` |
| 改邮箱/社交链接 | `content/contact.json` |
| 改视觉样式 | `css/style.css` |

---

## 什么时候需要后台？

目前这个版本不需要后台。

如果以后你需要：

- 登录后台；
- 网页里直接发布文章；
- 上传图片；
- 多人协作；
- 草稿 / 审核；
- 搜索 / 评论 / 订阅；

再考虑 Decap CMS、Notion CMS 或真正后端系统。

当前阶段，用 `content/*.json` 维护最稳、最简单，也最适合 GitHub Pages。
