import { Request, Response, Router } from "express";

const router = Router();

router.post("/signin", (req: Request, res: Response) => {
    res.send({});
});

export { router as signinRouter };