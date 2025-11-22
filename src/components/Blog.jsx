import React from 'react'
import { useNavigate } from 'react-router-dom';

const Blog = ({ blogImage, slug, description, title }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex flex-col justify-between gap-2 lg:gap-3 mx-auto pb-16 font-[Urbanist]">
                <div className="overflow-hidden">
                    <img
                        onClick={() => navigate(`/blog/${slug}`)}
                        src={blogImage}
                        alt="Blog Image"
                        className="w-full h-[350px] xl:h-[500px] object-cover transition-transform hover:scale-105 transition duration-500 cursor-pointer"
                    />
                </div>
                <p onClick={() => navigate(`/blog/${slug}`)} className="lg:text-lg font-semibold text-gray-900 mt-2 line-clamp-2 cursor-pointer">
                    {title}
                </p>
                <p
                    dangerouslySetInnerHTML={{ __html: description }}
                    className="description-preview text-gray-600 text-base line-clamp-3"
                />
                <button onClick={() => navigate(`/blog/${slug}`)} className="text-lg mt-2 cursor-pointer text-start w-fit font-semibold hover:underline">
                    Read more
                </button>
            </div>
        </>
    )
}

export default Blog