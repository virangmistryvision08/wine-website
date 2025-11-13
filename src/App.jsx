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

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
        {/* <CommonFirstSection/> */}
        {/* <ProductDetails/> */}
      <Footer />
    </>
  );
}

export default App;
