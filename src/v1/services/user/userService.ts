import bcrypt from 'bcrypt';
import { v4 as uuid4 } from 'uuid';

import { db } from '../../config';

interface User {
  username: string;
  user_id: string;
  email_address: string;
  password: string;
}

export async function createUser(email: string, username: string, password: string): Promise<User> {
  const hashedPassword = await bcrypt.hash(password, 8);

  const newUser = {
    user_id: uuid4(),
    email_address: email,
    username,
    password: hashedPassword,
  };

  return new Promise((resolve, reject) => {
    db.query('INSERT INTO users SET ?', newUser, (err, result) => {
      if (err) {
        return reject(err);
      }

      resolve(newUser);
    });
  });
}

export async function findUserByEmail(email: string): Promise<User[]> {
  return new Promise((resolve, reject) => {
    db.query('SELECT email_address FROM users WHERE email_address = ?', [email], (err, result) => {
      if (err) {
        return reject(err);
      }

      resolve(result as User[]);
    });
  });
}

export async function getUserByEmail(email: string): Promise<User[]> {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email_address = ?', [email], (err, result) => {
      if (err) {
        return reject(err);
      }

      resolve(result as User[]);
    });
  });
}
