const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    try {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                walkDir(fullPath, callback);
            } else {
                callback(fullPath);
            }
        }
    } catch (e) {
        // ignore
    }
}

// 1. Get images from code
const codeImages = new Set();
const searchDirs = [
    'd:/work/tripne migration workspace/tripne-nextjs/app',
    'd:/work/tripne migration workspace/tripne-nextjs/components',
    'd:/work/tripne migration workspace/tripne-nextjs/lib/data'
];

searchDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
        walkDir(dir, (filePath) => {
            if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
                const content = fs.readFileSync(filePath, 'utf8');
                // Relax regex to match spaces and various chars in filename
                const matches = content.match(/\/images\/[a-zA-Z0-9\-\._\(\)\s']+\.(jpg|jpeg|png|webp|gif|svg)/g);
                if (matches) {
                    matches.forEach(m => {
                        const name = m.split('/').pop().trim();
                        if (name) codeImages.add(name);
                    });
                }
            }
        });
    }
});

// 2. Get images from tripne-used-assets
const folderFiles = [];
const assetsDir = 'd:/work/tripne migration workspace/tripne-used-assets';

if (fs.existsSync(assetsDir)) {
    walkDir(assetsDir, (filePath) => {
        folderFiles.push(path.basename(filePath).trim());
    });
}

// 3. Compare
const exactMatches = [];
const fuzzyMatches = [];
const missing = [];

for (const img of codeImages) {
    if (folderFiles.includes(img)) {
        exactMatches.push(img);
    } else {
        // Fuzzy match: check if code image name is contained in any folder file name
        const foundFuzzy = folderFiles.find(f => f.toLowerCase().includes(img.toLowerCase()));
        if (foundFuzzy) {
            fuzzyMatches.push({ code: img, folder: foundFuzzy });
        } else {
            // Also check if splitting by dash yields matches
            const foundSplit = folderFiles.find(f => {
                const parts = f.split('-');
                return parts.includes(img);
            });
            if (foundSplit) {
                fuzzyMatches.push({ code: img, folder: foundSplit });
            } else {
                missing.push(img);
            }
        }
    }
}

const result = {
    totalCodeImages: codeImages.size,
    totalFolderFiles: folderFiles.length,
    exactMatchesCount: exactMatches.length,
    fuzzyMatchesCount: fuzzyMatches.length,
    missingCount: missing.length,
    missing: missing,
    fuzzyMatches: fuzzyMatches
};

console.log(JSON.stringify(result, null, 2));
// Also save to a file just in case console gets truncated
fs.writeFileSync('d:/work/tripne migration workspace/tripne-nextjs/scripts/asset_verification_result.json', JSON.stringify(result, null, 2));
