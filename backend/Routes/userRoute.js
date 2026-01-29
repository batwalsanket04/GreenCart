
import express from 'express';
import { isAuth, login, Logout, register } from '../Controllers/User.controller.js';
import authuser from '../Middleware/AuthUser.js';

const userRouter=express.Router();


userRouter.post('/register',register)
userRouter.post('/login',login)

userRouter.get('/is-auth',authuser,isAuth)
userRouter.get('/logout',authuser,Logout)




export default userRouter;
