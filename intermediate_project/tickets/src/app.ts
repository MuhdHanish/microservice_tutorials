import express from "express";
import {
    CustomHTTPError,
    errorHandler
} from "@hanishdev-ticketing/common";

const app = express();

app.set("trust proxy", true);

app.use(express.json());

app.use("/api/tickets", (req, res) => {
    res.status(200);
});

app.use("*", (req, res, next) => {
    errorHandler(new CustomHTTPError("Resource not found.", 404), req, res, next);
});

app.use(errorHandler);

export { app };