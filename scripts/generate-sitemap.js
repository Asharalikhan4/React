const fs = require('fs');
const path = require('path');

// Domain configuration (can be overridden via SITE_URL environment variable)
const SITE_URL = (process.env.SITE_URL || 'https://react.asharlabs.stream').replace(/\/$/, '');

const topicsFilePath = path.join(__dirname, '../src/data/topics.tsx');
const publicDir = path.join(__dirname, '../public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Read topics file and extract slugs
const topicsContent = fs.readFileSync(topicsFilePath, 'utf8');
const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
const slugs = [];
let match;
while ((match = slugRegex.exec(topicsContent)) !== null) {
  slugs.push(match[1]);
}

const today = new Date().toISOString().split('T')[0];

// 1. Generate sitemap.xml
let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

slugs.forEach((slug) => {
  sitemapXml += `  <url>
    <loc>${SITE_URL}/topic/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
});

sitemapXml += `</urlset>\n`;

const sitemapPath = path.join(publicDir, 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');
console.log(`Generated sitemap.xml with ${slugs.length + 1} URLs at ${sitemapPath}`);

// 2. Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml
`;

const robotsPath = path.join(publicDir, 'robots.txt');
fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
console.log(`Generated robots.txt at ${robotsPath}`);
