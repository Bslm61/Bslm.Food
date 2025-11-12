import React from "react";
import assets from "../../assets/assets";

export const Footer = () => {
  return (
    //footer
    <div
      id="contact-us"
      className=" overflow-hidden  text-[#d9d9d9] flex flex-col items-center gap-5  py-10 pt-20 mt-10 bg-emerald-500">
      {/* footer-content */}
      <div className=" bg-red-400 w-90 lg:w-300 grid grid-cols-[1fr_1fr_1fr] gap-10">
        {/* footer-content-left */}
        <div>
          <img src={assets.logo} alt="logo" className="mb-3" />
          <p className="text-sm bg-amber-400 w-50 leading-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            repellat tempore quia quis ullam fugiat temporibus laborum harum
            facere, voluptatum minima autem, quo optio quae maiores, quaerat a
            suscipit? Ab.
          </p>
          <div className="flex gap-3  mt-4">
            <img src={assets.facebook_icon} alt="facebook" className="w-6" />
            <img src={assets.twitter_icon} alt="twitter" className="w-6" />
            <img src={assets.linkedin_icon} alt="linkedin" className="w-6" />
          </div>
        </div>

        {/* footer-content-center */}
        <div>
          <h2 className="font-semibold mb-2">COMPANY</h2>
          <ul className="space-y-2 ">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">About us</li>
            <li className="cursor-pointer">Delivery</li>
            <li className="cursor-pointer">Privacy policy</li>
          </ul>
        </div>

        {/* footer-content-right */}
        <div>
          <h2 className="font-semibold mb-2">GET IN TOUCH</h2>
          <ul className="space-y-2">
            <li>+212 5 1133 6678</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>

      <hr className="w-full border-gray-600" />
      <p className="text-sm text-center">
        Copyright © 2025 Tomato.com — All Rights Reserved
      </p>
    </div>
  );
};
