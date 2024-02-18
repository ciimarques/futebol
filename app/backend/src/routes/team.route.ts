import { Request, Response, Router } from 'express';
import TeamController from '../controller/teamController';

const teamController = new TeamController();

const router = Router();

router.get('/', (req: Request, res: Response) => teamController.getAllTeam(req, res));
router.get('/:id', (req: Request, res: Response) => teamController.getByIdTeam(req, res));

export default router;
