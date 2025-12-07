import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import axios from "../../intercepter/axiosInstance";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastMessage from "../toastMessage/toastMessage";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import {
  get_all_carts,
  // getAllCarts,
} from "../../redux/reducers/productReducer";

const UserLoginDrawer = ({ isUserDrawer, setIsUserDrawer }) => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem(import.meta.env.VITE_WINE_TOKEN);
  const [spinner, setSpinner] = useState(false);
  let decoded = null;
  const dispatch = useDispatch();

  if (token) {
    try {
      decoded = jwtDecode(token);
    } catch (err) {
      console.error("Invalid JWT:", err);
    }
  }

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
    setSpinner(true);
    const guestId = localStorage.getItem("guestId");

    axios
      .post(`/auth/login`, userLogin)
      .then((res) => {
        // Save token
        localStorage.setItem(import.meta.env.VITE_WINE_TOKEN, res.data.token);

        // Remove guestId because backend merges it
        if (guestId) localStorage.removeItem("guestId");

        ToastMessage.success(res.data.message);
        setIsUserDrawer(false);
        navigate("/");
        setSpinner(false);

        setUserLogin({ email: "", password: "" });

        // Fetch updated user cart
        dispatch(get_all_carts());
      })
      .catch((error) => {
        setSpinner(false);
        ToastMessage.error(
          error.response ? error.response.data.message : error.message
        );
      });
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/70 z-50 transition-opacity duration-300 ${isUserDrawer ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => {
          setIsUserDrawer(false);
          setUserLogin({ email: "", password: "" });
        }}
      ></div>

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[90%] md:w-[50%] lg:w-[40%] xl:w-[22%] bg-white z-60 shadow-xl p-6
        transition-transform duration-300 ease-in-out font-[Urbanist]
        ${isUserDrawer ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {!token
              ? "Login"
              : `Hi, ${decoded?.firstName} ${decoded?.lastName}`}
          </h2>
          <button
            className="cursor-pointer"
            onClick={() => setIsUserDrawer(false)}
          >
            <i className="fa-solid fa-x"></i>
          </button>
        </div>

        {!token ? (
          <>
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
                {spinner ? (
                  <Spin
                    indicator={<LoadingOutlined spin={spinner} />}
                    size="large"
                  />
                ) : (
                  "Log In"
                )}
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
          </>
        ) : (
          <>
            {/* Menu List */}
            <div className="flex flex-col mt-3">
              <button className="text-base py-3 border-b text-left text-gray-600 hover:text-black transition duration-300 cursor-pointer">
                Account Details
              </button>

              <button className="text-base py-3 border-b text-left text-gray-600 hover:text-black transition duration-300 cursor-pointer">
                Addresses
              </button>

              <button
                onClick={() => {
                  setIsUserDrawer(false);
                  navigate("/account/verify-email");
                }}
                className="text-base py-3 border-b text-left text-gray-600 hover:text-black transition duration-300 cursor-pointer"
              >
                Reset Your Password
              </button>

              <button
                onClick={() => {
                  setIsUserDrawer(false);
                  localStorage.removeItem(import.meta.env.VITE_WINE_TOKEN);

                  dispatch(get_all_carts());

                  // GENERATE NEW GUEST ID
                  localStorage.setItem("guestId", crypto.randomUUID());

                  navigate("/");
                }}
                className="text-base py-3 text-left text-gray-600 hover:text-black transition duration-300 cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserLoginDrawer;
