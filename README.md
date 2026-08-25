# Nomad Design — Rachel Lee Portfolio

> Senior UI/UX Product Designer based in Taiwan 🇹🇼
> 專注於 AI Agent 平台、SaaS 產品設計與視覺規劃。

[🌐 Live Demo](https://epeilee.github.io/nomadesign-ai/) · [✉️ Contact](mailto:epeilee@gmail.com) · [💻 Repo](https://github.com/epeilee/nomadesign-ai)

---

## About this project

個人作品集網站「Nomad Design」，展示 AI Agent 平台（UpGPT / UpAgent）、Web / Mobile UI、視覺設計等作品案例，並附中英文履歷頁與設計系統文件。

> ⚠️ **此網站設定為不被搜尋引擎索引**（`robots.txt` + 全站 `<meta name="robots" content="noindex, nofollow" />`），僅供求職 / 接案時分享連結使用，請勿另外調整這項設定。

**特色：**
- ✅ 完整響應式（手機 / 平板 / 桌機）
- ✅ 依「AI Agent / Web UI / Mobile UI / Web / Visual」分類的作品展示，含 Bento Gallery + Lightbox 大圖檢視
- ✅ 中 / 英文履歷頁
- ✅ 內附設計系統（Design Tokens、色彩、字體、間距、動態等）說明頁
- ✅ 純 HTML / CSS / JS，無框架、易維護、易部署

---

## Tech Stack

| 項目 | 技術 |
| --- | --- |
| HTML | Semantic HTML5，36 個獨立頁面 |
| CSS | Vanilla CSS + CSS Variables + Flex/Grid（`css/style.css`） |
| JavaScript | Vanilla JS（ES6+）— 無框架（`js/script.js`、`js/hero-blend.js`） |
| Fonts | **Orpheus Pro**（自架 .woff2/.ttf）+ Lato + Noto Sans TC（Google Fonts） |
| 部署 | GitHub Pages，透過 GitHub Actions 自動部署（push 到 `main` 即觸發） |
| Analytics | Google Analytics（gtag.js） |

---

## Project Structure

```
nomadesign-ai/
├── index.html                          # 首頁（Hero / About / 精選作品 / Contact）
├── me.html                             # 自我介紹，連結到中英文履歷
├── resume.html / enresume.html         # 中文 / 英文履歷
├── portfolio.html                      # 作品總覽（AI Agent 分類）
├── portfolio-*.html                    # 各分類 / 各案例詳細頁
│   ├── portfolio-sonar.html            #   Web UI
│   ├── portfolio-erp.html              #   Mobile UI
│   ├── portfolio-cmc.html 等           #   Web
│   ├── portfolio-visual-design.html    #   Visual（Bento Gallery + Lightbox）
│   └── portfolio-design-system-*.html  #   Design System 子頁（tokens / colors / typography / spacing / border / elevation / motion / zindex / theme / impact / products / aiagent）
├── design-system.html                  # Design System 總覽頁
├── css/style.css                       # 主樣式（含響應式斷點與 :root 色彩變數）
├── js/
│   ├── script.js                       # Nav / 篩選 / Reveal 動畫 / Lightbox
│   └── hero-blend.js                   # 首頁 Hero 動態效果
├── img/                                # 依專案分資料夾（aiagent / visual / erp / logo-proposals ... 等）
├── video/                              # 作品 Demo 影片
├── fonts/                              # Orpheus Pro 字體檔
├── robots.txt                          # 禁止搜尋引擎索引全站
├── .github/workflows/deploy.yml        # GitHub Pages 自動部署
└── README.md
```

---

## 🚀 部署

Repo 已內建 `.github/workflows/deploy.yml`：push 到 `main` 分支會自動建置並部署到 GitHub Pages，網址為 `https://epeilee.github.io/nomadesign-ai/`。

首次設定（僅需一次）：
1. 開 repo → **Settings** → **Pages**
2. **Source** 選 **GitHub Actions**
3. 之後每次 `git push` 到 `main`，Actions 會自動部署，1–2 分鐘後線上生效

本地預覽（不需要 npx，避免路徑含空格報錯）：

```bash
python -m http.server 3000 --directory "."
# 開瀏覽器: http://localhost:3000
```

---

## 🖼️ 如何替換作品集內容

### 1. 換文案
直接打開對應的 `.html`，用編輯器 Ctrl+F 搜尋文字修改即可，所有文案都寫在 HTML 裡。

### 2. 換作品圖片
把新圖放到 `img/<專案資料夾>/`，回到對應頁面把 `<img src="img/...">` 的路徑改成新檔名。Visual 分類（`portfolio-visual-design.html`）用的是 Bento Gallery，卡片背景（黑/白）由 `data-bg="dark"` / `data-bg="light"` 屬性控制，對應樣式在 `css/style.css` 的 `.bento-gallery__card[data-bg="..."]` 區塊。

### 3. 新增作品頁
複製一個現有的 `portfolio-*.html` 另存新檔名，改內容後，記得到 `index.html` 首頁卡片與 `nav__sub` 選單補上連結。

### 4. 調整配色
打開 `css/style.css` 最上面的 `:root`，改這幾個變數即可調整全站色彩：

```css
:root {
  --accent: #04cbc3;        /* 品牌主色（藍綠） */
  --accent-dark: #03a8a1;   /* Hover 深色 */
  --text-main: #333;        /* 主文字色 */
  --text-second: #666;      /* 次要文字色 */
  --bg-bk: #000000;         /* 黑底 */
}
```

---

## 📱 Responsive Breakpoints

| 裝置 | 斷點 |
| --- | --- |
| Desktop | > 1024px |
| Tablet | ≤ 1024px |
| Mobile | ≤ 768px |
| Small | ≤ 480px |

---

## 🔒 隱私設定

- `robots.txt`：`Disallow: /`，禁止所有搜尋引擎爬取
- 每個 `.html` 頁面 `<head>` 都有 `<meta name="robots" content="noindex, nofollow" />`
- 新增頁面時記得補上這兩個設定，維持不被索引的狀態

---

## 📮 Contact

- **Email**：epeilee@gmail.com
- **GitHub**：[@epeilee](https://github.com/epeilee)
- **Location**：Taiwan

---

© 2026 Rachel Lee. Designed & Coded with ❤️ in Taiwan.
