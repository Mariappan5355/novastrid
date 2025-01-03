import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Define the User type (matches the structure of your decoded JWT)
interface User {
  id: number;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User; // Use the specific User type here
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');    

  if (!token) {
    res.status(401).json({ message: 'Authentication token is required.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (typeof decoded === 'object' && decoded !== null && 'id' in decoded && 'email' in decoded) {
      req.user = decoded as User;
      next(); 
    } else {
      throw new Error('Invalid token payload');
    }
  } catch (error) {
    console.error('Invalid token:', error);
    res.status(403).json({ message: 'Invalid or expired token.' });
    return; 
  }
};
