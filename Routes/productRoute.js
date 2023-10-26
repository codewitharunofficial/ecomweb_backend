import express from 'express'
import formidable from 'express-formidable'
import { IsAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import {createProductController, deleteProduct, getProductController, getSingleProduct, productCountController, productFilterController, productListController, productPhotoController, relatedProductController, searchProductController, updateProduct} from '../controller/createProductController.js'

const router = express.Router();

//create

router.post('/new-product', requireSignIn, IsAdmin, formidable() ,createProductController);

//get products

router.get('/get-product', getProductController);

//get single Product

router.get('/get-a-product/:slug', getSingleProduct);

//update a product

router.put('/update-product/:id', requireSignIn, IsAdmin, formidable(), updateProduct);

//getting the product photo

router.get('/get-photo/:pid', productPhotoController);

//delete a product

router.delete('/delete-product/:pid', requireSignIn, IsAdmin, deleteProduct);

//filter products

router.post('/product-filters', productFilterController);

// product count

router.get('/product-count', productCountController);


//product per page

router.get('/product-list/:page', productListController);

//search products

router.get('/search/:keyword', searchProductController);

//similar products

router.get('/related-products/:pid/:cid', relatedProductController);

export default router