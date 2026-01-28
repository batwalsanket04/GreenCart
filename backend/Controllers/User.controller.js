import User from "../Models/User.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


export const register=async(req,res)=>{
    try {

        const {name,email,password}=req.body;

        if(!name || !email || !password)
        {
            return res.status(400).json({success:false,message:"Missing details"})
        }
         const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if(!passwordRegex.test(password))
      {
        return res.status(400).json({message:"password must have 8 digit with character symbol and uppercase,lowercase"})
      }

        const userExist= await User.findOne({email})
        
        if(userExist)
        {
            return res.json({success:false,message:"user already exists"});
        }
        
        const hashPass=await bcrypt.hash(password,10)
        
        const newUser=await User.create({name,email,password:hashPass})

        const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:'2h'})
        
        res.cookie('token',token,{httpOnly:true,// prevent the js to access cookie
            secure:process.env.NODE_ENV === 'production',//use secure cookie in production
            sameSite:process.env.NODE_ENV ==='production' ? 'none':'strict',// secure form CSRF protection
            maxAge:7*24*60*60*1000,  // cookie expire time
        })

        return res.status(200).json({success:true,message:"User Registered Successfully",user:{email:newUser.email,name:newUser.name}})

    } catch (error) {
         console.log("Registration failed")
         res.status(400).json({success:false,message:"Registration failed"})
    }
}


export const login=async(req,res)=>{
   const {email,password}=req.body;

    try {

          if(!email || !password)
          {
            return res.status(400).json({success:false,message:"Email,Password are required"})
          }
        const user=await User.findOne({email});

        if(!user)
        {
            return res.status(400).json({message:"user not found"});
        }

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch)
        {
            return res.status(400).json({success:false,message:"Invalid Credentials"})
        }

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
        
        res.cookie('token',token,{httpOnly:true,// prevent the js to access cookie
            secure:process.env.NODE_ENV === 'production',//use secure cookie in production
            sameSite:process.env.NODE_ENV ==='production' ? 'none':'strict',// secure form CSRF protection
            maxAge:7*24*60*60*1000,  // cookie expire time
        })

        return res.status(200).json({success:true,message:"User Login Successfully",user:{email:user.email,name:user.name}})

        
    } catch (error) {

        console.log(error.message);
        res.status(400).json({success:false,message:error.message})
        
    }
}