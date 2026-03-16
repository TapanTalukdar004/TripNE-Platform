const fs = require('fs');
const filePath = 'd:/work/tripne migration workspace/tripne-nextjs/scripts/git_status.txt';

if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf16le');
    console.log(content);
} else {
    console.log("File not found");
}
