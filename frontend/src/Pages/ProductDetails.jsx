import { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../greencart_assets/assets";
import ProductCard from "../Componants/ProductCard";

const ProductDetails = () => {
  const { products, currency, navigate, addToCart } = useAppContext();
  const { id } = useParams();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const product = products.find(item => item._id === id);

  useEffect(() => {
    if (!product) return;

    setThumbnail(product.image?.[0] || null);

    const related = products.filter(
      item => item.category === product.category && item._id !== product._id
    );

    setRelatedProducts(related.slice(0, 5));
  }, [product, products]);

  if (!product) return null;

  return (
    <div className="max-w-6xl w-full px-6 mt-16">
      {/* BREADCRUMB */}
      <p className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-green-600">Home</Link> /
        <Link to="/products" className="hover:text-green-600"> Products</Link> /
        <Link
          to={`/products/${product.category.toLowerCase()}`}
          className="hover:text-green-600"
        >
          {" "}{product.category}
        </Link> /
        <span className="text-green-600 font-medium"> {product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-14">
        {/* IMAGES */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {product.image?.map((img, i) => (
              <div
                key={i}
                onClick={() => setThumbnail(img)}
                className="border border-gray-200 rounded-lg p-1 cursor-pointer hover:border-green-500 transition"
              >
                <img src={img} alt="" className="w-20 h-20 object-contain" />
              </div>
            ))}
          </div>

          <div className="border border-gray-200 rounded-xl p-4 bg-white">
            {thumbnail && (
              <img
                src={thumbnail}
                alt={product.name}
                className="w-80 h-80 object-contain"
              />
            )}
          </div>
        </div>

        {/* DETAILS */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-semibold text-gray-800">
            {product.name}
          </h1>

          {/* RATING */}
          <div className="flex items-center gap-1 mt-2">
            {Array(5).fill("").map((_, i) => (
              <img
                key={i}
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                className="w-4"
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              ({product.rating})
            </span>
          </div>

          {/* PRICE */}
          <div className="mt-6">
            <p className="text-gray-400 line-through">
              MRP {currency}{product.price}
            </p>
            <p className="text-3xl font-bold text-green-600">
              {currency}{product.offerPrice}
            </p>
            <span className="text-sm text-gray-500">
              Inclusive of all taxes
            </span>
          </div>

          {/* DESCRIPTION */}
          <p className="mt-6 font-medium text-gray-700">About Product</p>
          <ul className="list-disc ml-5 mt-2 text-gray-500 text-sm">
            {product.description?.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>

          {/* ACTIONS */}
          <div className="flex gap-4 mt-10">
            <button
              onClick={() => addToCart(product._id)}
              className="w-full py-3   border border-green-600 text-green-700 font-medium hover:bg-green-50 transition"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="w-full py-3  bg-green-600 text-white font-medium hover:bg-green-700 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      {/* related products */}
     {/* RELATED PRODUCTS */}
<div className="mt-20">
  <div className="flex flex-col  mb-8">
    <p className="text-2xl md:text-3xl font-medium">
      Related Products
    </p>
    <div className="w-16 h-0.5 bg-green-600 rounded-full mt-2"></div>
  </div>

  <div className="
    grid
    grid-cols-2
    sm:grid-cols-3
    md:grid-cols-4
    lg:grid-cols-5
    gap-4
    md:gap-6
  ">
    {relatedProducts
      .filter(product => product.inStock)
      .slice(0, 5)
      .map(product => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}
  </div>
</div>

    </div>
  );
};

export default ProductDetails;
