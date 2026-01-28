import React, { useState } from "react";
import { assets, categories } from "../../greencart_assets/assets";

const AddProducts = () => {
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const onHandleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      name,
      description,
      category,
      price,
      offerPrice,
      images: files,
    };

    console.log(productData);
  };

  const handleImageChange = (e, index) => {
    const updatedFiles = [...files];
    updatedFiles[index] = e.target.files[0];
    setFiles(updatedFiles);
  };

  return (
    <div className="py-10 flex-1 h-[95vh] overflow-y-scroll">
      <form onSubmit={onHandleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        
        {/* IMAGES */}
        <div>
          <p className="text-base font-medium">Product Images</p>
          <div className="flex flex-wrap gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label key={index} className="cursor-pointer">
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, index)}
                  />
                  <img
                    src={
                      files[index]
                        ? URL.createObjectURL(files[index])
                        : assets.upload_area
                    }
                    alt="upload"
                    className="w-24 h-24 object-cover rounded"
                  />
                </label>
              ))}
          </div>
        </div>

        {/* NAME */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-3 py-2 rounded outline-none"
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border px-3 py-2 rounded resize-none outline-none"
            required
          />
        </div>

        {/* CATEGORY */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border px-3 py-2 rounded outline-none"
            required
          >
            <option value="">Select Category</option>
            {categories.map((item, index) => (
              <option key={index} value={item.path}>
                {item.text}
              </option>
            ))}
          </select>
        </div>

        {/* PRICES */}
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 flex-1">
            <label className="font-medium">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border px-3 py-2 rounded outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-1 flex-1">
            <label className="font-medium">Offer Price</label>
            <input
              type="number"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              className="border px-3 py-2 rounded outline-none"
              required
            />
          </div>
        </div>

        {/* BUTTON */}
        <button className="px-8 py-2.5 bg-green-600 text-white font-medium rounded hover:bg-green-500">
          ADD PRODUCT
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
