import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const NON_INDEXABLE_PATHS = new Set(['/404', '/search']);

// 只有至少包含2篇文章的標籤頁，才放進sitemap
const INDEXABLE_TAGS = new Set([
  '幼兒英文',
  '線上外師課',
  'tutorJr',
  'Starfall',
  'Khan Academy Kids',
  '4歲學英文',
  '親子共學',
  '自然發音',
  '美語啟蒙',
  '幼兒自然發音',
  '幼兒線上英文',
  'TutorABCJr',
  '4歲線上英文',
  '非營利幼兒園',
  '零基礎幼兒英文',
  '幼兒英文怎麼開始',
  '如何判斷孩子會閱讀',
  '公立幼兒園',
  '免費試聽',
  '免費英文資源',
  '免費資源',
]);

export default defineConfig({
  site: 'https://rose-lab.com',
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => {
        const rawPathname = new URL(page).pathname;
    
        // 將中文網址解碼，並移除結尾斜線
        const decodedPathname = decodeURIComponent(rawPathname);
        const pathname =
          decodedPathname === '/'
            ? '/'
            : decodedPathname.replace(/\/+$/, '');
    
        // 排除404、搜尋頁等不應收錄的頁面
        if (NON_INDEXABLE_PATHS.has(pathname)) {
          return false;
        }
    
        // 標籤頁只保留至少有2篇文章的標籤
        if (pathname.startsWith('/tag/')) {
          const tagName = pathname.slice('/tag/'.length);
          return INDEXABLE_TAGS.has(tagName);
        }
    
        // 其他首頁、文章、分類及固定頁面照常放進sitemap
        return true;
      },
    }),
  ],
  redirects: {
    '/blog/tutorjr-10-lessons/': '/blog/tutorjr-10-lessons-parent-review/',
    '/category/家庭陪學/': '/category/親子共學/',
    '/category/家庭選擇/': '/category/學習規劃/',
    '/category/幼兒英文/': '/tag/幼兒英文/',
    '/category/免費資源/': '/category/免費英文資源/',
  },
});
