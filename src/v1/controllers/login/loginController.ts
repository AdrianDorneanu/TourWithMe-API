import bcrypt from 'bcrypt';
import { CookieOptions, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { getUserByEmail } from '../../services';

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    /**
     * Check if user sent required properties.
     */
    if (!email || !password) {
      return res.status(400).send({
        error: 'Please enter your email and password',
      });
    }

    /**
     * Check for existence in database and password matching.
     */
    const existingUser = await getUserByEmail(email);
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.length > 0 ? existingUser[0].password : '');

    if (existingUser.length === 0 || !isPasswordCorrect) {
      return res.status(401).send({
        error: 'Email address or password is incorrect',
      });
    }

    /**
     * Set the cookie with the token
     */
    const token = jwt.sign({ id: existingUser[0].user_id }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES,
    });
    const cookieOptions: CookieOptions = {
      expires: new Date(Date.now() + parseInt(process.env.COOKIE_EXPIRES || '90', 10) * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.cookie('jwt', token, cookieOptions);

    return res.status(200).send({
      message: 'Successfully logged in',
    });
  } catch (error) {
    console.error('Error during user login: ', error);

    return res.status(500).send({
      message: 'Something went wrong!',
    });
  }
}
