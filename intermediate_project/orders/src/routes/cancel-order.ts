import {
    CustomHTTPError,
    OrderStatus,
    validationHandler,
} from "@hanishdev-ticketing/common";
import { validParamId } from "../lib";
import { Request, Response, NextFunction, Router } from "express";
import { Order } from "../models";

const router = Router();

router.patch("/:id",
    validationHandler(validParamId),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw new CustomHTTPError("ID is required.", 400);
            }
            const user = req.user!;
            const order = await Order.findByIdAndUpdate(
                { _id: id, user: user.id },
                { status: OrderStatus.Cancelled },
                { new: true }
            );
            if (!order) {
                throw new CustomHTTPError("Order not found with provided ID and user", 404);
            }
            res.status(200).send({ order });
        } catch (error) {
            next(error);
        }
    });

export { router as cancelOrderRouter };