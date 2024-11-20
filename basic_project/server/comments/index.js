import cors from "cors";
import axios from "axios";
import express from "express";
import { randomBytes } from "crypto";

const app = express();

app.use(cors());
app.use(express.json());

const commentsByPostId = {};

app.get(`/posts/:id/comments`, (req, res) => {
    const postId = req.params.id;
    res.json({ comments: commentsByPostId[postId] || [] });
});

app.post(`/posts/:id/comments`, async (req, res) => {
    const postId = req.params.id;

    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ message: "content is required." });
    }

    const commentId = randomBytes(4).toString('hex');
    const comments = commentsByPostId[postId] || [];
    
    comments.push({ id: commentId, content });
    commentsByPostId[postId] = comments;

    await axios.post(`http://localhost:8080/events`, {
        type: 'COMMENT_CREATED',
        data: {
            id: commentId,
            postId,
            content
        }
    });

    res.status(201).json({ comments });
});

app.post(`/events`, (req, res) => {
    console.log(`Received Event: ${req.body.type}`);
    res.sendStatus(200);
});

app.listen(8002, () => {
    console.log(`Comments service listening on port 8002`)
});