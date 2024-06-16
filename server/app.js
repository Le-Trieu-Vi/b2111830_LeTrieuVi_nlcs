import express from 'express';
import viewEngine from './src/config/viewEngine.js';
import userRouter from './src/routes/user.route.js';
import authRouter from './src/routes/auth.route.js';
import tableRouter from './src/routes/table.route.js';
import categoryRouter from './src/routes/category.route.js';
import dishRouter from './src/routes/dish.route.js';
import orderRouter from './src/routes/order.route.js';
import orderDetailRouter from './src/routes/orderDetail.route.js';
import { errorHandler } from './src/middlewares/error.middleware.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// route user
app.use('/api/users', userRouter);

// route auth
app.use('/api/auth', authRouter);

// route table
app.use('/api/tables', tableRouter);

// route category
app.use('/api/categories', categoryRouter);

// route dish
app.use('/api/dishes', dishRouter);

// route order
app.use('/api/orders', orderRouter);

// route orderDetail
app.use('/api/order-details', orderDetailRouter);

// error handler
app.use(errorHandler);

viewEngine(app);

export default app;