import { Request, Response, Router } from "express";
import { CustomHTTPError } from "../lib/utils";
import { validationMiddleware } from "../middlewares";
import { validateEmailPassword } from "../lib/validations";

const router = Router();

router.post("/signup",
    validationMiddleware(validateEmailPassword),
    (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {   
            throw new CustomHTTPError("Email and password are required.", 400);
        }
        res.send({});
    } catch (error: any) {
        if (error instanceof CustomHTTPError) {
            res.status(error.status).send({ message: error?.message });
        } else {
            res.status(500).send({
                message: "Something went wrong.",
                error: error?.message || "Unexpected error."
            });
        }
    }
});

export { router as signupRouter };