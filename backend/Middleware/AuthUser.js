 
import jwt from 'jsonwebtoken';

const authuser=async(req,res,next)=>{
const {token}=req.cookies;

if(!token){
    return res.status(404).json({success:false,message:'Not Authorized'})
}

try {
     const tokenDecode=jwt.verify(token,process.env.JWT_SECRET)
     if(tokenDecode.id)
     {
        req.body.userId=tokenDecode.id;

     }else{
        return res.json({success:false,message:'Not Authorized'})
     }
} catch (error) {
    res.json({success:false,message:error.message})
}
}

export default authuser;