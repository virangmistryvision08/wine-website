import wine_logo from "/wine-website-logo.svg";
import use_flag from "/navbar/usa-flag.jpg";
import europe from "/navbar/europe.svg";
import uk_flag from "/navbar/uk.svg";
import china_flag from "/navbar/china.svg";
import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import close_image from "/close-image.png";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQty,
  increaseQty,
  removeFromCart,
  toggleCartDrawer,
} from "../redux/reducers/productReducer";
import { Badge } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import SwiperCore from "swiper";

function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navbarRef = useRef(null);
  const navigate = useNavigate();
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const location = useLocation();
  const isAboutActive = location.pathname.startsWith("/about-us");
  const [isSubDrawerOpen, setIsSubDrawerOpen] = useState(false);
  const [isDrawerItem, setIsDrawerItem] = useState(null);
  const { products } = useSelector((state) => state);
  const carts = products.cart;
  const { pathname } = useLocation();
  const isCartPage = pathname.slice(1);
  const [isScrolling50, setIsScrolling50] = useState(false);
  const dispatch = useDispatch();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);
  const [activeIndex, setActiveIndex] = useState(0);

  const subtotal = carts?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Cart Drawer State From Redux
  const cartOpen = products.isCartOpen;

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      SwiperCore.emit("swiper-navigation-init");
      SwiperCore.emit("swiper-navigation-update");
    }, 0);
  }, []);

  // Stop Scrolling While Drawer is Open
  useEffect(() => {
    if (cartOpen || isDrawerOpen) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = "auto"; // Enable scroll again
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup
    };
  }, [cartOpen, isDrawerOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
      if (window.scrollY > 49) {
        setIsScrolling50(true);
      } else {
        setIsScrolling50(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer automatically on screen resize >= xl
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Get Random Three Products
  const allProducts = products.allProducts;

  const getRandomThree = (arr) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };
  const productDetails = getRandomThree(allProducts);

  return (
    <>
      {/* Navbar */}
      <nav className="!font-[Urbanist] relative z-50">
        {/* Top bar */}
        <div className="bg-[#EED291] py-2">
          <p className="font-semibold text-center">Free shipping at $99+</p>
        </div>

        {/* Main navbar */}
        <div
          ref={navbarRef}
          className={`w-full transition-all duration-500 ease-in-out fixed ${
            isSticky
              ? "top-0 left-0 bg-black shadow-lg translate-y-0"
              : "bg-transparent translate-y-[-10px]"
          }`}
        >
          <div className="w-[96%] mx-auto flex justify-between items-center py-4">
            <Link to="/">
              <img
                className={`${isSticky ? "h-20" : "h-20 xl:h-auto"}`}
                src={wine_logo}
                alt="logo"
              />
            </Link>
            <div className="flex items-center gap-3 xl:gap-7">
              {/* Desktop Menu */}
              <ul
                className={`items-center list-none gap-7 text-lg font-semibold ${
                  isCartPage === "cart" && !isScrolling50
                    ? "text-black"
                    : "text-white"
                } hidden xl:flex`}
              >
                {/* Home */}
                <NavLink
                  to="/"
                  className="relative cursor-pointer active:text-[#EED291] after:content-[''] 
  after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#EED291] 
  after:transition-all after:duration-300 hover:after:w-full hover:text-[#EED291]"
                >
                  Home
                </NavLink>

                {/* Shop */}
                <NavLink
                  to="/shop"
                  className="relative cursor-pointer active:text-[#EED291] after:content-[''] 
  after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#EED291] 
  after:transition-all after:duration-300 hover:after:w-full hover:text-[#EED291]"
                >
                  Shop
                </NavLink>

                {/* ABOUT US + DROPDOWN (NEW) */}
                <div className="relative group">
                  <NavLink
                    to="/about-us"
                    className="cursor-pointer active:text-[#EED291] 
    after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] 
    after:bg-[#EED291] after:transition-all after:duration-300 
    hover:after:w-full hover:text-[#EED291]"
                  >
                    About Us
                  </NavLink>

                  {/* Dropdown */}
                  <div
                    className="absolute left-0 mt-3 w-64 bg-black text-white shadow-lg border border-gray-400 
  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
  transition-all duration-300"
                  >
                    {[
                      {
                        name: "About Us Bergdolt, Reif & Nett",
                        to: "/about-us/about-us-bergdolt,-reif-&-nett",
                      },
                      {
                        name: "About Us Lamm-Jung",
                        to: "/about-us/about-us-lamm-jung",
                      },
                      {
                        name: "About Us KVD Strauch Sektmanufaktur",
                        to: "/about-us/about-us-kvd-strauch-sektmanufaktur",
                      },
                      {
                        name: "About Chateau Clos de Bouard",
                        to: "/about-us/about-us-chateau-closbde-bouard",
                      },
                      {
                        name: "About Weingut Matthias Anton",
                        to: "/about-us/about-us-weingut-matthias-anton",
                      },
                    ].map((label) => (
                      <NavLink
                        key={label.name}
                        to={label.to}
                        className="block px-4 py-2 hover:text-[#EED291] border-b border-gray-700 last:border-none"
                      >
                        {label.name}
                      </NavLink>
                    ))}
                  </div>
                </div>

                {/* Blog */}
                <NavLink
                  to="/blog"
                  className="relative cursor-pointer active:text-[#EED291] 
  after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 
  after:h-[2px] after:bg-[#EED291] after:transition-all after:duration-300 
  hover:after:w-full hover:text-[#EED291]"
                >
                  Blog
                </NavLink>
              </ul>

              {/* Icons */}
              <div
                className={`flex items-center gap-3 xl:gap-5 text-2xl ${
                  isCartPage === "cart" && !isScrolling50
                    ? "text-black"
                    : "text-white"
                }`}
              >
                <i className="fa-solid fa-magnifying-glass cursor-pointer hover:text-[#EED291] transform hover:scale-110 transition-all duration-200"></i>
                <i className="fa-regular fa-user cursor-pointer hover:text-[#EED291] transform hover:scale-110 transition-all duration-200"></i>
                <Badge
                  badgeContent={carts.length}
                  overlap="circular"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#EED291",
                      color: "black", // text color inside badge
                      fontWeight: "600",
                    },
                  }}
                >
                  <i
                    onClick={() => dispatch(toggleCartDrawer())}
                    className="fa-solid fa-bag-shopping cursor-pointer hover:text-[#EED291] transform hover:scale-110 transition-all duration-200 text-xl"
                  ></i>
                </Badge>
              </div>

              {/* Desktop Button */}
              <button className="bg-[#EED291] px-9 py-4 rounded-full font-semibold hidden xl:block cursor-pointer hover:bg-transparent hover:outline hover:outline-[#EED291] hover:text-[#EED291] transition-all duration-200">
                CONTACT US
              </button>

              {/* Hamburger for Mobile */}
              <i
                className="fa-solid fa-bars block text-2xl xl:!hidden text-white cursor-pointer"
                onClick={toggleDrawer}
              ></i>
            </div>
          </div>
        </div>
      </nav>

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] md:w-[50%] lg:w-[40%] bg-black text-white z-50 transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 text-xl !font-[400] font-[Urbanist]">
          Menu
          <i
            className="fa-solid fa-xmark text-2xl cursor-pointer"
            onClick={toggleDrawer}
          ></i>
        </div>

        {/* MAIN MENU PANEL */}
        <div className={`${openSubMenu ? "hidden" : "block"}`}>
          <ul className="flex flex-col gap-4 mt-6 font-[Urbanist]">
            <NavLink
              to="/"
              onClick={toggleDrawer}
              className="cursor-pointer pl-4"
            >
              Home
            </NavLink>
            <hr className="border border-gray-700" />

            <NavLink
              to="/shop"
              onClick={toggleDrawer}
              className="cursor-pointer pl-4"
            >
              Shop
            </NavLink>
            <hr className="border border-gray-700" />

            {/* OPEN SUBMENU */}
            <li
              onClick={() => setOpenSubMenu("about")}
              className={`cursor-pointer pl-4 flex justify-between items-center 
    ${isAboutActive ? "text-[#EED291]" : ""}`}
            >
              About Us
              <i className="fa-solid fa-chevron-right pr-4"></i>
            </li>

            <hr className="border border-gray-700" />

            <NavLink
              to="/blogs"
              onClick={toggleDrawer}
              className="cursor-pointer pl-4"
            >
              Blog
            </NavLink>
            <hr className="border border-gray-700" />

            <NavLink
              to="/sign-in"
              onClick={toggleDrawer}
              className="cursor-pointer pl-4"
            >
              <i className="fa-regular fa-circle-user"></i> Sign In
            </NavLink>
            <hr className="border border-gray-700" />

            <NavLink
              to="/sign-up"
              onClick={toggleDrawer}
              className="cursor-pointer pl-4"
            >
              <i className="fa-solid fa-user-plus"></i> Create Account
            </NavLink>

            {/* Currency Section (unchanged) */}
            <div>
              <li className="cursor-pointer pl-4 text-xl font-[400] py-3">
                CURRENCY
              </li>
              <div className="flex items-center flex-wrap gap-5 pl-4 mt-3">
                <div className="flex items-center gap-2">
                  <img
                    className="h-7 w-7 rounded-full object-cover"
                    src={use_flag}
                  />
                  <p>USD</p>
                </div>

                <div className="flex items-center gap-2">
                  <img
                    className="h-7 w-7 rounded-full object-cover"
                    src={europe}
                  />
                  <p>EUR</p>
                </div>

                <div className="flex items-center gap-2">
                  <img
                    className="h-7 w-7 rounded-full object-cover"
                    src={uk_flag}
                  />
                  <p>GBP</p>
                </div>

                <div className="flex items-center gap-2">
                  <img
                    className="h-7 w-7 rounded-full object-cover"
                    src={china_flag}
                  />
                  <p>CHF</p>
                </div>
              </div>
            </div>
          </ul>
        </div>

        {/* ABOUT US SUBMENU PANEL */}
        <div className={`${openSubMenu === "about" ? "block" : "hidden"}`}>
          <div
            className="flex items-center gap-3 p-4 bg-[#EED291] text-black text-lg font-semibold cursor-pointer font-[Urbanist]"
            onClick={() => setOpenSubMenu(null)}
          >
            <i className="fa-solid fa-arrow-left"></i>
            About Us
          </div>

          <ul className="flex flex-col font-[Urbanist]">
            <NavLink
              to="/about-us"
              end
              className="px-4 py-3 border-b border-gray-700 cursor-pointer"
              onClick={() => {
                setIsDrawerOpen(null);
                setOpenSubMenu(null);
              }}
            >
              Go To About Us
            </NavLink>
            {[
              {
                name: "About Us Bergdolt, Reif & Nett",
                to: "/about-us/about-us-bergdolt,-reif-&-nett",
              },
              {
                name: "About Us Lamm-Jung",
                to: "/about-us/about-us-lamm-jung",
              },
              {
                name: "About Us KVD Strauch Sektmanufaktur",
                to: "/about-us/about-us-kvd-strauch-sektmanufaktur",
              },
              {
                name: "About Chateau Clos de Bouard",
                to: "/about-us/about-us-chateau-closbde-bouard",
              },
              {
                name: "About Weingut Matthias Anton",
                to: "/about-us/about-us-weingut-matthias-anton",
              },
            ].map((item) => {
              return (
                <NavLink
                  to={item.to}
                  className="px-4 py-3 border-b border-gray-700 cursor-pointer"
                  onClick={() => {
                    setIsDrawerOpen(null);
                    setOpenSubMenu(null);
                  }}
                >
                  {item.name}
                </NavLink>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Overlay to hide background content */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-gray-600/70 bg-opacity-80 z-40"
          onClick={toggleDrawer}
        ></div>
      )}

      {/* CART DRAWER (RIGHT SIDE) */}
      <div
        className={`fixed top-0 right-0 font-[Urbanist] h-full w-[90%] sm:w-[420px] bg-white text-black z-[90] shadow-xl transform transition-transform duration-300 flex flex-col cursor-default ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="p-5 z-[300]">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Shopping Cart</h2>
            <i
              className="fa-solid fa-xmark text-2xl cursor-pointer transition-transform duration-300 hover:rotate-180"
              onClick={() => dispatch(toggleCartDrawer())}
            ></i>
          </div>

          {/* TOP PROGRESS BAR */}
          <div className="mt-4 flex flex-col gap-2">
            <span className="text-gray-600">{carts.length} Item</span>
            {carts.length === 0 ? (
              <>
                {/* Free Shipping */}
                <div className="flex flex-col items-center mt-2 space-y-3">
                  <p className="text-lg text-start me-auto font-semibold text-gray-700">
                    Free shipping for all orders over $85.00 !
                  </p>

                  {/* Empty text */}
                  <p className="text-gray-600 text-base">Your cart is empty</p>

                  <button
                    onClick={() => {
                      dispatch(toggleCartDrawer());
                      navigate("/shop");
                    }}
                    className="w-full text-lg font-semibold cursor-pointer py-3 rounded-full border border-gray-400 font-medium transition hover:bg-black hover:text-white"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-[#EED291] w-[40%]"></div>
                </div>
                <p className="text-sm mb-2 font-medium text-gray-700">
                  Only $59.62 away from Free Shipping
                </p>
              </>
            )}
          </div>
        </div>
        {carts.length !== 0 && (
          <>
            {/* CART CONTENT */}
            <div className="px-5 overflow-y-auto flex-1">
              {/* CART ITEM */}
              {carts.map((cart) => {
                return (
                  <>
                    <div className="flex items-center justify-center gap-7">
                      <img
                        onClick={() => {
                          dispatch(toggleCartDrawer());
                          navigate(`/products/${cart.id}`);
                        }}
                        src={cart.productImage}
                        className="h-36 p-3 w-28 border border-gray-100 object-contain cursor-pointer"
                      />

                      <div className="flex-1 space-y-2.5 text-sm">
                        <p
                          onClick={() => {
                            dispatch(toggleCartDrawer());
                            navigate(`/products/${cart.id}`);
                          }}
                          className="text-base hover:underline cursor-pointer font-semibold"
                        >
                          {cart.title}
                        </p>
                        <p className="font-semibold">${cart.price}</p>
                        <p className="font-semibold">
                          Bottle Size{" "}
                          <span className="text-gray-500">0.75L / 25.4 oz</span>
                        </p>

                        <p className="font-semibold">Quantity</p>
                        {/* Quantity Box */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center justify-between gap-5 font-bold border border-[#EED291] px-4 py-1 rounded-full w-fit text-base">
                            <button
                              onClick={() => dispatch(decreaseQty(cart.id))}
                              className="cursor-pointer"
                            >
                              -
                            </button>
                            <span>{cart.quantity}</span>
                            <button
                              onClick={() => dispatch(increaseQty(cart.id))}
                              className="cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                          <i
                            onClick={() => dispatch(removeFromCart(cart.id))}
                            className="fa-solid fa-circle-xmark text-xl cursor-pointer"
                          ></i>
                        </div>
                      </div>
                    </div>

                    <hr className="my-6 border border-gray-200" />
                  </>
                );
              })}

              {/* YOU MAY ALSO LIKE */}
              <h3 className="font-semibold text-lg">You May Also Like</h3>

              {/* PRODUCT CARD */}
              <div className="relative mt-5 flex gap-4 overflow-x-auto no-scrollbar">
                <Swiper
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                  slidesPerView={1}
                  spaceBetween={20}
                  centeredSlides={false}
                  loop={isDesktop === true ? false : true}
                  pagination={isDesktop === true ? false : { clickable: true }}
                  navigation={{
                    prevEl: ".custom-prev",
                    nextEl: ".custom-next",
                  }}
                  modules={[Navigation, Pagination]}
                  className="mySwiper !pb-10"
                >
                  {productDetails.map((product) => {
                    return (
                      <SwiperSlide className="overflow-hidden">
                        <div className="flex items-start justify-center gap-7">
                          <img
                            onClick={() => {
                              dispatch(toggleCartDrawer());
                              navigate(`/products/${product.id}`);
                            }}
                            src={product.productImage}
                            className="h-36 p-3 w-28 border border-gray-100 object-contain cursor-pointer"
                          />

                          <div className="flex-1 space-y-2.5 text-sm">
                            <p
                              onClick={() => {
                                dispatch(toggleCartDrawer());
                                navigate(`/products/${product.id}`);
                              }}
                              className="text-base font-semibold line-clamp-2 cursor-pointer hover:underline"
                            >
                              {product.title}
                            </p>
                            <p className="font-semibold">${product.price}</p>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                  <div className="absolute hidden xl:flex items-center gap-3 font-normal bottom-12 right-0 text-xl z-[300]">
                    {/* PREV */}
                    <i
                      className={`fa-solid fa-arrow-left-long custom-prev 
    ${
      activeIndex === 0 ? "text-gray-300 cursor-default" : "text-gray-800 cursor-pointer"
    }`}
                    ></i>

                    {/* NEXT */}
                    <i
                      className={`fa-solid fa-arrow-right-long custom-next 
    ${
      activeIndex === productDetails.length - 1
        ? "text-gray-300 cursor-default"
        : "text-gray-800 cursor-pointer"
    }`}
                    ></i>
                  </div>
                </Swiper>
              </div>
            </div>

            {/* FOOTER TOTAL */}
            <div className="p-5 bg-white">
              <div className="flex items-center justify-center mb-5">
                <div
                  onClick={() => {
                    setIsDrawerItem("Clipboard");
                    setIsSubDrawerOpen(true);
                  }}
                  className="px-7 py-5 border border-gray-200 flex justify-center items-center hover:bg-gray-100 cursor-pointer"
                >
                  <i class="fa-regular fa-clipboard text-xl"></i>
                </div>
                <div
                  onClick={() => {
                    setIsDrawerItem("Truck");
                    setIsSubDrawerOpen(true);
                  }}
                  className="px-7 py-5 border-y border-gray-200 flex justify-center items-center hover:bg-gray-100 cursor-pointer"
                >
                  <i class="fa-solid fa-truck-fast text-xl"></i>
                </div>
                <div
                  onClick={() => {
                    setIsDrawerItem("Tag");
                    setIsSubDrawerOpen(true);
                  }}
                  className="px-7 py-5 border border-gray-200 flex justify-center items-center hover:bg-gray-100 cursor-pointer"
                >
                  <i class="fa-solid fa-tag text-xl"></i>
                </div>
              </div>

              <div className="flex justify-between text-lg font-semibold">
                <p>Subtotal:</p>
                <p>${subtotal?.toFixed(2)}</p>
              </div>

              <div className="flex justify-between text-lg font-semibold mt-2">
                <p>Total:</p>
                <p className="text-xl">${subtotal?.toFixed(2)}</p>
              </div>

              <p className="text-base text-gray-500 mt-2">
                Tax included and shipping calculated at checkout
              </p>

              {/* Checkout */}
              <button className="mt-4 w-full py-3 border border-[#EED291] bg-[#EED291] hover:bg-white hover:outline hover:outline-[#EED291] transition duration-300 cursor-pointer font-semibold rounded-full text-lg">
                Checkout
              </button>

              {/* View Cart */}
              <button
                onClick={() => {
                  dispatch(toggleCartDrawer());
                  navigate("/cart");
                }}
                className="mt-3 w-full py-3 outline outline-[#EED291] hover:bg-[#EED291] transition duration-300 cursor-pointer font-semibold rounded-full text-lg"
              >
                View Cart
              </button>
            </div>

            {/* SubDrawer */}
            {/* Bottom Drawer (Order Instructions) */}
            <div
              className={`
            fixed left-0 bottom-0 w-full border-t border-gray-200 bg-white z-[200]
            p-6 transition-transform duration-300
            ${isSubDrawerOpen ? "translate-y-0" : "translate-y-full"}
            `}
            >
              {/* Clipboard Drawer */}
              {isDrawerItem === "Clipboard" && (
                <>
                  {/* Header */}
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <i class="fa-regular fa-clipboard text-xl"></i>
                      Order Special Instructions
                    </h2>
                    {/* <i
              className="fa-solid fa-xmark text-2xl cursor-pointer"
              onClick={() => setIsSubDrawerOpen(false)}
            ></i> */}
                  </div>

                  {/* Textarea */}
                  <textarea
                    placeholder="Order special instructions"
                    className="mt-2 w-full h-24 border border-gray-300 p-3 rounded-4xl outline-none"
                  ></textarea>

                  {/* Buttons */}
                  <button className="mt-4 w-full text-lg cursor-pointer py-3 border border-[#EED291] bg-[#EED291] hover:bg-white hover:outline hover:outline-[#EED291] transition duration-300 rounded-full font-semibold">
                    Save
                  </button>

                  <button
                    className="mt-3 w-full text-lg cursor-pointer py-3 border border-[#EED291] hover:bg-[#EED291] transition duration-300 rounded-full font-semibold"
                    onClick={() => setIsSubDrawerOpen(false)}
                  >
                    Cancel
                  </button>
                </>
              )}

              {/* Truck Drawer */}
              {isDrawerItem === "Truck" && (
                <>
                  {/* Title */}
                  <h2 className="text-lg font-semibold flex items-center gap-3 mb-4">
                    <i class="fa-solid fa-truck-fast text-xl"></i> Estimate
                    Shipping Rates
                  </h2>

                  {/* Country */}
                  <label className="text-sm text-gray-700">
                    Country/Region
                  </label>
                  <div className="mt-1 mb-4">
                    <select className="w-full p-3 rounded-full border border-gray-300 text-sm focus:ring-0">
                      <option>United States</option>
                    </select>
                  </div>

                  {/* State */}
                  <label className="text-sm text-gray-700">State</label>
                  <div className="mt-1 mb-4">
                    <select className="w-full p-3 rounded-full border border-gray-300 text-sm focus:ring-0">
                      <option>Alabama</option>
                      <option>Alaska</option>
                    </select>
                  </div>

                  {/* ZIP Code */}
                  <label className="text-sm text-gray-700">ZIP Code</label>
                  <div className="mt-1 mb-5">
                    <input
                      type="text"
                      placeholder="Postal code"
                      className="w-full p-3 rounded-full border border-gray-300 text-sm focus:ring-0"
                    />
                  </div>

                  {/* Calculate Button */}
                  <button className="w-full py-3 rounded-full border border-[#EED291] bg-[#EED291] hover:bg-white hover:outline hover:outline-[#EED291] transition duration-300 font-semibold cursor-pointer mb-4 text-lg">
                    Calculate Shipping
                  </button>

                  {/* Cancel Button */}
                  <button
                    onClick={() => setIsSubDrawerOpen(false)}
                    className="w-full py-3 rounded-full border border-[#EED291] hover:bg-[#EED291] transition duration-300 text-black font-semibold cursor-pointer text-lg"
                  >
                    Cancel
                  </button>
                </>
              )}

              {/* Tag Drawer */}
              {isDrawerItem === "Tag" && (
                <>
                  {/* Title */}
                  <h2 className="text-lg font-semibold flex items-center gap-3 mb-4">
                    <i class="fa-solid fa-tag text-xl"></i> Add A Coupon
                  </h2>

                  {/* Subtitle */}
                  <p className="text-sm text-gray-600 mb-3">
                    Coupon code content
                  </p>

                  {/* Input */}
                  <input
                    type="text"
                    className="w-full p-3 rounded-full border border-gray-300 text-sm focus:ring-0 mb-5"
                  />

                  {/* Save Button */}
                  <button className="w-full py-3 rounded-full border border-[#EED291] bg-[#EED291] hover:bg-white hover:outline hover:outline-[#EED291] transition duration-300 font-semibold cursor-pointer mb-4 text-lg">
                    Save
                  </button>

                  {/* Cancel Button */}
                  <button
                    onClick={() => setIsSubDrawerOpen(false)}
                    className="w-full py-3 rounded-full border border-[#EED291] hover:bg-[#EED291] transition duration-300 font-semibold cursor-pointer text-lg"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </>
        )}

        {/* SubDrawer Overlay */}
        {isSubDrawerOpen && (
          <div
            onClick={() => setIsSubDrawerOpen(false)}
            className="fixed inset-0 bg-white/60 z-[90]"
          ></div>
        )}
      </div>

      {/* CART Drawer Overlay */}
      {cartOpen && (
        <div
          className={`fixed inset-0 bg-black/70 z-[80]`}
          onClick={() => dispatch(toggleCartDrawer())}
          // style={{
          //   cursor: `url("https://upload.wikimedia.org/wikipedia/commons/7/70/Emoji_u274c.svg.png") 16 16, pointer`,
          // }}
        ></div>
      )}
    </>
  );
}

export default Navbar;
