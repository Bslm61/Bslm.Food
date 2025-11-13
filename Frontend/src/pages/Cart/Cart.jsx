import React from "react";
import { useNavigate } from "react-router";
import { useContext } from "react";
import StoreContext from "../../context/StoreContext";

export const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);
  const navigate = useNavigate();
  return (
    //cart
    <div className="mt-[100px]">
      {/* cart-items-title */}
      <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-gray-500 text-[max(1vw,12px)]">
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <br />
      <hr className="h-px bg-[#e2e2e2] border-none" />
      {food_list.map((item, index) => {
        if (cartItems[item._id] > 0) {
          return (
            // cart-items-title cart-items-item
            <div>
              <div
                className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center gap-2 m-[10px_0px] my-2 text-black "
                key={item.id_}>
                <img className="w-[50px]" src={item.image} alt="" />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price * cartItems[item._id]}</p>
                <p
                  onClick={() => removeFromCart(item._id)}
                  className="cursor-pointer">
                  x
                </p>
              </div>
              <hr className="h-px bg-[#e2e2e2] border-none" />
            </div>
          );
        }
      })}
      {/* carte-bottom */}
      <div className="mt-20 flex content-between gap-[max(12vw,20px)]">
        {/* carte-total */}
        <div className="flex-1 flex flex-col gap-5 ">
          <h2>Cart Totals</h2>
          <div>
            {/* cart-total-details */}
            <div className="flex justify-between text-[#555] ">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr className="my-2.5" />
            <div className="flex justify-between text-[#555] ">
              <p>Delevery Fee</p>
              <p>${2}</p>
            </div>
            <hr className="my-2.5" />
            <div className="flex justify-between text-[#555] ">
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
            className="border-none text-white bg-[#FF6347] w-[max(15vw,200px)] py-3 px-0 cursor-pointer rounded-sm">
            PROCEED TO CHECKOUT
          </button>
        </div>
        {/* cart-promocode */}
        <div className="flex-1">
          <div>
            <p className="text-[#555] mx-2.5 w-100">
              If you have a promo code, Enter it here
            </p>
            {/* cart-promocode-input */}
            <div className="flex m-2.5 justify-between items-center bg-[#eaeaea] rounded-sm">
              <input
                className="bg-transparent border-none outline-none pl-2.5"
                type="text"
                placeholder="promo code"
              />
              <button className="w-[max(10vw,150px)] px-3 py-[5px] bg-black text-white rounded-sm">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
