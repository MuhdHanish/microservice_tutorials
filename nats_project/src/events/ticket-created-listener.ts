import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";

export class TicketCreatedListener extends Listener {
    subject = "ticket:created";
    queueGroupName = "ticket-created-service";

    onMessage(data: any, msg: Message) {
        console.log(`#${msg.getSequence()} - Data:`, data);
        msg.ack();
    }
}