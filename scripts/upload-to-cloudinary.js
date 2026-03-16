require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const assetsDir = path.resolve(__dirname, '../../tripne-used-assets');

async function uploadAll() {
  const files = fs.readdirSync(assetsDir).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'].includes(ext);
  });

  console.log(`Found ${files.length} images to upload.\n`);

  let success = 0;
  let failed = 0;

  for (const file of files) {
    const filePath = path.join(assetsDir, file);
    const publicId = path.parse(file).name; // filename without extension

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'tripne',
        public_id: publicId,
        overwrite: true,
        resource_type: 'image',
      });
      success++;
      console.log(`[${success}/${files.length}] ✓ ${file} → ${result.secure_url}`);
    } catch (err) {
      failed++;
      console.error(`[FAIL] ✗ ${file}: ${err.message}`);
    }
  }

  console.log(`\n=============================`);
  console.log(`Upload complete!`);
  console.log(`Success: ${success}/${files.length}`);
  console.log(`Failed: ${failed}`);
  console.log(`=============================`);
}

uploadAll();
