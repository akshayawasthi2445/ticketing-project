import express, {Request,Response} from 'express';
import { Result, ValidationError, body, validationResult } from 'express-validator';
const router = express.Router();
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

router.post('/api/users/signup',[
    body('email')
    .isEmail()
    .withMessage('email must be validated'),
    body('password')
    .trim()
    .isLength({min:4, max: 20})
    .withMessage('Password must be 4 and 20 characters long')],(req: Request,res: Response)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw new RequestValidationError(errors.array());
        }

        throw new DatabaseConnectionError('Database is down currently, Please try again later');
});

export {router as signupRouter};