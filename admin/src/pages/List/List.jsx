import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import EditFood from "../../components/EditFood/EditFood.jsx"; // ✅ Import EditFood component

export const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [editingFood, setEditingFood] = useState(null); // ✅ State for editing

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);

    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async (foodID) => {
    // ✅ Add confirmation dialog
    if (window.confirm("Are you sure you want to delete this item?")) {
      const response = await axios.post(`${url}/api/food/remove`, {
        id: foodID,
      });
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Error");
      }
    }
  };

  // ✅ Handle edit click
  const handleEdit = (item) => {
    setEditingFood(item);
  };

  // ✅ Handle close edit modal
  const handleCloseEdit = () => {
    setEditingFood(null);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 flex flex-col gap-4">
      <p className="text-xl md:text-2xl font-bold text-gray-800">
        All Foods List
      </p>

      {/* list-table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        {/* list-table-format title */}
        <div className="hidden md:grid grid-cols-6 gap-4 bg-gray-50 p-4 border-b border-gray-200">
          <b className="text-sm text-gray-700">Image</b>
          <b className="text-sm text-gray-700">Name</b>
          <b className="text-sm text-gray-700">Category</b>
          <b className="text-sm text-gray-700">Price</b>
          <b className="text-sm text-gray-700 col-span-2 text-center">
            Actions
          </b>{" "}
          {/* ✅ Changed to Actions */}
        </div>

        {list.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No food items found. Add some items to get started!
            </p>
          </div>
        ) : (
          list.map((item, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 items-center border-b border-gray-100 hover:bg-gray-50 transition-all duration-200">
                {/* ✅ Fixed Image with better error handling */}
                {item.image ? (
                  <img
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
                    onError={(e) => {
                      // Replace with a simple colored div instead of external placeholder
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}

                {/* Fallback div when image fails or doesn't exist */}
                <div
                  className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-xs"
                  style={{ display: item.image ? "none" : "flex" }}>
                  No Image
                </div>
                <p className="text-sm md:text-base text-gray-800 font-medium">
                  {item.name}
                </p>
                <p className="text-sm text-gray-600 hidden md:block">
                  {item.category}
                </p>
                <p className="text-sm md:text-base text-[#ff6347] font-semibold">
                  ${item.price}
                </p>

                {/* ✅ Action Buttons */}
                <div className="col-span-2 flex gap-2 justify-center md:justify-start">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition font-medium">
                    Edit
                  </button>
                  <button
                    onClick={() => removeFood(item._id)}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition font-medium">
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ✅ Edit Modal */}
      {editingFood && (
        <EditFood
          foodItem={editingFood}
          url={url}
          onClose={handleCloseEdit}
          onUpdate={fetchList}
        />
      )}
    </div>
  );
};
