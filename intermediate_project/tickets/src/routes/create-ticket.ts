import {
    CustomHTTPError,
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
            res.status(201).send({});
        } catch (error: any) {
            next(error);
        }
    });

export { router as createTickerRouter };