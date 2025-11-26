import React, { useContext, useEffect, useState} from "react";
import StoreContext from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url, userId } =
    useContext(StoreContext);

  const [data, setData] = useState({
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

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      userId: userId,
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };
    const navigate = useNavigate();

    useEffect(()=>{
      if (!token) {
        navigate("/");
      }
      else if (getTotalCartAmount()=== 0) {
        navigate('/cart')
      }
    },[token, navigate])

    if (!token || getTotalCartAmount() === 0) {
  return null;
}
  return (
    <form
      onSubmit={placeOrder}
      className="flex flex-col lg:flex-row justify-between gap-10 mt-10 mb-20">
      {/* LEFT SIDE - Delivery Form */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
        <p className="text-xl font-semibold mb-4 text-[#49557e]">
          Delivery Information
        </p>

        {/* Name fields */}
        <div className="flex gap-4 mb-4">
          <input
            required
            name="firstname"
            onChange={onChangeHandler}
            value={data.firstname}
            type="text"
            placeholder="First Name"
            className="w-full border border-gray-300 p-2.5 rounded-sm outline-none focus:border-[#FF6347] duration-300"
          />
          <input
            required
            name="lastname"
            onChange={onChangeHandler}
            value={data.lastname}
            type="text"
            placeholder="Last Name"
            className="w-full border border-gray-300 p-2.5 rounded-sm outline-none focus:border-[#FF6347] duration-300"
          />
        </div>

        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email Address"
          className="w-full border border-gray-300 p-2.5 mb-4 rounded-sm outline-none focus:border-[#FF6347] duration-300"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
          className="w-full border border-gray-300 p-2.5 mb-4 rounded-sm outline-none focus:border-[#FF6347] duration-300"
        />

        {/* City / State */}
        <div className="flex gap-4 mb-4">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
            className="w-full border border-gray-300 p-2.5 rounded-sm outline-none focus:border-[#FF6347] duration-300"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
            className="w-full border border-gray-300 p-2.5 rounded-sm outline-none focus:border-[#FF6347] duration-300"
          />
        </div>

        {/* Zip / Country */}
        <div className="flex gap-4 mb-4">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip Code"
            className="w-full border border-gray-300 p-2.5 rounded-sm outline-none focus:border-[#FF6347] duration-300"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
            className="w-full border border-gray-300 p-2.5 rounded-sm outline-none focus:border-[#FF6347] duration-300"
          />
        </div>

        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
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

        <div>
          {/* cart-total-details */}
          <div className="flex justify-between text-[#555] ">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr className="my-2.5" />
          <div className="flex justify-between text-[#555] ">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr className="my-2.5" />
          <div className="flex justify-between text-[#555] ">
            <b>Total</b>
            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full text-white bg-[#FF6347] py-3 rounded-sm font-semibold hover:opacity-90 duration-300">
          PROCEED TO PAYEMENT
        </button>
      </div>
    </form>
  );
};
