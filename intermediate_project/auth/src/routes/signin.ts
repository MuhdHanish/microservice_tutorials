import { User } from "../models";
import { CustomHTTPError } from "../lib/utils";
import { validationHandler } from "../middlewares";
import { validateEmailPassword } from "../lib/validations";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();

router.post("/signin",
    validationHandler(validateEmailPassword),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new CustomHTTPError("Email and password are required.", 400);
            }

            const user = await User.findOne({ email });
            if (!user || !await user.comparePassword(password)) {
                throw new CustomHTTPError("Credentials are not valid.", 401);
            }

            res.send({ user });
        } catch (error: any) {
            next(error);
        }
    });

export { router as signinRouter };