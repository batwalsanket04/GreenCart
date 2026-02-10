
import express from 'express'
import { isSellerAuth, sellerLogin, SellerLogout } from '../Controllers/Seller.Controller.js';
import authSeller from '../Middleware/AuthSeller.js';

const sellerRoute=express.Router();


sellerRoute.post('/login',sellerLogin)
sellerRoute.get('/is-auth',authSeller,isSellerAuth)
sellerRoute.get('/logout',SellerLogout)


export default sellerRoute;
