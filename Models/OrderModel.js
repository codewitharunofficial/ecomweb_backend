import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    products: [{
        type: mongoose.ObjectId,
        ref : 'Products'
    }],
<<<<<<< HEAD
=======
    payment: {},
>>>>>>> 6d7702120a703ecef032c1c79eea69887d7dd930

    buyers: { type: mongoose.ObjectId,
    ref: 'User'},

    status : {
        type: String,
<<<<<<< HEAD
        default: "Processing",
        enum: ["Processing" ,"Confirmed", "Shipped", "Delivered", "Cancel"],
=======
        default: "Not Processed",
        enum: ["Not Processed", "Processing" ,"Confirmed", "Shipped", "Delivered", "Cancel"],
>>>>>>> 6d7702120a703ecef032c1c79eea69887d7dd930
    },
    

}, {timestamps: true});

export default mongoose.model('Order', OrderSchema);