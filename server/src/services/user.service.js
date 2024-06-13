import PrismaService from '../core/database.js';
import * as bcrypt from 'bcrypt';

export default class UserService{
  constructor() {
    this.prismaService = new PrismaService();
  }

  async getAll() {
    try {
      return this.prismaService.user.findMany();
    } catch (error) {
      throw error;
    }
  }

  async create(data) {
    try {
      const salt = bcrypt.genSaltSync(10);
      data.password = bcrypt.hashSync(data.password, salt);
      return this.prismaService.user.create({
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async getOne(id) {
    try {
      return this.prismaService.user.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      return this.prismaService.user.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update (id, data) {
    try {
      return this.prismaService.user.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      throw error;
    }
  }
}
