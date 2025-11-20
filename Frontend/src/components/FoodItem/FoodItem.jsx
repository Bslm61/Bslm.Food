import React, { useContext } from "react";
import assets from "../../assets/assets";
import StoreContext from "../../context/StoreContext";

export const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className="w-full m-auto rounded-2xl md:rounded-[30px] shadow-[0_0_2px_rgba(0,0,0,0.1)] duration-300 animate-fade-in-scale">
      <div className="relative">
        <img src={url+"/images/"+image} alt="" className="w-full rounded-2xl" />
        {!cartItems[id] ? (
          <img
            onClick={() => addToCart(id)}
            className="w-6 sm:w-7 md:w-[30px] absolute bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-[15px] md:right-[15px] cursor-pointer rounded-full"
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 p-0.5 sm:p-1 bg-white absolute bottom-1 right-1 sm:bottom-2 sm:right-2 md:bottom-[5px] md:right-[5px] cursor-pointer rounded-full">
            <img
              onClick={() => removeFromCart(id)}
              className="w-6 sm:w-7 md:w-[30px]"
              src={assets.remove_icon_red}
              alt=""
            />
            <p className="text-sm sm:text-base">{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              className="w-6 sm:w-7 md:w-[30px]"
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="p-3 sm:p-4 md:p-5">
        <div className="flex items-center justify-between mb-2 sm:mb-2.5">
          <p className="text-base sm:text-lg md:text-[20px] font-medium truncate pr-2">{name}</p>
          <img src={assets.rating_starts} alt="" className="w-16 sm:w-18 md:w-20 shrink-0" />
        </div>
        <p className="text-[#676767] text-xs sm:text-sm md:text-[12px] line-clamp-2">{description}</p>
        <p className="text-red-400 text-lg sm:text-xl md:text-[22px] font-semibold mt-2 sm:mt-2.5">${price}</p>
      </div>
    </div>
  );
};