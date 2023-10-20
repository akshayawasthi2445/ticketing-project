import express, {Request,Response} from 'express';
import { Result, ValidationError, body, validationResult } from 'express-validator';
const router = express.Router();
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from  'jsonwebtoken';

router.post('/api/users/signup',[
    body('email')
    .isEmail()
    .withMessage('email must be validated'),
    body('password')
    .trim()
    .isLength({min:4, max: 20})
    .withMessage('Password must be 4 and 20 characters long')], async (req: Request,res: Response)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw new RequestValidationError(errors.array());
        }
        
        const {email,password} = req.body;
        const existingUser = await User.findOne({email});

        if(existingUser){
            throw new BadRequestError('Email in use');
        }

        const user = User.build({email,password});
        await user.save();

        const userJwt = jwt.sign({
            email: email,
            id: user.id
        }, '453454');

        req.session = {
            jwt: userJwt
        };


        res.status(201).send(user);
});

export {router as signupRouter};