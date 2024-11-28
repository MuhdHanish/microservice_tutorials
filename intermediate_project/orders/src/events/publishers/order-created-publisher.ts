import { OrderCreatedEvent, Publisher, Subjects, TicketCreatedEvent } from "@hanishdev-ticketing/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
}
