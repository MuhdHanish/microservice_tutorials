import axios from "axios";
import express from "express";

const app = express();

app.use(express.json());

app.post(`/events`, async (req, res) => {
    const { type, data } = req.body;
    switch (type) {
        case "COMMENT_CREATED": {
            const prohibitedWords = ["stupid", "idiot", "dumb", "fool", "nonsense", "moron"];
            const content = data?.content?.toLowerCase(); 
            const status = prohibitedWords.some(word => content?.includes(word))
                ? "rejected"
                : "approved";
            await axios.post(`http://localhost:8080/events`, {
                type: "COMMENT_MODERATED",
                data: {
                    ...data,
                    status
                }
            });
            break;
        }

        default: {
            console.log(`Unhandled event type: ${type}`);
            break;
        }
    }
    res.json({ status: 'OK' });
});

app.listen(8004, () => {
    console.log(`Query service listening on port 8004`)
});