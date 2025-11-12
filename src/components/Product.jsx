import React from "react";
import grapes from "/products/grapes.svg";
import gold_medal from "/Gold_Medal.webp";

const Product = ({ productImage, title, verity, isGold, price, wineType }) => {
  return (
    <div className="font-[Urbanist] flex flex-col gap-3 group">
      {/* Image container */}
      <div className="relative h-[300px] md:h-[500px] xl:h-[600px] w-full bg-white p-8 flex justify-center items-center rounded-sm overflow-hidden">
        <img
          className="h-full w-full object-contain rounded-sm"
          src={productImage}
          alt={wineType}
        />

        {/* Hover button (initially hidden, slides up) */}
        <button
          className="
        absolute bottom-[-100px] left-1/2 -translate-x-1/2
        bg-[#EED291] text-black font-bold px-6 py-4 rounded-full
        transition-all duration-500 ease-in-out
        group-hover:bottom-4
        shadow-md hover:bg-[#6d0718] hover:text-[#EED291] uppercase w-full text-lg cursor-pointer
      "
        >
          QUICK ADD
        </button>
      </div>

      {/* Text Section */}
      <div className="h-auto flex flex-col justify-between gap-3">
        <h1 className="text-xl font-semibold line-clamp-2">{title}</h1>

        <div className="flex flex-col lg:flex-row justify-between items-start">
          <div className="flex items-center gap-1">
            <p className="font-semibold text-gray-600">{verity}</p>
            <img src={grapes} alt="grapes" />
          </div>
          <p className="flex items-center gap-1">
            {isGold && (
              <img className="h-10 lg:h-14" src={gold_medal} alt="gold medal" />
            )}
            <span className="font-semibold text-gray-600">
              {wineType}
            </span>
          </p>
        </div>

        <span className="font-bold text-xl">$ {price}</span>
      </div>
    </div>
  );
};

export default Product;
