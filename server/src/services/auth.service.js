import PrismaService from '../core/database.js';
import { ApiError } from '../middlewares/error.middleware.js';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class AuthService {
  constructor() {
    this.prismaService = new PrismaService();
  }

  async login (data) {
    const user = await this.prismaService.user.findUnique({
      where: {
        username: data.username,
      },
    });
    if (!user || await bcrypt.compare(data.password, user.password) === false) {
      throw new ApiError(401, 'Invalid username or password');
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    return token;
  };
}
