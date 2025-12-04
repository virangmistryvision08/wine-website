import React from "react";
import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        
        {/* Failed Icon */}
        <div className="flex justify-center mb-6">
          <i className="fa-solid fa-circle-xmark text-red-500 text-7xl"></i>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Payment Failed
        </h1>

        {/* Subtext */}
        <p className="text-gray-600 mb-6">
          Something went wrong while processing your payment. 
          Please try again or use a different payment method.
        </p>

        {/* Summary Card */}
        <div className="bg-gray-100 rounded-xl p-4 text-left mb-8">
          {/* <p className="text-sm text-gray-500">Payment Status</p> */}
          <div className="flex justify-between mt-2 text-gray-700">
            <span>Payment Status:</span>
            <span className="font-semibold text-red-600">Failed</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            to="/checkout"
            className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold
              hover:bg-red-700 transition flex items-center justify-center gap-2"
          >
            Try Again
            <i className="fa-solid fa-rotate-right text-sm"></i>
          </Link>

          <Link
            to="/"
            className="w-full border border-gray-300 py-3 rounded-xl font-medium
              hover:bg-gray-100 transition flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-arrow-left"></i>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
