import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export function loggedIn(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).send({
      error: 'Not authenticated',
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string, (err: unknown, decoded: unknown) => {
      if (err) {
        return res.status(401).send({
          error: 'Invalid token',
        });
      }

      next();
    });
  } catch (error) {
    console.error('Error during token verification: ', error);

    return res.status(500).send({
      error: 'Internal server error',
    });
  }
}
