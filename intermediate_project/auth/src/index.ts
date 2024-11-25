import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { authRouter } from "./routes";
import { errorHandler } from "./middlewares";
import { CustomHTTPError } from "./lib/utils";

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);

app.use("*", (req, res, next) => {
    errorHandler(new CustomHTTPError("Resource not found.", 404), req, res, next);
});

app.use(errorHandler);

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
    await connectDB();

    app.listen(8001, () => {
        console.log("Auth service listening on port 8001");
    });
};

process.on("SIGTERM", () => handleExit("SIGTERM"));
process.on("SIGINT", () => handleExit("SIGINT"));

startServer();