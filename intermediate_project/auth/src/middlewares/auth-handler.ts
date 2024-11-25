import jwt from "jsonwebtoken";
import { CustomHTTPError } from "../lib/utils";
import { NextFunction, Request, Response } from "express";

interface IUserPayload {
    id: string;
    email: string;
};

declare global {
    namespace Express {
        interface Request {
            user?: IUserPayload;
        }
    }
};

export const authHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.session?.token) {
            throw new CustomHTTPError("No authorization token found.", 401);
        }
        const { token } = req?.session;
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as IUserPayload;
        req.user = payload;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return next(new CustomHTTPError("Invalid token, Access forbidden.", 403));
        }
        next(error);
    }
};