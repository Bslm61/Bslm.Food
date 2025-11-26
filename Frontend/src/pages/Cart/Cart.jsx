import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import StoreContext from "../../context/StoreContext";

export const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();
  
  return (
    <div className="mt-16 md:mt-20 lg:mt-[100px] px-4 sm:px-6 md:px-8 lg:px-0 max-w-6xl mx-auto">
      {/* cart-items-title */}
      <div className="hidden md:grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-gray-500 text-sm lg:text-base">
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <br className="hidden md:block" />
      <hr className="h-px bg-[#e2e2e2] border-none hidden md:block" />
      {food_list.map((item, index) => {
        if (cartItems[item._id] > 0) {
          return (
            <div key={item._id}>
              {/* Desktop View */}
              <div className="hidden md:grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center gap-2 my-2 text-black text-sm lg:text-base">
                <img className="w-12 lg:w-[50px] rounded" src={url+"/images/"+item.image} alt={item.name} />
                <p className="font-medium">{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p className="font-semibold">${item.price * cartItems[item._id]}</p>
                <p
                  onClick={() => removeFromCart(item._id)}
                  className="cursor-pointer text-red-500 hover:text-red-700 font-bold text-lg">
                  ✕
                </p>
              </div>

              {/* Mobile View */}
              <div className="md:hidden flex gap-3 p-4 bg-white border border-gray-200 rounded-lg my-3 shadow-sm">
                <img className="w-20 h-20 object-cover rounded" src={url+"/images/"+item.image} alt={item.name} />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-semibold text-base">{item.name}</p>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700 font-bold text-xl">
                      ✕
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">${item.price} × {cartItems[item._id]}</p>
                  <p className="text-[#FF6347] font-bold text-lg">${item.price * cartItems[item._id]}</p>
                </div>
              </div>

              <hr className="h-px bg-[#e2e2e2] border-none hidden md:block" />
            </div>
          );
        }
      })}
      
      {/* carte-bottom */}
      <div className="mt-8 md:mt-12 lg:mt-20 flex flex-col lg:flex-row gap-8 lg:gap-[max(12vw,20px)]">
        {/* carte-total */}
        <div className="flex-1 flex flex-col gap-4 md:gap-5">
          <h2 className="text-xl md:text-2xl font-bold">Cart Totals</h2>
          <div className="border border-gray-200 rounded-lg p-4 md:p-5">
            {/* cart-total-details */}
            <div className="flex justify-between text-[#555] text-sm md:text-base">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr className="my-2.5" />
            <div className="flex justify-between text-[#555] text-sm md:text-base">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr className="my-2.5" />
            <div className="flex justify-between text-[#555] text-sm md:text-base">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button
            onClick={() => {
              navigate("/order");
            }}
            className="border-none text-white bg-[#FF6347] hover:bg-[#ff4500] w-full md:w-auto md:min-w-[250px] py-3 px-6 cursor-pointer rounded-lg transition-all duration-200 font-semibold text-sm md:text-base">
            PROCEED TO CHECKOUT
          </button>
        </div>
        
        {/* cart-promocode */}
        <div className="flex-1">
          <div>
            <p className="text-[#555] mb-3 text-sm md:text-base">
              If you have a promo code, Enter it here
            </p>
            {/* cart-promocode-input */}
            <div className="flex gap-2 items-center bg-[#eaeaea] rounded-lg p-2">
              <input
                className="flex-1 bg-transparent border-none outline-none pl-2 text-sm md:text-base"
                type="text"
                placeholder="promo code"
              />
              <button className="px-4 md:px-6 py-2 md:py-2.5 bg-black hover:bg-gray-800 text-white rounded-lg transition-all duration-200 text-sm md:text-base font-medium whitespace-nowrap cursor-pointer">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;