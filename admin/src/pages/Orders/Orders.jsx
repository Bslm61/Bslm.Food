import React from 'react'
import { useState } from 'react'
import axios from "axios"
import {toast} from "react-toastify"
import { useEffect } from 'react'
import { assets } from '../../assets/assets'

export const Orders = ({url}) => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url+"/api/order/list");
      if (response.data.success){
        setOrders(response.data.data);
      }
      else{
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Error fetching orders");
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchAllOrders()
  },[])

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url+"/api/order/status", {
        orderId,
        status: event.target.value
      });
      if (response.data.success) {
        toast.success("Status updated");
        await fetchAllOrders();
      } else {
        toast.error("Error updating status");
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  }

  const cancelHandler = async (orderId) => {
    try {
      const response = await axios.post(url+"/api/order/cancel", {
        orderId
      });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error cancelling order");
    }
  }

  return (
    <div className="py-12 px-4 sm:px-6">
      <h2 className="text-3xl font-bold text-[#49557e] mb-8">All Orders</h2>
      
      {loading ? (
        <p className="text-gray-500 text-lg">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500 text-lg">No orders yet</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div key={index} className="border border-gray-300 rounded-md p-4 sm:p-6 bg-white hover:shadow-md transition-shadow">
              
              {/* Top Row - Icon, Items, Amount */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-start mb-4">
                
                {/* Parcel Icon */}
                <div className="flex justify-center sm:justify-start">
                  <img 
                    src={assets.parcel_icon} 
                    alt="order" 
                    className="w-12 h-12"
                  />
                </div>

                {/* Items Details */}
                <div className="sm:col-span-2">
                  <p className="text-sm text-gray-700 font-medium">
                    {order.items.map((item, idx) => 
                      `${item.name} x ${item.quantity}${idx === order.items.length - 1 ? "" : ", "}`
                    )}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Total Items: {order.items.reduce((total, item) => total + item.quantity, 0)}
                  </p>
                </div>

                {/* Amount */}
                <div className="text-right sm:text-left">
                  <p className="text-lg font-bold text-gray-800">${order.amount}</p>
                  <p className="text-xs text-gray-500 mt-1">Order ID: {order._id.slice(0, 8)}...</p>
                </div>
              </div>

              {/* Divider */}
              <hr className="my-4 border-gray-200" />

              {/* Bottom Row - Customer Info, Status & Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                
                {/* Customer Info */}
                <div className="text-sm">
                  <p className="font-semibold text-[#49557e] mb-2">Delivery Info:</p>
                  <p className="text-gray-700"><span className="font-medium">Name:</span> {order.address.firstname} {order.address.lastname}</p>
                  <p className="text-gray-700"><span className="font-medium">Email:</span> {order.address.email}</p>
                  <p className="text-gray-700"><span className="font-medium">Phone:</span> {order.address.phone}</p>
                  <p className="text-gray-700"><span className="font-medium">Address:</span> {order.address.street}, {order.address.city}, {order.address.state} {order.address.zipcode}</p>
                  <p className="text-gray-700"><span className="font-medium">Country:</span> {order.address.country}</p>
                </div>

                {/* Status & Payment */}
                <div className="text-sm">
                  <p className="font-semibold text-[#49557e] mb-2">Order Status:</p>
                  <select 
                    onChange={(e) => statusHandler(e, order._id)}
                    value={order.status}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm font-medium text-[#49557e] hover:border-[#FF6347] transition-colors cursor-pointer focus:outline-none focus:border-[#FF6347]">
                    <option value="Food Processing">Food Processing</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  <div className="mt-3">
                    <p className="text-xs text-gray-500">
                      <span className="font-medium">Payment:</span> {order.payment ? "✅ Paid" : "❌ Pending"}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  {order.status !== "Delivered" && (
                    <button
                      onClick={() => cancelHandler(order._id)}
                      className="px-4 py-2 border-2 border-red-500 text-red-500 font-semibold rounded text-sm hover:bg-red-50 transition-colors cursor-pointer">
                      Cancel Order
                    </button>
                  )}
                  {order.status === "Delivered" && (
                    <p className="px-4 py-2 bg-green-100 text-green-700 font-semibold rounded text-sm text-center">
                      ✅ Delivered
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}