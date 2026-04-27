# Rachel Lee — Portfolio

> Senior UI/UX Product Designer based in Taiwan 🇹🇼
> 專注於 AI Agent 平台、SaaS 產品設計與視覺規劃。

[🌐 Live Demo](https://epeilee.github.io/nomad-design/) · [✉️ Contact](mailto:epeilee@gmail.com)

---

## About this project

這是我整合舊版 [Nomadesign](https://github.com/epeilee/Nomadesign) 與 Webflow 版 [nomad-design.webflow.io](https://nomad-design.webflow.io/) 之後重新製作的個人作品集網站。

**目標：**
- ✅ 完整響應式（手機 / 平板 / 桌機）
- ✅ UI/UX 作品案例展示（含分類 Filter）
- ✅ AI Agent 相關經驗專區
- ✅ 清楚的聯絡 CTA（求職 / 接案）
- ✅ 純 HTML / CSS / JS，易維護、易部署

---

## Tech Stack

| 項目 | 技術 |
| --- | --- |
| HTML | Semantic HTML5 |
| CSS | Vanilla CSS + CSS Variables + Flex/Grid |
| JavaScript | Vanilla JS (ES6+) — no framework |
| Fonts | **Orpheus Pro**（自架 .ttf）+ Lato + Noto Sans TC |
| 部署 | GitHub Pages（靜態站） |

**不依賴任何框架**，整個網站下載即可直接用瀏覽器開啟，也可以一鍵部署到 GitHub Pages / Vercel / Netlify。

---

## Project Structure

```
nomad-design/
├── index.html              # 首頁（Hero / About / Works / AI / Contact）
├── css/
│   └── style.css           # 主樣式（含 1024px / 768px / 480px 響應式斷點）
├── js/
│   └── script.js           # Nav / 篩選 / Reveal 動畫 / 滑順捲動
├── img/                    # 作品縮圖資料夾（自行放置實際圖片）
├── works/                  # 作品詳細頁（Case Study）
│   └── case-upgpt.html     # UpGPT Case Study 範本
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Pages 自動部署
└── README.md
```

---

## 🚀 如何部署到 GitHub Pages

### 方法一：最簡單（不寫 YAML）

1. 在 GitHub 建立一個新的 repository，命名為 `nomad-design`（或任何你想要的名字）
2. 把這個資料夾的所有內容 push 上去：

```bash
# 在這個資料夾內
git init
git add .
git commit -m "feat: initial portfolio"
git branch -M main
git remote add origin https://github.com/epeilee/nomad-design.git
git push -u origin main
```

3. 打開 GitHub repo → **Settings** → **Pages**
4. **Source** 選 `Deploy from a branch`
5. **Branch** 選 `main`，資料夾選 `/ (root)`，按 **Save**
6. 等 1–2 分鐘，你的網站就會在 `https://epeilee.github.io/nomad-design/` 上線 ✨

### 方法二：用 GitHub Actions 自動部署（已含 `.github/workflows/deploy.yml`）

只要 push 到 `main`，Action 會自動幫你部署。打開 repo → **Settings** → **Pages** → Source 改選 **GitHub Actions** 即可。

### 想用自訂網域？

1. 在 repo 根目錄新增 `CNAME` 檔，內容只寫一行：`yourdomain.com`
2. 在你的 DNS 服務商設 CNAME 指向 `epeilee.github.io`
3. 回 GitHub Pages 設定頁填入自訂網域，打勾 Enforce HTTPS

---

## 🖼️ 如何替換作品集內容

### 1. 換文案

打開 `index.html`，所有文字都直接寫在 HTML 裡，用編輯器 Ctrl+F 搜尋要改的字即可。

### 2. 換作品縮圖

目前作品卡片用 CSS 漸層當縮圖占位。要換成真實圖片：

1. 把圖片放到 `img/` 資料夾（建議尺寸 1200×900，JPG/WebP）
2. 打開 `index.html`，找到對應的 `<div class="work-card__media" style="background:...">`
3. 把 `style="background: linear-gradient(...)"` 改成：

   ```html
   <div class="work-card__media" style="background-image: url('img/your-image.jpg'); background-size: cover; background-position: center;">
   ```

### 3. 新增 / 修改作品

複製 `works/case-upgpt.html` 另存成 `works/case-xxx.html`，照著區塊改文案即可。
首頁作品卡片的 `href` 也要記得改到新的檔名。

### 4. 調整配色

打開 `css/style.css` 最上面的 `:root`，改這幾個變數就能改全站色：

```css
:root {
  --accent: #04cbc3;        /* 主色（藍綠） */
  --accent-dark: #03a8a1;   /* Hover 用深色 */
  --ink: #0a0a0a;           /* 黑色（按鈕、主文字） */
  --bg: #ffffff;            /* 底色 */
}
```

---

## 📱 Responsive Breakpoints

| 裝置 | 斷點 | 主要調整 |
| --- | --- | --- |
| Desktop | > 1024px | 3 欄作品 / 側邊 sticky about |
| Tablet | ≤ 1024px | 2 欄作品 / 堆疊式版型 |
| Mobile | ≤ 768px | 1 欄 / Hamburger menu / 大字體縮小 |
| Small | ≤ 480px | 進一步壓縮 padding、字級 |

---

## ✅ Checklist

- [x] Semantic HTML with proper heading hierarchy
- [x] Mobile-first responsive（新 Webflow 版的主要改進點）
- [x] Google Fonts 預連線 (preconnect)
- [x] Open Graph meta tags（分享預覽）
- [x] `prefers-reduced-motion` 支援
- [x] Keyboard & screen reader friendly nav
- [x] SVG favicon（不需要額外檔案）
- [x] Lazy-ready structure（加上 `loading="lazy"` 到 img 即可）

---

## 📮 Contact

- **Email**：epeilee@gmail.com
- **GitHub**：[@epeilee](https://github.com/epeilee)
- **Location**：Taiwan

---

© 2026 Rachel Lee. Designed & Coded with ❤️ in Taiwan.
