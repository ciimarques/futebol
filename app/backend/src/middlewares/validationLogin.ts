import { Request, Response, NextFunction } from 'express';

function ValidateEmail(email: string, res: Response) {
  if (!email) {
    res.status(400).json({ message: 'All fields must be filled' });
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(401).json({ message: 'Invalid email or password' });
    return false;
  }
  return true;
}

function ValidatePassword(password: string, res: Response) {
  if (!password) {
    res.status(400).json({ message: 'All fields must be filled' });
    return false;
  }
  if (password.length < 6) {
    res.status(401).json({ message: 'Invalid email or password' });
    return false;
  }
  return true;
}

function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!ValidateEmail(email, res)) return;
  if (!ValidatePassword(password, res)) return;
  next();
}

export default {
  validateLogin,
};
