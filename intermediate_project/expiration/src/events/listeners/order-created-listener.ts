import { Listener, OrderCreatedEvent, Subjects } from "@hanishdev-ticketing/common";
import { EXPIRATION_LISTENER_QUEUE_GROUP } from "../queue-groups";
import { expirationQueue } from "../queues";

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    readonly subject = Subjects.OrderCreated;
    queueGroupName = EXPIRATION_LISTENER_QUEUE_GROUP;

    async onMessage(data: OrderCreatedEvent['data'], msg: any) {
        await expirationQueue.add({
            order: data.id
        });
        msg.ack();
    }
}