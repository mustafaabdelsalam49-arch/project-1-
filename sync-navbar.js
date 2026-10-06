/**
 * sync-navbar.js
 * Tool to synchronize the centralized navbar across all HTML pages in the project.
 * Run via: `node sync-navbar.js`
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const NAVBAR_FILE = path.join(ROOT_DIR, 'navbar.html');

if (!fs.existsSync(NAVBAR_FILE)) {
  console.error('Error: navbar.html template not found at', NAVBAR_FILE);
  process.exit(1);
}

const navbarTemplate = fs.readFileSync(NAVBAR_FILE, 'utf8').trim();

// Get all root html files
const htmlFiles = fs.readdirSync(ROOT_DIR).filter(file => {
  return file.endsWith('.html') && file !== 'navbar.html';
});

console.log(`Found ${htmlFiles.length} HTML pages to synchronize...`);

let syncedCount = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(ROOT_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Locate existing <header class="site-header" ...> </header>
  const headerStartRegex = /<header\s+class=["']site-header["'][^>]*>/i;
  const headerStartMatch = content.match(headerStartRegex);

  if (!headerStartMatch) {
    console.warn(`Warning: Could not find <header class="site-header"> in ${file}`);
    return;
  }

  const headerStartIndex = headerStartMatch.index;
  const headerEndTag = '</header>';
  const headerEndIndex = content.indexOf(headerEndTag, headerStartIndex);

  if (headerEndIndex === -1) {
    console.warn(`Warning: Could not find </header> in ${file}`);
    return;
  }

  const fullHeaderEnd = headerEndIndex + headerEndTag.length;

  // 2. Prepare file-specific active state navbar
  let customizedNavbar = navbarTemplate;

  // Determine active item
  if (file === 'index.html') {
    customizedNavbar = customizedNavbar.replace(
      '<a class="nav-item" href="index.html">الرئيسية</a>',
      '<a class="nav-item active" href="index.html">الرئيسية</a>'
    );
    customizedNavbar = customizedNavbar.replace(
      '<a class="drawer-link" href="index.html">الرئيسية</a>',
      '<a class="drawer-link active" href="index.html">الرئيسية</a>'
    );
  } else if (file === 'about.html') {
    customizedNavbar = customizedNavbar.replace(
      '<a class="nav-item" href="about.html">من نحن</a>',
      '<a class="nav-item active" href="about.html">من نحن</a>'
    );
    customizedNavbar = customizedNavbar.replace(
      '<a class="drawer-link" href="about.html">من نحن</a>',
      '<a class="drawer-link active" href="about.html">من نحن</a>'
    );
  } else if (file === 'contact.html') {
    customizedNavbar = customizedNavbar.replace(
      '<a class="nav-item" href="contact.html">تواصل معنا</a>',
      '<a class="nav-item active" href="contact.html">تواصل معنا</a>'
    );
    customizedNavbar = customizedNavbar.replace(
      '<a class="drawer-link" href="contact.html">تواصل معنا</a>',
      '<a class="drawer-link active" href="contact.html">تواصل معنا</a>'
    );
  } else if (file === 'archive.html' || file.startsWith('article-') || file === 'article.html') {
    customizedNavbar = customizedNavbar.replace(
      '<a class="nav-item" href="archive.html">الأرشيف</a>',
      '<a class="nav-item active" href="archive.html">الأرشيف</a>'
    );
    customizedNavbar = customizedNavbar.replace(
      '<a class="drawer-link" href="archive.html">الأرشيف والمقالات</a>',
      '<a class="drawer-link active" href="archive.html">الأرشيف والمقالات</a>'
    );
  } else if (file === 'service-coldair.html') {
    customizedNavbar = customizedNavbar.replace(
      '<div class="nav-item has-coldair-dropdown" id="coldairNavWrapper">',
      '<div class="nav-item has-coldair-dropdown active" id="coldairNavWrapper">'
    );
    customizedNavbar = customizedNavbar.replace(
      'href="https://wa.me/201271524415" target="_blank" rel="noopener" class="sticky-bar-wa-btn"',
      'href="https://wa.me/201278844434" target="_blank" rel="noopener" class="sticky-bar-wa-btn"'
    );
  } else if (file.startsWith('service-') || file === 'services.html' || file.startsWith('brand-') || file === 'heaters.html') {
    customizedNavbar = customizedNavbar.replace(
      '<div class="nav-item has-mega" id="megaMenuWrapper">',
      '<div class="nav-item has-mega active" id="megaMenuWrapper">'
    );
  }

  // 3. Replace the header section cleanly without accumulating duplicate comments
  const asideEndTag = '</aside>';
  const asideEndIndex = content.indexOf(asideEndTag);
  if (asideEndIndex !== -1 && asideEndIndex < headerStartIndex) {
    const beforeAside = content.substring(0, asideEndIndex + asideEndTag.length);
    const afterHeader = content.substring(fullHeaderEnd);
    content = beforeAside + '\n\n  <!-- Main Site Header -->\n  ' + customizedNavbar + afterHeader;
  } else {
    const beforeHeader = content.substring(0, headerStartIndex);
    const afterHeader = content.substring(fullHeaderEnd);
    content = beforeHeader + customizedNavbar + afterHeader;
  }

  // 4. Update Global Branding: "مدير التوكيل" -> "مدير الصيانة" across titles, meta tags, and footers
  content = content.replace(/مدير التوكيل/g, 'مدير الصيانة');
  content = content.replace(/<b>\s*مدير\s*<\/b>\s*<small>\s*التوكيل\s*<\/small>/g, '<b>مدير</b> <small>الصيانة</small>');
  content = content.replace(/<b>\s*مدير\s*<\/b>\s*التوكيل/g, '<b>مدير</b> الصيانة');

  // Also ensure phone placeholder in brand-fresh.html
  content = content.replace('01012345678', '01271524415');

  // 5. Save file with clean UTF-8
  fs.writeFileSync(filePath, content, { encoding: 'utf8' });
  syncedCount++;
});

console.log(`Successfully synchronized navbar across ${syncedCount} files!`);
