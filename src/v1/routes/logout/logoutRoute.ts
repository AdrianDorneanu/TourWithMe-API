import { Router } from 'express';

import { logout } from '../../controllers';

export const logoutRouter = Router();

logoutRouter.get('/', logout);
