import React, { useRef } from "react";
import { menu_list } from "../../assets/assets";

export const ExploreMenu = ({ category, setCategory }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 200;
      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div id="menu" className="flex flex-col gap-4 md:gap-5 px-4 md:px-0">
      <h1 className="text-[#262626] font-medium text-xl md:text-2xl lg:text-3xl">
        Explore our menu
      </h1>
      <p className="max-w-full md:max-w-[80%] lg:max-w-[70%] text-sm md:text-base text-[#262626]">
        From hearty classics to modern favorites, our menu offers something for
        every craving. Each dish is made with fresh, high-quality ingredients
        and a touch of culinary passion — dive in and discover your next
        favorite meal.
      </p>

      {/* Container with scroll buttons */}
      <div className="relative">
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll("left")}
          className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 hover:bg-gray-100 transition-all cursor-pointer shadow-md">
          ❮
        </button>

        {/* Scrollable Menu */}
        <div
          ref={scrollContainerRef}
          className="flex items-center text-center gap-4 md:gap-6 lg:gap-[30px] m-1 overflow-x-auto scrollbar-hide lg:px-14">
          {menu_list.map((item, index) => {
            return (
              <div
                onClick={() =>
                  setCategory((prev) =>
                    prev === item.menu_name ? "All" : item.menu_name
                  )
                }
                key={index}
                className="shrink-0 w-[100px] sm:w-[120px] md:w-[140px] lg:w-[150px] text-center cursor-pointer">
                <img
                  src={item.menu_image}
                  alt={item.menu_name}
                  className={`w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] lg:w-[150px] lg:h-[150px] min-w-20 object-cover transition-all
  ${
    category === item.menu_name
      ? "rounded-full border-2 sm:border-3 md:border-4 border-red-400 p-0.5"
      : "rounded-lg"
  }`}
                  style={{
                    clipPath:
                      category === item.menu_name ? "circle(50%)" : "none",
                  }}
                />
                <p className="mt-2 text-[#747474] text-sm sm:text-base md:text-lg lg:text-xl">
                  {item.menu_name}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll("right")}
          className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 hover:bg-gray-100 transition-all cursor-pointer shadow-md">
          ❯
        </button>
      </div>

      <hr className="m-2 h-0.5 bg-[#e2e2e2] border-none" />
    </div>
  );
};