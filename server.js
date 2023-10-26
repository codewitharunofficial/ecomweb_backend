
import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './Routes/authRoute.js';
import cors from 'cors';
import categoryRoute from './Routes/categoryRoute.js';
import productRoute from './Routes/productRoute.js';

dotenv.config();


//databaseConfig
connectDB();


const app = express();
const PORT = process.env.PORT || 8020
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//routes

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/products', productRoute);

app.get('/', (req, res)=> {
    res.send("<h1>Welcome To ecom web</h1>")
});

app.listen(PORT, (req, res)=> {
    console.log(`Server is Running at http://localhost:${PORT}`.bold)
})