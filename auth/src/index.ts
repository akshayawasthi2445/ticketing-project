import express, {Request, Response, NextFunction} from 'express';
require('express-async-errors');
import { json } from 'body-parser';
import mongoose from 'mongoose';

const app = express();
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import cookieSession = require('cookie-session');


app.use(json());
app.set('trust proxy', true); // this addition is because that traffic is being proximated to our application through ingress nginx
// Long story short, we are just adding in this little step right here to make sure that Express is aware
// that the incoming traffic is behind a proxy of Ingress Engine X, and to make sure that it should still trust traffic as
// being secure, even though it's coming from that proxy.
app.use(
  cookieSession({
    signed: false,
    secure: true // this secure: true means that user should be on an HTTPS connection to visit our application, this also means that 
    // we configured our app to say that ignore or do not try to manage any cookies if the user is connecting over any connection other
    // than HTTPS.
  })
)


app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(errorHandler);
app.all('*',async (req,res,next)=>{
  throw new NotFoundError();
})

const start = async () => {
  try{
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
  } catch (err) {
    console.log(err);
  }
  console.log('Connected to MongoDB');
  app.listen(3000, async () => {
    console.log('Listening at port 3000');
  });
}

start();
