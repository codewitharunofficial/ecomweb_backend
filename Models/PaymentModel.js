import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    paymentId: {
        type: String,
    },

    orderId: {
        type: String
    },

    signature : {
        type: String,
    },

    status : {
        type: String,
        default : "Initiated",
        enum: ["Succeed", "Failed"]
    } 

}, {timestamps: true});

export default mongoose.model('Payment', PaymentSchema);