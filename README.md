# Sqyl 的个人站

零依赖静态站，无需构建：`index.html` + `style.css` + `main.js`。

## 本地预览

```bash
cd personal-site
python3 -m http.server 4173
# 浏览器打开 http://127.0.0.1:4173
```

## 页面结构

| 锚点 | 板块 | 内容 |
| --- | --- | --- |
| `#education` | 学习经历 | 澳门大学硕士 / 河北工业大学本科 / 日语辅修 · IELTS 7.0 / JLPT N2 |
| `#career` | 工作经历 | 1 段正式工作 + 2 段实习 |
| `#projects` | 项目介绍 | bilivideo-push（开源）/ A股量化 / 随食拍（硕士毕设）/ 上低音号分镜 / WarOfTank / SD1.5 / Minecraft 私服 / YunDays |
| `#beyond` | 工作之外 | 动漫社 / 研究生会 / 吃吃喝喝 / 游戏 / 音乐 |

## 编辑指南

- 文字内容都在 `index.html`，按 `<!-- 01 学习经历 -->` 注释定位区块；
- 虚线下划线（`class="tbd"`）= 待补充信息，填好正文后删掉该 class 即恢复正常样式；
- 条目标题与卡片均可点击展开：标题展开文字详情，卡片展开「图片 + 描述」；
- 放图：图片丢进 `images/` 目录，把展开区里的 `<div class="media-ph">…</div>` 整块换成
  `<img src="images/文件名.jpg" alt="说明">` 即可；
- 放音频：文件放 `audio/` 目录，用 `<audio controls preload="none" src="audio/文件名.mp3">` 嵌入；
- 颜色 / 间距变量集中在 `style.css` 顶部的 `:root`，改主题一处生效。

## 部署（GitHub Pages，零成本）

```bash
git init && git add -A && git commit -m "init personal site"
gh repo create sqyl.github.io --public --source=. --push
# 用户名同名仓库自动启用 Pages，之后直接访问 https://sqyl.github.io
```
