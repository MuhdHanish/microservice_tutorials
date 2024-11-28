import { Message } from "node-nats-streaming";
import { TickUpdatedEvent, Listener, Subjects } from "@hanishdev-ticketing/common";
import { TICKETS_LISTENER_QUEUE_GROUP } from "../queue-groups";
import { Ticket } from "../../models";

export class TicketUpdatedListener extends Listener<TickUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
    queueGroupName = TICKETS_LISTENER_QUEUE_GROUP;

    async onMessage(data: TickUpdatedEvent["data"], msg: Message): Promise<void> {
        const { id } = data;
        const ticket = await Ticket.findById(id);
        if (!ticket) {
            throw new Error("Ticket not found");
        }
        ticket.set({
            title: data.title,
            price: data.price
        });
        await ticket.save();
        
        msg.ack();
    }
}