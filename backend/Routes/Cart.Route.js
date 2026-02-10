 import express from 'express'
import authuser from '../Middleware/AuthUser.js';
import { UpdateCart } from '../Controllers/cart.Controller.js';

 const CartRouter=express.Router();


 CartRouter.post('/update',authuser,UpdateCart)


 export default CartRouter;
