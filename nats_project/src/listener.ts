import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

const clientId = randomBytes(4).toString("hex");

// client - stan
const stan = nats.connect("ticketing", clientId, {
    url: "http://localhost:4222"
});

stan.on("connect", () => {
    console.log(`Listener ${clientId} connected to NATS`);

    const options = stan.subscriptionOptions()
        .setManualAckMode(true);
    const subscription = stan.subscribe("ticket:created", "ticket-created-queue-group", options);

    subscription.on("message", (msg: Message) => {
        console.log(`Received event: ${msg.getSubject()}`);
        const data = msg.getData();
        if (typeof data === "string") { 
            console.log(`#${msg.getSequence()} - Data: ${data}`);
        }

        msg.ack();
    });

    stan.on("close", () => {
        console.log("Listener NATS connection closed!");
        process.exit();
    }); 
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());