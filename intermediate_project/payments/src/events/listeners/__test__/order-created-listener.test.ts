import { OrderCreatedEvent, OrderStatus, Subjects } from "@hanishdev-ticketing/common";
import { natsWrapper } from "../../../nats-wrapper"
import { OrderCreatedListener } from "../order-created-listener"
import mongoose from "mongoose";
import { Order } from "../../../models";

const setup = () => {
    const listener = new OrderCreatedListener(natsWrapper.client);

    const data: OrderCreatedEvent["data"] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        status: OrderStatus.Created,
        user: new mongoose.Types.ObjectId().toHexString(),
        expiresAt: new Date().toISOString(),
        ticket: {
            id: new mongoose.Types.ObjectId().toHexString(),
            price: 10
        }
    };

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return { listener, data, msg };
}

describe("OrderCreatedListener", () => {
    it("replicates the order info", async () => {
        const { listener, data, msg } = setup();

        await listener.onMessage(data, msg);

        const order = await Order.findById(data.id);

        expect(order!.price).toEqual(data.ticket.price);
    });

    it("acks the message", async () => {
        const { listener, data, msg } = setup();

        await listener.onMessage(data, msg);

        expect(msg.ack).toHaveBeenCalled();
    });
});