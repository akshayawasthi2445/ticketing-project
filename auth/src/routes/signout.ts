import express from 'express';
const router = express.Router();

router.post('api/users/signout',(req,res,next)=>{
    // getting email and password from the req body, this is an assumption that we might get email and password only, but someone
    // can send the bad code in it too which can probably corrupt our system
    const {email,password} = req.body;

    // use express-validator for validation
    
});

export {router as signoutRouter};