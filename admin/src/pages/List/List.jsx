import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const List = () => {
  const url = "http://localhost:4000";
  const [list, setList] = useState([]);
  // const [loading, setLoading] = useState(true); //  État de chargement

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data);

    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

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
  <div>
    <p>All Foods List</p>
    {/* list-table */}
    <div>
      {/* list-table-format title */}
      <div>
      <b>Image</b>
      <b>Name</b>
      <b>Category</b>
      <b>Price</b>
      <b>Action</b>
      </div>
      {list.map((item,index)=>{
          return(
            // list-table-format
            <div key={index} >
              <img src={`${url}/images/${item.image}`} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p>X</p>
            </div>
          )
      })}
    </div>
    </div>
) 
};

