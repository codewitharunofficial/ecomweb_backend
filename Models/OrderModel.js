import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    products: [{
        type: mongoose.ObjectId,
        ref : 'Products'
    }],
    payment: {},

    buyers: { type: mongoose.ObjectId,
    ref: 'User'},

    status : {
        type: String,
        default: "Not Processed",
        enum: ["Not Processed", "Processing" ,"Confirmed", "Shipped", "Delivered", "Cancel"],
    },
    

}, {timestamps: true});

export default mongoose.model('Order', OrderSchema);