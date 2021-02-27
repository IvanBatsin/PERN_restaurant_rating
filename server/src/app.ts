import path from 'path';
import dotenv from 'dotenv';
dotenv.config({path: path.join(__dirname, '.env')});

import express, { Application, Response, Request, NextFunction } from 'express';
const app: Application = express();

import { restaurantRouter } from './routes/restarauntsRoute';
import { HttpError } from './utils/httpError';
import morgan from 'morgan';
import cors from 'cors';
import { db } from './core/db';
import { reviewsRouter } from './routes/reviewsRoute';

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/restaurants', restaurantRouter);
app.use('/reviews', reviewsRouter);

app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status).json({
    status: 'error',
    message: error.message
  });
});

const start = async (): Promise<void> => {
  try {
    await db.authenticate();
    await db.sync();
    app.listen(process.env.PORT || 5000, () => console.log('we on air'));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();