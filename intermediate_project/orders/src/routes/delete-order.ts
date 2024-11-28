import {
    CustomHTTPError,
    validationHandler,
} from "@hanishdev-ticketing/common";
import { validParamId } from "../lib";
import { Request, Response, NextFunction, Router } from "express";
import { Order } from "../models";

const router = Router();

router.delete("/:id",
    validationHandler(validParamId),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw new CustomHTTPError("ID is required.", 400);
            }
            const user = req.user!;
            const order = await Order.findOneAndDelete({ _id: id, user: user.id });
            if (!order) {
                throw new CustomHTTPError("Order not found with provided ID and user.", 404);
            }
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    });

export { router as deleteOrderRouter };