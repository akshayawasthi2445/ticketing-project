import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
    statusCode: number = 401;
    reason: string = 'Unauthorized Access';

    constructor(reason: string){
        super('Not authorized');
        this.reason = reason;
        Object.setPrototypeOf(this,NotAuthorizedError.prototype);
    }
    serializeErrors() {
        return [{message: this.reason}];
    }
}