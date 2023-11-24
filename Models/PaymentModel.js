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
    

}, {timestamps: true});

export default mongoose.model('Payment', PaymentSchema);