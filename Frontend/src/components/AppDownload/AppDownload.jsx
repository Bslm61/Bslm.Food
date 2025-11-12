import React from "react";
import assets from "../../assets/assets";

export const AppDownload = () => {
  return (
    //AppDownload
    <div
      id="mobile-app"
      className="m-auto mt-[100px] max-[3vw,20px] text-3xl text-center font-medium  ">
      <p>
        For Better Experience Sownload <br /> Tomato App
      </p>
      {/* app-download-platforms    */}
      <div className="flex items-center gap-2 mt-3 justify-center ">
        <img
          src={assets.play_store}
          alt=""
          className="w-40 md:w-50 cursor-pointer transition-all duration-500 hover:scale-[1.01]"
        />
        <img
          src={assets.app_store}
          alt=""
          className="w-40 md:w-50 cursor-pointer transition-all duration-500 hover:scale-[1.01]"
        />
      </div>
    </div>
  );
};
