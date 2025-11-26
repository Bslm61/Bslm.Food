import React from "react";

export const Header = () => {
  return (
    <div className="h-[50vh] sm:h-[45vh] md:h-[40vw] lg:h-[34vw] mx-auto my-6 md:my-8 lg:my-[30px] bg-[url('/header_img.png')] bg-cover bg-center flex flex-col justify-center items-start text-white p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="mt-8 sm:mt-16 md:mt-32 lg:mt-20 animate-fade-in-scale">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 max-w-full sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px]">
          Order your favourite food here
        </h2>
        <p className="text-sm sm:text-base md:text-lg max-w-full sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] mb-6 ">
          Pick your favorite dish, choose delivery or pickup, and get hot,
          ready-to-eat food fast. Simple ordering, real-time updates, and speedy
          delivery — mealtime solved.
        </p>
        <button className="border-none text-black px-4 py-2 sm:px-5 sm:py-2.5 w-32 sm:w-36 md:w-40 text-sm sm:text-base rounded-full cursor-pointer bg-white hover:bg-gray-100 transition-colors">
          View Menu
        </button>
      </div>
    </div>
  );
};
