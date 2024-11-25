import { Request, Response, Router } from "express";

const router = Router();

router.get("/currentuser", (req: Request, res: Response) => {
    res.send({ user: "Muhammed Hanish" });
});

export { router as currentUserRouter };