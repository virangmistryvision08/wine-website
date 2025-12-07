import React from "react";
import Layout from "./Layout";
import HeroSection from "./HeroSection";
import BelowHeroSection from "./BelowHeroSection";
import Products from "./Products";
import ShippingSection from "./ShippingSection";
import PopularProducts from "./PopularProducts";
import SwiperSection from "./customerSay/SwiperSection";
import Blogs from "./Blogs";

const HomePage = () => {
  return (
    <div>
        <HeroSection />
        <BelowHeroSection />
        <Products />
        <ShippingSection />
        <PopularProducts />
        <SwiperSection />
        <Blogs />
    </div>
  );
};

export default HomePage;
