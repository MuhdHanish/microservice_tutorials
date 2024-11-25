import express from "express";
import { authRouter } from "./routes";
import cookieSession from "cookie-session";
import { errorHandler } from "./middlewares";
import { CustomHTTPError } from "./lib/utils";

const app = express();

app.set("trust proxy", true);

app.use(express.json());
app.use(cookieSession({
    signed: false,
    secure: !["development", "test"]?.includes(process.env.NODE_ENV || ""),
}));

app.use("/api/auth", authRouter);

app.use("*", (req, res, next) => {
    errorHandler(new CustomHTTPError("Resource not found.", 404), req, res, next);
});

app.use(errorHandler);

export { app };