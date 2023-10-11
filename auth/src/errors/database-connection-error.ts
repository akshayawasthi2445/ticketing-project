import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError{
    reason: string = 'Error connecting to the database';
    statusCode = 500;
    constructor(reason: string){
        super('Error connecting to DB');
        this.reason = reason;
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors(){
        return [{message: this.reason}];
    }
};