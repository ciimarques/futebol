import { Request, Response, Router } from 'express';
import TeamController from '../controller/teamController';

const teamControllerInstance = new TeamController();

const router = Router();

router.get('/', (req: Request, res: Response) => teamControllerInstance.getAllTeam(req, res));

export default router;
