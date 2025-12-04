import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <i className="fa-solid fa-circle-check text-green-500 text-7xl"></i>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Payment Successful!
        </h1>

        {/* Subtext */}
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        {/* Summary Card */}
        <div className="bg-gray-100 rounded-xl p-4 text-left mb-8">
          {/* <p className="text-sm text-gray-500">Order Summary</p> */}
          <div className="flex justify-between mt-2 text-gray-700">
            <span>Order Status:</span>
            <span className="font-semibold text-green-600">Paid</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            to="/shop"
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold
              hover:bg-green-700 transition flex items-center justify-center gap-2"
          >
            Continue Shopping 
            <i className="fa-solid fa-arrow-right text-sm"></i>
          </Link>

          <Link
            to="/"
            className="w-full border border-gray-300 py-3 rounded-xl font-medium
              hover:bg-gray-100 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
