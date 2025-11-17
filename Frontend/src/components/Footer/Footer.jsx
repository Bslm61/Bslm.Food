import React from "react";
import assets from "../../assets/assets";

export const Footer = () => {
  return (
    //footer
    <div
      id="contact-us"
      className=" bg-gray-800 overflow-hidden text-[#d9d9d9] flex flex-col items-center gap-5 py-8 md:py-10 pt-12 md:pt-20 mt-8 md:mt-10 px-4">
      {/* footer-content */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        {/* footer-content-left */}
        <div className="sm:col-span-2 lg:col-span-1">
          <img src={assets.logo} alt="logo" className="mb-3 w-32 md:w-auto" />
          <p className="text-xs sm:text-sm leading-5 md:leading-6 max-w-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            repellat tempore quia quis ullam fugiat temporibus laborum harum
            facere, voluptatum minima autem, quo optio quae maiores, quaerat a
            suscipit? Ab.
          </p>
          <div className="flex gap-3 mt-4">
            <img src={assets.facebook_icon} alt="facebook" className="w-5 sm:w-6 cursor-pointer hover:scale-110 transition-transform" />
            <img src={assets.twitter_icon} alt="twitter" className="w-5 sm:w-6 cursor-pointer hover:scale-110 transition-transform" />
            <img src={assets.linkedin_icon} alt="linkedin" className="w-5 sm:w-6 cursor-pointer hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* footer-content-center */}
        <div>
          <h2 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">COMPANY</h2>
          <ul className="space-y-1.5 md:space-y-2 text-xs sm:text-sm">
            <li className="cursor-pointer hover:text-white transition-colors">Home</li>
            <li className="cursor-pointer hover:text-white transition-colors">About us</li>
            <li className="cursor-pointer hover:text-white transition-colors">Delivery</li>
            <li className="cursor-pointer hover:text-white transition-colors">Privacy policy</li>
          </ul>
        </div>

        {/* footer-content-right */}
        <div>
          <h2 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">GET IN TOUCH</h2>
          <ul className="space-y-1.5 md:space-y-2 text-xs sm:text-sm">
            <li>+212 5 1133 6678</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>

      <hr className="w-full border-gray-600 mt-4 md:mt-6" />
      <p className="text-xs sm:text-sm text-center px-4">
        Copyright © 2025 Tomato.com — All Rights Reserved
      </p>
    </div>
  );
};