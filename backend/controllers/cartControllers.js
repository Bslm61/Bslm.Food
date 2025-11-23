import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.body.userId;
    
    if (!userId) {
      return res.json({ success: false, message: "User not authenticated" });
    }

    let userData = await userModel.findById(userId);
    
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData.toObject ? userData.cartData.toObject() : userData.cartData || {};
    
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove items from user cart
const removeFromCart = async (req, res) => {};

// fetch user cart  data

const getCart = async (req, res) => {};

export { addToCart, removeFromCart, getCart };
