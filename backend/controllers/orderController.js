import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// Stripe .setup

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_item = req.body.items.map((item) => ({
      price_data: {
        currency: "mad",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 10,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delevery Charges",
        },
        unit_amount: 2 * 100 * 10,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.session.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
    });
  } catch (error) {}
};

export { placeOrder };
