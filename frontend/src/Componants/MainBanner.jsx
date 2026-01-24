import React from 'react'
import { assets } from '../greencart_assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className="relative w-full">
      
      {/* Background Images */}
      <img
        src={assets.main_banner_bg}
        alt="banner"
        className="w-full hidden md:block object-cover"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="banner"
        className="w-full md:hidden object-cover"
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center 
                      pb-16 sm:pb-20 md:pb-0 px-4 sm:px-6 md:pl-16 lg:pl-24">

        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
                     font-bold text-center md:text-left 
                     max-w-full sm:max-w-md md:max-w-lg lg:max-w-2xl 
                     leading-snug md:leading-tight"
        >
          Freshness You Can Trust, Saving You Will Love!
        </h1>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 mt-6">
          
          {/* Shop Now */}
          <Link
            to="/products"
            className="group flex items-center gap-2 px-8 py-3 
                       bg-green-700 hover:bg-green-600 transition 
                       rounded text-white"
          >
            Shop Now
            <img
              className="sm:hidden transition group-hover:translate-x-1"
              src={assets.white_arrow_icon}
              alt="arrow"
            />
          </Link>

          {/* Explore Deals */}
          <Link
            to="/products"
            className="group hidden sm:flex items-center gap-2 px-8 py-3 transition"
          >
            Explore Deals
            <img
              className="transition group-hover:translate-x-1"
              src={assets.black_arrow_icon}
              alt="arrow"
            />
          </Link>

        </div>
      </div>
    </div>
  )
}

export default MainBanner
