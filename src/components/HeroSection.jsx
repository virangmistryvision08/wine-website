import React from "react";
import hero_section_bg_bottle from "/hero-section-bg-bottle.svg";

const HeroSection = () => {
  return (
    <>
      <div className="bg-black flex justify-center items-center">
        <div className="text-center w-[90%] md:w-[60%] lg:w-[50%]">
          <img
            className="mx-auto w-52 xl:w-auto"
            src={hero_section_bg_bottle}
            alt="Bottle Image"
          />
          <div className="py-14 space-y-10">
            <h1 className="text-3xl xl:text-5xl font-[cormorant-upright-bold] uppercase text-white">
              The essence of fine wine— without alcohol
            </h1>
            <button className="bg-[#EED291] px-9 py-4 rounded-full font-semibold  hover:bg-transparent outline hover:outline-[#EED291] hover:text-[#EED291] transition-all duration-200 cursor-pointer font-[Urbanist]">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
