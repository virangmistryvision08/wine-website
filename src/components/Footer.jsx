import React, { useState } from "react";
import footer_logo from "/footer/footer-logo.png";
import footer_grapes from "/footer/footer-grapes.svg";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const [openCompany, setOpenCompany] = useState(false);
  const [openMoreInfo, setOpenMoreInfo] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <section className="bg-black text-white w-full pt-10">
        <div className="w-[90%] xl:w-[80%] mx-auto font-[Urbanist] relative">
          {/* Top Section start */}
          <div className="z-40 w-full md:w-[90%] lg:w-[80%] xl:w-[70%] 2xl:w-[50%] mx-auto text-center space-y-4 xl:space-y-7">
            <h1 className="z-40 uppercase text-3xl lg:text-4xl font-[Cormorant-Upright-bold]">
              OUR NEWSLETTER
            </h1>
            <p className="z-40 text-lg">Sign up for our newsletter</p>
            <div className="z-40 relative flex flex-col gap-4">
              <input
                className="h-[40px] md:h-[60px] w-full rounded-full outline-2 bg-white text-black placeholder:text-black placeholder:text-base md:placeholder:text-lg outline-white ps-3 md:ps-6"
                type="email"
                placeholder="Enter Your Email"
              />
              <button className="md:absolute md:top-1.5 md:right-1.5 px-9 py-2.5 md:py-3 bg-[#EED291] text-black hover:bg-black hover:text-white transition duration-300 cursor-pointer font-semibold rounded-full">
                SUBSCRIBE
              </button>
            </div>
          </div>
          {/* Top section end */}

          {/* Bottom section start */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:flex-row justify-between md:gap-10 mt-5 md:mt-16">
            {/* Logo Section */}
            <div className="z-40 xl:items-start flex flex-col gap-3 xl:gap-5">
              <img
                className="h-28 w-28 xl:h-24 xl:w-24"
                src={footer_logo}
                alt="logo"
              />
              <p className="text-sm xl:text-base">
                Elite Wine Selections is a New York–based importer and
                wholesaler specializing in premium, award-winning European
                dealcoholized wines (0.5% ABV) primarily from Germany, France,
                Italy, and Spain.
              </p>
              <div className="flex items-center gap-5 text-2xl">
                <i className="fa-brands fa-facebook-f cursor-pointer hover:text-blue-500 transition duration-100"></i>
                <i className="fa-brands fa-twitter cursor-pointer hover:text-blue-300 transition duration-100"></i>
                <i className="fa-brands fa-youtube cursor-pointer hover:text-red-500 transition duration-100"></i>
                <i className="fa-brands fa-instagram cursor-pointer hover:text-pink-400 transition duration-100"></i>
              </div>
            </div>

            {/* Company Accordion */}
            <div className="z-40 flex flex-col gap-4 mt-7 md:mt-0">
              <button
                onClick={() => setOpenCompany(!openCompany)}
                className="flex justify-between items-center font-[Cormorant-Upright-bold] uppercase text-xl xl:text-2xl md:cursor-default border-b border-white pb-2 md:border-none md:p-0"
              >
                Company
                <span className="md:hidden text-lg">
                  <i
                    className={`fa-solid fa-plus transition-transform duration-300 ${
                      openCompany ? "fa-solid fa-minus rotate-180" : ""
                    }`}
                  ></i>
                </span>
              </button>

              <ul
                className={`text-base xl:text-lg flex flex-col ${openCompany && "mb-5"} gap-1.5 text-gray-400 overflow-hidden transition-all duration-500 ease-in-out 
                ${
                  openCompany
                    ? "max-h-60 opacity-100"
                    : "max-h-0 opacity-0 md:max-h-none md:opacity-100"
                }
                md:max-h-none md:opacity-100`}
              >
                <li onClick={() => navigate("/")} className="cursor-pointer w-fit hover:text-[#EED291]">
                  Home
                </li>
                <li onClick={() => navigate("/about-us")} className="cursor-pointer w-fit hover:text-[#EED291]">
                  About Us
                </li>
                <li onClick={() => navigate("/shop")} className="cursor-pointer w-fit hover:text-[#EED291]">Shop</li>
                <li onClick={() => navigate("/blog")} className="cursor-pointer w-fit hover:text-[#EED291]">Blog</li>
                <li onClick={() => navigate("/faqs")} className="cursor-pointer w-fit hover:text-[#EED291]">FAQ</li>
              </ul>
            </div>

            {/* More Information Accordion */}
            <div className="z-40 flex flex-col gap-4 mb-5 md:mb-0">
              <button
                onClick={() => setOpenMoreInfo(!openMoreInfo)}
                className="flex justify-between items-center font-[Cormorant-Upright-bold] uppercase text-xl xl:text-2xl md:cursor-default border-b border-white pb-2 md:border-none md:p-0"
              >
                More Information
                <span className="md:hidden text-lg">
                  <i
                    className={`fa-solid fa-plus transition-transform duration-300 ${
                      openMoreInfo ? "fa-solid fa-minus rotate-180" : ""
                    }`}
                  ></i>
                </span>
              </button>

              <ul
                className={`text-base xl:text-lg flex flex-col gap-1.5 text-gray-400 overflow-hidden transition-all duration-500 ease-in-out 
                ${
                  openMoreInfo
                    ? "max-h-60 opacity-100"
                    : "max-h-0 opacity-0 md:max-h-none md:opacity-100"
                }
                md:max-h-none md:opacity-100`}
              >
                <li className="cursor-pointer w-fit hover:text-[#EED291]">
                  Shipping & Payment
                </li>
                <li className="cursor-pointer w-fit hover:text-[#EED291]">
                  Privacy Policy
                </li>
                <li className="cursor-pointer w-fit hover:text-[#EED291]">
                  Terms Of Service
                </li>
                <li className="cursor-pointer w-fit hover:text-[#EED291]">
                  Refund Policy
                </li>
                <li className="cursor-pointer w-fit hover:text-[#EED291]">
                  Contact
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="z-40 flex flex-col gap-4">
              <h1 className="font-[Cormorant-Upright-bold] uppercase text-xl xl:text-2xl">
                Contact
              </h1>
              <ul className="text-base xl:text-lg flex flex-col gap-3 text-gray-400 transition-all duration-500 ease-in-out">
                <li className="flex items-center gap-5">
                  <i className="fa-solid fa-phone-volume text-white text-xl xl:text-2xl"></i>
                  <p>+1 (631)-464-1334</p>
                </li>
                <li className="flex gap-5">
                  <i className="fa-solid fa-envelope text-white text-xl mt-2 xl:text-2xl"></i>
                  <p className="wrap-anywhere">
                    sebastian.huelck@elitewineselections.com
                  </p>
                </li>
                <li className="flex gap-5">
                  <i className="fa-solid fa-location-dot text-white text-xl mt-2 xl:text-3xl"></i>
                  <p className="ms-2">
                    Elite Wine Selections Inc. 40 Corbin Ave Ste B Bay Shore, NY
                    11706-1048 USA
                  </p>
                </li>
              </ul>
            </div>
          </div>
          {/* Bottom section end */}

          {/* bg grapes Image */}
          <div className="absolute -top-10 -left-10">
            <img className="" src={footer_grapes} alt="footer grapes" />
            {/* <div className="absolute inset-0 bg-white/10"></div> */}
          </div>
        </div>
        <div className="mt-10">
          <hr className="h-[2px] w-full border-none bg-gradient-to-r from-black via-gray-400 to-black" />
          <p className="text-center text-sm md:text-base py-5">
            © 2025 Elite Wines Selections All Rights Reserved
          </p>
        </div>
      </section>
    </>
  );
};

export default Footer;
