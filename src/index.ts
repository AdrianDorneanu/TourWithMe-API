import cookie from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import morgan from 'morgan';

import { db } from './config';
import { registerRouter } from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

/**
 * Middlewares
 */
app.use(cookie());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

/**
 * Routes
 */
app.use('/api/v1/register', registerRouter);

db.connect((err) => {
  if (err) {
    throw err;
  }
});

/**
 * Listen
 */
app.listen(port, () => {
  console.log('Listening on port', port);
});
