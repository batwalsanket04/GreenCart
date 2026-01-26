import React, { useState } from "react";
import { assets } from "../greencart_assets/assets";

const AddAddress = () => {
  const [address, setAddress] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(address);
  };

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-600">
        Add Shipping <span className="font-semibold text-green-600">Address</span>
      </p>

      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        {/* FORM */}
        <div className="flex-1 max-w-md">
          <form onSubmit={onSubmitHandler} className="space-y-4 mt-6 text-sm">

            {/* FIRST & LAST NAME */}
            <div className="flex gap-3">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={address.firstname}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 border border-gray-300 rounded
                           outline-none focus:border-green-600 focus:ring-1
                           focus:ring-green-600 transition"
              />

              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={address.lastname}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 border border-gray-300 rounded
                           outline-none focus:border-green-600 focus:ring-1
                           focus:ring-green-600 transition"
              />
            </div>

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={address.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 border border-gray-300 rounded
                         outline-none focus:border-green-600 focus:ring-1
                         focus:ring-green-600 transition"
            />

            {/* STREET */}
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={address.street}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 border border-gray-300 rounded
                         outline-none focus:border-green-600 focus:ring-1
                         focus:ring-green-600 transition"
            />

            {/* CITY & STATE */}
            <div className="flex gap-3">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 border border-gray-300 rounded
                           outline-none focus:border-green-600 focus:ring-1
                           focus:ring-green-600 transition"
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={address.state}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 border border-gray-300 rounded
                           outline-none focus:border-green-600 focus:ring-1
                           focus:ring-green-600 transition"
              />
            </div>

            {/* ZIP & COUNTRY */}
            <div className="flex gap-3">
              <input
                type="text"
                name="zipcode"
                placeholder="Zip Code"
                value={address.zipcode}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 border border-gray-300 rounded
                           outline-none focus:border-green-600 focus:ring-1
                           focus:ring-green-600 transition"
              />

              <input
                type="text"
                name="country"
                placeholder="Country"
                value={address.country}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 border border-gray-300 rounded
                           outline-none focus:border-green-600 focus:ring-1
                           focus:ring-green-600 transition"
              />
            </div>

            {/* PHONE */}
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={address.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 border border-gray-300 rounded
                         outline-none focus:border-green-600 focus:ring-1
                         focus:ring-green-600 transition"
            />

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded
                         hover:bg-green-500 transition font-medium"
            >
              Save Address
            </button>
          </form>
        </div>

        {/* IMAGE */}
        <img
          className="md:mr-16 md:mt-0 mb-6 md:mb-0 max-w-sm"
          src={assets.add_address_iamge}
          alt="Add Address"
        />
      </div>
    </div>
  );
};

export default AddAddress;
