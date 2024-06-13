import PrismaService from '../core/database.js';

export default class TableService {
  constructor() {
    this.prismaService = new PrismaService();
  }

  async create(data) {
    try {
      return this.prismaService.table.create({
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      return this.prismaService.table.findMany();
    } catch (error) {
      throw error;
    }
  }

  async getOne(id) {
    try {
      return this.prismaService.table.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    console.log(id, data);
    try {
      return this.prismaService.table.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      return this.prismaService.table.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
