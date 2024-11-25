import express from "express";
import { authRouter } from "./routes";

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);

app.listen(8001, () => {
    console.log("Auth service listening on port 8001");
});