import express from 'express';
import { getOrderController } from '../controller/orderController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.get('/all-orders', requireSignIn ,getOrderController)


export default router