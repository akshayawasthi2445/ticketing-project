import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";


export class RequestValidationError extends CustomError{
    statusCode: number = 400;
    errors: ValidationError[];
    constructor(errors : ValidationError[]){
        super('Invalid request parameters');
        this.errors = errors;
        // Using this line only because we are extending a built-in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors(){
        return this.errors.map(error => {
            return {message: error.msg, field: 'Password or Email'};
        })
    }
};
