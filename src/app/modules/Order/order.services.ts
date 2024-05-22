import { Order } from './order.model';

const createOrder = async (orderData: {
  email: string;
  productId: string;
  price: number;
  quantity: number;
}) => {
  try {
    const order = new Order(orderData);
    await order.save();
    return order;
  } catch (error) {
    throw new Error(`Error creating order: ${error}`);
  }
};

const getAllOrders = async (email?: string) => {
  try {
    let query = {};
    if (email) {
      query = { email };
    }
    const orders = await Order.find(query);
    return orders;
  } catch (error) {
    throw new Error(`Error fetching orders: ${error}`);
  }
};

export default {
  createOrder,
  getAllOrders,
};
