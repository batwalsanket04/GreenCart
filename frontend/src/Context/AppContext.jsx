import { createContext, useContext, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
 
import toast from "react-hot-toast";
import axios from 'axios'

axios.defaults.withCredentials=true;
axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL;

export const AppContext=createContext();

export const AppContextProvider=({children})=>{

const currency = import.meta.env.VITE_CURRENCY;


    const navigate=useNavigate();
    const [user,setuser]=useState(null)
    const [IsSeller,setIsSeller]=useState(false)
    const [showUserLogin,setShowUserLogin]=useState(false)
    const [products,setProducts]=useState([])
    const [MenuOpen,SetMenuOpen]=useState(false)

    const [cartItems,setCartItem]=useState({})
const [SearchQuery, setSearchQuery] = useState("")

// fetch seller status

const fetchSeller=async()=>{
    try {
        const {data}=await axios.get('/api/seller/is-auth');
        if(data.success)
        {
            setIsSeller(true)
        }
        else{
               setIsSeller(false)

        }
    } catch (error) {
               setIsSeller(false)
        
    }
}

// fetch user auth stetus,user data and cart Item

const fetchUser = async () => {
    try {
        const { data } = await axios.get('/api/user/is-auth');

        if (data.success) {
            setuser(data.user);
            setCartItem(data.user.cartItems || {});
        }

    } catch (error) {
        setuser(null);
    }
};




    // fetch all product
    const fetchProducts=async()=>{
        try {
            const {data}=await axios.get('/api/product/list')
            if(data.success)
            {
                setProducts(data.products)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
             toast.error(error.message)
        }
    }

    useEffect(()=>{
fetchUser();
fetchProducts();
fetchSeller();



    },[])

//update data base cart item

useEffect(()=>{
     
    const updateCart=async()=>{
        try {
        const {data}=await axios.post('/api/cart/update', { cartItems });
        if(!data.success)
        {
            toast.error(data.message)
        }
     } catch (error) {
        toast.error(error.message)
     } 
    }

    if(user)
    {
        updateCart();
    }
    
},[cartItems])

// get cart item count

const getCartCount=()=>{

    let totalCount=0;

    for(const item in cartItems)
    {
        totalCount+=cartItems[item]
    }
    return totalCount;
}

// return totall cart amount

const getCartAmount=()=>{
    let totalAmount=0;

    for(const item in cartItems)
    {
        let itemInfo=products.find((product)=>product._id===item);

        if(cartItems[item]>0){
            totalAmount += itemInfo.offerPrice * cartItems[item]
        }
    }
    return Math.floor(totalAmount*100)/100;
}


    // add products to cart

    const addToCart=(itemId)=>{
        let cartData=structuredClone(cartItems)
        
        if(cartData[itemId]){
            cartData[itemId] +=1 ;
        }
        else
        {
            cartData[itemId]=1;
        }
        setCartItem(cartData);

        toast.success("Added to cart")
    }

    // update cart Quantity

    const updateCartItem=(itemId,Quantity)=>{

        let CartData=structuredClone(cartItems)
  CartData[itemId]=Quantity;
        setCartItem(CartData)
        toast.success("Cart Updated")

    }

    // remove  from cart

    const RemoveFromCart=(itemId)=>{
        let cartData=structuredClone(cartItems);

        if(cartData[itemId])
        {
            cartData[itemId] -=1;

            if(cartData[itemId]===0)
            {
                delete cartData[itemId]
            }
        }
        toast.success('Removed From Cart')
        setCartItem(cartData)
    }

    const value={ user,setIsSeller,navigate,setuser,
        IsSeller,showUserLogin,setShowUserLogin,
        products,currency,addToCart,updateCartItem,
        RemoveFromCart,cartItems,setSearchQuery,SearchQuery,axios,
        getCartAmount,getCartCount,fetchProducts,setCartItem,MenuOpen,SetMenuOpen
         
    };


    return <AppContext.Provider value={value}>
       {children} 
    </AppContext.Provider>
}

export const useAppContext=()=>{
    return useContext(AppContext)
}

