import { Request, Response, Router } from "express";

const router = Router();

router.post("/signout", (req: Request, res: Response) => {
    res.send({});
});

export { router as signoutRouter };