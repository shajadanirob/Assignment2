import { Order } from './order.model'; // Import the Order model

// Function to create a new order
const createOrder = async (orderData: {
  email: string;
  productId: string;
  price: number;
  quantity: number;
}) => {
  try {
    // Create a new order instance with the provided order data
    const order = new Order(orderData);
    // Save the order to the database
    await order.save();
    // Return the created order
    return order;
  } catch (error) {
    // Throw an error if there's any issue creating the order
    throw new Error(`Error creating order: ${error}`);
  }
};

// Function to get all orders, optionally filtered by email
const getAllOrders = async (email?: string) => {
  try {
    let query = {};
    if (email) {
      // If email is provided, construct a query to filter orders by email
      query = { email };
    }
    // Find orders based on the constructed query
    const orders = await Order.find(query);
    // Return the fetched orders
    return orders;
  } catch (error) {
    // Throw an error if there's any issue fetching orders
    throw new Error(`Error fetching orders: ${error}`);
  }
};

// Exporting the functions as an object
export default {
  createOrder,
  getAllOrders,
};
