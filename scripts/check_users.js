const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI");
  process.exit(1);
}

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log("Collections in DB:");
    console.log(collections.map(c => c.name));

    // For each collection, print docs count and typical fields
    for (const col of collections) {
      const docs = await db.collection(col.name).find({}).toArray();
      console.log(`\n--- Collection: ${col.name} (${docs.length} docs) ---`);
      if (docs.length > 0) {
        // Print first doc fully to see fields
        console.log(JSON.stringify(docs.map(d => ({ _id: d._id, email: d.email, telegramChatId: d.telegramChatId })), null, 2));
      }
    }

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
