import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import blog_page_bg from "/blogs/blog-page-bg.jpg";
import CommonFirstSection from "./CommonFirstSection";
import Blog from "./Blog";
import { get_all_blogs } from "../redux/reducers/blogReducer";

const BlogPage = () => {
  const dispatch = useDispatch();
  const blogsDetails = useSelector((state) => state.blogs.allBlogs);

  useEffect(() => {
    dispatch(get_all_blogs());
  }, []);

  return (
    <>
      <CommonFirstSection
        productImage={blog_page_bg}
        productType="News"
      />
      <section className="bg-white w-full pt-10 md:pt-24">
        <div className="w-[90%] xl:w-[80%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-5">
            {blogsDetails.map((item) => (
              <Blog key={item.id} blogImage={item.blogImage} title={item.title} description={item.description} slug={item.slug} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
