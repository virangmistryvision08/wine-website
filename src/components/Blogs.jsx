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

const Blogs = () => {
  const [showPagination, setShowPagination] = useState(true);
  const { blogs } = useSelector((state) => state);
  console.log(blogs, "blogs");
  const blogsDetails = blogs.allBlogs;

  // const blogsDetails = [
  //   {
  //     blogImage: blog1,
  //     title:
  //       "“How non-alcoholic wine is made without losing the taste” Gentle Dealcoholization: How LTVD and Aroma Recovery Work",
  //     description:
  //       "For a long time, non-alcoholic wines carried a reputation for being overly sweet, flat, or marked by cooked flavors...",
  //   },
  //   {
  //     blogImage: blog2,
  //     title:
  //       "The Perfect Non-Alcoholic Wines for Weddings, Brunches, Picnics, Family Celebrations, and Nights Out",
  //     description:
  //       "Wine has always been part of life’s most memorable moments — toasting newlyweds, sharing a Sunday brunch, or opening a bottle...",
  //   },
  //   {
  //     blogImage: blog3,
  //     title: "Hosting a Dinner Party with Wine Pairings for Everyone",
  //     description:
  //       "There’s something magical about gathering friends and family around the table. The laughter, the conversation, the aroma of home-cooked dishes — and of course, the wine...",
  //   },
  // ];

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
                <img
                  src={item.blogImage}
                  alt="Blog Image"
                  className="w-full h-[350px] xl:h-[500px] object-cover"
                />
                <p className="lg:text-lg 2xl:text-xl font-semibold text-gray-900 mt-2 line-clamp-2">
                  {item.title}
                </p>
                <p
                  dangerouslySetInnerHTML={{ __html: item.description }}
                  className="description-preview text-gray-600 text-base lg:text-base 2xl:text-lg line-clamp-3"
                >
                  {/* {item.description} */}
                </p>
                <button className="text-lg lg:text-xl mt-2 cursor-pointer text-start w-fit font-semibold hover:underline">
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
