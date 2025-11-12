import wine_logo from "/wine-website-logo.svg";
import use_flag from "/navbar/usa-flag.jpg"
import europe from "/navbar/europe.svg"
import uk_flag from "/navbar/uk.svg"
import china_flag from "/navbar/china.svg"
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

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
      <nav className="!font-[Urbanist] relative z-40">
        {/* Top bar */}
        <div className="bg-[#EED291] py-2">
          <p className="font-semibold text-center">Free shipping at $99+</p>
        </div>

        {/* Main navbar */}
        <div
          ref={navbarRef}
          className={`w-full transition-all duration-500 ease-in-out fixed ${isSticky
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
              <ul className="items-center list-none gap-7 text-lg font-semibold text-white hidden xl:flex">
                {["Home", "Shop", "About Us", "Blog"].map((item) => (
                  <li
                    key={item}
                    className="relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#EED291] after:transition-all after:duration-300 hover:after:w-full hover:text-[#EED291]"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              {/* Icons */}
              <div className="flex items-center gap-3 xl:gap-5 text-2xl text-white">
                <i className="fa-solid fa-magnifying-glass cursor-pointer hover:text-[#EED291] transform hover:scale-110 transition-all duration-200"></i>
                <i className="fa-regular fa-user cursor-pointer hover:text-[#EED291] transform hover:scale-110 transition-all duration-200"></i>
                <i className="fa-solid fa-bag-shopping cursor-pointer hover:text-[#EED291] transform hover:scale-110 transition-all duration-200"></i>
              </div>

              {/* Desktop Button */}
              <button className="bg-[#EED291] px-9 py-4 rounded-full font-semibold hidden xl:block cursor-pointer hover:bg-transparent outline hover:outline-[#EED291] hover:text-[#EED291] transition-all duration-200">
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
        className={`fixed top-0 left-0 h-full w-[80%] md:w-[50%] lg:w-[40%] bg-black text-white z-50 transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center p-4 text-xl !font-[400] font-[Urbanist]">
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
            <div className="flex items-center flex-wrap gap-5 pl-4 mt-3">
              <div className="flex items-center gap-2">
                <img className="h-7 w-7 rounded-full object-cover" src={use_flag} alt="use_flag" />
                <p>USD</p>
              </div>

              <div className="flex items-center gap-2">
                <img className="h-7 w-7 rounded-full object-cover" src={europe} alt="europe" />
                <p>EUR</p>
              </div>

              <div className="flex items-center gap-2">
                <img className="h-7 w-7 rounded-full object-cover" src={uk_flag} alt="uk_flag" />
                <p>GBP</p>
              </div>

              <div className="flex items-center gap-2">
                <img className="h-7 w-7 rounded-full object-cover" src={china_flag} alt="china_flag" />
                <p>CHF</p>
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
