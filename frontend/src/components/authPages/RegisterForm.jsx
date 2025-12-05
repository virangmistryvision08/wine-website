import axios from "axios";
import React, { useState } from "react";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import { get_all_carts } from "../../redux/reducers/productReducer";
import { useDispatch } from "react-redux";

const RegisterForm = ({ emailMarketing }) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState({});
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // update data
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validation message
    let msg = "";

    // firstName validation
    if (name === "firstName") {
      if (value.trim() === "") {
        msg = "First name is required!";
      }
    }

    // lastName validation
    if (name === "lastName") {
      if (value.trim() === "") {
        msg = "Last name is required!";
      }
    }

    // Email validation
    if (name === "email") {
      if (value.trim() === "") {
        msg = "Email address is required!";
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

    let errors = {};

    if (!data.firstName.trim()) errors.firstName = "First name is required!";
    if (!data.lastName.trim()) errors.lastName = "Last name is required!";

    if (!data.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Enter a valid email!";
    }

    if (!data.password.trim()) {
      errors.password = "Password is required!";
    } else if (data.password.length < 6) {
      errors.password = "Password must be 6+ characters!";
    }

    setErrorMsg(errors);
    if (Object.keys(errors).length !== 0) return;
    setSpinner(true);
    const guestId = localStorage.getItem("guestId");

    // Register API
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, {
        ...data,
        guestId: guestId || null,
      })
      .then((res) => {
        localStorage.setItem(import.meta.env.VITE_WINE_TOKEN, res.data.token);

        // Remove guestId because backend merges it
        if (guestId) localStorage.removeItem("guestId");

        navigate("/");
        toast.success(res.data.message);
        setSpinner(false);

        // Fetch updated user cart
        dispatch(get_all_carts());
      })
      .catch((error) => {
        setSpinner(false);
        toast.error(
          error.response ? error.response.data.message : error.message
        );
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        {/* First Name */}
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            // value={data.firstName || ""}
            onChange={handleChange}
            className={`w-full border-b py-3 px-1 outline-none ${
              errorMsg.firstName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errorMsg.firstName && (
            <p className="text-red-500 text-sm mt-1">{errorMsg.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            // value={data.lastName || ""}
            onChange={handleChange}
            className={`w-full border-b py-3 px-1 outline-none ${
              errorMsg.lastName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errorMsg.lastName && (
            <p className="text-red-500 text-sm mt-1">{errorMsg.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="text"
            name="email"
            placeholder="Your email address"
            // value={data.email || ""}
            onChange={handleChange}
            className={`w-full border-b py-3 px-1 outline-none ${
              errorMsg.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errorMsg.email && (
            <p className="text-red-500 text-sm mt-1">{errorMsg.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            name="password"
            placeholder="Your password"
            // value={data.password || ""}
            onChange={handleChange}
            className={`w-full border-b py-3 px-1 outline-none ${
              errorMsg.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errorMsg.password && (
            <p className="text-red-500 text-sm mt-1">{errorMsg.password}</p>
          )}
        </div>

        {/* Checkbox */}
        {emailMarketing && (
          <>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="subscribe" />
              <span className="text-gray-700">
                Subscribe To Email Marketing
              </span>
            </label>
          </>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full xl:min-w-[500px] xl:w-fit border border-[#EED291] bg-[#EED291] hover:bg-white text-black rounded-full py-3 text-base mt-0 hover:opacity-90 transition duration-300 font-[600] cursor-pointer"
          >
            {spinner ? (
              <Spin
                indicator={<LoadingOutlined spin={spinner} />}
                size="large"
              />
            ) : (
              "CREATE AN ACCOUNT"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
