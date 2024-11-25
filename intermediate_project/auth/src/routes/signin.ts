import { NextFunction, Request, Response, Router } from "express";
import { CustomHTTPError } from "../lib/utils";
import { validationHandler } from "../middlewares";
import { validateEmailPassword } from "../lib/validations";

const router = Router();

router.post("/signin",
    validationHandler(validateEmailPassword),
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new CustomHTTPError("Email and password are required.", 400);
            }
            res.send({});
        } catch (error: any) {
            next(error);
        }
    });

export { router as signinRouter };