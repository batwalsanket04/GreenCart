import express from 'express'
import authuser from '../Middleware/AuthUser.js'
import { addAddress, getAddress } from '../Controllers/Address.controller.js'

const addressRouter=express.Router()


addressRouter.post('/add',authuser,addAddress)
addressRouter.get('/get',authuser,getAddress)




export default addressRouter;