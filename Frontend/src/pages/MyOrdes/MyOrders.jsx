// src/pages/MyOrders/MyOrders.jsx
import React, { useContext, useEffect, useState } from "react";
import StoreContext from "../../context/StoreContext";
import axios from "axios";
import assets from "../../assets/assets";

export const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-10 mx-0">
      <h2 className="text-2xl font-semibold text-[#49557e] mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-400 rounded-md p-5 mb-4 bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-center">
                {/* Parcel Icon */}
                <div>
                  <img
                    src={assets.parcel_icon}
                    alt="order"
                    className="w-12 h-12"
                  />
                </div>

                {/* Items Details */}
                <div className="sm:col-span-2">
                  <div className="flex gap-7">
                    <p className="text-sm  text-gray-700 font-medium">
                      {order.items.map(
                        (item, index) =>
                          `${item.name}  x   ${item.quantity}${
                            index === order.items.length - 1 ? "" : ", "
                          }`
                      )}
                    </p>
                    <p className="text-sm font-medium text-gray-500">
                      Items:{" "}
                      {order.items.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                    </p>
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <p className="text-lg font-bold text-gray-800">
                    ${order.amount}
                  </p>
                </div>

                {/* Status */}
                <div>
                  <p className="text-sm text-[#FF6347] font-medium">
                    • {order.status}
                  </p>
                </div>

                {/* Track Order Button */}
                <div className="flex justify-end">
                  <button
                    onClick={fetchOrders}
                    className="cursor-pointer px-4 py-2 border-2 border-[#FF6347] text-[#FF6347] font-semibold rounded text-sm hover:bg-red-50 transition-colors">
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
