import { Request, Response, Router } from 'express';
import MatchController from '../controller/matchController';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getAllMatch(req, res));

export default router;
