
import {v2 as cloudinary} from 'cloudinary'
import Product from '../Models/ProductModel.js'

export const addProduct=async(req,res)=>{

    try {
          let productData= JSON.parse(req.body.productData)
          const images=req.files

          let imagesUrl=await promis.all(images.map(async(item,)=>{
            let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'});
            return result.secure_url
          })
        )
        await Product.create({...productData,image:imagesUrl})

        res.json({success:true,message:"product Added"})
    } catch (error) {
         console.log(error.message);
         res.json({success:false,message:error.message})
    }

}


export const ProductList=async(req,res)=>{

    try {

         const product=await Product.find({})

         res.json({success:true,product})
        
    } catch (error) {
      console.log(error.message)
      res.json({success:false,message:error.message})
    }
    
}

export const productByid=async(req,res)=>{

    
    try {
         const {id}=req.params;
         
         const product=await Product.findById(id)
         res.json({success:true,product})

    } catch (error) {
         console.log(error.message)
         res.json({success:false,message:error.message})
    }
    
}


export const chnageStock=async(req,res)=>{
    try {
         const {id,inStock}=req.body;

         await Product.findByIdAndUpdate(id,{inStock})
         res.json({success:true,message:"Stock Updated"})
    } catch (error) {
         console.log(error.message);

         res.json({success:false,message:error.message})
    }
    
}