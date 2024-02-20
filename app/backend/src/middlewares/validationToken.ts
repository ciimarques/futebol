import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET as any);
    req.body.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default {
  validateToken,
};
