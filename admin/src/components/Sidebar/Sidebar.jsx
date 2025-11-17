import React, { useState } from "react";
import { assets } from "../../assets/assets";

export const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleClick = (item) => {
    // Si on clique sur l'item déjà actif, on le désélectionne
    if (activeItem === item) {
      setActiveItem(null);
    } else {
      setActiveItem(item);
    }
  };

  return (
    <div className="w-20 sm:w-[200px] md:w-[250px] lg:w-[280px] min-h-screen border-r-[1.5px] border-solid border-gray-200 bg-white shadow-md">
      {/* Sidebar Options */}
      <div className="flex flex-col gap-4 pt-5">
        {/* Sidebar Option - Add Items */}
        <div
          onClick={() => handleClick("add")}
          className={`mx-3 sm:mx-0 sm:pl-6 md:pl-8 md:ml-6 border sm:border-r-0 flex items-center justify-center sm:justify-start gap-3 cursor-pointer p-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none transition-all duration-200 group ${
            activeItem === "add"
              ? "bg-[#fff0ed] border-[#ff6347]"
              : "border-gray-300 hover:bg-gray-50 hover:border-gray-400"
          }`}
        >
          <img
            src={assets.add_icon}
            alt="Add Items"
            className="w-5 h-5 shrink-0"
          />
          <p className="text-gray-700 font-medium text-sm md:text-base group-hover:text-gray-900 hidden sm:block">
            Add Items
          </p>
        </div>

        {/* Sidebar Option - List Items */}
        <div
          onClick={() => handleClick("list")}
          className={`mx-3 sm:mx-0 sm:pl-6 md:pl-8 md:ml-6 border sm:border-r-0 flex items-center justify-center sm:justify-start gap-3 cursor-pointer p-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none transition-all duration-200 group ${
            activeItem === "list"
              ? "bg-[#fff0ed] border-[#ff6347]"
              : "border-gray-300 hover:bg-gray-50 hover:border-gray-400"
          }`}
        >
          <img
            src={assets.order_icon}
            alt="List Items"
            className="w-5 h-5 shrink-0"
          />
          <p className="text-gray-700 font-medium text-sm md:text-base group-hover:text-gray-900 hidden sm:block">
            List Items
          </p>
        </div>

        {/* Sidebar Option - Orders */}
        <div
          onClick={() => handleClick("orders")}
          className={`mx-3 sm:mx-0 sm:pl-6 md:pl-8 md:ml-6 border sm:border-r-0 flex items-center justify-center sm:justify-start gap-3 cursor-pointer p-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none transition-all duration-200 group ${
            activeItem === "orders"
              ? "bg-[#fff0ed] border-[#ff6347]"
              : "border-gray-300 hover:bg-gray-50 hover:border-gray-400"
          }`}
        >
          <img
            src={assets.order_icon}
            alt="Orders"
            className="w-5 h-5 shrink-0"
          />
          <p className="text-gray-700 font-medium text-sm md:text-base group-hover:text-gray-900 hidden sm:block">
            Orders
          </p>
        </div>
      </div>
    </div>
  );
};