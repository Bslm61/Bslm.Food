import React, { useState } from "react";
import { assets } from "../../assets/assets";
import axios from 'axios';
import { toast } from 'react-toastify';

export const Add = () => {
  const url = "http://localhost:4000";
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const response = await axios.post(`${url}/api/food/add`, formData);

    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });

      setImage(false);
      toast.success(response.data.message);
    
    
    }
  
  else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="w-full  max-w-4xl mx-auto p-6 md:p-8">
      <form className="flex flex-col gap-6" onSubmit={onSubmitHandler}>
        {/* Upload Image */}
        <div className="flex flex-col gap-3 ">
          <p className="text-gray-700 font-semibold text-base md:text-lg">
            Upload Image
          </p>
          <label htmlFor="image" className="cursor-pointer w-32 h-32 md:w-40 md:h-40 block ">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload area"
              className="w-full h-full object-cover border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-all duration-200"
            />
          </label>
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-3">
          <p className="text-gray-700 font-semibold text-base md:text-lg">
            Product name
          </p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            className="w-full md:w-2/3 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6347] focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-3">
          <p className="text-gray-700 font-semibold text-base md:text-lg">
            Product description
          </p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows={6}
            placeholder="Write content here"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#ff6347] focus:border-transparent transition-all duration-200"></textarea>
        </div>

        {/* Category & Price */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Product Category */}
          <div className="flex flex-col gap-3 flex-1">
            <p className="text-gray-700 font-semibold text-base md:text-lg">
              Product category
            </p>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6347] focus:border-transparent transition-all duration-200 cursor-pointer">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desert">Desert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          {/* Product Price */}
          <div className="flex flex-col gap-3 flex-1">
            <p className="text-gray-700 font-semibold text-base md:text-lg">
              Product price
            </p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6347] focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="cursor-pointer w-full md:w-40 bg-[#ff6347] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#ff4500] transition-all duration-200 shadow-md hover:shadow-lg mt-4">
          ADD
        </button>
      </form>
    </div>
  );
};
