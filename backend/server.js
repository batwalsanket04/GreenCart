    import cookieParser from 'cookie-parser';
    import express from 'express'
    import cors from 'cors';
    import Connection from './Configs/DB.js';
    import 'dotenv/config';

    //usermodel
    
    import userRouter from './Routes/userRoute.js';
    import sellerRoute from './Routes/Seller.Routes.js';
    import connectCloudinary from './Configs/cloudinary.js';
    import productRouter from './Routes/product.Route.js';
    import CartRouter from './Routes/Cart.Route.js';
    import addressRouter from './Routes/Address.route.js';
    import orderRouter from './Routes/Order.Route.js';
    import { stripeWebhook } from './Controllers/Order.Controller.js';

    const app=express();

    const PORT=process.env.PORT || 4000;

    // allow multiple origins
 

   const allowedOrigins = [
  "http://localhost:5174",
  "https://green-cartfrontend-6b8prdchm-sanket-batwal-projects.vercel.app"
];


app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

    app.post('/stripe',express.raw({type :'application/json'}),stripeWebhook)


    // middleware

    app.use(express.json());
    app.use(cookieParser());
    

    app.get("/",(req,res)=>{
        res.send("API Working")
    });

    // user route endpoint 
    app.use('/api/user',userRouter);
    app.use('/api/seller',sellerRoute)
    app.use('/api/product',productRouter)
    app.use('/api/cart',CartRouter)
    app.use('/api/address',addressRouter)
    app.use('/api/order',orderRouter)




    //db Connnection
    await Connection();
    //cloudinary connect
    await connectCloudinary();







    app.listen(PORT,()=>{
        console.log(`Server is Up http://localhost:${PORT}`)
    })