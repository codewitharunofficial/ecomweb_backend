import express from 'express';
import { registerController, loginController, testController, forgotPasswordController, emailOTPVerification, updateProfileCOntroller } from '../controller/authController.js';
import { IsAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

//routing

//Register \\ POST

router.post('/register', registerController)

//Login || POST

router.post('/login', loginController)

//Forgot_Passowrd || POST

router.post('/forgot-password', forgotPasswordController)

//Test Route

router.get('/test', requireSignIn, IsAdmin ,testController)

//Protected Route for users

router.get('/user-auth', requireSignIn, (req, res)=>{
    res.status(200).send({ ok: true });
})
 
//Protected Route For Admin
 
router.get('/admin-auth', requireSignIn, IsAdmin,(req, res)=>{
    res.status(200).send({ ok: true });
});

router.get('/generate-otp/:email', emailOTPVerification)

//update user profile

router.put('/update-profile', requireSignIn, updateProfileCOntroller);

export default router