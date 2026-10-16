# Lingfei Zhu — Portfolio

一个可直接部署到 GitHub Pages 的个人网站。内容以 Lingfei Zhu 的简历为主，包含教育、实习经历、项目、技能、联系方式和预留的摄影作品区。视觉灵感来自高性能运动网站的编辑感、速度感和酸性色彩，但版式、内容与图形均为原创。

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

## 内容更新

- `index.html`：个人简介、教育、经历、项目、技能、邮箱和 LinkedIn 外链。
- `ZHU_LINGFEI_Resume.pdf`：网站提供下载的无电话号码版简历。
- 主页摄影区作为入口链接到独立的 `photography.html`；摄影页保留可持续扩展、按主色排序的作品占位框。
- 如需自定义域名，在仓库根目录添加 `CNAME` 文件，内容为你的域名。

网站不依赖构建工具，适合 GitHub Pages；字体通过 Google Fonts 加载，无法联网时会自动使用系统字体。

更详细的内容更新、摄影作品添加、照片主色色带和 Featured Project 交互维护方式，请查看 [`MAINTENANCE.md`](MAINTENANCE.md)。
