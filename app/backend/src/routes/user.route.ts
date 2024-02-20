import { Request, Response, Router } from 'express';
import validationLogin from '../middlewares/validationLogin';
import UserController from '../controller/userController';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  validationLogin.validateLogin,
  (req: Request, res: Response) => {
    userController.login(req, res);
  },
);

export default router;
