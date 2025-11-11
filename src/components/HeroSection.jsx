import React from "react";
import hero_section_bg_bottle from "/hero-section-bg-bottle.svg";

const HeroSection = () => {
  return (
    <>
      <div className="bg-black flex justify-center items-center">
        <div className="text-center w-[40%]">
          <img
            className="mx-auto"
            src={hero_section_bg_bottle}
            alt="Bottle Image"
          />
          <div className="py-8 space-y-8">
            <h1 className="text-5xl font-[cormorant-upright-bold] uppercase text-white">
              The essence of fine wine— without alcohol
            </h1>
            <button className="bg-[#EED291] px-9 py-4 rounded-full font-semibold">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
