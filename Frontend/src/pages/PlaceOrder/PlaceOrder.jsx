import React, { useContext } from "react";
import StoreContext from "../../context/StoreContext";

export const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <form className="flex flex-col lg:flex-row justify-between gap-10 mt-10 mb-20">
      {/* LEFT SIDE - Delivery Form */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
        <p className="text-xl font-semibold mb-4 text-[#49557e]">
          Delivery Information
        </p>

        {/* Name fields */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-full border border-gray-300 p-2.5 rounded-sm outline-none focus:border-[#FF6347] duration-300"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full border border-gray-300 p-2.5 rounded-sm outline-none focus:border-[#FF6347] duration-300"
          />
        </div>

        <input
          type="email"
          placeholder="Email Address"
          className="w-full border border-gray-300 p-2.5 mb-4 rounded-sm outline-none focus:border-[#FF6347] duration-300"
        />
        <input
          type="text"
          placeholder="Street"
          className="w-full border border-gray-300 p-2.5 mb-4 rounded-sm outline-none focus:border-[#FF6347] duration-300"
        />

        {/* City / State */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="City"
            className="w-full border border-gray-300 p-2.5 rounded-sm outline-none focus:border-[#FF6347] duration-300"
          />
          <input
            type="text"
            placeholder="State"
            className="w-full border border-gray-300 p-2.5 rounded-sm outline-none focus:border-[#FF6347] duration-300"
          />
        </div>

        {/* Zip / Country */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Zip Code"
            className="w-full border border-gray-300 p-2.5 rounded-sm outline-none focus:border-[#FF6347] duration-300"
          />
          <input
            type="text"
            placeholder="Country"
            className="w-full border border-gray-300 p-2.5 rounded-sm outline-none focus:border-[#FF6347] duration-300"
          />
        </div>

        <input
          type="text"
          placeholder="Phone"
          className="w-full border border-gray-300 p-2.5 mb-2 rounded-sm outline-none focus:border-[#FF6347] duration-300"
        />
      </div>

      {/* RIGHT SIDE - Cart Summary */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md h-max">
        <h2 className="text-xl font-semibold mb-5 text-[#49557e]">
          Cart Totals
        </h2>

        <div className="flex flex-col gap-3 text-[#555]">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <p>Delivery Fee</p>
            <p>$2</p>
          </div>
          <hr />
          <div className="flex justify-between font-semibold">
            <p>Total</p>
            <p>${getTotalCartAmount() + 2}</p>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full text-white bg-[#FF6347] py-3 rounded-sm font-semibold hover:opacity-90 duration-300"
        >
          PROCEED TO PAY
        </button>
      </div>
    </form>
  );
};
