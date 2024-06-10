import { Request, Response } from 'express';

import { findUserByEmail, createUser } from '../../services';

export async function register(req: Request, res: Response) {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).send({
        error: 'Email, password, and username are required',
      });
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser.length > 0) {
      return res.status(409).send({
        error: 'Email already exists',
      });
    }

    const newUser = await createUser(email, username, password);

    return res.status(201).send({
      message: 'User registered successfully',
      user: {
        user_id: newUser.user_id,
        email_address: newUser.email_address,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    return res.status(500).send({
      message: 'Something went wrong!',
    });
  }
}
