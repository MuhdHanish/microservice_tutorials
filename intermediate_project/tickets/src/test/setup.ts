import { config } from "dotenv";
import path from "path";

config({ path: path.resolve(__dirname, "../../.env.test.local") });

import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
declare global {
    namespace NodeJS {
        interface Global {
            signup(): Promise<string[]>;
        }
    }
}

let mongo: MongoMemoryServer;

beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const URI = mongo.getUri();
    await mongoose.connect(URI);
});

afterAll(async () => {
    const collections = await mongoose.connection.db?.collections() || [];
    for (const collection of collections) {
        await collection.drop();
    }
    if (mongo) await mongo.stop();
    await mongoose.connection.close();
});