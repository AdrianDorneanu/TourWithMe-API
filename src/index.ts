import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

/**
 * Middlewares
 */
app.use(express.json());
app.use(morgan('dev'));

/**
 * Routes
 */
app.get('/', (req: Request, res: Response) => {
  res.send('Tour With Me server homepage');
});

/**
 * Listen
 */
app.listen(port, () => {
  console.log('Listening on port', port);
});
