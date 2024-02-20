import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/UsersModel';

class UserService {
  constructor(
    private usersModel = UserModel,
  ) { }

  public async userLogin(email: string, password: string): Promise<string> {
    const user = await this.usersModel.findOne({ where: { email } });
    if (!user) throw new Error('Username or password invalid');
    const match = await bcrypt.compare(password, user.dataValues.password);
    if (!match) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
      {
        id: user.dataValues.id,
        email,
        password,
      },
      process.env.JWT_SECRET as string,
    );
    return token;
  }
}

export default UserService;
