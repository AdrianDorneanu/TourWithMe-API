import { Router } from 'express';

import { register } from '../../controllers';

export const registerRouter: Router = Router();

registerRouter.post('/', register);
