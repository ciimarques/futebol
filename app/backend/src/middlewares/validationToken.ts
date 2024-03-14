import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const tokenReplaced = token.replace('Bearer ', '');
    const decoded = jwt.verify(tokenReplaced, 'secret');
    req.body.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default {
  validateToken,
};
