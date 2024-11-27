import {
    CustomHTTPError,
    validationHandler,
} from "@hanishdev-ticketing/common";
import { validateCreateOrder } from "../lib";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();

router.post("/",
    validationHandler(validateCreateOrder),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ticket } = req.body;
            if (!ticket) {
                throw new CustomHTTPError("Ticket is required.", 400);
            }
            const { id } = req.user!;
            const order = {} as any
            await order.save();
            res.status(201).send({ order });
        } catch (error: any) {
            next(error);
        }
    });

export { router as createOrderRouter };