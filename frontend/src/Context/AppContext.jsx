import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../greencart_assets/assets";
import toast from "react-hot-toast";

export const AppContext=createContext();

export const AppContextProvider=({children})=>{

const currency = import.meta.env.VITE_CURRENCY;


    const navigate=useNavigate();
    const [user,setuser]=useState(null)
    const [IsSeller,setIsSeller]=useState(false)
    const [showUserLogin,setShowUserLogin]=useState(false)
    const [products,setProducts]=useState([])

    const [cartItems,setCartItem]=useState({})
const [SearchQuery, setSearchQuery] = useState("")


    // fetch all product
    const fetchProducts=async()=>{
        setProducts(dummyProducts)
    }

    useEffect(()=>{
fetchProducts();

    },[])

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
        RemoveFromCart,cartItems,setSearchQuery,SearchQuery,
        getCartAmount,getCartCount
         
    };


    return <AppContext.Provider value={value}>
       {children} 
    </AppContext.Provider>
}

export const useAppContext=()=>{
    return useContext(AppContext)
}

