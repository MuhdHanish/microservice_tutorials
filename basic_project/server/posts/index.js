import cors from "cors";
import express from "express";
import { randomBytes } from "crypto";

const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

app.get(`/posts`, (req, res) => {
    res.json({ posts });
});

app.post(`/posts`, (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: "title is required." });
    }
    const id = randomBytes(4).toString('hex');
    posts[id] = {
        id,
        title
    };
    res.status(201).json({ id });
});

app.listen(8001, () => {
    console.log(`Posts service listening on port 8001`)
});