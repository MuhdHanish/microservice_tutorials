import jwt from "jsonwebtoken";
import { CustomHTTPError } from "../lib/utils";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();

router.get("/currentuser", (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req?.session?.token) { 
            throw new CustomHTTPError("No authorization token found.", 401);
        }
        const { token } = req?.session;
        const payload = jwt.verify(token, process.env.JWT_SECRET!);
        res.send({ user: payload });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return next(new CustomHTTPError("Invalid token, Access forbidden.", 403));
        }
        next(error);
    }
});

export { router as currentUserRouter };