import cors from "cors";
import express from "express";

const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

app.get(`/posts`, (req, res) => {
    res.json({ posts });
});

app.post(`/events`, (req, res) => {
    const { type, data } = req.body;
    switch (type) {
        case "POST_CREATED": {
            const { id, title } = data;
            posts[id] = { id, title, comments: [] };
            break;
        }

        case "COMMENT_CREATED": {
            const { id, content, postId } = data;
            if (posts[postId]) {
                posts[postId].comments.push({ id, content }); 
            } else {
                console.error(`Post with id ${postId} not found`);
            }
            break;
        }

        default: {
            console.log(`Unhandled event type: ${type}`);
            break;
        }
    }
    res.json({ status: 'OK' });
});

app.listen(8003, () => {
    console.log(`Query service listening on port 8003`)
});