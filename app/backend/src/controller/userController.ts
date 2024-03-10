import { Request, Response } from 'express';
import UserService from '../service/user.service';

class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const token = await this.userService.userLogin(email, password);
      res.status(200).json({ token });
    } catch (error) {
      const message = (error instanceof Error) ? error.message : 'Unknown error';
      res.status(401).json({ message });
    }
  }

  public async getRole(req: Request, _res: Response) {
    return req.body.user.role;
  }
}

export default UserController;
