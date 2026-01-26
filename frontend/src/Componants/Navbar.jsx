import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

import { useAppContext } from "../Context/AppContext";
import { assets } from "../greencart_assets/assets";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const { user, setuser, navigate, setShowUserLogin , setSearchQuery,getCartCount } = useAppContext();

  const login = () => {
    setShowUserLogin(true);
    setOpen(false);
  };

  const logout = () => {
    setuser(null);
    setShowProfile(false);
    setOpen(false);
    navigate("/");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-10 py-4 border-b bg-green-100">
        
        {/* Logo */}
        <NavLink to="/" onClick={() => setOpen(false)}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQacfj0G2YdnD_iaMOqhj65gq5nna9YRvknbaAao502jg&s"
            className="h-[60px] rounded-2xl"
            alt="logo"
          />
        </NavLink>

        {/* DESKTOP MENU */}
        <div className="hidden sm:flex items-center gap-8 text-sm font-medium">

          <NavLink to="/">Home</NavLink>
          <NavLink to="/product">All Products</NavLink>
          {user && <NavLink to="/orders">My Orders</NavLink>}
          <NavLink to="/contact">Contact</NavLink>

           {/* SEARCH BAR */}
<div className="relative hidden md:block">
  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

  <input
    type="text"
    placeholder="Search products..."
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-[260px] pl-11 pr-4 py-2 rounded-full border border-gray-300 
               focus:outline-none focus:ring-2 focus:ring-green-400 
               bg-white text-sm"
  />
</div>

          {/* Cart */}
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 14 14"
              fill="none"
              className="stroke-green-600"
            >
              <path
                d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0m6.417 0a.583.583 0 1 1-1.167 0"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="absolute -top-2 -right-3 w-[18px] h-[18px] bg-green-600 text-white text-xs rounded-full flex items-center justify-center">
            {getCartCount()}
            </span>
          </div>
           

          {/* AUTH */}
          {!user ? (
            <button
              onClick={()=>setShowUserLogin(true)}
              className="px-6 py-2 bg-green-600 text-white cursor-pointer  "
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <img src={assets.profile_icon}
                
                className="h-12 w-12 cursor-pointer"
                onClick={() => setShowProfile(!showProfile)}
              />

              {showProfile && (
                <div className="absolute right-0 top-12 w-44 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
  <NavLink
    to="/my-orders"
    className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
  >
    My Orders
  </NavLink>

  <div className="h-px bg-gray-200" />

  <button
    onClick={logout}
    className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition"
  >
    Logout
  </button>
</div>
 
              )}
            </div>
          )}
        </div>

        {/* MOBILE TOGGLE BUTTON */}
         
       {/* MOBILE ICONS */}
<div className="flex items-center gap-5 sm:hidden">
  
  {/* SEARCH ICON */}
  <button onClick={() => setShowMobileSearch(!showMobileSearch)}>
    <FiSearch className="text-xl text-green-700" />
  </button>

  {/* CART ICON */}
  <div
    onClick={() => navigate("/cart")}
    className="relative cursor-pointer"
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 14 14"
      fill="none"
      className="stroke-green-600"
    >
      <path
        d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0m6.417 0a.583.583 0 1 1-1.167 0"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

    <span className="absolute -top-2 -right-3 w-[18px] h-[18px] bg-green-600 text-white text-xs rounded-full flex items-center justify-center">
      {getCartCount()}
    </span>
  </div>

  {/* MENU */}
  <button onClick={() => setOpen(!open)} className="text-2xl">
    ☰
  </button>
</div>

      </nav>

      {/* MOBILE MENU */}
      
      {open && (
        <div className="fixed top-[88px] left-0 w-full bg-green-100 shadow-md z-40 flex flex-col gap-4 px-6 py-6 sm:hidden">
          
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/product" onClick={() => setOpen(false)}>All Products</NavLink>
          {user && <NavLink to="/orders" onClick={() => setOpen(false)}>My Orders</NavLink>}
          <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>

          {/* MOBILE SEARCH */}
<div className="relative">
  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
  
  <input
    type="text"
    placeholder="Search products..."
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full pl-11 pr-4 py-2 rounded-full border border-gray-300 
               focus:outline-none focus:ring-2 focus:ring-green-100"
  />
</div>


          {!user ? (
            <button
              onClick={()=>setShowUserLogin(true)}
              className="bg-green-600 text-white py-2  "
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="bg-green-600 text-white py-2 rounded-full"
            >
              Logout
            </button>
          )}
        </div>
      )}

      {/* SPACE FOR FIXED NAVBAR */}
      <div className="h-[88px]" />
    </>
  );
};

export default Navbar;
