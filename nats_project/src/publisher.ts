import nats from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

const clientId = randomBytes(4).toString("hex");

// client - stan
const stan = nats.connect("ticketing", clientId, {
    url: "http://localhost:4222"
});

stan.on("connect", () => {
    console.log(`Publisher ${clientId} connected to NATS`);

    const data = JSON.stringify({
        id: "123",
        title: "concert",
        price: 20
    });

    stan.publish("ticket:created", data, () => {
        console.log("Event ticket:created published");
        stan.close();
    });

    stan.on("close", () => {
        console.log("Publisher NATS connection closed!");
        process.exit();
    });
})

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());