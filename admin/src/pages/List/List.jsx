import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const List = () => {
  const url = "http://localhost:4000";
  const [list, setList] = useState([]);
  // const [loading, setLoading] = useState(true); //  État de chargement

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
   

    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood =async(foodID) => {
    const response = await axios.post(`${url}/api/food/remove`,{id:foodID});
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message)
      }

      else{
        toast.error("Error")
      }
  }

  useEffect(() => {
    fetchList();
  }, []);

  // // ✅ Affichage pendant le chargement
  // if (loading) {
  //   return (
  //     <div className="w-full max-w-6xl mx-auto p-6 md:p-8 text-center">
  //       <p className="text-gray-600">Loading...</p>
  //     </div>
  //   )
  // }

  return (
    // list add flex-col
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 flex flex-col gap-4">
      <p className="text-xl md:text-2xl font-bold text-gray-800">All Foods List</p>
      {/* list-table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        {/* list-table-format title */}
        <div className="hidden md:grid grid-cols-5 gap-4 bg-gray-50 p-4 border-b border-gray-200">
          <b className="text-sm text-gray-700">Image</b>
          <b className="text-sm text-gray-700">Name</b>
          <b className="text-sm text-gray-700">Category</b>
          <b className="text-sm text-gray-700">Price</b>
          <b className="text-sm text-gray-700">Action</b>
        </div>
        {list.map((item, index) => {
          return (
            // list-table-format
            <div
              key={index}
              className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 items-center border-b border-gray-100 hover:bg-gray-50 transition-all duration-200"
            >
              <img
                src={`${url}/images/${item.image}`}
                alt=""
                className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
              />
              <p className="text-sm md:text-base text-gray-800 font-medium">{item.name}</p>
              <p className="text-sm text-gray-600 hidden md:block">{item.category}</p>
              <p className="text-sm md:text-base text-[#ff6347] font-semibold">${item.price}</p>
              <p onClick={()=>{
                removeFood(item._id)
              }} className="text-red-600 cursor-pointer hover:text-red-800 font-bold text-lg md:text-xl">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};