import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { dummyOrders } from "../greencart_assets/assets";

const MyOrders = () => {
  const [myorders, setMyOrder] = useState([]);
  const { currency } = useAppContext();

  const fetchMyOrders = async () => {
    setMyOrder(dummyOrders);
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className="mt-16 pb-16 px-4">
      {/* HEADING */}
      <div className="flex flex-col w-max mb-8">
        <p className="text-2xl font-semibold uppercase text-gray-800">
          My Orders
        </p>
        <div className="w-16 h-0.5 bg-green-600 rounded-full mt-1" />
      </div>

      {/* ORDERS */}
      {myorders.map((order, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-xl mb-8 p-5 max-w-4xl bg-white shadow-sm"
        >
          {/* ORDER HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-500 gap-2 border-b pb-3 mb-4">
            <span>
              <strong className="text-gray-700">Order ID:</strong> {order._id}
            </span>
            <span>
              <strong className="text-gray-700">Payment:</strong>{" "}
              {order.paymentType}
            </span>
            <span>
              <strong className="text-gray-700">Total:</strong>{" "}
              {currency}
              {order.amount}
            </span>
          </div>

          {/* ORDER ITEMS */}
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4 border-b last:border-b-0"
            >
              {/* PRODUCT */}
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <img
                    src={item.product.image[0]}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover"
                  />
                </div>

                <div>
                  <h2 className="text-lg font-medium text-gray-800">
                    {item.product.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Category: {item.product.category}
                  </p>
                </div>
              </div>

              {/* DETAILS */}
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Qty:</strong> {item.quantity || 1}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="text-green-600 font-medium">
                    {order.status}
                  </span>
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* AMOUNT */}
              <p className="text-lg font-semibold text-green-600">
                {currency}
                {item.product.offerPrice * item.quantity}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
