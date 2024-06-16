import PrismaService from "../core/database.js";

export default class OrderService {
    constructor() {
        this.prismaService = new PrismaService();
    }

    async create(data) {
        try {
            const createdOrder = await this.prismaService.order.create({
                data: {
                    userId: data.userId,
                    tableId: data.tableId,
                    orderDetails: {
                        create: data.items.map(item => ({
                            dishId: item.dishId,
                            quantity: item.quantity,
                        })),
                    },
                },
                include: {
                    orderDetails: true,
                },
            });
    
            return createdOrder;
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            return this.prismaService.order.findMany({
                include: {
                    orderDetails: true,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async getOne(id) {
        try {
            return this.prismaService.order.findUnique({
                where: {
                    id,
                },
                include: {
                    orderDetails: true,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async update(id, data) {
        try {
            return this.prismaService.order.update({
                where: {
                    id,
                },
                data,
                include: {
                    orderDetails: true,
                },
            });
        } catch (error) {
            throw error;
        }
    }
}