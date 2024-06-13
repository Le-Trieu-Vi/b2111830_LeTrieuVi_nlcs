import PrismaService from "../core/database.js";

export default class OrderService {
    constructor() {
        this.prismaService = new PrismaService();
    }

    async create(data) {
        try {
            console.log(data.items);
            const createdOrder = await this.prismaService.order.create({
                data: {
                    userId: data.userId,
                    tableId: data.tableId,
                    status: data.status,
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
}