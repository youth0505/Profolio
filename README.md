# Lingfei Zhu — Portfolio

一个可直接部署到 GitHub Pages 的单页作品集。视觉灵感来自高性能运动网站的编辑感、速度感和酸性色彩，但版式、内容与图形均为原创。

## 本地预览

```bash
python3 -m http.server 8080
```

浏览器访问 `http://localhost:8080`。

## 部署到 GitHub Pages

1. 在 GitHub 新建一个空仓库。
2. 把本目录的所有文件推送到仓库的 `main` 分支。
3. 打开仓库的 **Settings → Pages**。
4. 在 **Build and deployment** 中选择 **GitHub Actions**。
5. 等待 `Deploy static site to Pages` 工作流完成。

## 发布前修改

- `index.html`：姓名、简介、项目名称、联系邮箱和社交链接。
- 三个项目卡片目前链接到 GitHub 首页，请替换为你的真实项目地址。
- 如需自定义域名，在仓库根目录添加 `CNAME` 文件，内容为你的域名。

网站不依赖构建工具，适合 GitHub Pages；字体通过 Google Fonts 加载，无法联网时会自动使用系统字体。
