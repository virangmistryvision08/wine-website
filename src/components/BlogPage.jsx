import React from "react";
import { useSelector } from "react-redux";
import blog_page_bg from "/blogs/blog-page-bg.jpg";
import CommonFirstSection from "./CommonFirstSection";

const BlogPage = () => {
  const blogsDetails = useSelector((state) => state.blogs.allBlogs);
  console.log(blogsDetails, "blogdetails");
  return (
    <>
      <CommonFirstSection productImage={blog_page_bg} productType="News" />
      <section className="bg-white w-full py-10 md:py-24">
        <div className="w-[90%] xl:w-[80%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogsDetails.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-between gap-2 lg:gap-3 mx-auto pb-16 font-[Urbanist]"
              >
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
