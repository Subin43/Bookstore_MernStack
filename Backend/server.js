import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import bookRoute from './routes/bookRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  console.error('MONGO_URL not defined in environment variables');
  process.exit(1); // Exit the process with an error code
}

app.use(express.json());
app.use(cors({
  origin: 'bookstore-mern-stack-frontend.vercel.app',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true
}));
app.use('/books', bookRoute);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('App connected to database');
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Exit the process with an error code
  });

// Export a default function that returns the Express app
export default function () {
  return app;
}
