import React from 'react'
import Navbar from './Componants/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import {Toaster} from 'react-hot-toast'
import Footer from './Componants/Footer'
import { useAppContext } from './Context/AppContext'
import Login from './Componants/Login'
import AllProducts from './Pages/AllProducts'
import ProductCategory from './Pages/ProductCategory'
import ProductDetails from './Pages/ProductDetails'
import Cart from './Pages/Cart'
import AddAddress from './Pages/AddAddress'
import MyOrders from './Pages/MyOrders'
import SellerLogin from './Componants/Seller/SellerLogin'
import SellerLayout from './Pages/Seller/SellerLayout'
import AddProducts from './Pages/Seller/AddProducts'
import ProductList from './Pages/Seller/ProductList'
import Order from './Pages/Seller/Order'

const App = () => {


  const IsSellerPath=useLocation().pathname.includes("seller");
  const {showUserLogin,IsSeller}=useAppContext();
  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
    {IsSellerPath ? null :  <Navbar />}
    {showUserLogin ? <Login/> : null }
    
    <Toaster/>
    <div className={`${IsSellerPath ? "" : "px-6 md:px-8 lg:px-15 xl:px-25"} `}>
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product' element={<AllProducts/>} />
        <Route path='/products/:category' element={<ProductCategory/>} />
        <Route path='/products/:category/:id' element={<ProductDetails/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/add-address' element={<AddAddress/>} />
        <Route path='/my-orders' element={<MyOrders/>} />

        <Route path='/seller' element={IsSeller ? <SellerLayout/> :<SellerLogin/>}>
        <Route index element={IsSeller ? <AddProducts/>:null}/>
        <Route  path='/seller/product-list' element={<ProductList/>}/>
        <Route  path='/seller/orders' element={<Order/>}/>



        </Route>






      </Routes>
    </div>
{!IsSellerPath && <Footer/>}

    </div>
  )
}

export default App
