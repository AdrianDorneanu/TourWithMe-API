import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { v4 as uuid4 } from 'uuid';

import { db } from '../../config';

export async function register(req: Request, res: Response) {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).send({
        error: 'Email, password and username are required',
      });
    }

    db.query('SELECT email_address FROM users WHERE email_address=?', [email], async (err, result: any) => {
      if (err) {
        throw err;
      }

      if (result.length > 0) {
        return res.status(409).send({
          error: 'Email already exists',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 8);

      const newUser = {
        user_id: uuid4(),
        email_address: email,
        username,
      };

      db.query('INSERT INTO users SET ?', { password: hashedPassword, ...newUser }, (err, result) => {
        if (err) {
          throw err;
        }

        return res.status(201).send({
          ...newUser,
        });
      });
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Something went wrong!',
    });
  }
}
