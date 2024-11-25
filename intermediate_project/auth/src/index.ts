import "dotenv/config";
import { app } from "./app";
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const URI = process.env.NODE_ENV === "Development" ? "mongodb://localhost:27017/auth" : "mongodb://auth-mongo-srv:27017/auth";
        await mongoose.connect(URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
};

const handleExit = async (signal: NodeJS.Signals) => {
    console.log(`Received ${signal}. Closing server gracefully...`);
    try {
        await mongoose.connection.close();
        console.log("Database connection closed");
        process.exit(0);
    } catch (error) {
        console.error("Database connection close error:", error);
        process.exit(1);
    }
};

const startServer = async () => {
    const keys = ['JWT_SECRET'];
    for (const key of keys) {
        if (!process.env[key]) {
            throw new Error(`Missing environment variable ${key}`);
        }
    }

    await connectDB();

    app.listen(8001, () => {
        console.log("Auth service listening on port 8001");
    });
};

process.on("SIGTERM", () => handleExit("SIGTERM"));
process.on("SIGINT", () => handleExit("SIGINT"));

startServer();