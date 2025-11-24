import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";

const Register = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="w-[96%] mx-auto font-[Urbanist]">
        <div className=" relative h-40 xl:h-72">
          <div className="flex items-center gap-2 absolute bottom-5">
            <span
              onClick={() => navigate("/")}
              className="text-base font-semibold cursor-pointer hover:text-[#EED291]"
            >
              Home
            </span>
            <i class="fa-solid fa-angle-right"></i>
            <span className="text-base font-semibold">Create Account</span>
          </div>
        </div>

        <div className="w-full mx-auto pb-14">
          {/* Heading */}
          <h1 className="text-center text-2xl md:text-3xl xl:text-5xl font-[Cormorant-Upright-bold] tracking-wide mb-4">
            CREATE ACCOUNT
          </h1>
          <p className="text-center text-base xl:text-lg text-gray-600 mb-10">
            Please register below to create an account
          </p>

          <div className="w-full xl:w-[70%] 2xl:w-[60%] mx-auto">
            {/* Form */}
            <RegisterForm/>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
