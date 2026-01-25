import React from "react";
import { useAppContext } from "../Context/AppContext";
import { useParams } from "react-router-dom";
import { categories } from "../greencart_assets/assets";
import ProductCard from "../Componants/ProductCard";

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();

const searchCategory = categories.find(
  item => item.path.toLowerCase() === category?.toLowerCase()
);


 const filterProducts = products.filter(
  product => product.category?.toLowerCase() === category?.toLowerCase()
);


  return (
    <div className="mt-16 px-4">
      {/* CATEGORY HEADING */}
      {searchCategory && (
        <div className="mb-6">
          <p className="text-2xl font-medium uppercase">
            {searchCategory.text}
          </p>
          <div className="w-16 h-0.5 bg-green-600 rounded-full" />
        </div>
      )}

      {/* PRODUCTS GRID */}
      {filterProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
         {filterProducts.map(product => (
  <ProductCard key={product._id} product={product} />
))}

        </div>
      ) : (
        <p className="text-gray-500 text-center mt-20">
          No products found in this category
        </p>
      )}
    </div>
  );
};

export default ProductCategory;
