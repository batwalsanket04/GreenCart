import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors';
import Connection from './Configs/DB.js';
import 'dotenv/config';

//usermodel
 
import userRouter from './Routes/userRoute.js';

const app=express();

const PORT=process.env.PORT || 4000;

// allow multiple origins
const allowedOrigin = ['http://localhost:5173'];


// middleware

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));

app.get("/",(req,res)=>{
    res.send("API Working")
});

// user route endpoint 
app.use('/api/user',userRouter);


//db Connnection
await Connection();






app.listen(PORT,()=>{
    console.log(`Server is Up http://localhost:${PORT}`)
})