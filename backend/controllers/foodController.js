import foodModel from "../models/foodModel.js";
import fs from "fs";
import { log } from "console";

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

// Update foodItem
const updateFood = async (req, res) => {
  try {
    console.log("📝 Update request received");
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const { id, name, description, price, category } = req.body;

    if (!id) {
      console.log("❌ No ID provided");
      return res.json({ success: false, message: "Food ID is required" });
    }

    // Find the existing food item
    const food = await foodModel.findById(id);

    if (!food) {
      console.log("❌ Food not found with ID:", id);

      return res.json({ success: false, message: "Food item not found" });
    }

    console.log("✅ Found food item:", food.name);

    // Prepare update data
    const updateData = {
      name: name,
      description: description,
      price: price,
      category: category,
    };

    // If new image is uploaded, delete old image and update
    if (req.file) {
      // Delete old image if it exists
      if (food.image) {
        console.log("📸 New image uploaded:", req.file.filename);

        fs.unlink(`uploads/${food.image}`, (err) => {
          if (err) console.log("⚠️ Error deleting old image:", err);
          else console.log("🗑️ Old image deleted:", food.image);
        });
      }
      updateData.image = req.file.filename;
    } else {
      console.log("ℹ️ No new image uploaded, keeping existing image");
    }

    console.log("📤 Updating with data:", updateData);

    // Update the food item
    const updatedFood = await foodModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    console.log("✅ Food updated successfully:", updatedFood); // ✅ Works!

    res.json({ success: true, message: "Food updated successfully" });
  } catch (error) {
    console.error("❌ Error in updateFood:", error);
    console.error("Error details:", error.message);
    console.error("Stack trace:", error.stack);
    res.json({ success: false, message: "Error updating food" });
  }
};

export { addFood, listFood, removeFood, updateFood };
