import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import ProductCard from "../Componants/ProductCard";

const AllProducts = () => {
  const { products, SearchQuery, } = useAppContext();
  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
  if (SearchQuery.length > 0) {
    setFilterProducts(
      products.filter(product =>
        product.name.toLowerCase().includes(SearchQuery.toLowerCase())
      )
    );
  } else {
    setFilterProducts(products);
  }
}, [products, SearchQuery]);


const [currrentPage,setCurrentPage]=useState(0)

const page_size=10;

 const totalproducts=products.length;
 const no_of_pages=Math.ceil(totalproducts / page_size)


 const start= currrentPage * page_size;
 const end=start + page_size;

 const handlePage=(n)=>{
    setCurrentPage(n)
 }


  return (
    <div className="mt-16 flex flex-col">
      <div>
        <p className="text-2xl font-medium uppercase">All Products</p>
        <div className="w-16 h-0.5 bg-green-600 rounded-full"></div>
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filterProducts.filter(product => product.inStock).slice(start,end)
  .map(product => (
    <ProductCard key={product._id} product={product} />
  ))}


      </div>
      
  <div className="flex justify-center gap-4 align-center mt-10 text-center ">
     {
        [...Array(no_of_pages).keys()].map((n)=>(
            <button onClick={()=>handlePage(n)} className=" border-1  h-10 w-10  rounded-lg hover:bg-green-100">{n}</button>
        ))
      }
  </div>
     
    </div>

  );
};

export default AllProducts;
