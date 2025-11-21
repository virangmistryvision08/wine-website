import React, { useState } from "react";
import Title from "./Title";
import blog1 from "/blogs/blog1.png";
import blog2 from "/blogs/blog2.jpg";
import blog3 from "/blogs/blog3.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import post1 from "/instagram/post1.jpg";
import post2 from "/instagram/post2.jpg";
import post3 from "/instagram/post3.jpg";
import post4 from "/instagram/post4.jpg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [showPagination, setShowPagination] = useState(true);
  const { blogs } = useSelector((state) => state);
  const blogsDetails = blogs.allBlogs;
  const navigate = useNavigate();

  // Function to conditionally show/hide pagination
  const handleSwiperInit = (swiper) => {
    const slidesPerView = swiper.params.slidesPerView;
    if (swiper.slides.length <= slidesPerView) {
      setShowPagination(false);
    } else {
      setShowPagination(true);
    }
  };

  return (
    <section className="bg-white w-full py-10 md:py-24">
      <div className="w-[90%] xl:w-[80%] mx-auto">
        <Title text="Blog" />

        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          speed={800}
          pagination={showPagination ? { clickable: true } : false}
          onInit={handleSwiperInit}
          onResize={handleSwiperInit}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {blogsDetails.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col justify-between gap-2 lg:gap-3 mx-auto pb-16 font-[Urbanist]">
                <div className="overflow-hidden">
                  <img
                   onClick={() => navigate(`/blog/${item.slug}`)}
                    src={item.blogImage}
                    alt="Blog Image"
                    className="w-full h-[350px] xl:h-[500px] object-cover transition-transform hover:scale-105 transition duration-500 cursor-pointer"
                  />
                </div>
                <p onClick={() => navigate(`/blog/${item.slug}`)} className="lg:text-lg font-semibold text-gray-900 mt-2 line-clamp-2 cursor-pointer">
                  {item.title}
                </p>
                <p
                  dangerouslySetInnerHTML={{ __html: item.description }}
                  className="description-preview text-gray-600 text-base line-clamp-3"
                >
                  {/* {item.description} */}
                </p>
                <button onClick={() => navigate(`/blog/${item.slug}`)} className="text-lg mt-2 cursor-pointer text-start w-fit font-semibold hover:underline">
                  Read more
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Instagram Section */}
        <div className="mt-10">
          <Title text="Follow us on Instagram" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <img className="object-cover" src={post1} alt="post1" />
            <img className="object-cover" src={post2} alt="post2" />
            <img className="object-cover" src={post3} alt="post3" />
            <img className="object-cover" src={post4} alt="post4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
