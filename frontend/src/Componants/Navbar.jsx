import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const { user, setuser, navigate, setShowUserLogin } = useAppContext();

const login = () => {
  setShowUserLogin(true);
};


  const logout = () => {
    setuser(null);
    setShowProfile(false);
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-10 py-4 border-b bg-white relative">

      {/* Logo */}
      <NavLink to="/">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQacfj0G2YdnD_iaMOqhj65gq5nna9YRvknbaAao502jg&s"
          className="h-[60px]"
          alt="logo"
        />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8 text-sm">

        <NavLink to="/">Home</NavLink>
        <NavLink to="/product">All Products</NavLink>
        {user && <NavLink to="/orders">My Orders</NavLink>}
        <NavLink to="/contact">Contact</NavLink>

        {/* Cart */}
       <div onClick={()=>navigate("/cart")} className="relative cursor-pointer"> <svg width="18" height="18" viewBox="0 0 14 14" fill="none" className="stroke-green-600" > <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0m6.417 0a.583.583 0 1 1-1.167 0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /> </svg> <span className="absolute -top-2 -right-3 w-[18px] h-[18px] bg-green-600 text-white text-xs rounded-full flex items-center justify-center">0</span> </div>  
        {/* AUTH */}
        {!user ? (
          <button
            onClick={login}
            className="px-6 py-2 bg-green-600 text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative">
            <FaUserCircle
              size={30}
              className="text-green-600 cursor-pointer"
              onClick={() => setShowProfile(!showProfile)}
            />

            {showProfile && (
              <div className="absolute right-0 top-10 w-40 bg-white shadow-md rounded-md border">
                <NavLink
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  My Order
                </NavLink>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Button */}
      <button onClick={() => setOpen(!open)} className="sm:hidden">
        ☰
      </button>
    </nav>
  );
};

export default Navbar;
