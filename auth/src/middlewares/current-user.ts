import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface UserPayload {
    email: string;
    id: string;
};


// this is the "TRICK" here with which we can reach into existing type definition and make a modification to it
// So here we are adding a "currentUser" property to the Request interface of Express 
// which can be understood by TS as it references it's type definition file for 
// checking the properties
// This will not show error where we are defining req.currentUser = payload;
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if(!req.session || !req.session.jwt){
         return next();
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        req.currentUser = payload;
    } catch(err) {}
    next();
}