import React, { useState } from "react";
import contact_us_bg from "/contactUs/contact-us-bg.jpg";
import home from "/contactUs/Home.svg";
import mail from "/contactUs/Mail.svg";
import phone from "/contactUs/Phone.svg";
import clock from "/contactUs/clock.svg";
import CommonFirstSection from "./CommonFirstSection";

const ContactUs = () => {
  const [data, setData] = useState({});
  let [errorMsg, setErrorMsg] = useState({});

  const getData = (e) => {
    const { name, value } = e.target;

    // Phone Validation
    if (name === "phone") {
      const onlyNumbers = value.replace(/[^0-9]/g, "");

      setData({ ...data, phone: onlyNumbers });

      if (onlyNumbers.length === 0) {
        setErrorMsg({ ...errorMsg, phone: "Phone is required!" });
      } else if (onlyNumbers.length !== 10) {
        setErrorMsg({ ...errorMsg, phone: "Phone must be 10 digits!" });
      } else {
        setErrorMsg({ ...errorMsg, phone: "" });
      }

      return;
    }

    // Email Validation
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrorMsg({
        ...errorMsg,
        email: emailRegex.test(value) ? "" : "Invalid email format!",
      });
    }

    // Other Field Validation
    if (value.trim() === "") {
      setErrorMsg({
        ...errorMsg,
        [name]: `${name[0].toUpperCase() + name.slice(1)} is required!`,
      });
    } else {
      setErrorMsg({ ...errorMsg, [name]: "" });
    }

    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!data.name || data.name.trim() === "") {
      newErrors.name = "Name is required!";
    }

    if (!data.email || data.email.trim() === "") {
      newErrors.email = "Email is required!";
    }

    if (!data.phone || data.phone.trim() === "") {
      newErrors.phone = "Phone is required!";
    } else if (data.phone.length !== 10) {
      newErrors.phone = "Phone number must be 10 digits!";
    }

    if (!data.subject || data.subject.trim() === "") {
      newErrors.subject = "Subject is required!";
    }

    if (!data.comment || data.comment.trim() === "") {
      newErrors.comment = "Comment is required!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrorMsg(newErrors);
      return;
    }

    console.log("Form Submitted Successfully:", data);
  };

  return (
    <>
      <CommonFirstSection
        productImage={contact_us_bg}
        productType="Contact Us"
      />

      <div className="w-[96%] 2xl:w-[80%] mx-auto py-16 font-[Urbanist]">
        <div className="flex flex-col xl:flex-row gap-16">
          {/* LEFT FORM SECTION */}
          <div className="w-full xl:w-2/4">
            <h2 className="text-3xl font-semibold mb-10 font-[Cormorant-Upright-bold] uppercase">
              SEND US A MESSAGE
            </h2>

            <form
              onSubmit={handleSubmit}
              className="bg-white p-3 lg:p-8"
              style={{ boxShadow: "-0px -0px 4px 4px #f5f2f2" }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block mb-2 font-medium">Name</label>
                  <input
                    onChange={getData}
                    name="name"
                    type="text"
                    placeholder="Enter Your Name"
                    className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black"
                  />
                  <p className="text-red-500">{errorMsg.name}</p>
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-2 font-medium">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    onChange={getData}
                    name="email"
                    type="email"
                    placeholder="Enter Your Email"
                    className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black"
                  />
                  <p className="text-red-500">{errorMsg.email}</p>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block mb-2 font-medium">Phone Number</label>
                  <input
                    onChange={getData}
                    name="phone"
                    type="number"
                    placeholder="Enter Your Phone Number"
                    className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black"
                    inputMode="numeric"
                    maxLength={10}
                  />
                  <p className="text-red-500">{errorMsg.phone}</p>
                </div>

                {/* Subject */}
                <div>
                  <label className="block mb-2 font-medium">Subject</label>
                  <input
                    onChange={getData}
                    name="subject"
                    type="text"
                    placeholder="Enter Your Subject"
                    className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black"
                  />
                  <p className="text-red-500">{errorMsg.subject}</p>
                </div>
              </div>

              {/* Comment */}
              <div className="mt-6">
                <label className="block mb-2 font-medium">
                  Comment <span className="text-red-500">*</span>
                </label>
                <textarea
                  onChange={getData}
                  name="comment"
                  rows="4"
                  placeholder="Enter Your Message"
                  className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black"
                ></textarea>
                <p className="text-red-500">{errorMsg.comment}</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-8 w-full bg-[#EED291] py-3 text-lg font-semibold rounded-full hover:bg-white border border-[#EED291] transition duration-300 cursor-pointer"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>

          {/* RIGHT CONTACT INFO SECTION */}
          <div className="w-full xl:w-1/2">
            <h2 className="text-3xl font-semibold mb-10 font-[Cormorant-Upright-bold]">
              GET IN TOUCH
            </h2>

            <div className="space-y-8 text-gray-700">
              {/* Address */}
              <div className="flex items-start gap-4">
                {/* <i className="fa-solid fa-house text-xl"></i> */}
                <img src={home} alt="Home" />
                <div>
                  <p className="font-semibold">Address</p>
                  <p>
                    Elite Wine Selections Inc. 40 Corbin Ave Ste B Bay Shore, NY
                    11706-1048 USA
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                {/* <i className="fa-regular fa-clock text-xl"></i> */}
                <img src={clock} alt="Clock" />
                <div>
                  <p className="font-semibold">Hours</p>
                  <p>6 Days a week</p>
                  <p>10:00 am to 6:00 pm EST</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                {/* <i className="fa-solid fa-phone text-xl"></i> */}
                <img src={phone} alt="Phone" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p>+1 (631)-464-1334</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                {/* <i className="fa-regular fa-envelope text-xl"></i> */}
                <img src={mail} alt="Mail" />
                <div>
                  <p className="font-semibold">E-mail</p>
                  <p className="wrap-anywhere">
                    sebastian.huelck@elitewineselections.com
                  </p>
                </div>
              </div>

              {/* Social */}
              <div className="pt-6">
                <p className="font-semibold mb-3">Follow Our Social Media</p>
                <div className="flex items-center gap-5 text-xl">
                  <i className="fa-brands fa-facebook"></i>
                  <i className="fa-brands fa-twitter"></i>
                  <i className="fa-brands fa-youtube"></i>
                  <i className="fa-brands fa-instagram"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[96%] 2xl:w-[90%] pb-10 lg:pb-20 mx-auto">
        <iframe
          className="rounded-2xl h-52 md:h-80 lg:h-96 w-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d378.2265895210637!2d72.84249545774274!3d21.196808276046106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04ef22a0178b1%3A0x2f02ec2c91fcd100!2sVision%20Infotech!5e0!3m2!1sen!2sin!4v1761055425289!5m2!1sen!2sin"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
};

export default ContactUs;
