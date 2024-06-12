import { Request, Response } from 'express';

export function logout(req: Request, res: Response) {
  res.cookie('jwt', '', { maxAge: 1 });

  res.status(200).send({
    message: 'Successfully logged out',
  });
}
