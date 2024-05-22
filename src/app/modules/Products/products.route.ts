import express from 'express';
import { ProductController } from '../products.controller'; // Importing the product controller

const router = express.Router(); // Creating an instance of Express router

// Defining routes and their corresponding controller methods
router.post('/', ProductController.createProduct); // Route for creating a new product
router.get('/:productId', ProductController.getSingleProduct); // Route for getting a single product by ID
router.get('/', ProductController.getAllProduct); // Route for getting all products
router.put('/:productId', ProductController.updateProducts); // Route for updating a product by ID
router.delete('/:productId', ProductController.deleteProduct); // Route for deleting a product by ID

export const ProductRoute = router; // Exporting the router as ProductRoute
