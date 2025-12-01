import React, { useEffect, useState } from "react";
import Title from "./Title";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import post1 from "/instagram/post1.jpg";
import post2 from "/instagram/post2.jpg";
import post3 from "/instagram/post3.jpg";
import post4 from "/instagram/post4.jpg";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./Blog";
import { get_all_blogs } from "../redux/reducers/blogReducer";

const Blogs = () => {
  const [showPagination, setShowPagination] = useState(true);
  const { blogs } = useSelector((state) => state);
  const blogsDetails = blogs.allBlogs;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_all_blogs());
  }, []);

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
              <Blog blogImage={item.blogImage} title={item.title} description={item.description} slug={item.slug} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Instagram Section */}
        <div className="mt-10">
          <Title text="Follow us on Instagram" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <div className="overflow-hidden">
              <img className="object-cover hover:scale-105 transition duration-500" src={post1} alt="post1" />
            </div>
            <div className="overflow-hidden">
              <img className="object-cover hover:scale-105 transition duration-500" src={post2} alt="post2" />
            </div>
            <div className="overflow-hidden">
              <img className="object-cover hover:scale-105 transition duration-500" src={post3} alt="post3" />
            </div>
            <div className="overflow-hidden">
              <img className="object-cover hover:scale-105 transition duration-500" src={post4} alt="post4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
