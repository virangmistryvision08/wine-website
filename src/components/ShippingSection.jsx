import React from "react";
import Title from "./Title";
import shipping_wine_bottles from "/shipping/shipping-wine-bottles.svg";
import shipping_toy_truck from "/shipping/shipping-toy-truck.svg";

const ShippingSection = () => {
  return (
    <>
      <section className="bg-white w-full py-10 md:py-24">
        <div className="w-[90%] xl:w-[80%] mx-auto">
          <Title text="Save on shipping with a 3- or 6-pack." />
          <div className="flex flex-col md:flex-row md:justify-center gap-5 md:gap-14">
            <div className="flex items-center gap-5">
              <img src={shipping_wine_bottles} alt="wine bottles" />
              <p className="text-lg font-semibold font-[Urbanist]">
                Flat Fee $15 nationwide for 3-bottle bundles
              </p>
            </div>
            <div className="flex items-center gap-5">
              <img src={shipping_toy_truck} alt="toy truck" />
              <p className="text-lg font-semibold font-[Urbanist]">
                Free shipping at $99+
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShippingSection;
