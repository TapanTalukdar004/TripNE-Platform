const fs = require('fs');
const path = require('path');

const resultPath = 'd:/work/tripne migration workspace/tripne-nextjs/scripts/asset_verification_result.json';
const publicDir = 'd:/work/tripne migration workspace/tripne-nextjs/public/images';

if (fs.existsSync(resultPath)) {
    const data = JSON.parse(fs.readFileSync(resultPath, 'utf8'));
    const missing = data.missing;
    
    const availableInPublic = [];
    const notOnDiskAtAll = [];
    
    missing.forEach(img => {
        const fullPath = path.join(publicDir, img);
        if (fs.existsSync(fullPath)) {
            availableInPublic.push(img);
        } else {
            notOnDiskAtAll.push(img);
        }
    });
    
    console.log(JSON.stringify({
        totalMissingInAssets: missing.length,
        availableInPublicCount: availableInPublic.length,
        notOnDiskCount: notOnDiskAtAll.length,
        availableInPublic: availableInPublic,
        notOnDiskAtAll: notOnDiskAtAll
    }, null, 2));
    
    fs.writeFileSync('d:/work/tripne migration workspace/tripne-nextjs/scripts/asset_verification_disk_result.json', JSON.stringify({
        availableInPublic,
        notOnDiskAtAll
    }, null, 2));
} else {
    console.error("Result file not found");
}
