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
import AboutUs_productType from "./components/aboutUs/AboutUs_productType";
import MoveOnTop from "./components/MoveOnTop";
import Cart from "./components/Cart";
import { ToastContainer } from "react-toastify";
import BlogPage from "./components/BlogPage";
import BlogDetailsPage from "./components/BlogDetailsPage";
import ContactUs from "./components/ContactUs";

function App() {
  return (
    <>
      {/* For Toast Message */}
      <ToastContainer />
      <MoveOnTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/shop" element={<FilterProducts />} />
        <Route path="/about-us" element={<AboutUs_main />} />
        <Route path="/about-us/:slug" element={<AboutUs_productType />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailsPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
