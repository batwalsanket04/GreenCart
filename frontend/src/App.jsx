import React from 'react'
import Navbar from './Componants/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import {Toaster} from 'react-hot-toast'
import Footer from './Componants/Footer'
import { useAppContext } from './Context/AppContext'
import Login from './Componants/Login'
import AllProducts from './Pages/AllProducts'

const App = () => {


  const IsSellerPath=useLocation().pathname.includes("seller");
  const {showUserLogin}=useAppContext();
  return (
    <>
    {IsSellerPath ? null :  <Navbar />}
    {showUserLogin ? <Login/> : null }
    
    <Toaster/>
    <div className={`${IsSellerPath ? "" : "px-6 md:px-8 lg:px-15 xl:px-25"} `}>
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product' element={<AllProducts/>} />

      </Routes>
    </div>
{!IsSellerPath && <Footer/>}

    </>
  )
}

export default App
