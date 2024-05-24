import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import bookRoute from './routes/bookRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());

// Set up CORS
app.use(cors());

// Define CORS options
const corsOptions = {
  origin: '*', // Allow requests from any origin
  methods: ['GET', 'POST', 'DELETE', 'PUT'], // Allow specified methods
  allowedHeaders: ['Content-Type'], // Allow specified headers
};

// Enable preflight requests for CORS
app.options('*', cors(corsOptions));

// Route for books
app.use('/books', bookRoute);

// Connect to MongoDB
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });
