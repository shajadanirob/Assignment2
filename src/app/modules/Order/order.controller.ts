import { Request, Response } from 'express'; // Importing Request and Response types from Express
import orderServices from './order.services'; // Importing order services

// Controller function to create a new order
const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, productId, price, quantity } = req.body; // Destructuring request body to get order details
    const order = await orderServices.createOrder({
      email,
      productId,
      price,
      quantity,
    }); // Calling the createOrder service method with the provided order details

    // Sending success response with the created order details
    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: order,
    });
  } catch (error) {
    // Sending error response if an error occurs during order creation
    res.status(400).json({
      success: false,
      message: error || 'Server Error',
    });
  }
};

// Controller function to retrieve orders
const getOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query; // Getting the email query parameter from the request
    if (email && typeof email === 'string') {
      // If email is provided and is a string, fetch orders by email
      const orders = await orderServices.getAllOrders(email);
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: orders,
      });
    } else {
      // If no email is provided, fetch all orders
      const orders = await orderServices.getAllOrders();
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: orders,
      });
    }
  } catch (error) {
    // Sending error response if an error occurs during order retrieval
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error,
    });
  }
};

// Exporting the controller functions to be used in route definitions
export const orderController = {
  createOrder,
  getOrders,
};
