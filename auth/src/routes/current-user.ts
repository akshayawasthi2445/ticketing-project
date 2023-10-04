import express from 'express';
const router = express.Router();

router.get('api/users/currentuser',(req,res,next)=>{
    res.send('In the current-user middlewares');
});

export {router as currentUserRouter};