const fs = require('fs');
const files = [
    'diff.txt',
    'diff_analysis.txt',
    'other_diffs.txt',
    'status.txt',
    'scripts/analyze_diff.js',
    'scripts/diff_analysis.json',
    'scripts/diff_analysis.txt'
];

for (const file of files) {
    try {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
            console.log(`Deleted: ${file}`);
        }
    } catch (e) {
        console.error(`Error deleting ${file}:`, e.message);
    }
}
