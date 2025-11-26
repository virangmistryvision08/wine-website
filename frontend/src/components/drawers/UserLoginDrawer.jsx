import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UserLoginDrawer = ({isUserDrawer, setIsUserDrawer}) => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState({});
  const navigate = useNavigate();

    const handleChangeUserLogin = (e) => {
        const { name, value } = e.target;
    
        setUserLogin((prev) => ({
          ...prev,
          [name]: value,
        }));
    
        let error = "";
    
        // Email Validation
        if (name === "email") {
          if (value.trim() === "") {
            error = "Email address is required!";
          } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) error = "Invalid email format!";
          }
        }
    
        // Password Validation
        if (name === "password") {
          if (value.trim() === "") {
            error = "Password is required!";
          } else if (value.length < 6) {
            error = "Password must be at least 6 characters!";
          }
        }
    
        // update error message
        setErrorMsg((prev) => ({
          ...prev,
          [name]: error,
        }));
      };
    
      const handleSubmitLoginCreadential = (e) => {
        e.preventDefault();
    
        const error = {};
    
        // Email Validation
        if (!userLogin.email.trim()) {
          error.email = "Email address is required!";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userLogin.email)) {
          error.email = "Invalid email format!";
        }
    
        // Password Validation
        if (!userLogin.password.trim()) {
          error.password = "Password is required!";
        } else if (userLogin.password.length < 6) {
          error.password = "Password must be at least 6 characters!";
        }
        setErrorMsg({ ...error });
    
        if (Object.keys(error).length !== 0) return;
    
        setUserLogin({ email: "", password: "" });
        setIsUserDrawer(false);
        console.log(userLogin, "userlogin");
      };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/70 z-50 transition-opacity duration-300 ${
          isUserDrawer ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsUserDrawer(false)}
      ></div>

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[90%] md:w-[50%] lg:w-[40%] xl:w-[22%] bg-white z-60 shadow-xl p-6
        transition-transform duration-300 ease-in-out font-[Urbanist]
        ${isUserDrawer ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Login</h2>
          <button
            className="cursor-pointer"
            onClick={() => setIsUserDrawer(false)}
          >
            <i className="fa-solid fa-x"></i>
          </button>
        </div>

        {/* Login Content */}
        <form onSubmit={handleSubmitLoginCreadential} action="">
          {/* Email */}
          <div className="mb-4">
            <label className="text-base font-medium">Email Address *</label>
            <input
              onChange={handleChangeUserLogin}
              type="email"
              name="email"
              value={userLogin.email || ""}
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-full px-4 py-3 mt-2"
            />
            <p className="text-red-500">{errorMsg.email}</p>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-base font-medium">Password *</label>
            <input
              onChange={handleChangeUserLogin}
              type="password"
              name="password"
              value={userLogin.password || ""}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-full px-4 py-3 mt-2"
            />
            <p className="text-red-500">{errorMsg.password}</p>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-[#EED291] hover:bg-white border border-[#EED291] transition duration-300 py-3 rounded-full text-black font-semibold"
          >
            Log In
          </button>
        </form>

        <p
          onClick={() => {
            navigate("/account/verify-email");
            setIsUserDrawer(false);
          }}
          className="text-base underline mt-3 cursor-pointer w-fit mx-auto hover:text-[#EED291] transition duration-300"
        >
          Forgot your password?
        </p>

        <button
          onClick={() => {
            navigate("/register");
            setIsUserDrawer(false);
          }}
          className="w-full cursor-pointer border border-[#EED291] hover:border-black hover:bg-black hover:text-white transition duration-500 py-3 mt-6 rounded-full font-semibold"
        >
          Create Account
        </button>
      </div>
    </>
  )
}

export default UserLoginDrawer
