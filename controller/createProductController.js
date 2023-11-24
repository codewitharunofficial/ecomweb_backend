import slugify from "slugify";
import productModel from "../Models/productModel.js";
import fs from 'fs';
<<<<<<< HEAD
=======
// import braintree from "braintree";
>>>>>>> 6d7702120a703ecef032c1c79eea69887d7dd930
import Razorpay from "razorpay";
import OrderModel from "../Models/OrderModel.js";
import dotenv, { config } from 'dotenv';

<<<<<<< HEAD
import * as crypto from 'crypto'
import PaymentModel from "../Models/PaymentModel.js";

=======
>>>>>>> 6d7702120a703ecef032c1c79eea69887d7dd930

dotenv.config();



//payment using razor gateway


const rozarpayInstance = new Razorpay({
  key_id: process.env.ROZAR_PAY_KEY_ID,
  key_secret: process.env.ROZAR_PAY_SECRET_KEY,
});



<<<<<<< HEAD
=======
//payment gateway

// let gateway = new braintree.BraintreeGateway({
//   environment: braintree.Environment.Sandbox,
//   merchantId: process.env.BRAINTREE_MERCHANT_ID,
//   publicKey: process.env.BRAINTREE_PUBLIC_KEY,
//   privateKey: process.env.BRAINTREE_PRIVATE_KEY,
// });



>>>>>>> 6d7702120a703ecef032c1c79eea69887d7dd930
export const createProductController = async (req, res) => {

  try {

    const { name, slug, description, quantity, price, category, shipping } = req.fields;
    const { photo } = req.files;

    //validation

    switch (true) {
      case !name: throw new Error("Name Is Required");
      case !description: throw new Error("Description Is Required");
      case !quantity: throw new Error("Quantity Is Required");
      case !category: throw new Error("Category Is Required");
      case !price: throw new Error("Price Is Required");

      case photo && photo.size > 1000000: throw new Error("Photo is Required & Should be less than 1mb");


    }
    const product = new productModel({ ...req.fields, slug: slugify(name) });

    if (photo) {
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

export const getProductController = async (req, res) => {

  try {

    const products = await productModel.find({}).select("-photo").limit(12).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All Products Fetched Successfully",
      products,
      totalProducts: products.length,
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error While Getting Products",
      error
    })
  }

}

//Get Single Product

export const getSingleProduct = async (req, res) => {
  try {

    const product = await productModel.findOne({ slug: req.params.slug }).select("-photo");
    res.status(200).send({
      success: true,
      message: 'Product Fetching Successfull',
      product

    })

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in Getting Product",
      error
    })
  }
}

//update a product

export const updateProduct = async (req, res) => {

  try {

    const { name, description, quantity, price, category, shipping } = req.fields;
    const { photo } = req.files;

    //validation

    switch (true) {
      case !name: throw new Error("Name Is Required");
      case !description: throw new Error("Description Is Required");
      case !quantity: throw new Error("Quantity Is Required");
      case !category: throw new Error("Category Is Required");
      case !price: throw new Error("Price Is Required");

      case photo && photo.size > 1000000: throw new Error("Photo is Required & Should be less than 1mb");


    }
    const product = await productModel.findByIdAndUpdate(req.params.id, { ...req.fields, slug: slugify(name) }, { new: true });

    if (photo) {
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

    const { pid, cid } = req.params;

    const relatedProducts = await productModel.find({
      category: cid,
      _id: { $ne: pid }
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

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");

    if (product.photo.data) {
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
      message: "Error While Deleting a Product"
    })
  }

}


//filter products

export const productFilterController = async (req, res) => {
  try {

    const { checked, radio } = req.body;
    let args = {}
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
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

    const products = await productModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 });

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

export const searchProductController = async (req, res) => {
  try {

    const { keyword } = req.params;
    const searchedResults = await productModel.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ]
    }).select("-photo");

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


//payment token

// export const paymentTokenController = async (req, res) => {

//   try {

//     gateway.clientToken.generate({},
//       function(err, response) {
//         if (err) {
//           res.status(500).send(err)
//         } else {
//           res.send(response)
//         }
//       }
//     )

//   } catch (error) {
//     console.log(error)
//   }

// }



//payments

// export const paymentController = async (req, res) => {

//   try {

//     const {cart, nonce} = req.body;
//     let total = 0
//     cart.map( (i) => {total += i.price})

//     let newTransaction  = gateway.transaction.sale({
//       amount: total,
//       paymentMethodNonce: nonce,
//       options: {
//         submitForSettlement: true
//       },

//       function(err, results) {
//            if(results) {
//             const order = new OrderModel({
//               products: cart,
//               payment: results,
//               buyers: req.user._id,
//             }).save();
<<<<<<< HEAD

=======
              
>>>>>>> 6d7702120a703ecef032c1c79eea69887d7dd930
//             res.json({ok: true})
//            } else {
//             res.status(500).send(err)
//            }
//       }
//     }
//     )
<<<<<<< HEAD

=======
    
>>>>>>> 6d7702120a703ecef032c1c79eea69887d7dd930
//   } catch (error) {
//     console.log(error)
//   }

// }

export const paymentController = async (req, res) => {
<<<<<<< HEAD

  const { cart } = req.body;
  const { auth } = req.body;
  let total = 0
  cart.map((i) => (total += i.price));
=======
    
       const {cart} = req.body;
       const {auth} = req.body;
       let total = 0
    cart.map( (i) => (total += i.price));
>>>>>>> 6d7702120a703ecef032c1c79eea69887d7dd930

  rozarpayInstance.orders.create(
    {
      amount: Number(total * 100), // The amount in paisa (e.g., 1000 = ₹10.00)
      currency: 'INR', // Use the appropriate currency code
<<<<<<< HEAD

    },
    async (err, order) => {

      const Order = await new OrderModel({
        products: cart,
        buyers: auth?.user._id
      }).save();

      if (!err) {
        res.status(200).send({
          success: true,
          message: "Order Created Successfully",
          key_id: process.env.ROZAR_PAY_KEY_ID,
          product_name: cart.name,
          product_description: cart.description,
          Mobile_No: auth?.user?.phone,
          name: auth?.user?.name,
          email: auth?.user?.email,
          order,
          Order
        });

=======
      
    },
    (err, order) => {
      if (!err) {
         res.status(200).send({
             success: true,
             message: "Order Created Successfully",
             key_id: process.env.ROZAR_PAY_KEY_ID,
             product_name: cart.name,
             product_description: cart.description,
             Mobile_No : auth?.user?.phone,
             name: auth?.user?.name,
             email: auth?.user?.email,
             order

         });
       
>>>>>>> 6d7702120a703ecef032c1c79eea69887d7dd930
      } else {
        res.status(500).send({
          success: false,
          message: "Error While Creating Order",
          err
        })
      }
      // Once you have the order details, you can use them to open the Razorpay payment dialog.
    }
  );
<<<<<<< HEAD

}

export const paymentVerification = async (req, res) => {

  try {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const signature = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto.createHmac("sha256", process.env.ROZAR_PAY_SECRET_KEY).update(signature.toString()).digest("hex");

    if (razorpay_signature === expectedSign) {
      //Database
      const payment = await new PaymentModel({
        orderId: razorpay_order_id, paymentId: razorpay_payment_id, signature : razorpay_signature
      }).save()
       
      res.status(200).send({
        success: true,
        message: "Payment Completed Successfully",
        payment
      })
    }

  } catch (error) {
    console.log(error)
    res.status(400).send({
      success: false,
      error
    })
  }
}

=======
  
}

export const paymentVerification = async (req, res) => {
     console.log(req.body);

     res.status(200).send({
      success: true,
     });
}


>>>>>>> 6d7702120a703ecef032c1c79eea69887d7dd930
