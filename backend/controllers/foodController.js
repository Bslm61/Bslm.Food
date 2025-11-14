import { log } from "console";
import foodModel from "../models/foodModel.js";
import fs from "fs";

// Controller to handle adding a new food item

const addFood = async (req, res) => {
  // multer stores the uploaded image in req.file
  // we save the generated filename to store it in the database
  let image_filename = `${req.file.filename}`;

  // Create a new food document with data from the form + image
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    // Save the new food item in MongoDB
    await food.save();
    res.json({ seccess: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    // Send a simple error response if something goes wrong
    res.json({ succes: false, message: "Error" });
  }
};
// we created one addFood controller function

//all food list

const listFood = async (req,res)=>{

  
}

export { addFood , listFood };
