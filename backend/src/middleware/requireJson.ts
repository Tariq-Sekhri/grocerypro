import RequestMethods from "../enums/RequestMethods";
import { NextFunction, Request, Response } from "express";

export default function requireJson(req: Request, res: Response, next: NextFunction): void {
    const reqMethod = req.method;
    if ((reqMethod == RequestMethods.POST || reqMethod == RequestMethods.PATCH) && !req.is('application/json')) {
        res.status(415).send("Content-Type must be application/json");
        return;
    }
    next();
};
