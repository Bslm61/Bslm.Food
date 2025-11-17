import React from 'react'
import { assets } from '../../assets/assets'

export const Add = () => {
  return (
    // add
    <div >
      {/* flex-col */}
      <form >
        {/* add-img-upload */}
        <div>
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={assets.upload_area} alt="" />
          </label>
          <input type="file" id='image' hidden required  />
        </div>
        {/* add-product-name */}
        <div>
          <p>Product name</p>
          <input type="text" name='name' placeholder='Type here' />
        </div>
        {/* add-product-description  flex-col*/}
        <div>
        <p>Product description</p>
        <textarea name="description" rows={6} placeholder='Write content here' required></textarea>
        </div>
        {/* add-category-price */}
        <div>
          {/* add-category-flex-col */}
          <div>
            <p>Product category</p>
            <select name="category">
              <option value="Salad"></option>
              <option value="">Rolls</option>
              <option value="">Desert</option>
              <option value="">Sandwich</option>
              <option value="">Cake</option>
              <option value="">Pure Veg</option>
              <option value="">Pasta</option>
              <option value="">Noodels</option>
            </select>
          </div>
          {/* add-price flex-col*/}
          <div>
          <p>Product price</p>
          <input type="Number" name='price' placeholder='$20' />
          </div>
          {/* add-button */}
          <button type='submit'>ADD</button>
        </div>

      </form>
    </div>
  )
}
