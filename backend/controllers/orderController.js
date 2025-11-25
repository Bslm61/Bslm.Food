import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// Stripe .setup

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    // Validate input
    if (!req.body.items || req.body.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty"
      });
    }

    if (!req.body.address || !req.body.amount) {
      return res.status(400).json({
        success: false,
        message: "Address and amount are required"
      });
    }

    // Create new order
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();

    // Clear user cart
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });


    // Create Stripe line items
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "mad",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 10,
      },
      quantity: item.quantity,
    }));


    // Add delivery charges
    line_items.push({
      price_data: {
        currency: "mad",
        product_data: {
          name: "Delevery Charges",
        },
        unit_amount: 2 * 100 * 10,
      },
      quantity: 1,
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error placing order" });
  }
};

//Verify Order Endpoint
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment successful" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error verifying order" });
  }
};


//Get User Orders Endpoint
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

//List All Orders (Admin)

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

//Update Order Status (Admin)

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { 
      status: req.body.status 
    });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating status" });
  }
};



// const cancelOrder = async (req, res) => {
//   try {
//     const order = await orderModel.findById(req.body.orderId);
    
//     if (order.status === "Delivered") {
//       return res.status(400).json({
//         success: false,
//         message: "Cannot cancel delivered order"
//       });
//     }
    
//     await orderModel.findByIdAndDelete(req.body.orderId);
//     res.json({ success: true, message: "Order cancelled" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Error cancelling order" });
//   }
// };
export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
