import React, { useContext} from "react";
import assets from "../../assets/assets";
import StoreContext from "../../context/StoreContext";

export const FoodItem = ({ id, name, price, description, image }) => {
  const {cartItems,addToCart,removeFromCart}= useContext(StoreContext);


  return (
    <div className="w-full m-auto  rounded-[30px] shadow-[0_0_2px_rgba(0,0,0,0.1)] duration-300 animate-fade-in-scale">
      <div className="relative">
        <img src={image} alt="" className="w-full rounded-2xl " />
        {!cartItems[id] 
          ? <img
            onClick={() => addToCart(id)}
            className="w-[30px] absolute bottom-[15px] right-[15px] cursor-pointer rounded-full "
            src={assets.add_icon_white}
            alt=""
          />
         : (
          <div className=" flex items-center gap-2.5 p-1 bg-white   absolute bottom-[5px] right-[5px]  cursor-pointer rounded-4xl ">
            <img
            onClick={() => removeFromCart(id)}
            className="w-[30px]"
            src={assets.remove_icon_red} alt="" />
            <p>{cartItems[id]}</p>
            <img
            onClick={() => addToCart(id)}
            className="w-[30px]"  
            src={assets.add_icon_green} alt="" />
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2.5 ">
          <p className="text-[20px] w-[500px] ">{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="text-[#676767] text-[12px]">{description}</p>
        <p className="text-red-400 text-[22px] w-[500px] m-[10px]">${price}</p>
      </div>
    </div>
  );
};
