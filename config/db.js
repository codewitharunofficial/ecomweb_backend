import mongoose from "mongoose";



const connectDB = async () => {
  try{
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected To MongoDB ${conn.connection.host}`);
  } catch (error) {
      console.log(`Error In MongoDB ${error}`.bgRed.white);
  }
};

export default connectDB