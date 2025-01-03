import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import db from '../database/connection';

export const registerUser = async (user: User): Promise<void> => {


        const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
        const [existingUser]: any = await db.execute(checkUserQuery, [user.email]);
    
        if (existingUser && existingUser.length > 0) {
            const error: any = new Error('User with this email already exists.');
            error.statusCode = 409;
            throw error;        
        }
      const hashedPassword = await bcrypt.hash(user.password, 10);
  
      const query = 'INSERT INTO users (user_name, email, password) VALUES (?, ?, ?)';
      await db.execute(query, [user.user_name, user.email, hashedPassword]);
  
  };
  

export const loginUser = async (email: string, password: string): Promise<string | null> => {
  const query = 'SELECT * FROM users WHERE email = ?';
  const [rows]: any = await db.execute(query, [email]);

  if (rows.length === 0) return null;

  const user = rows[0];
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) return null;

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  return token;
};
