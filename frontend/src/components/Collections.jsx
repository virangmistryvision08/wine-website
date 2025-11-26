import React from "react";
import CommonFirstSection from "./CommonFirstSection";
import collections_bg from "/collections/collections-bg.jpg";
import bergdolt_wine from "/collections/bergdolt-wine.png";
import matthias_wine from "/collections/matthias-wine.png";
import chateau_wine from "/collections/chateau-wine.png";
import { useNavigate } from "react-router-dom";

const Collections = () => {
  const navigate = useNavigate();
  const wines = [
    {
      name: "Bergdolt",
      image: bergdolt_wine,
      slug: "bergdolt-reif-and-nett",
    },
    {
      name: "Mathias Anton",
      image: matthias_wine,
      slug: "matthias-anton",
    },
    {
      name: "Chateau",
      image: chateau_wine,
      slug: "chateau-clos-de-bouard",
    },
  ];

  return (
    <>
      <CommonFirstSection
        productImage={collections_bg}
        productType="Collections"
        hideGradient={true}
      />

      <div className="w-[96%] mx-auto bg-white py-12 2xl:py-20">
        {/* Responsive Grid */}
        <div
          className="
            grid 
            grid-cols-1        /* mobile */
            md:grid-cols-2     /* md & lg screens */
            xl:grid-cols-3     /* xl = all in one row */
            gap-8
          "
        >
          {wines.map((item) => (
            <div
              onClick={() => navigate(`/shop/${item.slug}`)}
              key={item.id}
              className="bg-[#f5f5f5] shadow-sm overflow-hidden cursor-pointer"
            >
              {/* Image section */}
              <div className="relative group flex justify-center items-center h-[350px] lg:h-[460px] p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full object-contain"
                />
                {/* Hover overlay */}
                <div
                  className="
      absolute inset-0 
      bg-[#f5f3f3] bg-opacity-40 
      opacity-0  
      group-hover:opacity-70
      transition-opacity duration-500
    "
                ></div>
              </div>

              {/* Bottom label */}
              <div className="bg-[#e7c97f] py-3 text-center hover:bg-white border border-[#e7c97f] transition duration-300">
                <p className="text-[#78462c] text-lg uppercase font-bold font-[Urbanist]">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Collections;
