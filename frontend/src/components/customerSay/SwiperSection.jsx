import React from "react";
import Title from "../Title";
import customer_image from "/customer_image.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "./swiperSection.css";

const SwiperSection = () => {
  const swiperDetails = [
    {
      icon: <i className="fa-solid fa-quote-left"></i>,
      description:
        "Once dismissed as too sweet or “cooked,” non-alcoholic wine has evolved. Thanks to new tech, winemakers like Bergdolt-Nett now deliver pure terroir, zero alcohol",
      customerImage: customer_image,
      address:
        "Sommelière Romana Echensperger about Bergdolt, Reif & Nett",
    },
    {
      icon: <i className="fa-solid fa-quote-left"></i>,
      description:
        "Once dismissed as too sweet or “cooked,” non-alcoholic wine has evolved. Thanks to new tech, winemakers like Bergdolt-Nett now deliver pure terroir, zero alcohol",
      customerImage: customer_image,
      address:
        "Sommelière Romana Echensperger about Bergdolt, Reif & Nett",
    },
    {
      icon: <i className="fa-solid fa-quote-left"></i>,
      description:
        "Once dismissed as too sweet or “cooked,” non-alcoholic wine has evolved. Thanks to new tech, winemakers like Bergdolt-Nett now deliver pure terroir, zero alcohol",
      customerImage: customer_image,
      address:
        "Sommelière Romana Echensperger about Bergdolt, Reif & Nett",
    },
    {
      icon: <i className="fa-solid fa-quote-left"></i>,
      description:
        "Once dismissed as too sweet or “cooked,” non-alcoholic wine has evolved. Thanks to new tech, winemakers like Bergdolt-Nett now deliver pure terroir, zero alcohol",
      customerImage: customer_image,
      address:
        "Sommelière Romana Echensperger about Bergdolt, Reif & Nett",
    },
  ];

  return (
    <section className="w-full py-10 md:py-24 bg-gradient-to-b from-white via-[#fff7e3] to-[#FFF1D2]">
      <div className="w-[90%] xl:w-[80%] mx-auto">
        <Title text="What our customers say about us" />

          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            speed={800}
            loop={true}
            pagination={{ clickable: true }}
          >
            {swiperDetails.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="px-6 flex flex-col items-center text-center gap-2 lg:w-[50%] mx-auto pb-16 font-[Urbanist]">
                  <div className="text-7xl">{item.icon}</div>
                  <p className="text-gray-700 text-base lg:text-xl">{item.description}</p>
                  <img
                    src={item.customerImage}
                    alt="customer"
                    className="h-16 lg:w-20 w-16 lg:h-20 rounded-full object-cover mt-4"
                  />
                  <p className="text-sm lg:text-lg font-semibold text-gray-900 mt-2">
                    {item.address}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
      </div>
    </section>
  );
};

export default SwiperSection;
