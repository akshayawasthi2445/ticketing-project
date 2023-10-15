import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
    message: string;
    constructor(message: string){
        super('Logging Email in use');
        this.message = message;
        Object.setPrototypeOf(this,BadRequestError.prototype);
    }
    statusCode = 400;
    serializeErrors() {
        return [{message: this.message}]
    }
}