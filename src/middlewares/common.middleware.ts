import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { ApiError } from "../errors/api.error";

class CommonMiddleware {

    public isBodyValid(validator: ObjectSchema) {
        return function (req: Request, res: Response, next: NextFunction) {
            try {
                const { error, value } = validator.validate(req.body);
                if(error){
                    throw new ApiError(error.details[0].message, 400);
                }
                req.body = value;

                next();
            } catch (e) {
                next(e);
            }
        };
    }
}

export const commonMiddleware = new CommonMiddleware();