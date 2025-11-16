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
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    // Send a simple error response if something goes wrong
    res.json({ success: false, message: "Error" });
  }
};
// we created one addFood controller function

//all food list
// Controller to get the full list of food items
const listFood = async (req, res) => {
  try {
    // Fetch all food documents from the database
    // {} means no filter → return everything
    const foods = await foodModel.find({});

    // Send the list back to the frontend
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error while fetching food list" });
  }
};

//remove foodItem
// Controller to remove a food item
const removeFood = async (req, res) => {
  try {

     console.log("Request body:", req.body); // Add this to debug
    console.log("ID received:", req.body.id); // Add this to debug

    
    // 1. Find the food item in the database by ID
    const food = await foodModel.findById(req.body.id);

     // If no food found
    if (!food) {
      return res.json({
        success: false,
        message: "Food not found with the given ID",
      });
    }

    // 2. Remove the image file from the uploads folder
    // Using an empty callback to avoid server crash if file doesn't exist
    fs.unlink(`uploads/${food.image}`, () => {});

    // 3. Remove the food document from MongoDB
    await foodModel.findByIdAndDelete(req.body.id);

    // 4. Send back a success message to the frontend
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);

    // Return an error response if anything goes wrong
    res.json({ success: false, message: "Error while deleting food list" });
  }
  
};


export { addFood, listFood, removeFood };
