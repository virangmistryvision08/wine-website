import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CommonFirstSection from "./CommonFirstSection";
import blog_details_bg from "/blogs/blog-details-bg.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Product from "./Product";
import Title from "./Title";
import Blog from "./Blog";

const BlogDetailsPage = () => {
  const { slug } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const allBlogs = useSelector((state) => state.blogs.allBlogs);
  const filteredBlog = allBlogs.filter((blog) => blog.slug === slug);
  const blog = filteredBlog[0];
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showPagination, setShowPagination] = useState(true);
  const featuredProducts = useSelector(
    (state) => state.products.featuredProducts
  );

  const updatePagination = (swiper) => {
    const perView = swiper.params.slidesPerView;

    if (allBlogs.length <= perView) {
      setShowPagination(false);
    } else {
      setShowPagination(true);
    }
  };

  //   Auto Close Logic
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Run once on load also
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const leftSideContent = () => {
    return (
      <>
        {/* Left Side Start */}
        <h1 className="text-4xl uppercase font-bold mb-10 font-[Cormorant-Upright-bold]">
          Wine
        </h1>
        <h1 className="text-2xl font-semibold mb-3">Categories</h1>
        <hr className="border border-gray-200 mb-2" />
        <h4 className="font-semibold text-gray-500 hover:text-black cursor-pointer">Red Wine</h4>
        <h4 className="font-semibold text-gray-500 hover:text-black cursor-pointer">White Wine</h4>
        <h4 className="font-semibold text-gray-500 hover:text-black cursor-pointer">Rosé Wine</h4>
        <h4 className="font-semibold text-gray-500 hover:text-black cursor-pointer">Sparkling Wine</h4>
        {/* Recent Post Start */}
        <div className="mb-14">
          <h1 className="text-2xl font-semibold my-3">Recent Post</h1>
          {allBlogs.map((blog) => {
            return (
              <>
                <hr className="border border-gray-200" />
                <div className="flex flex-col py-3 space-y-3">
                  <h2
                    onClick={() => navigate(`/blog/${blog.slug}`)}
                    className="font-semibold cursor-pointer"
                  >
                    {blog.title}
                  </h2>
                  <span className="text-gray-500">{blog.createdAt}</span>
                </div>
              </>
            );
          })}
        </div>
        {/* Recent Post End */}

        {/* Featured Product Start */}
        <div className="">
          <h1 className="text-2xl font-semibold">Featured Products</h1>
          <hr className="border border-gray-200" />

          <Swiper
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            slidesPerView={1}
            spaceBetween={20}
            centeredSlides={false}
            // loop={true}
            speed={700}
            autoplay
            navigation={{
              prevEl: ".prev-button",
              nextEl: ".next-button",
            }}
            modules={[Navigation]}
            className="!pb-10"
          >
            {featuredProducts.map((product) => {
              return (
                <SwiperSlide key={product.id}>
                  <Product
                    productImage={product.productImage}
                    title={product.title}
                    verity={product.verity}
                    isGold={product.isGold}
                    price={product.price}
                    wineType={product.wineType}
                    id={product.id}
                  />
                </SwiperSlide>
              );
            })}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-between z-[300]">
              {/* PREV */}
              <div
                className={`prev-button pointer-events-auto px-3 py-1 rounded-full bg-gray-100/20 ${activeIndex === 0 ? "cursor-default" : "cursor-pointer"
                  }`}
              >
                <i
                  className={`fa-solid fa-arrow-left-long !text-2xl ${activeIndex === 0 ? "text-gray-300" : "text-gray-800"
                    }`}
                ></i>
              </div>

              {/* NEXT */}
              <div
                className={`next-button pointer-events-auto px-3 py-1 rounded-full bg-gray-100/20 ${activeIndex === featuredProducts.length - 1
                    ? "cursor-default"
                    : "cursor-pointer"
                  }`}
              >
                <i
                  className={`fa-solid fa-arrow-right-long !text-2xl ${activeIndex === featuredProducts.length - 1
                      ? "text-gray-300"
                      : "text-gray-800"
                    }`}
                ></i>
              </div>
            </div>
          </Swiper>
        </div>
        {/* Featured Product End */}
        {/* Left Side End */}
      </>
    );
  };

  return (
    <>
      <CommonFirstSection
        productImage={blog_details_bg}
        page="News"
        productType={
          blog.title ===
            "“How non-alcoholic wine is made without losing the taste” Gentle Dealcoholization: How LTVD and Aroma Recovery Work"
            ? "“How non-alcoholic wine is made without losing the taste”"
            : "The Perfect Non-Alcoholic Wines for Weddings, Brunches, Picnics, Family Celebrations, and Nights Out"
              ? "The Perfect Non-Alcoholic Wines for Functions"
              : blog.title
        }
      />
      <section className="w-[96%] mx-auto">
        <div className="py-10">
          {/* Sidebar on Below XL Screen */}
          <div className="xl:hidden text-3xl mb-7">
            <i
              onClick={() => setIsDrawerOpen(true)}
              className="fa-solid fa-sliders cursor-pointer"
            ></i>
          </div>

          <div className="font-[Urbanist] flex justify-between items-start gap-20 pb-10 xl:pb-20">
            <div className="w-full xl:w-[25%] flex-1 sticky top-28 hidden xl:block">
              {leftSideContent()}
            </div>

            {/* Right Side Start */}
            <div className="w-full xl:w-[70%] sticky top-28">
              <h1 className="text-2xl font-semibold">{blog.title}</h1>
              <div className="my-4">
                <span className="text-gray-400">
                  By {blog.by}, {blog.createdAt}
                </span>
              </div>

              <div
                className="blog-details-description text-gray-500"
                dangerouslySetInnerHTML={{ __html: blog.description }}
              ></div>
            </div>
            {/* Right Side End */}
          </div>

          {/* Blogs */}
          <div className="">
            <Title text="Blog" />
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"> */}
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              centeredSlides={false}
              loop={false}
              pagination={showPagination ? { clickable: true } : false}
              onInit={updatePagination}
              onResize={updatePagination}
              breakpoints={{
                480: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              modules={[Pagination]}
              className="mySwiper !pb-0"
            >
              {allBlogs.map((item, index) => (
                <SwiperSlide key={item.id} className="overflow-hidden">
                  <Blog blogImage={item.blogImage} title={item.title} description={item.description} slug={item.slug} />
                </SwiperSlide>
              ))}
            </Swiper>
            {/* </div> */}
          </div>
        </div>
      </section>

      {/* Drawer */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isDrawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsDrawerOpen(false)}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl overflow-hidden transform transition-transform duration-300 
    ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-5 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Filters</h2>

          <i
            className="fa-solid fa-xmark text-2xl cursor-pointer hover:rotate-90 transition"
            onClick={() => setIsDrawerOpen(false)}
          ></i>
        </div>

        {/* Drawer Content */}
        <div className="p-4 h-[calc(100vh-64px)] overflow-y-auto">
          {leftSideContent()}
        </div>
      </div>
    </>
  );
};

export default BlogDetailsPage;
