import { Router } from 'express';

import { registerRouter } from './register';
import { loginRouter } from './login';
import { logoutRouter } from './logout';

import { loggedIn } from '../middlewares';

export const apiRouter = Router();

apiRouter.use('/register', registerRouter);
apiRouter.use('/login', loginRouter);
apiRouter.use('/logout', loggedIn, logoutRouter);
