import React, {  useContext, useState } from "react";
import assets from "../../assets/assets";
import StoreContext from "../../context/StoreContext.jsx";
import axios from "axios"

export const LogingPopup = ({ setShowLogin }) => {


  const {url,setToken} = useContext(StoreContext);
  
  
  const [currState, setCurrState] = useState("Login");
  const [data,setData] = useState({name:"",
    email:"",
    password:""
  })

  const onChangeHandler=()=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onLogin = async (event)  => {
    event.preventDefault();

    let  newUrl = url;

    if (currState==="Login") {
      newUrl += "/api/user/login"
    }
    else{
      newUrl += "/api/user/register"
    }
     const response  = await axios.post(newUrl,data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false);
      }
      else{
        alert(response.data.message);
      }
  }
  
  
  return (
    // login-popup
    <div className="absolute z-10 w-full h-full bg-[#00000090] grid p-4">
      {/* login-popup-container */}
      <form 
      onSubmit={onLogin}
      className="place-self-center w-full sm:w-[400px] md:w-[23vw] max-w-[90%] sm:max-w-[400px] md:max-w-[450px] text-[#808080] bg-white flex flex-col gap-5 md:gap-[25px] p-6 sm:p-8 md:p-[25px_30px] rounded-lg text-sm md:text-[14px] animate-fade-in duration-500">
        {/* login-popup-title */}
        <div className="flex justify-between items-center text-black text-xl sm:text-2xl">
          <h2>{currState}</h2>
          <img
            className="cursor-pointer w-4 sm:w-5"
            onClick={() => {
              setShowLogin(false);
            }}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        {/* login-popup-inputs */}
        <div className="flex flex-col gap-4 md:gap-5">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              className="border border-gray-300 border-solid p-2 sm:p-2.5 rounded-sm outline-none focus:ring-2 focus:ring-orange-400 text-sm sm:text-base"
              name="name" onChange={onChangeHandler} value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            className="border border-gray-300 border-solid p-2 sm:p-2.5 rounded-sm outline-none focus:ring-2 focus:ring-orange-400 text-sm sm:text-base"
            name="email" onChange={onChangeHandler} value={data.email} 
            type="email"
            placeholder="Your email"
            required
          />
          <input
            className="border border-gray-300 border-solid p-2 sm:p-2.5 rounded-sm outline-none focus:ring-2 focus:ring-orange-400 text-sm sm:text-base"
            name="password" onChange={onChangeHandler} value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button 
        type="submit"
        className="border-none p-2 sm:p-2.5 bg-[#FF6347] text-sm sm:text-[15px] cursor-pointer text-white rounded-sm hover:bg-[#ff4500] transition-colors">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        {/* login-popup-condition */}
        <div className="flex items-start gap-2 -mt-2 md:-mt-[15px]">
          <input className="mt-1 shrink-0" type="checkbox" required />
          <p className="text-xs sm:text-sm">By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p className="text-xs sm:text-sm text-center sm:text-left">
            Create a new account?{" "}
            <span
              onClick={() => setCurrState("Sign Up")}
              className="cursor-pointer text-[#FF6347] hover:underline">
              Click here
            </span>
          </p>
        ) : (
          <p className="text-xs sm:text-sm text-center sm:text-left">
            Already have an account?{" "}
            <span
              onClick={() => setCurrState("Login")}
              className="cursor-pointer text-[#FF6347] hover:underline">
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};