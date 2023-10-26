import express from 'express';
import { requireSignIn } from '../middlewares/authMiddleware';
import { getUser } from '../controller/userRoute';


const router = express.Router();

//get user

router.get('/user', requireSignIn, getUser)