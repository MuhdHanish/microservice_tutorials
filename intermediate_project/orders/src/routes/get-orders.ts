import { NextFunction, Request, Response, Router } from "express";

const router = Router();

router.get("/",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orders: any = [];
            res.status(200).send({ orders });
        } catch (error: any) {
            next(error);
        }
    });

export { router as getAllOrdersRouter };