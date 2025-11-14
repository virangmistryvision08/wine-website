import { Route, Routes } from "react-router-dom";
import "./App.css";
import BelowHeroSection from "./components/BelowHeroSection";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import PopularProducts from "./components/PopularProducts";
import Products from "./components/Products";
import ShippingSection from "./components/ShippingSection";
import SwiperSection from "./components/customerSay/SwiperSection";
import HomePage from "./components/HomePage";
import ProductDetails from "./components/ProductDetails";
import CommonFirstSection from "./components/CommonFirstSection";
import FilterProducts from "./components/FilterProducts";
import AboutUs_main from "./components/aboutUs/AboutUs_main";
import AboutUs_Bergdolt from "./components/aboutUs/AboutUs_Bergdolt";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/shop" element={<FilterProducts />} />
        <Route path="/about-us" element={<AboutUs_main />} />
        <Route path="/about-us/:slug" element={<AboutUs_Bergdolt />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
