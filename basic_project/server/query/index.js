import cors from "cors";
import express from "express";

const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

app.get(`/posts`, (req, res) => {

});

app.post(`/events`, (req, res) => {

});

app.listen(8003, () => {
    console.log(`Query service listening on port 8003`)
});