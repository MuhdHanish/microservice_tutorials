import { Ticket } from "../models";
import { authHandler } from "@hanishdev-ticketing/common";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();

router.get("/",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tickets = await Ticket.find({});
            res.status(200).send({ tickets });
        } catch (error: any) {
            next(error);
        }
    });

export { router as getAllTicketsRouter };