import { Request, Response, Router } from 'express';
import validationLogin from '../middlewares/validationLogin';
import UserController from '../controller/userController';
import validationToken from '../middlewares/validationToken';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  validationLogin.validateLogin,
  (req: Request, res: Response) => {
    userController.login(req, res);
  },
);
router.get(
  '/role',
  validationToken.validateToken,
  (req: Request, res: Response) => {
    userController.getRole(req, res);
  },
);

export default router;
