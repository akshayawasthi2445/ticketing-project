import express, {Request, Response, NextFunction} from 'express';
require('express-async-errors');
import { json } from 'body-parser';
const app = express();
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';


app.use(json()); 

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(errorHandler);
app.all('*',async (req,res,next)=>{
  throw new NotFoundError();
})

app.listen(3000, async () => {
  console.log('Listening at port 3000');
});