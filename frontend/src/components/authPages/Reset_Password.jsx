import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Reset_Password = () => {
  const [passwords, setPasswords] = useState({});
  const [errorMsg, setErrorMsg] = useState({});
  const { email } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      if (!value.trim()) {
        errorMsg[name] = "Password is required!";
      } else if (value.length < 6) {
        errorMsg[name] = "Password must be atleast 6 digit!";
      } else {
        errorMsg[name] = "";
      }
    }
    if (name === "confirmPassword") {
      if (!value.trim()) {
        errorMsg[name] = "Confirm Password is required!";
      } else if (value !== passwords.password) {
        errorMsg[name] = "Confirm Password does't matched with Password!";
      } else {
        errorMsg[name] = "";
      }
    }

    setErrorMsg({ ...errorMsg });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = {};

    if (passwords.password === "" || passwords.password === undefined) {
      error.password = "Password is required!";
    } else if (passwords.password.length < 6) {
      error.password = "Password must be atleast 6 digit!";
    }

    if (
      passwords.confirmPassword === "" ||
      passwords.confirmPassword === undefined
    ) {
      error.confirmPassword = "Confirm Password is required!";
    } else if (passwords.confirmPassword !== passwords.password) {
      error.confirmPassword = "Confirm Password does't matched with Password!";
    }
    setErrorMsg({ ...error });

    if (Object.keys(error).length !== 0) return;
    console.log(passwords, "passwords");
    setPasswords({});
  };

  return (
    <>
      <div className="w-[96%] md:w-[550px] mx-auto flex flex-col justify-center items-center py-30">
        <h2 className="text-lg md:text-xl xl:text-2xl tracking-wide font-medium text-black">
          RESET ACCOUNT PASSWORD
        </h2>

        <p className="text-center text-sm md:text-base xl:text-xl mt-3">
          Enter a new password for <br />
          <span className="">{email}</span>
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="w-full mt-20 space-y-6">
          {/* Password */}
          <div>
            <label className="text-base text-black">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={passwords.password || ""}
              placeholder="Password"
              className="w-full border-b border-gray-300 mt-3 py-2 outline-none focus:border-black transition"
            />
            <p className="text-red-500 text-sm">{errorMsg.password}</p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-base text-black">Confirm Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword || ""}
              placeholder="Confirm password"
              className="w-full border-b border-gray-300 mt-3 py-2 outline-none focus:border-black transition"
            />
            <p className="text-red-500 text-sm">{errorMsg.confirmPassword}</p>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-4 border border-black py-3 rounded-full text-black hover:bg-black hover:text-white transition duration-500 font-semibold cursor-pointer"
          >
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
};

export default Reset_Password;
