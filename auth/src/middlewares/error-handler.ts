import { Request,Response,Express } from "express";
import { NextFunction } from "express";

import { CustomError } from "../errors/custom-error";
export const errorHandler = (err: Error,req: Request,res: Response,next: NextFunction) => {
    if(err instanceof CustomError){
        console.log(err.message);
        console.log('-------------------');
        return res.status(err.statusCode).send({errors: err.serializeErrors()});
    }
    
    res.status(500).send({errors: [{message: "Something is wrong here..Please try again once"}]});
}