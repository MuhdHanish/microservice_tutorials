import {
    CustomHTTPError,
    validationHandler,
} from "@hanishdev-ticketing/common";
import { validParamId } from "../lib";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();

router.get("/:id",
    validationHandler(validParamId),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw new CustomHTTPError("ID is required.", 400);
            }
            const order = {} as any;
            if (!order) {
                throw new CustomHTTPError("Order not found with provided ID.", 404);
            }
            res.status(200).send({ order });
        } catch (error: any) {
            next(error);
        }
    });

export { router as getOrderByIdRouter };