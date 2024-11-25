import express from "express";

const app = express();

app.use(express.json());

app.get("/api/auth", (req, res) => {
    res.send("Hello from auth service");
});

app.listen(8001, () => {
    console.log("Auth service listening on port 8001");
});