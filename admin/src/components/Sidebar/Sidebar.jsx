import React from "react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="w-20 sm:w-[200px] md:w-[250px] lg:w-[280px] min-h-screen border-r-[1.5px] border-solid border-gray-200 bg-white shadow-md">
      {/* Sidebar Options */}
      <NavLink className="flex flex-col gap-4 pt-5">
        {/* Sidebar Option - Add Items */}
        <NavLink to='/add' className="mx-3 sm:mx-0 sm:pl-6 md:pl-8 md:ml-6 border border-gray-300 sm:border-r-0 flex items-center justify-center sm:justify-start gap-3 cursor-pointer p-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 group">
          <img
            src={assets.add_icon}
            alt="Add Items"
            className="w-5 h-5 shrink-0"
          />
          <p className="text-gray-700 font-medium text-sm md:text-base group-hover:text-gray-900 hidden sm:block">
            Add Items
          </p>
        </NavLink>

        {/* Sidebar Option - List Items */}
        <NavLink to='/list' className="mx-3 sm:mx-0 sm:pl-6 md:pl-8 md:ml-6 border border-gray-300 sm:border-r-0 flex items-center justify-center sm:justify-start gap-3 cursor-pointer p-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 group">
          <img
            src={assets.order_icon}
            alt="List Items"
            className="w-5 h-5 shrink-0"
          />
          <p className="text-gray-700 font-medium text-sm md:text-base group-hover:text-gray-900 hidden sm:block">
            List Items
          </p>
        </NavLink>

        {/* Sidebar Option - Orders */}
        <NavLink to='/orders' className="mx-3 sm:mx-0 sm:pl-6 md:pl-8 md:ml-6 border border-gray-300 sm:border-r-0 flex items-center justify-center sm:justify-start gap-3 cursor-pointer p-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 group">
          <img
            src={assets.order_icon}
            alt="Orders"
            className="w-5 h-5 shrink-0"
          />
          <p className="text-gray-700 font-medium text-sm md:text-base group-hover:text-gray-900 hidden sm:block">
            Orders
          </p>
        </NavLink>
      </NavLink>
    </div>
  );
};