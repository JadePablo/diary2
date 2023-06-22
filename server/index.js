import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import router from './routes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', router);

const connectionString = process.env.MONGODB_CONNECTION_STRING;

// Connect to MongoDB
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server after successful database connection
    app.listen(5000, () => {
      console.log(`Listening on port ${5000}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
