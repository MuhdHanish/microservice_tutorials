import { validationHandler } from "@hanishdev-ticketing/common";
import { Request, Response, Router, NextFunction } from "express";
import { validateCreatePayment } from "../lib";

const router = Router();

router.post("/",
    validationHandler(validateCreatePayment),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(201).send({ message: "Payment created successfully." });
        } catch (error) {
            next(error);
        }
    });

export { router as createPaymentRouter };