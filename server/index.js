import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import router from './routes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({limit:'200kb'}));
app.use('/', router);

const connectionString = process.env.MONGODB_CONNECTION_STRING;

const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server after successful database connection
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
