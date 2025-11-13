import React, { useState } from "react";
import assets from "../../assets/assets";

export const LogingPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");

  return (
    // login-popup
    <div className="absolute z-1  w-full h-full bg-[#00000090] grid ">
      {/* login-popup-container */}
      <form className="place-self-center w-[23vw] max-w-[330px] text-[#808080] bg-white flex flex-col gap-[25px] p-[25px_30px] rounded-lg text-[14px] animate-fade-in duration-500">
        {/* login-popup-title     */}
        <div className="flex justify-between items-center text-black text-2xl  ">
          <h2>{currState}</h2>
          <img
            className=" cursor-pointer"
            onClick={() => {
              setShowLogin(false);
            }}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        {/* login-popup-inputs */}
        <div className="flex flex-col gap-5">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              className="border border-gray-300 border-solid p-2.5 rounded-sm outline-none focus:ring-2 focus:ring-orange-400"
              type="text"
              placeholder="Your name "
              required
            />
          )}
          <input
            className="border border-gray-300 border-solid p-2.5 rounded-sm outline-none focus:ring-2 focus:ring-orange-400"
            type="email"
            placeholder="Your email"
            required
          />
          <input
            className="border border-gray-300 border-solid p-2.5 rounded-sm outline-none focus:ring-2 focus:ring-orange-400"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button className="border-none p-2.5 bg-[#FF6347] text-[15px] cursor-pointer text-white rounded-sm">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        {/* login-popup-condition */}
        <div className="flex items-start  gap-2 -mt-[15px] ">
          <input className="mt-[5px]" type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => setCurrState("Sign Up")}
              className="cursor-pointer text-[#FF6347]">
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setCurrState("Login")}
              className="cursor-pointer text-[#FF6347]">
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};
