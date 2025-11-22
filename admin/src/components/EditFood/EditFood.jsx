import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditFood = ({ foodItem, url, onClose, onUpdate }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: foodItem.name,
    description: foodItem.description,
    price: foodItem.price,
    category: foodItem.category
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("id", foodItem._id);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(`${url}/api/food/update`, formData);
      if (response.data.success) {
        toast.success("Food Updated Successfully!");
        onUpdate(); // Refresh the food list
        onClose(); // Close the edit modal
      } else {
        toast.error("Error updating food");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update food");
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose} // ✅ Click outside to close
    >
      <div 
        className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // ✅ Prevent close when clicking inside
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Food Item</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          
          {/* Current Image Preview */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Current Image</label>
            {foodItem.image ? (
              <img 
                src={`${url}/images/${foodItem.image}`}
                alt={foodItem.name}
                className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/128?text=No+Image";
                }}
              />
            ) : (
              <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 text-sm">No Image</p>
              </div>
            )}
          </div>

          {/* Upload New Image */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Upload New Image {!foodItem.image && <span className="text-red-500">*</span>}
            </label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
              required={!foodItem.image}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {image && (
              <img 
                src={URL.createObjectURL(image)} 
                alt="Preview" 
                className="mt-3 w-32 h-32 object-cover rounded-lg border-2 border-blue-500"
              />
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              placeholder="Enter product name"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Product Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={data.description}
              onChange={onChangeHandler}
              rows="4"
              placeholder="Enter product description"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category and Price Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={data.category}
                onChange={onChangeHandler}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Price ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={data.price}
                onChange={onChangeHandler}
                placeholder="20"
                required
                min="0"
                step="0.01"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition"
            >
              UPDATE FOOD ITEM
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFood;