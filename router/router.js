import express from 'express';
import { productController } from '../controller/controller.js';

const router = express.Router();

router.get('/', productController.getAllProducts);

export default router;