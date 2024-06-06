import cookie from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { db } from './v1/config';
import { apiRouter } from './v1/routes';

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
app.use(helmet());
app.use(morgan('dev'));

/**
 * Main API route
 */
app.use('/api/v1', apiRouter);

/**
 * Database
 */
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
