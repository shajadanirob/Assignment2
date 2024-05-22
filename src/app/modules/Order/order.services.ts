import { Order } from "./order.model";


const createOrder = async (orderData: { email: string; productId: string; price: number; quantity: number }) => {
    try {
        const order = new Order(orderData);
        await order.save();
        return order;
    } catch (error) {
        throw new Error(`Error creating order: ${error}`);
    }
};

const getAllOrders = async () => {
    try {
        const orders = await Order.find();
        return orders;
    } catch (error) {
        throw new Error(`Error fetching orders: ${error}`);
    }
};

const getOrdersByEmail = async (email: string) => {
    try {
        const orders = await Order.find({ email });
        return orders;
    } catch (error) {
        throw new Error(`Error fetching orders for email ${email}: ${error}`);
    }
};

export default {
    createOrder,
    getAllOrders,
    getOrdersByEmail
};
