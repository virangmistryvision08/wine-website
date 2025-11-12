import React, { useState } from "react";
import Title from "./Title";
import product1 from "/products/product1.png";
import product2 from "/products/product2.png";
import product3 from "/products/product3.png";
import Product from "./Product";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";

const PopularProducts = () => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [showNav, setShowNav] = useState(true);

  const handleNavigationVisibility = (swiper) => {
    if (swiper.slides.length <= swiper.params.slidesPerView) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }

    if (swiper.navigation) {
      swiper.navigation.destroy();
      swiper.navigation.init();
      swiper.navigation.update();
    }

    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const productDetails = [
    {
      productImage: product1,
      title: "Bergdolt, Reif & Nett Breakaway Merlot Dealcoholized",
      verity: "Grape Verity",
      isGold: false,
      price: 29.76,
      productType: "Bergdolt, Reif & Nett",
      wineType: "Merlot",
    },
    {
      productImage: product2,
      title: "Bergdolt, Reif & Nett Breakaway Pinot Noir Dealcoholized",
      verity: "Grape Verity",
      isGold: true,
      price: 29.38,
      productType: "Bergdolt, Reif & Nett",
      wineType: "Pinot Noir",
    },
    {
      productImage: product3,
      title:
        "Bergdolt, Reif & Nett Reverse Sauvignon Blanc (vegan) Dealcoholized",
      verity: "Grape Verity",
      isGold: false,
      price: 25.76,
      productType: "Bergdolt, Reif & Nett",
      wineType: "Sauvignon Blanc",
    },
  ];

  return (
    <section className="w-full bg-[#F8F8F8] py-10 md:py-20">
      <div className="w-[90%] xl:w-[80%] mx-auto">
        {/* Title */}
        <Title text="Popular products" />

        {/* Swiper Container */}
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            breakpoints={{
              320: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 3 },
            }}
            className="mySwiper pb-16"
            onInit={(swiper) => {
              handleNavigationVisibility(swiper);
            }}
            onResize={(swiper) => {
              handleNavigationVisibility(swiper);
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
          >
            {productDetails.map((product, index) => (
              <SwiperSlide key={index}>
                <Product
                  productImage={product.productImage}
                  title={product.title}
                  verity={product.verity}
                  isGold={product.isGold}
                  price={product.price}
                  wineType={product.wineType}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          {showNav && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                className={`swiper-button-prev-custom border border-black rounded-full w-10 h-10 flex items-center justify-center shadow-md transition ${
                  isBeginning
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-gray-200"
                }`}
                disabled={isBeginning}
              >
                ❮
              </button>
              <button
                className={`swiper-button-next-custom border border-black rounded-full w-10 h-10 flex items-center justify-center shadow-md transition ${
                  isEnd ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-200"
                }`}
                disabled={isEnd}
              >
                ❯
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
