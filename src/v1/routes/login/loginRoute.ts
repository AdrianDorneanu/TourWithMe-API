import { Router } from 'express';

import { login } from '../../controllers';

export const loginRouter = Router();

loginRouter.post('/', login);
