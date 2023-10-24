import express, {Request,Response} from 'express';
const router = express.Router();
import { body } from 'express-validator';
import {Password} from '../services/password';
import jwt from 'jsonwebtoken';

import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';

router.post('/api/users/signin',
[
    body('email')
    .isEmail()
    .withMessage('email must be validated'),
    body('password')
    .trim()
    .notEmpty()
    .withMessage('You must supply a password')
],validateRequest, async (req: Request,res: Response)=>{
    const {email, password} = req.body;
    const existingUser = await User.findOne({email});

    if(!existingUser){
        throw new BadRequestError('Invalid credentials');
    }

    const passwordMatch = await Password.compare(existingUser.password,password);

    if(!passwordMatch){
        throw new BadRequestError('Invalid Credentials');
    }

    // generate a JWT and send
    const userJwt = jwt.sign({
        email: email,
        id: existingUser.id
    }, process.env.JWT_KEY!);

    req.session = {
        jwt: userJwt
    };
    

    res.status(200).send(existingUser);
});

export {router as signinRouter}