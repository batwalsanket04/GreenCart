import React from "react";
import { assets } from "../greencart_assets/assets";
import { useAppContext } from "../Context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, addToCart, RemoveFromCart, cartItems,navigate } = useAppContext();


  return (
<div
  onClick={() => {
    navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
    window.scrollTo(0, 0);
  }}
  className="border border-gray-200 rounded-md bg-white p-3 w-full"
>


      {/* IMAGE */}
      <div className="flex items-center justify-center">
        <img
          src={product.image[0]}
          alt={product.name}
          className="h-24 sm:h-28 object-contain transition hover:scale-105"
        />
      </div>

      {/* INFO */}
      <div className="mt-2 text-sm text-gray-500">
        <p className="truncate">{product.category}</p>

        <p className="text-gray-800 font-medium truncate">
          {product.name}
        </p>

        {/* RATING */}
        <div className="flex items-center gap-0.5 mt-1">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <img
                key={i}
                className="w-3"
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                alt="star"
              />
            ))}
          <span className="text-xs">(4)</span>
        </div>

        {/* PRICE + CART */}
        <div className="flex items-center justify-between mt-3">
          <p className="text-green-600 font-semibold text-sm">
          {currency}{product.offerPrice}
            <span className="text-gray-400 text-xs line-through ml-1">
              {currency }{product.price}
            </span>
          </p>

          {/* CART */}
          {cartItems[product._id] > 0 ? (
            <div className="flex items-center h-8 bg-green-600 rounded text-white">
              <button
                onClick={() => RemoveFromCart(product._id)}
                className="w-6"
              >
                −
              </button>

              <span className="w-5 text-center text-xs">
                {cartItems[product._id]}
              </span>

              <button
                onClick={() => addToCart(product._id)}
                className="w-6"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product._id)}
              className="flex items-center justify-center w-16 h-8 bg-green-100 text-green-700 rounded border border-green-500 text-xs"
            > <img src={assets.cart_icon} alt="" className="mx-1" />
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
