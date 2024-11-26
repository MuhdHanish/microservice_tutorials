import { Ticket } from "../models";
import {
    CustomHTTPError,
    validationHandler,
} from "@hanishdev-ticketing/common";
import { validateUpdateTicket } from "../lib";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();

router.put("/:id",
    validationHandler(validateUpdateTicket),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            if (!id) { 
                throw new CustomHTTPError("ID is required.", 400);
            }
            const { title, price } = req.body;
            if (!title || !price) {
                throw new CustomHTTPError("Title and price are required.", 400);
            }
            const ticket = await Ticket.findByIdAndUpdate(id, { title, price }, { new: true });
            if (!ticket) {
                throw new CustomHTTPError("Ticket not found with provided ID.", 404);
            }
            res.status(200).send({ ticket });
        } catch (error: any) {
            next(error);
        }
    });

export { router as updateTicketRouter };