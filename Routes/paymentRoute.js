import express from 'express';
import { paymentController, paymentVerification } from '../controller/createProductController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';



const router = express.Router();


//paymet gateway


//token


// router.get('/braintree/token', paymentTokenController);

//payment
router.post('/create-order', requireSignIn, paymentController);
router.post('/confirm-payment', paymentVerification);
// router.get('/get-key', requireSignIn, getKey)


export default router