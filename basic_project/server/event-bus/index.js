import axios from "axios";
import express from "express";

const app = express();

app.use(express.json());

const events = []; 

const services = [
    { name: "POST", url: "http://posts-clusterip-srv:8001/events" },
    // { name: "COMMENT", url: "http://localhost:8002/events" },
    // { name: "QUERY", url: "http://localhost:8003/events" },
    // { name: "COMMENT_MODERATION", url: "http://localhost:8004/events" },
];

app.post(`/events`, async (req, res) => {
    const event = req.body;

    events.push(event);
    try {
        await Promise.all(
            services.map(async (service) => {
                try {
                    await axios.post(service.url, event);
                    console.log(`[INFO] Event sent to ${service.name}`);
                } catch (error) {
                    console.error(`[ERROR] Failed to send event to ${service.name}: ${error}`);
                }
            })
        );

        res.json({ status: "OK" });
    } catch (error) {
        console.error(`[ERROR] Unexpected error: ${error.message}`);
        res.status(500).json({ status: "ERROR", message: "Failed to propagate events" });
    }
});

app.get(`/events`, (req, res) => {
    res.json({ events });
})

app.listen(8080, () => {
    console.log(`Event but listing on port 8080`);
});