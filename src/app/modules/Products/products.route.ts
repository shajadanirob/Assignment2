
import express from 'express';
import { ProductController } from '../products.controller';
const router = express.Router();

router.post('/', ProductController.createProduct);
router.get('/:productId', ProductController.getSingleProduct);
router.get('/', ProductController.getAllProduct);
router.put('/:productId', ProductController.updateProducts);
router.delete('/:productId', ProductController.deleteProduct);


export const ProductRoute = router;
