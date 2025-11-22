// In foodController.js

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log("Error adding food:", error); // ✅ Keep this
    res.json({ success: false, message: "Error" });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log("Error fetching food list:", error); // ✅ Keep this
    res.json({ success: false, message: "Error while fetching food list" });
  }
};

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res.json({
        success: false,
        message: "Food not found with the given ID",
      });
    }

    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log("Error removing food:", error); // ✅ Keep this
    res.json({ success: false, message: "Error while deleting food list" });
  }
};

const updateFood = async (req, res) => {
  try {
    const { id, name, description, price, category } = req.body;

    if (!id) {
      return res.json({ success: false, message: "Food ID is required" });
    }

    const food = await foodModel.findById(id);
    
    if (!food) {
      return res.json({ success: false, message: "Food item not found" });
    }

    const updateData = {
      name: name || food.name,
      description: description || food.description,
      price: price || food.price,
      category: category || food.category,
    };

    if (req.file) {
      if (food.image) {
        fs.unlink(`uploads/${food.image}`, (err) => {
          if (err) console.log("Error deleting old image:", err); // ✅ Keep this
        });
      }
      updateData.image = req.file.filename;
    }

    const updatedFood = await foodModel.findByIdAndUpdate(id, updateData, { new: true });

    res.json({ success: true, message: "Food updated successfully", data: updatedFood });
  } catch (error) {
    console.log("Error updating food:", error); // ✅ Keep this
    res.json({ 
      success: false, 
      message: "Error updating food" 
    });
  }
};

export { addFood, listFood, removeFood, updateFood };