// import { Request, Response } from 'express';

import { Request, Response } from 'express';
import { ProductService } from './Products/products.serveice';
import { createProductSchema } from './Products/products.validation';
import { Product } from './Products/products.model';

// import { createProductSchema } from './Products/products.validation';
// import Product from './Products/products.model';

// export const createProduct = async (req: Request, res: Response) => {
//     try {
//         const { error } = createProductSchema.validate(req.body);
//         if (error) return res.status(400).json({ success: false, message: error.details[0].message });

//         const product = new Product(req.body);
//         await product.save();
//         res.status(201).json({ success: true, message: 'Product created successfully!', data: product });
//     } catch (err) {
//         res.status(500).json({ success: false, message: 'Server Error' });
//     }

// };

// //Retrieve a list of all products
// export const getProducts = async (req: Request, res: Response) => {
//     try {
//         const products = await Product.find();
//         res.status(200).json({ success: true, message: 'Products fetched successfully!', data: products });
//     } catch (err) {
//         res.status(500).json({ success: false, message: 'Server Error' });
//     }
// };

// export const getProductById = async (req: Request, res: Response) => {
//     try {
//         const product = await Product.findById(req.body.productId);
//         if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
//         res.status(200).json({ success: true, message: 'Product fetched successfully!', data: product });
//     } catch (err) {
//         res.status(500).json({ success: false, message: 'Server Error' });
//     }
// };



export const createProduct = async (req: Request, res: Response) => {
      try {
          const { error } = createProductSchema.validate(req.body);
          if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  
          const product = new Product(req.body);
          await product.save();
          res.status(201).json({ success: true, message: 'Product created successfully!', data: product });
      } catch (err) {
          res.status(500).json({ success: false, message: 'Server Error' });
      }
  
  };

  const getAllProduct = async (req: Request, res: Response) => {
    try {
        const { searchTerm } = req.query;
        let products;

        if (searchTerm && typeof searchTerm === 'string') {
            products = await ProductService.getAllProducts(searchTerm);
            res.status(200).json({
                success: true,
                message: `Products matching search term '${searchTerm}' fetched successfully!`,
                data: products
            });
        } else {
            products = await ProductService.getAllProducts();
            res.status(200).json({
                success: true,
                message: 'Products fetched successfully!',
                data: products
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error
        });
    }
};


const getSingleProduct = async (req: Request, res: Response)=>{
  try{
    const {productId} = req.params
    const result =await ProductService.getSingleProducts(productId)
    res.status(404).json({ 
      success: true,
       message: 'Products fetched successfully!',
       data : result
       });
  }
  catch{
    res.status(500).json({ 
      success: false,
       message: 'Server Error' 
      });

  }
}
const updateProducts = async (req: Request, res: Response)=>{
  try{
    const {productId} = req.params
    const product = req.body.params
    const result =await ProductService.updateProducts(productId,product)
    console.log(result);
    res.status(404).json({ 
      success: true,
       message: 'Product updated successfully!',
       data : result
       });
  }
  catch{
    res.status(500).json({ 
      success: false,
       message: 'Server Error' 
      });

  }
}
const deleteProduct = async (req: Request, res: Response) => {
  try {
      const { productId } = req.params;
      const deletedProduct = await ProductService.deleteProducts(productId);
      if (!deletedProduct) {
          res.status(404).json({
              success: false,
              message: 'Product not found'
          });
      } else {
          res.status(200).json({
              success: true,
              message: 'Product deleted successfully!',
              data: null
          });
      }
  } catch (error) {
      res.status(500).json({
          success: false,
          message: 'Server Error',
          error: error
      });
  }
};





export const ProductController = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProducts,
    deleteProduct,

}
