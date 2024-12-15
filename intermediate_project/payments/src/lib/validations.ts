import { body } from "express-validator";

export const validateCreatePayment = [
    body("token")
        .exists()
        .withMessage("Token is required."),
    body("order")
        .exists()
        .withMessage("Order id is required.")
        .isMongoId()
        .withMessage("Invalid order id.")
];