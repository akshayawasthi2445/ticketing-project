import express from 'express';
const router = express.Router();

router.post('/api/users/signin',(req,res,next)=>{
    throw new Error('BROKEN');
    // res.send('In the signin middleware');
});

export {router as signinRouter}