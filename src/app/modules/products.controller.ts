// import { Request, Response } from 'express';

import { Request, Response } from 'express';
import { ProductService } from './Products/products.serveice';
import { createProductSchema } from './Products/products.validation';
import { Product } from './Products/products.model';
// Controller function to create a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { error } = createProductSchema.validate(req.body); // Validate the request body
    if (error)
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });

    const product = new Product(req.body); // Create a new product instance
    await product.save(); // Save the product to the database
    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      data: product,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Controller function to get all products
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query; // Get the search term from the query
    let products;

    if (searchTerm && typeof searchTerm === 'string') {
      // If searchTerm exists, call ProductService with the searchTerm
      products = await ProductService.getAllProducts(searchTerm);
      res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: products,
      });
    } else {
      // If searchTerm does not exist, call ProductService without the searchTerm
      products = await ProductService.getAllProducts();
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: products,
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

// Controller function to get a single product by ID
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.getSingleProducts(productId);
    res.status(404).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// Controller function to update a product by ID
const updateProducts = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = req.body.params;
    const result = await ProductService.updateProducts(productId, product);
    res.status(404).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// Controller function to delete a product by ID
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await ProductService.deleteProducts(productId);
    if (!deletedProduct) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: null,
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

export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProducts,
  deleteProduct,
};
