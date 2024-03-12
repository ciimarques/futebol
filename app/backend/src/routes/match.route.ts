import { Request, Response, Router } from 'express';
import MatchController from '../controller/matchController';
import validationToken from '../middlewares/validationToken';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getAllMatch(req, res));
router.patch(
  '/:id/finish',
  validationToken.validateToken,
  (req: Request, res: Response) => matchController.finishMatchById(req, res),
);
router.patch(
  '/:id',
  validationToken.validateToken,
  (req: Request, res: Response) => matchController.updateMatchResult(req, res),
);
router.post(
  '/',
  validationToken.validateToken,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

export default router;
