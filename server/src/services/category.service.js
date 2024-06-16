import PrismaService from '../core/database.js';

export default class CategoryService {
  constructor() {
    this.prismaService = new PrismaService();
  }

  async create(data) {
    try {
      return this.prismaService.category.create({
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      return this.prismaService.category.findMany();
    } catch (error) {
      throw error;
    }
  }

  async getOne(id) {
    try {
      return await this.prismaService.category.findUnique({
        where: {
          id,
        },
        include: {
          dishes: {
            include: {
              prices: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }
  

  async update(id, data) {
    try {
      return this.prismaService.category.update({
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
      return this.prismaService.category.delete({
        where: { 
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
