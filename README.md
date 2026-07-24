# Rose Lab 靜態網站｜維護與部署總指南

這是 Rose Lab 的正式 Astro 靜態網站專案。此次整理以三個原則為準：

1. **不修改既有文章文字。** `src/content/blog/` 內 5 篇文章維持原檔。
2. **不改變既有網站外觀。** 保留原有 HTML class、CSS 規則與載入順序；只把樣式分層、限定作用範圍並補上註解。
3. **同一份資料只維護一次。** 品牌資料、導覽、分類資料、文章查詢、文章範本與技術說明均已集中。

---

## 1. 第一次在電腦開啟

需要 Node.js 20 或 22。

```bash
npm ci
npm run dev
```

終端機會顯示本機預覽網址，通常是 `http://localhost:4321/`。

### 上線前完整檢查

```bash
npm run validate
npm run build
```

- `npm run validate`：檢查文章欄位與 Astro／TypeScript。
- `npm run build`：再次檢查文章，並輸出靜態網站到 `dist/`。

---

## 2. 最常修改的檔案

| 需求 | 只需要修改 |
|---|---|
| 網站名稱、網址、Email、社群、GA、Logo | `src/config/site.ts` |
| 桌機／手機導覽 | `src/config/site.ts` |
| 首頁四個分類入口 | `src/config/site.ts` |
| 分類說明與分類底色 | `src/config/site.ts` |
| 修改「寫超完整懶人包」標題 | `src/components/home/RoundupSection.astro` |
| 調整懶人包文章選擇與數量 | `src/pages/index.astro`、`src/content/blog/*.md` |
| 調整懶人包標題與卡片外觀 | `src/styles/pages/home.css` |
| 新增或更新文章 | `src/content/blog/*.md` |
| 新文章預設結構 | `ARTICLE_TEMPLATE.md` |
| 全站 CSS 載入順序 | `src/styles/global.css` |
| 單一頁面的外觀 | `src/styles/pages/` |
| Header／Footer 外觀 | `src/styles/layouts/header-footer.css` |

### 不要重複建立設定檔

以下資料都以 `src/config/site.ts` 為唯一來源：

- `SITE`：品牌、正式網址、語系、Email、社群、GA、Logo。
- `PRIMARY_NAV`：桌機導覽。
- `MOBILE_NAV`：手機導覽。
- `HOME_CATEGORIES`：首頁四個入口。
- `CATEGORY_META`：分類說明和顏色。

新增相同资料的第二份設定檔，之後容易出現桌機、手機、首頁互相不一致的情況。

---

## 3. 專案結構

```text
rose-lab-site/
├─ public/                       # 可直接公開的圖片、favicon、robots、manifest
├─ scripts/
│  ├─ check-content.mjs          # 文章資料檢查
│  └─ new-article.mjs            # 讀取唯一文章範本並建立新文章
├─ src/
│  ├─ components/
│  │  ├─ content/                # 文章卡片
│  │  ├─ home/                   # 首頁各區塊
│  │  └─ seo/                    # JSON-LD 輸出
│  ├─ config/
│  │  └─ site.ts                 # 全站唯一設定來源
│  ├─ content/
│  │  ├─ blog/                   # 文章 Markdown
│  │  └─ config.ts               # Frontmatter 欄位規則
│  ├─ layouts/                   # 全站與文章版型
│  ├─ pages/                     # Astro 路由頁面
│  ├─ styles/                    # 分層 CSS
│  └─ utils/
│     └─ content.ts              # 共用文章查詢、排序、網址與日期工具
├─ ARTICLE_TEMPLATE.md           # 唯一新文章範本
├─ astro.config.mjs              # Astro、正式網域、Sitemap、Redirect
├─ package.json
└─ README.md                     # 唯一技術與維護說明
```

---

## 4. 新增文章

### 方法 A：使用指令（建議）

```bash
npm run new:article -- starfall-reading-guide
```

指令會：

1. 讀取 `ARTICLE_TEMPLATE.md`。
2. 自動填入今天日期。
3. 自動把封面路徑改為 `/images/blog/starfall-reading-guide-cover.webp`。
4. 建立 `src/content/blog/starfall-reading-guide.md`。
5. 保持 `draft: true`，避免未完成内容被发布。

### 方法 B：手動複製

複製 `ARTICLE_TEMPLATE.md` 到 `src/content/blog/`，將檔名改為英文小寫 slug，例如：

```text
starfall-reading-guide.md
```

並把範本內的 `{{DATE}}`、`{{SLUG}}` 換成實際資料。

### 發布文章

完成後把：

```yaml
draft: true
```

改為：

```yaml
draft: false
```

---

## 5. 文章 Frontmatter

```yaml
---
title: "頁面主標題"
seoTitle: "可選：Google 搜尋結果標題"
description: "50～160 字的具體摘要"
draft: true
pubDate: 2026-07-23
updatedDate: 2026-07-23
author: "Rose Lab"
category: "線上外師課"
tags:
  - "幼兒英文"
  - "線上外師"
featured: false
popularRank: 1
series: "系列名稱"
seriesOrder: 1
cover: "/images/blog/example-cover.webp"
coverAlt: "具體描述圖片內容"
noindex: false
---
```

### 維護原則

- `title`：直接回答家長會搜尋的問題。
- `description`：不要只重複標題，要說明對象、問題與能得到的答案。
- `pubDate`：首次發布日期。
- `updatedDate`：內容實際更新時才更改。
- `category`：每篇一個主要分類。
- `tags`：補充品牌、工具、年齡或具體問題。
- `featured`／`popularRank`：控制首頁熱門文章排序。
- `coverAlt`：描述畫面，不要只寫「文章封面」。
- `noindex`：只有不希望搜尋引擎收錄時才設為 `true`。

執行 `npm run check:content` 可檢查日期、摘要、圖片路徑與必要欄位。

---

## 6. 圖片與檔案

文章封面放在：

```text
public/images/blog/
```

文章內引用方式：

```md
![具體圖片說明](/images/blog/example.webp)
```

### 建議規格

- 封面：1200 × 630 px 或相同比例。
- 格式：优先 WebP。
- 檔名：英文小寫、連字號分隔。
- 不要在檔名使用空格、中文、括號或版本號。
- 上傳前先壓縮，但不要犧牲文字可讀性。

---

## 7. 內部連結與分類網址

共用網址函式位於 `src/utils/content.ts`：

- `postPath(post)`
- `categoryPath(category)`
- `tagPath(tag)`
- `seriesPath(series)`

在 Astro 元件中應使用这些函数，避免各頁自行拼接網址。

Markdown 文章仍可使用一般站內連結：

```md
[延伸閱讀](/blog/article-slug/)
```

發布前確認目標頁存在，不要把標籤寫成分類網址。例如：

- 幼兒英文：`/tag/幼兒英文/`
- 免費英文資源：`/category/免費英文資源/`

舊網址的相容轉址集中在 `astro.config.mjs` 的 `redirects`。

---

## 8. CSS 分層與修改規則

所有 CSS 由 `src/styles/global.css` 依固定順序載入：

```text
01 evergreen-article.css          長文內文特殊模組
02 base/foundation.css            色彩變數、reset、基本元素
03 layouts/header-footer.css      Header、手機選單、Footer
04 pages/article.css              文章頁版型與文章元件
05 base/layout-flow.css           共用容器、卡片、列表版面
06 pages/home.css                 首頁
07 pages/start.css                我們怎麼開始
08 pages/about.css                關於頁
09 components/threads-embed.css   Threads 嵌入
10 pages/trial-guide.css          試聽指南
```

### 修改 CSS 前先判斷範圍

- 全站色彩、字體、按鈕基礎：`base/foundation.css`
- Header／Footer：`layouts/header-footer.css`
- 只影響文章頁：`pages/article.css`
- 只影響某一頁：對應的 `pages/*.css`
- 可在多頁重用的獨立功能：`components/*.css`

### 防止外觀互相干擾

- 單頁樣式必須以頁面根 class 開頭，例如 `.trial-page`、`.start-guide-page`。
- 不要在單頁 CSS 直接寫 `body`、`h2`、`.card` 等全域選擇器。
- 新增規則時，在檔案內加入清楚的區段註解。
- 不要任意調換 `global.css` 的 `@import` 順序；CSS cascade 改變可能造成外觀差異。
- 不要再把大型 `<style>` 放回 `.astro` 頁面；應放入對應的分層 CSS。

`trial-guide.astro` 原本的大型內嵌 CSS 已移到 `pages/trial-guide.css`，並全部限定在 `.trial-page` 或 `.trial-guide-body` 範圍。`start-accessibility.css` 已合併到 `pages/start.css`，避免同一頁維護兩份樣式。

---

## 9. 首頁「寫超完整懶人包」完整調整指南

首頁的「寫超完整懶人包」由五個部分組成：

1. 區塊標題文字。
2. 要顯示哪些文章。
3. 顯示幾篇文章。
4. 每張文章卡片上的標題、分類、日期與封面。
5. 標題色塊、玫瑰葉子裝飾、卡片比例與響應式外觀。

這些內容分散在元件、首頁資料邏輯、文章 Frontmatter 與首頁 CSS 中。請依照下方對照修改，不要另外建立第二份元件或 CSS。

### 9.1 修改區塊標題文字

檔案：

```text
src/components/home/RoundupSection.astro
```

找到：

```astro
<h2 class="roundup-label" id="roundup-title">寫超完整懶人包</h2>
```

例如改成「幼兒英文學習懶人包」：

```astro
<h2 class="roundup-label" id="roundup-title">幼兒英文學習懶人包</h2>
```

只需要更改標籤中間的可見文字，不要刪除：

- `class="roundup-label"`：負責套用外觀。
- `id="roundup-title"`：提供區塊的無障礙標題關聯。
- 外層 `<section aria-labelledby="roundup-title">`：讓螢幕閱讀器知道此區塊的名稱。

### 9.2 調整顯示文章的選擇規則

檔案：

```text
src/pages/index.astro
```

目前首頁使用：

```astro
const posts = await getVisiblePosts();
const featuredPosts = posts.filter((post) => post.data.featured);
const roundup = (featuredPosts.length >= 5 ? featuredPosts : posts).slice(0, 5);
```

實際邏輯如下：

1. `getVisiblePosts()` 先排除 `draft: true` 的文章。
2. 公開文章依 `pubDate` 由新到舊排序。
3. 找出 `featured: true` 的文章。
4. 精選文章至少有 5 篇時，顯示最新的 5 篇精選文章。
5. 精選文章不足 5 篇時，改為顯示全站最新的 5 篇公開文章。

**重要：**目前只有 4 篇文章設定為 `featured: true`，因此這個區塊會啟用回退規則，顯示最新 5 篇公開文章，而不是只顯示 4 篇精選文章。

#### 指定文章為精選文章

文章檔案位置：

```text
src/content/blog/*.md
```

在文章 Frontmatter 中設定：

```yaml
featured: true
```

不列入精選候選：

```yaml
featured: false
```

`featured` 只決定文章是否進入精選候選名單。當精選文章達到門檻時，排序仍依 `pubDate` 由新到舊。

#### `popularRank` 不控制這個區塊

```yaml
popularRank: 1
```

`popularRank` 只會影響首頁「熱門文章」分頁的排序，不會改變「寫超完整懶人包」的文章順序。

### 9.3 修改顯示篇數

目前顯示 5 篇：

```astro
const roundup = (featuredPosts.length >= 5 ? featuredPosts : posts).slice(0, 5);
```

例如改為顯示 4 篇，門檻與截取數量要一起改：

```astro
const roundup = (featuredPosts.length >= 4 ? featuredPosts : posts).slice(0, 4);
```

不要只改其中一個數字，否則可能出現「明明有足夠精選文章，卻仍回退顯示全部文章」的情況。

#### 只顯示精選文章，不使用回退規則

```astro
const roundup = featuredPosts.slice(0, 5);
```

這種寫法在精選文章不足 5 篇時，只會顯示實際存在的精選文章，不會自動補入一般文章。

#### 完全手動指定文章與順序

需要長期固定文章順序時，可在 `src/pages/index.astro` 使用 slug 名單：

```astro
const roundupSlugs = [
  'tutorjr-10-lessons-parent-review',
  'not-all-english-kindergarten',
  'taiwan-kindergarten-fees-2026',
  'starfall-60-days-review-evergreen',
];

const roundup = roundupSlugs
  .map((slug) => posts.find((post) => post.slug === slug))
  .filter(Boolean);
```

注意事項：

- slug 必須和 `src/content/blog/` 內的 Markdown 檔名一致。
- 不要加 `.md`。
- 文章若為 `draft: true`，不會出現在 `posts` 中，因此也不會顯示。
- 刪除或重新命名文章後，要同步更新 `roundupSlugs`。

### 9.4 修改卡片上的文章資料

卡片內容由每篇文章的 Frontmatter 自動取得：

```astro
<img
  src={post.data.cover ?? '/sample-cover.webp'}
  alt={post.data.coverAlt ?? post.data.title}
/>
<span class="roundup-category">{post.data.category}</span>
<h3>{post.data.title}</h3>
<time>{post.data.pubDate.toLocaleDateString('zh-TW')}</time>
```

因此應到對應文章修改：

```text
src/content/blog/文章檔名.md
```

常用欄位：

```yaml
title: "卡片上顯示的文章標題"
pubDate: 2026-07-23
category: "線上外師課"
cover: "/images/blog/example-cover.webp"
coverAlt: "具體描述封面內容"
featured: true
```

欄位對應：

| 卡片內容 | Frontmatter 欄位 |
|---|---|
| 文章標題 | `title` |
| 左上分類標籤 | `category` |
| 卡片日期 | `pubDate` |
| 封面圖片 | `cover` |
| 圖片替代文字 | `coverAlt` |
| 是否列入精選候選 | `featured` |

補充規則：

- 沒有設定 `cover` 時，會顯示 `/sample-cover.webp`。
- 沒有設定 `coverAlt` 時，會以文章 `title` 當替代文字。
- 卡片日期目前使用 `pubDate`，不會顯示 `updatedDate`。
- 卡片連結會自動指向 `/blog/文章-slug/`。

### 9.5 修改標題色塊外觀

檔案：

```text
src/styles/pages/home.css
```

請搜尋這段註解：

```css
/* Rose Lab 首頁「寫超完整懶人包」最終版 */
```

檔案前半部也有一組基礎 `.roundup-*` 規則，但檔案後半部的「最終版」規則載入較晚，會覆蓋相同屬性。調整目前畫面時，應優先修改「最終版」區塊，不要只改最前面的同名選擇器。

標題主要規則：

```css
.roundup-label{
  margin:0 0 10px 34px;
  padding:9px 28px 10px;
  border-radius:4px;
  background:#cf7d9a;
  color:#fffaf2;
  font-size:17px;
  font-weight:800;
  line-height:1.35;
  letter-spacing:.02em;
  box-shadow:0 7px 18px rgba(111,68,84,.14);
}
```

常用修改項目：

| 想調整的內容 | CSS 屬性 |
|---|---|
| 粉紅色背景 | `background` |
| 文字顏色 | `color` |
| 文字大小 | `font-size` |
| 文字粗細 | `font-weight` |
| 色塊圓角 | `border-radius` |
| 色塊內部留白 | `padding` |
| 色塊外部位置 | `margin` |
| 陰影 | `box-shadow` |
| 字距 | `letter-spacing` |

### 9.6 修改左側玫瑰與右側葉子

圖片檔案：

```text
public/images/decor/rose-decoration.webp
public/images/decor/leaf-decoration.webp
```

左側玫瑰：

```css
.roundup-label::before{
  left:-32px;
  top:-26px;
  width:64px;
  height:64px;
  background-image:url('/images/decor/rose-decoration.webp');
}
```

右側葉子：

```css
.roundup-label::after{
  right:-50px;
  bottom:-18px;
  width:82px;
  height:46px;
  background-image:url('/images/decor/leaf-decoration.webp');
  transform:rotate(8deg);
}
```

常用調整：

- `left`、`right`、`top`、`bottom`：裝飾的位置。
- `width`、`height`：裝飾大小。
- `transform: rotate(...)`：葉子的旋轉角度。
- `background-image`：替換裝飾圖片。

替換圖片時，請保留透明背景，並使用相同檔名即可避免修改 CSS。

### 9.7 修改卡片外觀

卡片比例、圓角與陰影：

```css
.roundup-cover{
  aspect-ratio:16 / 9;
  border-radius:16px;
  background:#f5f1eb;
  box-shadow:
    0 12px 28px rgba(33,61,46,.13),
    0 3px 8px rgba(33,61,46,.06);
}
```

封面裁切方式：

```css
.roundup-cover img{
  width:100%;
  height:100%;
  object-fit:cover;
  object-position:center;
}
```

- `aspect-ratio`：卡片圖片比例。
- `border-radius`：卡片圓角。
- `box-shadow`：卡片陰影。
- `object-fit: cover`：保持卡片填滿，但可能裁切圖片邊緣。
- `object-position`：控制裁切焦點，例如 `center top` 可偏向圖片上方。

分類膠囊：

```css
.roundup-category{
  top:14px;
  left:14px;
  padding:6px 12px;
  border-radius:999px;
  background:rgba(215,121,153,.97);
  color:#fff;
  font-size:12px;
}
```

卡片底部漸層：

```css
.roundup-overlay{
  left:0;
  right:0;
  bottom:0;
  height:58%;
  background:linear-gradient(
    to bottom,
    rgba(17,45,30,0) 0%,
    rgba(28,57,39,.10) 20%,
    rgba(25,54,37,.42) 52%,
    rgba(20,49,33,.76) 78%,
    rgba(15,42,28,.94) 100%
  );
}
```

這種寫法只讓陰影覆蓋卡片底部 58%，上半部封面維持明亮；陰影會由透明逐漸加深，不會從卡片中央突然出現一整塊深色。

卡片文字位置：

```css
.roundup-text{
  left:0;
  right:0;
  bottom:0;
  padding:0 17px 12px;
}
```

- `bottom:0`：讓整組標題與日期貼近卡片底部。
- 最後一個 `12px`：控制文字距離卡片底邊的距離；數字越小，文字越往下。
- 手機版目前使用 `padding:0 15px 10px`。

#### 卡片標題選擇器注意事項

元件目前使用：

```astro
<h3>{post.data.title}</h3>
```

因此要修改卡片標題樣式，CSS 選擇器應使用：

```css
.roundup-text h3{
  font-size:16px;
  font-weight:800;
  line-height:1.42;
}
```

`home.css` 已統一改用 `.roundup-text h3`，會正確命中元件中的 `<h3>`。不要再建立 `.roundup-text h2`，否則不會套用到目前的卡片標題。

### 9.8 修改桌機、平板與手機欄數

目前基礎規則：

```css
.roundup-grid{
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  gap:18px;
}
```

顯示方式：

- 900px 以上：每排 3 張。
- 621～900px：每排 2 張。
- 620px 以下：每排 1 張。

對應 CSS：

```css
@media(max-width:900px){
  .roundup-grid{
    grid-template-columns:repeat(2,minmax(0,1fr));
  }
}

@media(max-width:620px){
  .roundup-grid{
    grid-template-columns:1fr;
  }
}
```

例如桌機改為每排 4 張：

```css
.roundup-grid{
  grid-template-columns:repeat(4,minmax(0,1fr));
}
```

改欄數後應同時檢查：

- 卡片標題是否仍能完整閱讀。
- 封面上的文字是否過小。
- 平板斷點是否需要調整。
- 文章數量是否能形成整齊排列。

### 9.9 手機版標題與裝飾

手機版位於：

```css
@media(max-width:620px){
  /* ... */
}
```

目前手機版設定：

```css
.roundup-label{
  margin-left:20px;
  margin-bottom:11px;
  padding:8px 19px;
  font-size:15px;
}

.roundup-label::before{
  left:-30px;
  top:-24px;
  width:50px;
  height:59px;
}

.roundup-label::after{
  right:-45px;
  bottom:-16px;
  width:62px;
  height:37px;
}
```

只修改桌機 `.roundup-label` 不一定會改變手機畫面，因為手機媒體查詢會覆蓋部分屬性。修改後必須同時檢查 620px 以下畫面。

### 9.10 隱藏或移除整個區塊

暫時隱藏，不刪除程式：

```css
.roundup-section{
  display:none;
}
```

永久移除首頁區塊時，檔案：

```text
src/pages/index.astro
```

刪除：

```astro
<RoundupSection posts={roundup} />
```

若確定永遠不再使用，才進一步刪除：

- `RoundupSection` 的 import。
- `featuredPosts` 與 `roundup` 變數。
- `src/components/home/RoundupSection.astro`。
- `home.css` 中所有 `.roundup-*` 規則。

不要只刪除元件檔案，否則首頁 import 會造成 build 失敗。

### 9.11 修改後檢查清單

```bash
npm run validate
npm run build
npm run dev
```

預覽時確認：

- 標題文字正確。
- 左側玫瑰與右側葉子沒有被裁切。
- 桌機為 3 欄、平板為 2 欄、手機為 1 欄，或符合新的設定。
- 卡片封面沒有拉伸。
- 分類、標題與日期可讀。
- 每張卡片都能進入正確文章頁。
- `draft: true` 的文章沒有出現在首頁。
- 新封面路徑沒有 404。
- 鍵盤 Tab 可以聚焦每張文章卡片。
- 手機版沒有水平捲軸。

---

## 10. SEO 架構

### 全站统一处理

`src/layouts/BaseLayout.astro` 集中輸出：

- canonical URL
- robots／Googlebot
- Open Graph／Twitter Card
- hreflang
- RSS 與 Sitemap 連結
- Organization、WebSite、WebPage、ImageObject JSON-LD
- 有提供路徑時的 BreadcrumbList JSON-LD

### 文章頁额外处理

`src/layouts/ArticleLayout.astro` 集中輸出：

- BlogPosting JSON-LD
- 發布與更新日期
- 作者／發布者
- 主圖、文章分類、標籤、字數與預估閱讀時間
- 可見麵包屑與結構化麵包屑
- 上一篇、下一篇、相關文章、最新文章與熱門文章

### 收錄控制

- 草稿文章不會建立頁面。
- `noindex: true` 的頁面輸出 `noindex,follow`。
- `/search/` 與 `/404/` 不放進 Sitemap。
- canonical 不包含搜尋參數，避免同一內容出現多個網址版本。
- 舊分類和舊文章網址在 `astro.config.mjs` 做 301 相容轉址。

### 內容品質原則

技術 SEO 只能協助搜尋引擎理解與抓取，無法保證排名。文章仍應：

- 直接回答具體搜尋問題。
- 使用第一手陪學經驗、實際觀察與可核對資料。
- 清楚標示資料日期、課程活動變動與推薦連結。
- 定期更新價格、方案、功能與政策。
- 避免為關鍵字堆砌重複段落。

---

## 11. 搜尋、RSS 與 Sitemap

- 站內搜尋資料：`/search-index.json`
- 搜尋頁：`/search/`（不收錄，但允许跟随文章链接）
- RSS：`/rss.xml`
- Sitemap index：`/sitemap-index.xml`

文章、分類、標籤與系列頁都使用 `src/utils/content.ts` 的同一套「排除草稿／noindex、依日期排序」逻辑，避免各页面结果不一致。

---

## 12. Cloudflare Pages 部署

建議設定：

```text
Framework preset: Astro
Build command: npm run build
Build output directory: dist
Node.js version: 22
Root directory: /
```

正式網域同時在以下位置確認：

- `astro.config.mjs` 的 `site`
- `src/config/site.ts` 的 `SITE.url`
- Cloudflare Pages 的 Custom domains

修改網域後重新部署，再檢查 canonical、Sitemap、robots.txt 與 Google Search Console。

### Wrangler 指令

專案也保留：

```bash
npm run deploy
```

此指令會先 build，再依 `wrangler.jsonc` 部署。

---

## 13. 每次發布前檢查

```bash
npm ci
npm run validate
npm run build
```

再人工确认：

- 首頁、文章頁、分類頁、標籤頁、搜尋頁都能開啟。
- 手機選單、搜尋、熱門／最新切換與文章目錄正常。
- 新文章封面和文章內圖片没有 404。
- 文章标题、描述、日期、分类和标签正确。
- 推荐链接 UTM 与揭露说明正确。
- `sitemap-index.xml` 与 `rss.xml` 可读取。
- 桌机、平板、手机外观没有变化。

---

## 14. 隱私與內容安全

不要公開孩子姓名、學校、住址、固定行程、可辨識制服、證件或其他可追蹤個資。分享課程經驗時，保留孩子感受與家庭決策所需的資訊即可。


---

## 10. Cloudflare Pages 建置失敗修復

### 10.1 `HOME_CATEGORIES is not exported` 的真正原因

Cloudflare 若顯示：

```text
"HOME_CATEGORIES" is not exported by "src/config/site.ts"
```

代表 GitHub 倉庫裡的檔案不是同一個版本：

- `src/pages/index.astro` 已是新版，會讀取 `HOME_CATEGORIES`。
- `src/config/site.ts` 仍是舊版，沒有相同的匯出內容。
- 建置紀錄若同時顯示讀到舊的 `wrangler.json`，也代表上傳時只覆蓋部分檔案。

本專案的正確對應為：

```astro
// src/pages/index.astro
import { HOME_CATEGORIES } from '../config/site';
```

```ts
// src/config/site.ts
export const HOME_CATEGORIES = [
  ['幼兒英文', '零基礎、慢熟與第一次接觸英文的真實紀錄。', '/tag/幼兒英文/', '#fcecef'],
  ['線上外師課', '試聽、選老師、陪課與孩子沉默時怎麼判斷。', '/category/線上外師課/', '#edf5e9'],
  ['免費資源', 'Starfall、Khan Academy Kids 與家庭實際用法。', '/resources/', '#f6f0fb'],
  ['親子共學', '忙碌家庭也能執行的短時間英文安排。', '/category/親子共學/', '#fff3dc'],
] as const;
```

### 10.2 正確更新 GitHub 的方式

不要只上傳 `home.css` 或 `index.astro`。這次必須完整替換以下檔案：

```text
src/config/site.ts
src/pages/index.astro
src/styles/pages/home.css
wrangler.json
package.json
package-lock.json
```

最穩定的做法是：

1. 解壓縮本專案 ZIP。
2. 進入解壓後的專案資料夾。
3. 將資料夾裡的全部檔案上傳至 GitHub 倉庫根目錄。
4. 確認 GitHub 根目錄直接看得到 `package.json`、`astro.config.mjs`、`wrangler.json` 與 `src`，不要再多包一層資料夾。
5. 確認舊的 `wrangler.jsonc` 或 `wrangler.toml` 沒有與 `wrangler.json` 同時存在。
6. 重新觸發 Cloudflare Pages 部署。

### 10.3 Cloudflare Pages 設定

```text
Build command：npm run build
Build output directory：dist
Root directory：留空
Node.js：22
```

本專案的 `wrangler.json` 已設定：

```json
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "rose-lab-site",
  "compatibility_date": "2026-07-24",
  "pages_build_output_dir": "./dist"
}
```

### 10.4 完整網站內容

本版本不是只有 CSS 修補檔，已包含：

- 5 篇現有文章原文。
- 首頁、全部文章、分類、標籤與文章頁。
- 「我們怎麼開始」、免費資源、試聽指南與關於頁。
- Header、Footer、搜尋、RSS、Sitemap 與結構化資料。
- 首頁「寫超完整懶人包」新的標題位置與底部漸層陰影。
- 圖片、Logo、favicon 與文章封面。

### 10.5 部署前本機檢查

```bash
npm ci
npm run validate
npm run build
```

成功時應產生：

```text
dist/
```

Cloudflare Pages 會發佈這個資料夾。
