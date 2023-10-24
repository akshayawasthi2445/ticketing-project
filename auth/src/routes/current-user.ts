import express from 'express';
const router = express.Router();
//import jwt from 'jsonwebtoken';
import { currentUser } from '../middlewares/current-user';
//import { requireAuth } from '../middlewares/require-auth';

router.get('/api/users/currentuser',currentUser,(req,res,next)=>{
    res.send({currentUser: req.currentUser || null});
});

export {router as currentUserRouter};