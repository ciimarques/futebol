import { Request, Response } from 'express';

class UserController {
  constructor() { }
  public async login(_req: Request, res: Response) {
    // const { email, password } = req.body;
    try {
      // const token = await UserService.userLogin(email, password);

      res.status(200).json({ 'token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc"});
    } catch (error) {
      const message = (error instanceof Error) ? error.message : 'Unknown error';
      res.status(401).json({ message });
    }
  }
}

export default UserController;
