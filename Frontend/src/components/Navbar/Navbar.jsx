import React, { useContext, useState } from "react";
import assets from "../../assets/assets";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import StoreContext from "../../context/StoreContext";

export const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setShowProfileMenu(false);
  };

  return (
    <nav className="w-full bg-white shadow-sm lg:shadow-none sticky top-0 z-50">
      {/* Navbar Container */}
      <div className="max-w-[1050px] mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        <RouterLink to="/" className="cursor-pointer">
          {/* Logo */}
          <img
            className="w-[90px] sm:w-[110px] md:w-[130px] lg:w-[140px]"
            src="./src/assets/logo.png"
            alt="logo"
          />
        </RouterLink>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex list-none gap-5 xl:gap-6 text-[#49557e] text-[15px] lg:text-[16px] xl:text-[17px] font-[Outfit]">
          {["home", "menu", "mobile-app", "contact-us"].map((item) => (
            <li key={item}>
              {item === "home" ? (
                <RouterLink
                  to="/"
                  onClick={() => setMenu("home")}
                  className={`cursor-pointer capitalize transition-all duration-200 ${
                    menu === "home"
                      ? "pb-1 border-b-2 border-[#49557e]"
                      : "hover:text-gray-700"
                  }`}>
                  Home
                </RouterLink>
              ) : (
                <ScrollLink
                  to={item}
                  smooth={true}
                  duration={600}
                  offset={-80}
                  onClick={() => setMenu(item)}
                  className={`cursor-pointer capitalize transition-all duration-200 ${
                    menu === item
                      ? "pb-1 border-b-2 border-[#49557e]"
                      : "hover:text-gray-700"
                  }`}>
                  {item.replace("-", " ")}
                </ScrollLink>
              )}
            </li>
          ))}
        </ul>

        {/* Right Side (icons + button) */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4">
          <img
            className="w-4 lg:w-5 cursor-pointer hover:opacity-70 transition-opacity"
            src="./src/assets/search_icon.png"
            alt="search"
          />

          <div className="relative cursor-pointer">
            <RouterLink to="/Cart">
              <img 
                className="w-5 lg:w-6 hover:opacity-70 transition-opacity cursor-pointer" 
                src={assets.basket_icon} 
                alt="basket" 
              />
            </RouterLink>
            {getTotalCartAmount() > 0 ? (
              <div className="absolute min-w-2.5 min-h-2.5 bg-red-400 rounded-full -top-1 -right-1"></div>
            ) : (
              ""
            )}
          </div>

          {!token ? (
            <button
              onClick={() => setShowLogin(true)}
              className="text-sm lg:text-[15px] text-[#49557e] border border-gray-500 px-3 lg:px-4 py-1 lg:py-1.5 rounded-full hover:bg-amber-50 transition-all duration-300 cursor-pointer">
              Sign In
            </button>
          ) : (
            // navbar-profile (Desktop)
            <div className="relative">
              <img
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-5 lg:w-6 cursor-pointer hover:opacity-70 transition-opacity"
                src={assets.profile_icon}
                alt="profile"
              />
              {/* nav-profile-dropdown (Desktop) */}
              {showProfileMenu && (
                <ul 
                  className="absolute right-0 mt-3 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-36 lg:w-40 z-50 animate-fade-in">
                  <li
                    onClick={() => {
                      navigate('/myorders');
                      setShowProfileMenu(false);
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-amber-50 cursor-pointer transition-colors">
                    <img className="w-5" src={assets.bag_icon} alt="orders" />
                    <p className="text-sm text-[#49557e] font-medium">Orders</p>
                  </li>
                  <hr className="my-1 border-gray-200" />
                  <li
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-amber-50 cursor-pointer transition-colors">
                    <img className="w-5" src={assets.logout_icon} alt="logout" />
                    <p className="text-sm text-[#49557e] font-medium">Logout</p>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Mobile Right Side (Cart + Profile/Hamburger) */}
        <div className="flex lg:hidden items-center gap-3 sm:gap-4">
          {/* Cart Icon */}
          <div className="relative cursor-pointer">
            <RouterLink to="/Cart">
              <img 
                className="w-5 sm:w-6 cursor-pointer hover:opacity-70 transition-opacity" 
                src={assets.basket_icon} 
                alt="basket" 
              />
            </RouterLink>
            {getTotalCartAmount() > 0 ? (
              <div className="absolute min-w-2.5 min-h-2.5 bg-red-400 rounded-full -top-1 -right-1"></div>
            ) : (
              ""
            )}
          </div>

          {/* Profile Icon (Mobile) - Only show when logged in */}
          {token && (
            <div className="relative">
              <img
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-5 sm:w-6 cursor-pointer hover:opacity-70 transition-opacity"
                src={assets.profile_icon}
                alt="profile"
              />
              {/* Mobile Profile Dropdown */}
              {showProfileMenu && (
                <ul className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-32 sm:w-36 z-50 animate-fade-in">
                  <li
                    onClick={() => {
                      navigate('/myorders');
                      setShowProfileMenu(false);
                    }}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 hover:bg-amber-50 cursor-pointer transition-colors">
                    <img className="w-4 sm:w-5" src={assets.bag_icon} alt="orders" />
                    <p className="text-xs sm:text-sm text-[#49557e] font-medium">Orders</p>
                  </li>
                  <hr className="my-1 border-gray-200" />
                  <li
                    onClick={logout}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 hover:bg-amber-50 cursor-pointer transition-colors">
                    <img className="w-4 sm:w-5" src={assets.logout_icon} alt="logout" />
                    <p className="text-xs sm:text-sm text-[#49557e] font-medium">Logout</p>
                  </li>
                </ul>
              )}
            </div>
          )}
            
          {/* Hamburger Icon (Mobile only) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col gap-1 cursor-pointer">
            <span className={`w-6 h-0.5 bg-[#49557e] transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-[#49557e] transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-[#49557e] transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}>
        <ul className="flex flex-col items-center gap-4 py-4 bg-white border-t border-gray-100">
          {["home", "menu", "mobile-app", "contact-us"].map((item) => (
            <li key={item}>
              {item === "home" ? (
                <RouterLink
                  to="/"
                  onClick={() => {
                    setMenu("home");
                    setIsOpen(false);
                  }}
                  className={`cursor-pointer capitalize text-[#49557e] text-base sm:text-lg transition-all ${
                    menu === item ? "border-b-2 border-[#49557e] pb-1" : ""
                  }`}>
                  Home
                </RouterLink>
              ) : (
                <ScrollLink
                  to={item}
                  smooth={true}
                  duration={600}
                  offset={-80}
                  onClick={() => {
                    setMenu(item);
                    setIsOpen(false);
                  }}
                  className={`cursor-pointer capitalize text-[#49557e] text-base sm:text-lg transition-all ${
                    menu === item ? "border-b-2 border-[#49557e] pb-1" : ""
                  }`}>
                  {item.replace("-", " ")}
                </ScrollLink>
              )}
            </li>
          ))}

          {/* Mobile Sign-In Button - Only show when NOT logged in */}
          {!token && (
            <button
              onClick={() => {
                setShowLogin(true);
                setIsOpen(false);
              }}
              className="text-[15px] sm:text-base text-[#49557e] border border-gray-500 px-6 sm:px-8 py-1.5 sm:py-2 rounded-full hover:bg-amber-50 transition-all duration-300 mt-2 cursor-pointer">
              Sign In
            </button>
          )}

          {/* Mobile Orders Link - Only show when logged in */}
          {token && (
            <>
              <button
                onClick={() => {
                  navigate('/myorders');
                  setIsOpen(false);
                }}
                className="text-[15px] sm:text-base text-[#49557e] border border-gray-500 px-6 sm:px-8 py-1.5 sm:py-2 rounded-full hover:bg-amber-50 transition-all duration-300 cursor-pointer flex items-center gap-2">
                <img className="w-4 sm:w-5" src={assets.bag_icon} alt="orders" />
                Orders
              </button>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="text-[15px] sm:text-base text-[#49557e] border border-gray-500 px-6 sm:px-8 py-1.5 sm:py-2 rounded-full hover:bg-amber-50 transition-all duration-300 cursor-pointer flex items-center gap-2">
                <img className="w-4 sm:w-5" src={assets.logout_icon} alt="logout" />
                Logout
              </button>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};