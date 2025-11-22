import React from "react";
import { useSelector } from "react-redux";
import blog_page_bg from "/blogs/blog-page-bg.jpg";
import CommonFirstSection from "./CommonFirstSection";
import { useNavigate } from "react-router-dom";
import Blog from "./Blog";

const BlogPage = () => {
  const blogsDetails = useSelector((state) => state.blogs.allBlogs);

  return (
    <>
      <CommonFirstSection
        productImage={blog_page_bg}
        productType="News"
      />
      <section className="bg-white w-full pt-10 md:pt-24">
        <div className="w-[90%] xl:w-[80%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-5">
            {blogsDetails.map((item, index) => (
              <Blog key={item.id} blogImage={item.blogImage} title={item.title} description={item.description} slug={item.slug} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
