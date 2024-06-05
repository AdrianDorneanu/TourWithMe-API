import { Router } from 'express';

import { register } from '../../controllers';
import { db } from '../../config';

export const registerRouter: Router = Router();

registerRouter.post('/', register);
