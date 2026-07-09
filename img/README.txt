Place your work thumbnail images here.

建議規格：
- 尺寸：1200 x 900 px (4:3)
- 格式：WebP 或 JPG（檔案小、載入快）
- 命名：work-01-upgpt.webp、work-02-website.webp ...
- 屬於特定專案的圖片，建議放進對應子資料夾（如 img/aiagent/、img/erp/）

要把縮圖顯示到首頁作品卡：
打開 index.html，找到對應的 <div class="project__media"><img src="..." /></div>
把 src 換成新圖片路徑即可，例如：
<div class="project__media"><img src="img/work-01-upgpt.webp" alt="..." loading="lazy" /></div>

若需要批次處理圖片，可用線上工具：squoosh.app / tinypng.com
