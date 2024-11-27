import { Ticket } from "../models";
import {
    CustomHTTPError,
    TicketCreatedPublisher,
    validationHandler,
} from "@hanishdev-ticketing/common";
import { validateCreateTicket } from "../lib";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();

router.post("/",
    validationHandler(validateCreateTicket),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { title, price } = req.body;
            if (!title || !price) {
                throw new CustomHTTPError("Title and price are required.", 400);
            }
            const { id } = req.user!;
            const ticket = Ticket.build({ title, price, user: id });
            await ticket.save();
            new TicketCreatedPublisher({} as any).publish({
                id: ticket.id,
                title: ticket.title,
                price: ticket.price,
                user: id
            });
            res.status(201).send({ ticket});
        } catch (error: any) {
            next(error);
        }
    });

export { router as createTickerRouter };