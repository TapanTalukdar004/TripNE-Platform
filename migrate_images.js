const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'MINI_PROJECT', 'images');
const destDir = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Explicit mappings for SEO
const mappings = {
  'AP-slide.jpg': 'arunachal-pradesh-landscape.jpg',
  'Assam-slide.jpg': 'assam-tea-gardens.jpg',
  'manipur-slide.jpg': 'manipur-loktak-lake.jpg',
  'meghalaya-slide.jpg': 'meghalaya-living-root-bridge.jpg',
  'mizoram-slide.webp': 'mizoram-rolling-hills.webp',
  'nagaland-slide.webp': 'nagaland-festival-tribes.webp',
  'tripura-slides.jpg': 'tripura-ujjayanta-palace.jpg',
  'sikkim-slides.jpg': 'sikkim-monastery-kanchenjunga.jpg',
  'dawki.jpg': 'meghalaya-dawki-river.jpg',
  'Kaziranga-National-Park.jpg': 'assam-kaziranga-rhino.jpg',
  'ap_package.jpg': 'arunachal-cultural-tour.jpg',
  'guide.jpg': 'northeast-india-tour-guide.jpg',
  'agent.jpg': 'tripne-support-agent.jpg',
  'HERO-FIRST.png': 'northeast-india-hero-banner-1.png',
  'HERO-SECOND.png': 'northeast-india-hero-banner-2.png',
  'HERO-THIRD.png': 'northeast-india-hero-banner-3.png',
  'HERO-fourth.png': 'northeast-india-hero-banner-4.png',
  'ap2.jpg': 'arunachal-pradesh-unseen-beauty.jpg',
  'mizoram.jpg': 'mizoram-hills-view.jpg',
  'assam.jpg': 'assam-travel-destination.jpg',
  'meghalaya.jpg': 'meghalaya-tourism-clouds.jpg',
  'Dzukovalley.jpg': 'nagaland-dzuko-valley.jpg',
  'sikkim.jpg': 'sikkim-himalayan-destination.jpg',
  'Manipur.webp': 'manipur-jewel-of-india.webp',
  'Ujjayanta-Palace.jpg': 'tripura-agartala-palace.jpg',
};

function slugify(text) {
  return text.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w\-.]+/g, '');
}

const files = fs.readdirSync(srcDir);
files.forEach(file => {
  const ext = path.extname(file);
  const baseName = path.basename(file, ext);
  
  let newName = file;
  
  if (mappings[file]) {
    newName = mappings[file];
  } else if (/^\d+(-\d+)?$/.test(baseName)) {
    // If name is like 1.jpg, 2-1.jpg
    newName = `northeast-tour-highlight-${baseName}${ext}`;
  } else {
    // Basic slugify for everything else
    newName = `${slugify(baseName)}${ext.toLowerCase()}`;
  }
  
  // ensure target is an image (skip pptx etc if present)
  if (['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'].includes(ext.toLowerCase())) {
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, newName));
  }
});

console.log('Image migration complete.');
