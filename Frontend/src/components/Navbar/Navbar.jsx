import React, { useState } from "react";

export const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false); // for mobile menu toggle

  return (
    <nav className="w-full bg-white shadow-sm lg:shadow-none">
      {/* Navbar Container */}
      <div className="max-w-[1050px] mx-auto p-3 flex justify-between items-center">
        {/* Logo */}
        <img
          className="w-[100px] sm:w-[120px] md:w-[140px]"
          src="./src/assets/logo.png"
          alt="logo"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex list-none gap-6 text-[#49557e] text-[17px] font-[Outfit]">
          {["home", "menu", "mobile-app", "contact-us"].map((item) => (
            <li
              key={item}
              onClick={() => setMenu(item)}
              className={`cursor-pointer capitalize ${
                menu === item
                  ? "p-1 border-b-2 border-[#49557e]"
                  : "hover:text-gray-700"
              }`}
            >
              {item.replace("-", " ")}
            </li>
          ))}
        </ul>

        {/* Right Side (icons + button) */}
        <div className="hidden md:flex items-center gap-4">
          <img
            className="w-5 cursor-pointer"
            src="./src/assets/search_icon.png"
            alt="search"
          />

          <div className="relative cursor-pointer">
            <img
              className="w-6"
              src="./src/assets/basket_icon.png"
              alt="basket"
            />
            <div className="absolute min-w-2.5 min-h-2.5 bg-red-400 rounded-full -top-1 -right-1"></div>
          </div>

          <button className="text-[15px] text-[#49557e] border border-gray-500 px-4 py-1 rounded-full hover:bg-amber-50 duration-300">
            Sign In
          </button>
        </div>

        {/* Hamburger Icon (Mobile only) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1 cursor-pointer"
        >
          <span className="w-6 h-0.5 bg-[#49557e]"></span>
          <span className="w-6 h-0.5 bg-[#49557e]"></span>
          <span className="w-6 h-0.5 bg-[#49557e]"></span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center gap-4 py-4 bg-white   ">
          {["home", "menu", "mobile-app", "contact-us"].map((item) => (
            <li
              key={item}
              onClick={() => {
                setMenu(item);
                setIsOpen(false);
              }}
              className={`cursor-pointer capitalize text-[#49557e] ${
                menu === item ? "border-b-2 border-[#49557e]" : ""
              }`}
            >
              {item.replace("-", " ")}
            </li>
          ))}

          {/* Mobile Sign-In Button */}
          <button className="text-[15px] text-[#49557e] border border-gray-500 px-6 py-1 rounded-full hover:bg-amber-50 duration-300">
            Sign In
          </button>
        </ul>
      )}
    </nav>
  );
};
