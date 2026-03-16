const fs = require('fs');
const files = [
    'scripts/verify_assets.js',
    'scripts/verify_assets_disk.js',
    'scripts/asset_verification_result.json',
    'scripts/asset_verification_disk_result.json',
    'scripts/cleanup.js'
];

for (const file of files) {
    try {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
            console.log(`Deleted: ${file}`);
        }
    } catch (e) {
        // ignore
    }
}
fs.unlinkSync('scripts/cleanup_all.js'); // Self-delete won't work perfectly, but it's okay.
