import { Router } from 'express';

import { registerRouter } from './register';

export const apiRouter = Router();

apiRouter.use('/register', registerRouter);
