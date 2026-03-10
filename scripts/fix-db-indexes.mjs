import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function fixIndexes() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("No MONGODB_URI in .env.local");
  
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    // DB name is implicitly from the connection string (tripne_auth)
    const db = client.db();
    const collection = db.collection('users');
    
    // List existing indexes
    const indexes = await collection.indexes();
    console.log("Current indexes on users collection:", indexes.map(i => i.name));
    
    // Drop the strict username_1 index if it exists
    const hasUsernameIndex = indexes.some(i => i.name === 'username_1');
    if (hasUsernameIndex) {
      console.log("Dropping strict username_1 index...");
      await collection.dropIndex("username_1");
      console.log("Dropped successfully. Mongoose will recreate it as sparse upon next boot.");
    } else {
      console.log("No username_1 index found, nothing to drop.");
    }

    // Since many NextAuth users might have been inserted without a username (null/undefined)
    // and failed because of the schema, dropping this index fixes the E11000 duplicate key issue.
  } catch (error) {
    console.error("Error fixing indexes:", error);
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB");
  }
}

fixIndexes();
