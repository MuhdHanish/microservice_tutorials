import express from "express";

const app = express();

app.get(`/`, (req, res) => {
    res.send(`Bye from node.js server.`);
});

app.listen(8000, () => {
    console.log(`Server listening on port 8000`);
});