import cors from "cors";
import axios from "axios";
import express from "express";
import { randomBytes } from "crypto";

const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

app.get(`/posts`, (req, res) => {
    res.json({ posts });
});

app.post(`/posts`, async (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: "title is required." });
    }
    const id = randomBytes(4).toString('hex');
    posts[id] = {
        id,
        title
    };

    await axios.post(`http://localhost:8080/events`, {
        type: 'POST_CREATED',
        data: {
            id,
            title
        }
    });

    res.status(201).json({ id });
});

app.post(`/events`, (req, res) => {
    console.log(`Received Event: ${req.body.type}`);
    res.sendStatus(200);
});

app.listen(8001, () => {
    console.log(`Posts service listening on port 8001`)
});