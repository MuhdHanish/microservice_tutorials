import {
    CustomHTTPError,
    OrderStatus,
    validationHandler,
} from "@hanishdev-ticketing/common";
import { Order, Ticket } from "../models";
import { validateCreateOrder } from "../lib";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();

const  EXPERRARION_WINDOW_SECONDS = 15 * 60;

router.post("/",
    validationHandler(validateCreateOrder),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ticket } = req.body;
            if (!ticket) {
                throw new CustomHTTPError("Ticket is required.", 400);
            }
            const existingTicket = await Ticket.findById(ticket);
            if (!existingTicket) {
                throw new CustomHTTPError("Ticket not found.", 404);
            }
            const isReserved = await existingTicket.isReserved();
            if (isReserved) {
                throw new CustomHTTPError("Ticket is already reserved.", 400);
            }
            const { id } = req.user!;
            const expiration = new Date();
            expiration.setSeconds(expiration.getSeconds() + EXPERRARION_WINDOW_SECONDS);
            const order = Order.build({
                user: id,
                status: OrderStatus.Created,
                expiresAt: expiration,
                ticket
            })
            await order.save();
            res.status(201).send({ order });
        } catch (error: any) {
            next(error);
        }
    });

export { router as createOrderRouter };