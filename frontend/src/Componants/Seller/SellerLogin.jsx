import React, { useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";
 

const SellerLogin = () => {
  const { IsSeller, setIsSeller, navigate,axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandle = async (e) => {
  try {
     e.preventDefault();

     const {data}=await axios.post('/api/seller/login',{email,password})

     if(data.success)
     {
      setIsSeller(true);
      navigate('/seller')
     }
     else{
      toast.error(data.message)
     }
  } catch (error) {
     toast.error(error.message)
  }
  };

  useEffect(() => {
    if (IsSeller) {
      navigate("/seller");
    }
  }, [IsSeller, navigate]);

  return (
    !IsSeller && (
      <div className="min-h-screen font-medium flex items-center justify-center px-4">
        <form
          onSubmit={onSubmitHandle}
          className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-lg p-8"
        >
          {/* HEADING */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              <span className="text-green-600">Seller</span> Login
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Login to manage your products
            </p>
          </div>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-md outline-none focus:border-green-600"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-6">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-md outline-none focus:border-green-600"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2.5 rounded-md font-medium hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    )
  );
};

export default SellerLogin;
