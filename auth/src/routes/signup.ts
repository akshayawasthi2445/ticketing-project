import express, {Request,Response} from 'express';
import { body, validationResult } from 'express-validator';
const router = express.Router();

router.post('api/users/signup',[
    body('email')
    .isEmail()
    .withMessage('email must be validated'),
    body('password')
    .trim()
    .isLength({min:4, max: 20})
    .withMessage('Password must be 4 and 20 characters long')],(req: Request,res: Response)=>{
        const result = validationResult(req);
        if(result.isEmpty()){
            res.send(`Error Generated ${result}`);
        }
        res.send('In the signup middleware post successful validation check....');
});

export {router as signupRouter};