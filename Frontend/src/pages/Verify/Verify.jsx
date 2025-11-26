import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import StoreContext from "../../context/StoreContext";
import axios from "axios";

export const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", {
      success,
      orderId,
    });
    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md">
        {/* Verify Container */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#49557e] mb-2">
            Order Verification
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {success === "true"
              ? "Your order has been confirmed!"
              : "Processing your order..."}
          </p>
          {orderId && (
            <p className="text-[#FF6347] font-semibold mt-3 text-sm sm:text-base">
              Order ID: {orderId}
            </p>
          )}
        </div>

        {/* Spinner */}
        <div className="flex justify-center">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20">
            {/* Outer spinner ring */}
            <div className="absolute inset-0 rounded-full border-4 border-[#bdbdbd] border-t-[#FF6347] animate-spin"></div>

            {/* Inner spinner ring for depth */}
            <div
              className="absolute inset-2 rounded-full border-2 border-[#bdbdbd] border-b-[#FF6347] animate-spin"
              style={{ animationDirection: "reverse" }}></div>
          </div>
        </div>

        {/* Status Message */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm sm:text-base">
            {success === "true"
              ? "Thank you for your order!"
              : "Verifying your payment..."}
          </p>
        </div>
      </div>
    </div>
  );
};
