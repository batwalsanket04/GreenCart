import express from 'express'
import authUser from '../Middleware/AuthUser.js'
import authSeller from '../Middleware/AuthSeller.js'
import { getAllOrders, getUserOrders, placeOrderCOD } from '../Controllers/Order.Controller.js';

const orderRouter=express.Router();

orderRouter.post('/cod',authUser,placeOrderCOD)
orderRouter.get('/user',authUser,getUserOrders)
orderRouter.get('/seller',authSeller,getAllOrders)



export default orderRouter;


