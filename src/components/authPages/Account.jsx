import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RegisterForm from "./RegisterForm";

const Account = () => {
  const { page } = useParams();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // update data
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    let msg = "";

    // Email validation
    if (name === "email") {
      if (value.trim() === "") {
        msg = "Email is required!";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) msg = "Invalid email format!";
      }
    }

    // Password validation
    if (name === "password") {
      if (value.trim() === "") {
        msg = "Password is required!";
      } else if (value.length < 6) {
        msg = "Password must be at least 6 characters!";
      }
    }

    // update error message
    setErrorMsg((prev) => ({
      ...prev,
      [name]: msg,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Enter a valid email!";
    }

    if (!data.password.trim()) {
      errors.password = "Password is required!";
    } else if (data.password.length < 6) {
      errors.password = "Password must be 6+ characters!";
    }
    setErrorMsg({ ...errors });

    if (Object.keys(errors).length !== 0) return;

    console.log(data, "data");
  };
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
            <span className="text-base font-semibold">Account</span>
          </div>
        </div>

        <h1 className="uppercase text-2xl md:text-3xl xl:text-5xl font-[Cormorant-Upright-bold] text-center">
          Sign In
        </h1>

        {/* <div className="bg-white flex items-center justify-center p-4"> */}
        <div className="w-full  flex flex-col md:flex-row gap-10 mx-auto py-10 xl:py-16">
          {page === "login" ? (
            <>
              {/* Login Section */}
              <div className="w-full md:w-[40%] py-6 lg:py-10">
                <h2 className="text-xl mb-3">Login</h2>
                <p className="text-gray-600 mb-10">
                  Please enter your email and password below to access your
                  account
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Email */}
                  <div>
                    <input
                      onChange={handleChange}
                      type="email"
                      name="email"
                      className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
                      placeholder="Email"
                    />
                    {errorMsg.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorMsg.email}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <input
                      onChange={handleChange}
                      type="password"
                      name="password"
                      className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
                      placeholder="Password"
                    />
                    {errorMsg.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorMsg.password}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between lg:justify-start lg:gap-10 mt-4">
                    <button
                      type="submit"
                      className="border border-[#EED291] bg-[#EED291] hover:bg-white transition duration-300 cursor-pointer px-8 py-3 rounded-full text-black font-medium"
                    >
                      SIGN IN
                    </button>
                    <Link
                      to="/verify-email"
                      className="text-sm text-gray-700 underline"
                    >
                      Lost your password?
                    </Link>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <>
              <div className="w-full md:w-[40%] py-6 lg:py-10">
                <h2 className="text-xl mb-3">Reset your password</h2>
                <p className="text-gray-600 mb-10">
                  We will send you an email to reset your password
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Email */}
                  <div>
                    <input
                      onChange={handleChange}
                      type="email"
                      name="email"
                      className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
                      placeholder="Email Address"
                    />
                    {errorMsg.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorMsg.email}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between lg:justify-start lg:gap-10 mt-4">
                    <button
                      type="submit"
                      className="uppercase border border-[#EED291] bg-[#EED291] hover:bg-white transition duration-300 cursor-pointer px-8 py-3 rounded-full text-black font-medium"
                    >
                      Submit
                    </button>
                    <button
                      type="submit"
                      className="uppercase border border-[#EED291] bg-white hover:bg-[#EED291] transition duration-300 cursor-pointer px-8 py-3 rounded-full text-black font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}

          {/* Register Section */}
          <div className="w-full md:w-[60%] p-6 bg-[#F9F9F9]">
            <h2 className="text-xl mb-6">Register</h2>

            <RegisterForm emailMarketing={false} />
          </div>
        </div>
        {/* </div> */}
      </section>
    </>
  );
};

export default Account;
