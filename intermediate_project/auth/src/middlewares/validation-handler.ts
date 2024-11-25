import { NextFunction, Request, Response } from "express";
import { validationResult } from 'express-validator';
import { CustomHTTPError } from "../lib/utils";

export const validationHandler = (validationRules: any[]) => {
    return [
        ...validationRules,
        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new CustomHTTPError(errors.array()[0].msg, 400);
            }
            next();
        },
    ];
};
