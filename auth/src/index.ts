import mongoose from 'mongoose';
import { app } from './app';


const start = async () => {
  if(!process.env.JWT_KEY){
    throw new Error('JWT_KEY must be defined');
  }
  
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
