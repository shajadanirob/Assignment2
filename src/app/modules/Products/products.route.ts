// import { Router } from 'express';
// import { createProduct, getProductById, getProducts } from '../products.controller';


// const router = Router();
// export const ProductRoutes = router;

// router.post('/products',createProduct );
// router.get('/products', getProducts);
// router.get('/productId' , getProductById)

// export default router;


import express from 'express'
import { ProductController } from '../products.controller';
const router = express.Router();

router.post('/', ProductController.createProduct)
router.get('/:productId', ProductController.getSingleProduct)
router.get('/', ProductController.getAllProduct)
router.put('/:productId', ProductController.updateProducts)
router.delete('/:productId', ProductController.deleteProduct)
// router.get('/', ProductController.searchProducts);





export const ProductRoute = router



