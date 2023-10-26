import slugify from "slugify";
import productModel from "../Models/productModel.js";
import fs from 'fs';
import { populate } from "dotenv";
// import { count } from "console";



export const createProductController = async (req, res) =>{

    try {
        
      const {name, slug, description, quantity, price, category, shipping } = req.fields;
      const {photo} = req.files;

      //validation

      switch(true) {
        case !name: throw new Error("Name Is Required");
        case !description: throw new Error("Description Is Required");
        case !quantity: throw new Error("Quantity Is Required");
        case !category: throw new Error("Category Is Required");
        case !price: throw new Error("Price Is Required");
        
        case photo && photo.size > 1000000: throw new Error("Photo is Required & Should be less than 1mb");

      
      }
      const product = new productModel({...req.fields, slug:slugify(name)});

      if(photo){
        product.photo.data = fs.readFileSync(photo.path);
        product.photo.contentType = photo.type;
      }

      await product.save();
      res.status(200).send({
        success: true,
        message: "Product Added Successfully",
        product
      })



    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error While Posting New Product",
            error
        })
    }

}


//get all product

export const getProductController =  async (req, res) =>{

try {

  const products = await productModel.find({}).select("-photo").limit(12).sort({createdAt: -1});
  res.status(200).send({
    success: true,
    message: "All Products Fetched Successfully",
    products,
    totalProducts: products.length,
  })
  
} catch (error) {
  console.log(error)
  res.status(500).send({
    success:false,
    message: "Error While Getting Products",
    error
  })
}

}

//Get Single Product

export const getSingleProduct  = async (req, res) => {
       try {
        
      const product = await productModel.findOne({slug: req.params.slug}).select("-photo");
      res.status(200).send({
        success: true,
        message:'Product Fetching Successfull',
        product
        
      })

       } catch (error) {
        console.log(error)
        res.status(500).send({
          success: false,
          message:"Error in Getting Product",
          error
        })
       }
}

//update a product

export const updateProduct = async (req,  res)=>{

  try {
        
    const {name, description, quantity, price, category, shipping } = req.fields;
    const {photo} = req.files;

    //validation

    switch(true) {
      case !name: throw new Error("Name Is Required");
      case !description: throw new Error("Description Is Required");
      case !quantity: throw new Error("Quantity Is Required");
      case !category: throw new Error("Category Is Required");
      case !price: throw new Error("Price Is Required");
      
      case photo && photo.size > 1000000: throw new Error("Photo is Required & Should be less than 1mb");

    
    }
    const product = await productModel.findByIdAndUpdate(req.params.id, {...req.fields, slug:slugify(name)}, {new: true});

    if(photo){
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.status(200).send({
      success: true,
      message: "Product Uppdated Successfully",
      product
    })



  } catch (error) {
      console.log(error)
      res.status(500).send({
          success: false,
          message: "Error While Updating the Product",
          error
      })
  }

}

//fetching  simlar products

export const relatedProductController = async (req, res) => {

  try {

    const {pid, cid} = req.params;

    const relatedProducts = await productModel.find({
      category: cid,
      _id: {$ne:pid}
    }).select('-photo').limit(4).populate("category")

    res.status(200).send({
      success: true,
      message: 'Successfully Fetched Related Products',
      relatedProducts
    })
    
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success: false,
      message: 'Error While Getting Related products',
      error
    })
    
  }

}

//fetching product photo

export const productPhotoController = async (req,res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");

  if(product.photo.data){
    res.set("Content-type", product.photo.contentType);
    res.status(200).send(product.photo.data);
  } 

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error while getting the product's Photo"
    })
  }
}

//deleting a product

export const deleteProduct = async (req, res) => {

  try {

    const product = await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product has Successfully Been Deleted",
      
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message:"Error While Deleting a Product"
    })
  }

}


//filter products

export const productFilterController = async (req, res) => {
  try {
    
    const {checked, radio} = req.body;
        let args = {}
    if(checked.length > 0) args.category = checked;
    if(radio.length) args.price = {$gte: radio[0], $lte: radio[1]}
    const products = await productModel.find(args)
    res.status(200).send({
      success: true,
      message: "Filter Applied Successfully",
      products
    })

  } catch (error) {
     console.log(error);
     res.status(500).send({
      success: false,
      message: "Error While Applying Filters",
      error
     })
  }
}

//product Count

export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      error
    })
  }
}


//getting product list based on page

export const productListController = async (req, res) => {
try {
  
  const perPage = 3;
  const page = req.params.page ? req.params.page : 1;

  const products = await productModel.find({}).select("-photo").skip((page-1) * perPage).limit(perPage).sort({createdAt: -1});

  res.status(200).send({
    success: true,
    products
  })

} catch (error) {
  res.status(500).send({
    success: false,
    error
  })
}
}


//search products

export const searchProductController = async  (req, res) => {
  try {

    const {keyword} = req.params;
    const searchedResults = await productModel.find({ $or: [
      {name: {$regex: keyword, $options: 'i'}},
      {description: {$regex: keyword, $options: 'i'}}
    ]}).select("-photo");

    res.status(200).send({
      success: true,
      searchedResults
    })
    
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success: false,
      message: "Error While Searching Products",
      error
    })
  }
}