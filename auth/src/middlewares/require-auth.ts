import { Request,Response,NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

// We are assuming that this middleware ("requireAuth") runs after our current-user middleware
export const requireAuth = (req:Request,res:Response,next: NextFunction) => {
    if(!req.currentUser){
        throw new NotAuthorizedError('Not Authorized');
    }
    next();
}