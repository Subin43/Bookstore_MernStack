import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import mongoose from 'mongoose';
import bookRoute from './routes/bookRoute.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000; // Set a default port if PORT is not provided in .env
const MONGO_URL = process.env.MONGO_URL;
app.use(express.json());
// control the unauthorized request from browser
// Method: 1
//app.use(cors())
// method:2 
app.use(cors({
    origin: 'http://deploy-mern-1whq.vercel.app',
    content:['GET','POST','DELETE',"PUT"],
    credentials:true
}))
app.use('/books',bookRoute)

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
