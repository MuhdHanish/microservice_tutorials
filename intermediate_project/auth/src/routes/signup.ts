import { NextFunction, Request, Response, Router } from "express";
import { CustomHTTPError } from "../lib/utils";
import { validationHandler } from "../middlewares";
import { validateEmailPassword } from "../lib/validations";
import { User } from "../models";

const router = Router();

router.post("/signup",
    validationHandler(validateEmailPassword),
    async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {   
            throw new CustomHTTPError("Email and password are required.", 400);
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new CustomHTTPError("Email already exists.", 409);
        }

        const user = User.build({ email, password });
        await user.save();

        res.status(201).send({ user });
    } catch (error: any) {
        next(error);
    }
});

export { router as signupRouter };