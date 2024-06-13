import PrismaService from '../core/database.js';

export default class DishService {
  constructor() {
    this.prismaService = new PrismaService();
  }

  async create(data) {
    try {
      return await this.prismaService.dish.create({
        data: {
          name: data.name,
          categoryId: data.categoryId,
          image: data.image,
          description: data.description,
          prices: {
            create: {
              price: data.price,
            },
          },
        },
        include: {
          prices: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      return this.prismaService.dish.findMany({
        include: {
          prices: { orderBy: { updatedAt: 'desc' }, take: 1 },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getOne(id) {
    try {
      return this.prismaService.dish.findUnique({
        where: {
          id,
        },
        include: {
          prices: { orderBy: { updatedAt: 'desc' }, take: 1 },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const currentDish = await this.prismaService.dish.findUnique({
        where: { id },
        include: { prices: { orderBy: { updatedAt: 'desc' }, take: 1 } },
      });

      if (!currentDish) {
        throw new Error('Dish not found');
      }

      const currentPrice = currentDish.prices[0]?.price;
      const updatePriceData = currentPrice !== data.price ? {
        prices: {
          create: {
            price: data.price,
          },
        }
      } : {};

      return await this.prismaService.dish.update({
        where: { id },
        data: {
          name: data.name,
          categoryId: data.categoryId,
          image: data.image,
          description: data.description,
          ...updatePriceData,
        },
        include: {
          prices: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      return this.prismaService.dish.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
