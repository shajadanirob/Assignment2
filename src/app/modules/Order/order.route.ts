import express from 'express';
import { orderController } from './order.controller'; // Importing the order controller

const router = express.Router(); // Creating a new router instance

// Route for creating a new order
router.post('/', orderController.createOrder);

// Route for retrieving all orders or orders by email if query parameter is provided
router.get('/', orderController.getOrders);

export const orderRoute = router; // Exporting the router to be used in other parts of the application
