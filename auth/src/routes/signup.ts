import express, {Request,Response} from 'express';
import { Result, ValidationError, body, validationResult } from 'express-validator';
const router = express.Router();
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from  'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';

router.post('/api/users/signup',[
    body('email')
    .isEmail()
    .withMessage('email must be validated'),
    body('password')
    .trim()
    .isLength({min:4, max: 20})
    .withMessage('Password must be 4 and 20 characters long')], validateRequest,async (req: Request,res: Response)=>{

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
        }, process.env.JWT_KEY!);

        req.session = {
            jwt: userJwt
        };
        

        res.status(201).send(user);
});

export {router as signupRouter};