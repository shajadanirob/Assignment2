/* eslint-disable @typescript-eslint/ban-types */

// Importing the interface and model
import { TProduct } from './products.interface';
import { Product } from './products.model';

// Service function to create a new product
const createProduct = async (payLoad: TProduct) => {
  // Creating a new product using the payload data
  const result = await Product.create(payLoad);
  return result; // Returning the created product
};

// Service function to get all products, with optional search functionality
const getAllProducts = async (searchTerm?: string) => {
  try {
    let query = {};
    if (searchTerm) {
      // Constructing the search query to find products based on name, description, category, or tags
      query = {
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
          { tags: { $regex: searchTerm, $options: 'i' } },
        ],
      };
    }
    // Fetching products based on the constructed query
    const products = await Product.find(query);
    return products; // Returning the fetched products
  } catch (error) {
    throw new Error(`Error fetching products: ${error}`);
  }
};

// Service function to get a single product by ID
const getSingleProducts = async (id: String) => {
  const result = await Product.findById(id); // Finding a product by its ID
  return result; // Returning the found product
};

// Service function to update a product by ID
const updateProducts = async (id: String, updatedProduct: TProduct) => {
  try {
    // Finding and updating a product by its ID with the provided updated data
    const product = await Product.findByIdAndUpdate(id, updatedProduct, {
      new: true, // Returning the updated product after the update operation
    });
    if (!product) {
      // If the product is not found, throw an error
      throw new Error('Product not found');
    }
    return product; // Returning the updated product
  } catch (error) {
    // Catching and handling any errors that occur during the update operation
    throw new Error(`Error updating product: ${error}`);
  }
};

// Service function to delete a product by ID
const deleteProducts = async (id: String) => {
  try {
    // Finding and deleting a product by its ID
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      // If the product is not found, throw an error
      throw new Error('Product not found');
    }
    return product; // Returning the deleted product
  } catch (error) {
    // Catching and handling any errors that occur during the delete operation
    throw new Error(`Error updating product: ${error}`);
  }
};

// Exporting all service functions as an object
export const ProductService = {
  createProduct,
  getAllProducts,
  getSingleProducts,
  updateProducts,
  deleteProducts,
};
