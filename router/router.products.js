import express from 'express';
import { productController } from '../controller/controller.product.js';

const productRouter = express.Router();

productRouter.get('/', productController.getAllProducts);
productRouter.get('/:id', productController.getProductById);
productRouter.get('/:id', productController.getProductById);

productRouter.post('/', productController.addProduct);

productRouter.patch('/:id', productController.updateProduct);
productRouter.patch('/quantity/:id', productController.updateQuantity);

productRouter.delete('/:id', productController.deleteProduct);

export default productRouter;