import express from "express";
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

app.listen(8001, () => {
    console.log("Auth service listening on port 8001");
});