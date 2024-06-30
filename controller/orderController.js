import OrderModel from "../Models/OrderModel.js";


export const getOrderController = async (req, res) => {
    console.log(req.body);
           const {userId} = req.body;
        try {
            const Order = await OrderModel.find({buyerId: userId}).populate("products", "-photo").populate("buyers", 'name').sort({ createdAt: "-1"});
        res.status(200).send({
            success: true,
            message: "Orders Fecthing Successfull",
            Order
        })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success: false,
                message: "Error while fetching Orders",
                error
            })
        }
}
