import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
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
import FAQs from "./components/FAQs";
import Collections from "./components/Collections";
import Register from "./components/authPages/Register";
import Account from "./components/authPages/Account";
import Checkout from "./components/payment/Checkout";
import { useSelector } from "react-redux";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Reset_Password from "./components/authPages/Reset_Password";
import PaymentSuccess from "./components/payment/PaymentSuccess";
import PaymentFailed from "./components/payment/PaymentFailed";

function App() {
  const { pathname } = useLocation();
  const carts = useSelector((state) => state.products.cart);
  const token = localStorage.getItem(import.meta.env.VITE_WINE_TOKEN);

  const hideLayout =
    pathname === "/checkout" ||
    pathname === "/order-success" ||
    pathname === "/order-failed";

    const canAccessCheckout = token && carts?.length > 0;

  return (
    <>
      {/* For Toast Message */}
      <ToastContainer />
      <MoveOnTop />
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/shop" element={<FilterProducts />} />
        <Route path="/shop/:slug" element={<FilterProducts />} />
        <Route path="/about-us" element={<AboutUs_main />} />
        <Route path="/about-us/:slug" element={<AboutUs_productType />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailsPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account/:page" element={<Account />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/reset-password/:email" element={<Reset_Password />} />
        <Route path="/order-success" element={<PaymentSuccess />} />
        <Route path="/order-failed" element={<PaymentFailed />} />

        {!canAccessCheckout ? (
          <>
          {/* if Empty Cart, Navigate to the Home Page */}
            <Route path="/checkout" element={<Navigate to="/account/login" />} />
          </>
        ) : (
          <>
            <Route path="/checkout" element={<Checkout />} />
          </>
        )}
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
