import { Listener, Subjects, ExpirationCompleteEvent, OrderStatus } from "@hanishdev-ticketing/common";
import { Message } from "node-nats-streaming";
import { TICKETS_LISTENER_QUEUE_GROUP } from "../queue-groups";
import { Order } from "../../models";
import { OrderCancelledPublisher } from "../publishers";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;
    queueGroupName = TICKETS_LISTENER_QUEUE_GROUP;

    async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
        const order = await Order.findById(data.order).populate("ticket");

        if (!order) {
            throw new Error("Order not found");
        }

        if (order.status === OrderStatus.Complete) {
            return msg.ack();
        }

        order.set({ status: OrderStatus.Cancelled });
        await order.save();

        await new OrderCancelledPublisher(this.client).publish({
            id: order.id,
            version: order.version,
            ticket: {
                id: order.ticket.id
            }
        });

        msg.ack();
    }
}