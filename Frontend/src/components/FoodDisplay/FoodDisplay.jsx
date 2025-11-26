import React, { useContext } from "react";
import StoreContext from "../../context/StoreContext";
import { FoodItem } from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="mt-6 md:mt-8 lg:mt-[30px] px-4 md:px-0">
      <h2 className="text-[#262626] font-semibold text-xl md:text-2xl lg:text-3xl">
        Top Dishes near you
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mt-6 md:mt-8 lg:mt-[30px] gap-4 md:gap-6 lg:gap-[30px] gap-y-8 md:gap-y-10 lg:gap-y-[50px]">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};
export default FoodDisplay;
