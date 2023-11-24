import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    products: [{
        type: mongoose.ObjectId,
        ref : 'Products'
    }],

    buyers: { type: mongoose.ObjectId,
    ref: 'User'},

    status : {
        type: String,
        default: "Processing",
        enum: ["Processing" ,"Confirmed", "Shipped", "Delivered", "Cancel"],
    },
    

}, {timestamps: true});

export default mongoose.model('Order', OrderSchema);