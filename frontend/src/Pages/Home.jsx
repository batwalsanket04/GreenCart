import React from 'react'
import MainBanner from '../Componants/MainBanner'
import Categories from '../Componants/Categories'
import BestSeller from '../Componants/BestSeller'
import BottomBanner from '../Componants/BottomBanner'
import NewsLetter from '../Componants/NewsLetter'
import Footer from '../Componants/Footer'

const Home = () => {
  return (
    <div className='mt-10'>
     <MainBanner/> 
     <Categories/>
     <BestSeller/>
     <BottomBanner/>
     <NewsLetter/>
    </div>
  )
}

export default Home
