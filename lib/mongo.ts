import { MongoClient } from "mongodb";

let clientPromise: Promise<MongoClient> | null = null;

/** Shared, reused MongoDB connection. Needs MONGODB_URI in the environment. */
export function getDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  clientPromise ??= new MongoClient(uri).connect();
  return clientPromise.then((c) => c.db("cake_sip"));
}
