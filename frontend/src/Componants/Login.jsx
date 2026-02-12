import React, { useState } from "react";
import { useAppContext } from "../Context/AppContext";
 
import toast from "react-hot-toast";

const Login = () => {
  const { setShowUserLogin,setuser,navigate,axios } = useAppContext();

  const [isLogin, setIsLogin] = useState(true); 

  const [form,setForm]=useState({name:"",email:"",password:""})

  const handleForm=(e)=>{
    const {name,value}=e.target;
    setForm({...form,[name]:value})
    // console.log(form)
  }

  const handleSumbit=async(e)=>{
    try {
      e.preventDefault();
      const endpoint = isLogin ? "login" : "register";

      const {data}=await axios.post(`api/user/${endpoint}`,form)
      if(data.success)
      {
        navigate('/')
        setuser(data.user)
        setShowUserLogin(false)
      }else{
         toast.error(data.message)
      }
    } catch (error) {
         toast.error(error.message)
      
    }
    
  }


  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 px-4"
    >
      <form onSubmit={(e)=>handleSumbit(e)}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[360px] rounded-xl bg-white p-6 shadow-lg"
      >
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">
          {isLogin ? "Log In" : "Sign Up"}
        </h2>

        {/* Username (only for signup) */}
        {!isLogin && (
          <input
            className="w-full mb-3 rounded-md border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
            type="text"
            placeholder="Username"
            name="name"
            value={form.name}
            onChange={(e)=>handleForm(e)}
            id="name"
            required
          />
        )}

        {/* Email */}
        <input
          className="w-full mb-3 rounded-md border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
            onChange={(e)=>handleForm(e)}
          id="email"
          required
        />

        {/* Password */}
        <input
          className="w-full mb-5 rounded-md border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
          type="password"
          placeholder="Password"
          id="password"
          name="password"
            onChange={(e)=>handleForm(e)}
          value={form.password}
          required
        />

        {/* Button */}
        <button className="w-full rounded-md bg-green-600 py-2.5 text-white font-medium transition hover:bg-green-700 active:scale-95">
          {isLogin ? "Log In" : "Create Account"}
        </button>

        {/* Switch */}
        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="cursor-pointer text-green-600 hover:underline"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
