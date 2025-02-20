import "server-only";

import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined");
}

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function getDB(dbname: string) {
  try {
    await client.connect();
    console.log("Connected successfully to Mongo DB");
    return client.db(dbname);
  } catch (err) {
    console.log(err);
  }
}

export async function getCollection(collectionname: string) {
  const db = await getDB("myblog_nextjs");
  if (db) {
    return db.collection(collectionname);
  }
  return null;
}
