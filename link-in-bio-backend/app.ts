import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { LinkController } from './src/controllers/linkController';
import dotenv from 'dotenv';
import { validate, appendParametersSchema, getLinksSchema} from './src/validators/linkValidator';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Database connection
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.post(
  '/append-parameters',
  validate(appendParametersSchema),
  LinkController.appendParameters
);

app.get(
  '/links',
  validate(getLinksSchema),
  LinkController.getLinks
);

export default app;
