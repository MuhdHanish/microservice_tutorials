import {
    CustomHTTPError,
    validationHandler,
} from "@hanishdev-ticketing/common";
import { validParamId } from "../lib";
import { Request, Response, NextFunction, Router } from "express";

const router = Router();

router.delete("/:id",
    validationHandler(validParamId),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw new CustomHTTPError("ID is required.", 400);
            }
            res.status(204);
        } catch (error) {
            next(error);
        }
    });

export { router as deleteOrderRouter };