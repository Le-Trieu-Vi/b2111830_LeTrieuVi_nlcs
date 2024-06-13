import { object, string, array, number } from 'yup';
import { ApiError } from './error.middleware.js';

const createOrderSchema = object({
    tableId: string().required(),
    userId: string().required(),
    items: array().of(
        object({
            dishId: string().required(),
            quantity: number().integer().min(1).required(),
        })
    ).required(),
    status: string().oneOf(['pending', 'completed']).required(),
});

export const create = async (req, res, next) => {
    try {
        req.body = await createOrderSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        return next(new ApiError(400, error.errors.join(', ')));
    }
}