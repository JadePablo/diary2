import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import router from './routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', router);

const connectionString = 'mongodb+srv://allenjade154:G6KhXePPeYQtPQ9g@cluster0.8jxxf5k.mongodb.net/';

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
