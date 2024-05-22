import { Request, Response } from 'express';
import orderServices from './order.services';


const createOrder = async (req: Request, res: Response) => {
    try {
        const { email, productId, price, quantity } = req.body;
        const order = await orderServices.createOrder({ email, productId, price, quantity });
        res.status(201).json({
            success: true,
            message: 'Order created successfully!',
            data: order
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error || 'Server Error'
        });
    }
};



const getOrders = async (req: Request, res: Response) => {
    try {
        const { email } = req.query;
        if (email && typeof email === 'string') {
            const orders = await orderServices.getOrdersByEmail(email);
            res.status(200).json({
                success: true,
                message: 'Orders fetched successfully for user email!',
                data: orders
            });
        } else {
            const orders = await orderServices.getAllOrders();
            res.status(200).json({
                success: true,
                message: 'Orders fetched successfully!',
                data: orders
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error,
           
        });
    }
};


export const orderController = {
    createOrder,
    getOrders,
   
}