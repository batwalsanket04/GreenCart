import express from 'express'
import { upload } from '../Configs/multer.js';
import authSeller from '../Middleware/AuthSeller.js';
import { addProduct, chnageStock, productByid, ProductList } from '../Controllers/Product.Controller.js';

const productRouter=express.Router();


productRouter.post('/add',upload.array(["images"]),authSeller,addProduct);
productRouter.get('/list',ProductList)
productRouter.get('id',productByid)
productRouter.post('/stock',authSeller,chnageStock)



export default productRouter