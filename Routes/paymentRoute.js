import express from 'express';
import { paymentController, paymentVerification } from '../controller/createProductController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';



const router = express.Router();


<<<<<<< HEAD
=======
//paymet gateway


//token

>>>>>>> 6d7702120a703ecef032c1c79eea69887d7dd930

// router.get('/braintree/token', paymentTokenController);

//payment
router.post('/create-order', requireSignIn, paymentController);
router.post('/confirm-payment', paymentVerification);
<<<<<<< HEAD
=======
// router.get('/get-key', requireSignIn, getKey)
>>>>>>> 6d7702120a703ecef032c1c79eea69887d7dd930


export default router