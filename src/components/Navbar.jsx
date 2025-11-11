import wine_logo from "/wine-website-logo.svg";
import { useEffect, useState, useRef } from "react";

function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
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
            <div>
              <img
                className={`${isSticky ? "h-24" : "h-20 xl:h-auto"}`}
                src={wine_logo}
                alt="logo"
              />
            </div>
            <div className="flex items-center gap-3 xl:gap-7">
              {/* Desktop Menu */}
              <ul className="items-center list-none gap-7 text-lg font-semibold text-white hidden xl:flex">
                <li>Home</li>
                <li>Shop</li>
                <li>About Us</li>
                <li>Blog</li>
              </ul>

              {/* Icons */}
              <div className="flex items-center gap-3 xl:gap-5 text-2xl text-white">
                <i className="fa-solid fa-magnifying-glass !hidden xl:!block"></i>
                <i className="fa-regular fa-user"></i>
                <i className="fa-solid fa-bag-shopping"></i>
              </div>

              {/* Desktop Button */}
              <button className="bg-[#EED291] px-9 py-4 rounded-full font-semibold hidden xl:block">
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
        className={`fixed top-0 left-0 h-full w-96 bg-black text-white z-50 transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4">
          Menu
          <i
            className="fa-solid fa-xmark text-2xl cursor-pointer"
            onClick={toggleDrawer}
          ></i>
        </div>
        <ul className="flex flex-col gap-4 mt-6">
          <li
            onClick={toggleDrawer}
            className="cursor-pointer pl-4 text-[#EED291]"
          >
            Home
          </li>
          <hr className="border border-gray-700" />
          <li onClick={toggleDrawer} className="cursor-pointer pl-4">
            Shop All
          </li>
          <hr className="border border-gray-700" />
          <li onClick={toggleDrawer} className="cursor-pointer pl-4">
            About Us
          </li>
          <hr className="border border-gray-700" />
          <li onClick={toggleDrawer} className="cursor-pointer pl-4">
            Blog
          </li>
          <hr className="border border-gray-700" />
          <li onClick={toggleDrawer} className="cursor-pointer pl-4">
            <i class="fa-regular fa-circle-user"></i> Sign In
          </li>
          <hr className="border border-gray-700" />
          <li onClick={toggleDrawer} className="cursor-pointer pl-4">
            <i class="fa-solid fa-user-plus"></i> Create Account
          </li>

          <div>
            <li
              onClick={toggleDrawer}
              className="cursor-pointer pl-4 text-xl font-[400]"
            >
              Currency
            </li>
            <div>
                <div>
                    <img src="" alt="" />
                    <p>USD</p>
                </div>
            </div>
          </div>
        </ul>
      </div>

      {/* Overlay to hide background content */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-gray-600/70 bg-opacity-80 z-40"
          onClick={toggleDrawer}
        ></div>
      )}
    </>
  );
}

export default Navbar;
