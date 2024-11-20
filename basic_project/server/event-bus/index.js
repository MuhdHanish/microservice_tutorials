import cors from "cors";
import axios from "axios";
import express from "express";

const app = express();

app.use(cors());
app.use(express.json());

app.post(`/events`, (req, res) => {
    const event = req.body;

    axios.post(`http://localhost:8001/events`, event);
    axios.post(`http://localhost:8002/events`, event);
    axios.post(`http://localhost:8003/events`, event);

    res.json({ status: 'OK' });
});

app.listen(8080, () => {
    console.log(`Event but listing on port 8080`);
});