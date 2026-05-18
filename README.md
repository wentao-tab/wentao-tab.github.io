# 文涛奇物录 · Wentao's Folio of Curiosities

这是一个可直接部署到 GitHub Pages 的静态个人网站包。

## 文件说明

- `index.html`：网站入口，已内联 CSS 与少量 JS，无构建步骤。
- `404.html`：GitHub Pages 兜底页，内容与首页一致，避免直接访问路径时空白。
- `.nojekyll`：关闭 Jekyll 处理，确保静态文件按原样发布。

## 部署到 GitHub Pages

1. 新建一个 GitHub 仓库，例如 `wentao-folio`。
2. 将本压缩包解压后的所有文件放到仓库根目录。
3. 提交并推送到 GitHub。
4. 打开仓库 `Settings` → `Pages`。
5. `Build and deployment` 选择：
   - Source: `Deploy from a branch`
   - Branch: `main` / `/root`
6. 保存后等待 GitHub Pages 构建完成。

也可以直接用 VS Code 或 GitHub 网页端上传：确保 `index.html` 位于仓库根目录，不要多套一层文件夹。

## 本地预览

直接双击 `index.html` 可以预览；更推荐在目录中运行：

```bash
python3 -m http.server 8000
```

然后打开：

```text
http://127.0.0.1:8000/
```

## 兼容性说明

- 纯静态 HTML/CSS/JS，不依赖 npm、Vite、React 或外部 CDN。
- 适配桌面端与移动端。
- 所有站内锚点跳转已验证。
