import React from "react";
import assets from "../../assets/assets";

export const AppDownload = () => {
  return (
    //AppDownload
    <div
      id="mobile-app"
      className="m-auto mt-16 md:mt-24 lg:mt-[100px] px-4 text-2xl md:text-3xl lg:text-4xl text-center font-medium">
      <p>
        For Better Experience Download <br className="hidden sm:block" /> Tomato
        App
      </p>
      {/* app-download-platforms    */}
      <div className="flex items-center gap-3 md:gap-4 mt-6 md:mt-8 justify-center flex-wrap">
        <img
          src={assets.play_store}
          alt=""
          className="w-32 sm:w-36 md:w-40 lg:w-44 cursor-pointer transition-all duration-500 hover:scale-105"
        />
        <img
          src={assets.app_store}
          alt=""
          className="w-32 sm:w-36 md:w-40 lg:w-44 cursor-pointer transition-all duration-500 hover:scale-105"
        />
      </div>
    </div>
  );
};
