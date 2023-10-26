import express from 'express'
import { IsAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { categoryController, deleteCategory, getCategory, singleCategory, updateCategory, } from '../controller/categoryController.js';
const router = express.Router();

//routes

//add-new Category route

router.post('/add-category', requireSignIn, IsAdmin, categoryController);

//update categories route

router.put('/update-category/:id', requireSignIn, IsAdmin, updateCategory);

//get all category

router.get('/category', getCategory);

//deleting category route 

router.delete('/delete-category/:id', requireSignIn, IsAdmin, deleteCategory);

//get Single Category

router.get('/single-category/:slug', singleCategory);


export default router