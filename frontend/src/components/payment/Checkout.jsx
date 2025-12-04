import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "/footer/footer-logo.png";
import { useNavigate } from "react-router-dom";
import visa_card from "/checkout/visa-card.svg";
import master_card from "/checkout/master-card.svg";
import amex_card from "/checkout/amex-card.svg";
import { get_all_carts } from "../../redux/reducers/productReducer";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Checkout = () => {
  const navigate = useNavigate();
  const carts = useSelector((state) => state.products.cart);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [data, setData] = React.useState({
    // email: "",
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });
  const [errorMsg, setErrorMsg] = React.useState({});
  const stripe = useStripe();
  const elements = useElements();
  const token = localStorage.getItem(import.meta.env.VITE_WINE_TOKEN);
  const decode = jwtDecode(token);
  const [spinner, setSpinner] = useState(false);

  const countryWithCurrency = [
    { label: "India", currency: "IN" },
    { label: "United States", currency: "US" },
    { label: "Canada", currency: "CA" },
    { label: "Australia", currency: "AU" },
    { label: "United Kingdom", currency: "UK" },
  ];

  const statesByCountry = {
    IN: ["Gujarat", "Maharashtra", "Rajasthan", "Delhi", "Punjab"],
    US: ["California", "Texas", "Florida", "New York"],
    CA: ["Ontario", "Quebec", "British Columbia"],
    AU: ["New South Wales", "Victoria", "Queensland"],
    UK: ["England", "Scotland", "Wales", "Northern Ireland"],
  };

  useEffect(() => {
    dispatch(get_all_carts());
  }, []);

  const validateForm = () => {
    let newErrors = {};

    // if (!data.email) newErrors.email = "Email is required";
    // else if (!/\S+@\S+\.\S+/.test(data.email))
    //   newErrors.email = "Enter a valid email";

    if (!data.country) newErrors.country = "Please select Country!";
    if (!data.firstName) newErrors.firstName = "First name required";
    if (!data.lastName) newErrors.lastName = "Last name required";
    if (!data.address) newErrors.address = "Address is required";

    if (!data.city) newErrors.city = "City is required";
    if (!data.state) newErrors.state = "Please select State!";

    if (!data.zip) newErrors.zip = "ZIP code required";
    else if (!/^\d{5}$/.test(data.zip))
      newErrors.zip = "Enter a valid 5-digit ZIP";

    if (!data.phone) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(data.phone))
      newErrors.phone = "Phone must be 10 digits";

    setErrorMsg(newErrors);

    return Object.keys(newErrors).length === 0; // true if no errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // update data
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    let msg = "";

    switch (name) {
      // case "email":
      //   if (!value.trim()) msg = "Email is required";
      //   else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      //     msg = "Invalid email format";
      //   break;

      case "country":
        if (!value.trim()) msg = "Please select Country!";
        break;

      case "firstName":
        if (!value.trim()) msg = "First name is required";
        break;

      case "lastName":
        if (!value.trim()) msg = "Last name is required";
        break;

      case "address":
        if (!value.trim()) msg = "Address is required";
        break;

      case "city":
        if (!value.trim()) msg = "City is required";
        break;

      case "state":
        if (!value.trim()) msg = "Please select State!";
        break;

      case "zip":
        if (!value.trim()) msg = "ZIP is required";
        else if (!/^\d{5}$/.test(value)) msg = "Enter a valid 5-digit ZIP";
        break;

      case "phone":
        if (!value.trim()) msg = "Phone is required";
        else if (!/^\d{10}$/.test(value)) msg = "Phone must be 10 digits";
        break;
    }

    // update error message
    setErrorMsg((prev) => ({
      ...prev,
      [name]: msg,
    }));
  };

  const subtotal = carts?.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  const handlePaymentSubmit = async () => {
    const isValid = validateForm();
    if (!isValid) return;

    if (!stripe || !elements) {
      toast.error("Stripe has not loaded yet");
      return;
    }

    try {
      setSpinner(true);
      const selectedCurrency =
        countryWithCurrency.find((c) => c.label === data.country)?.currency ||
        "usd";

      // 1) Create PaymentIntent from backend
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/checkout/create-payment-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: decode.id,
            email: decode.email,
            amount: subtotal.toFixed(2),
            currency: selectedCurrency,
            deliveryDetails: data, // sending full user form data
            cartProducts: carts, // Send Carts Products
          }),
        }
      );

      const { clientSecret } = await response.json();

      // 2) Confirm card payment
      const cardElement = elements.getElement(CardNumberElement);

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,

          // Billing details shown in Stripe dashboard
          billing_details: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            phone: data.phone,
            address: {
              line1: data.address,
              city: data.city,
              state: data.state,
              postal_code: data.zip,
              country: data.country,
            },
          },
        },
      });

      if (paymentResult.error) {
        setErrorMsg((prev) => ({
          ...prev,
          stripe: paymentResult.error.message,
        }));

        setSpinner(false);
        navigate("/order-failed");
        return;
      }

      if (paymentResult.paymentIntent.status === "succeeded") {
        setSpinner(false);
        navigate("/order-success");
      }
    } catch (err) {
      setSpinner(false);
      navigate("/order-failed");
      toast.error(err.response ? err.response.data.message : err.message);
    }
  };

  return (
    <>
      {/* Checkout Nav */}
      <nav className="w-full font-[Urbanist]">
        <div className="w-full md:w-[70%] mx-auto lg:w-full xl:w-[60%] flex items-center justify-between px-6 lg:px-10 py-6">
          {/* LOGO + TAGLINE */}
          <div className="flex flex-col items-center text-center">
            <img src={logo} alt="logo" className="w-24 mb-2" />
            <p className="text-sm text-gray-700 font-semibold">
              Pure terroir. Zero compromise.
            </p>
          </div>

          {/* BAG ICON */}
          <div className="text-2xl cursor-pointer">
            <i
              onClick={() => navigate("/cart")}
              className="fa-solid fa-bag-shopping"
            ></i>
          </div>
        </div>
      </nav>

      {/* Mobile (<lg) — accordion */}
      {/*  */}
      <div className=" bg-[#F8F8F8] border-y border-gray-300 font-[Urbanist]">
        <div className="lg:hidden w-[96%] md:w-[70%] mx-auto lg:w-[96%] py-0 transition-all px-6 lg:px-10 duration-700">
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex justify-between items-center py-4 border-b border-gray-300"
          >
            <span className="text-base font-semibold">
              Order summary{" "}
              <i
                className={`fa-solid fa-chevron-${
                  open ? "up" : "down"
                } text-xs`}
              ></i>
            </span>
            <span className="text-lg font-semibold">
              ${subtotal.toFixed(2)}
            </span>
          </button>

          {/* Accordion content */}
          <div
            className={`transition-all duration-700 overflow-hidden ${
              open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-[#F8F8F8] py-4 rounded-lg mt-2">
              {carts.map((cart) => (
                <div
                  className="flex items-start justify-between gap-4 mb-6"
                  key={cart._id}
                >
                  <div className="flex items-center gap-6">
                    <div className="relative bg-white rounded-lg w-16 h-16 flex items-center justify-center">
                      <img
                        src={cart.productId.productImage}
                        alt="product"
                        className="w-14 h-14 object-contain"
                      />
                      {/* Quantity Badge */}
                      <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-semibold h-5 w-5 flex justify-center items-center rounded-full">
                        {cart.quantity}
                      </span>
                    </div>
                    <p className="text-sm font-medium line-clamp-3">
                      {cart.productId.title}
                    </p>
                  </div>
                  <p className="text-sm mt-1">
                    ${cart.productId.price.toFixed(2)}
                  </p>
                </div>
              ))}

              <div className="flex justify-between text-sm text-gray-700 mt-3">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700 mt-2">
                <span>Shipping</span>
                <span>Enter shipping address</span>
              </div>

              <div className="flex justify-between text-lg font-semibold mt-6">
                <span>Total</span>
                <span className="text-black">
                  <span className="text-gray-500 text-xs">USD</span> $
                  {subtotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white flex flex-col lg:flex-row lg:items-start font-[Urbanist]">
        {/* LEFT SIDE */}
        <div className="bg-white w-full mx-auto border-r border-gray-300 lg:sticky lg:top-0">
          <div className="w-full md:w-[70%] mx-auto lg:w-full xl:w-[60%] xl:mr-0 px-6 lg:px-10 py-10">
            {/* Express Checkout */}
            <h2 className="text-center text-gray-600 text-sm mb-4">
              Express checkout
            </h2>

            <div className="grid grid-cols-1 gap-4 mb-6 lg:grid-cols-3">
              {/* SHOP (full width on mobile, 1/3 on lg) */}
              <button className="bg-purple-600 text-white px-8 py-3 rounded-md shadow w-full">
                Shop
              </button>

              {/* PayPal & GPay container for mobile split */}
              <div className="grid grid-cols-2 gap-4 lg:gap-0 lg:grid-cols-1 lg:col-span-1">
                <button className="bg-yellow-400 text-black px-8 py-3 rounded-md shadow w-full">
                  PayPal
                </button>
                <button className="lg:hidden bg-black text-white px-8 py-3 rounded-md shadow w-full">
                  G Pay
                </button>
              </div>

              {/* On lg screens, place GPay here to make 3 equal columns */}
              <button className="hidden lg:block bg-black text-white px-8 py-3 rounded-md shadow w-full">
                G Pay
              </button>
            </div>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-[1px] bg-gray-300"></div>
              <span className="text-sm text-gray-500">OR</span>
              <div className="flex-1 h-[1px] bg-gray-300"></div>
            </div>

            {/* CONTACT SECTION */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Contact</h3>
              <span
                onClick={() => navigate("/account/login")}
                className="underline cursor-pointer text-sm"
              >
                Sign in
              </span>
            </div>
            <div className="border border-gray-300 rounded-md overflow-hidden">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-3 outline-none"
                // value={form.email}
                onChange={handleChange}
              />
            </div>
            {errorMsg.email && (
              <p className="text-red-500 text-sm mt-1">{errorMsg.email}</p>
            )}

            <div className="flex items-center mt-2 gap-2">
              <input className="accent-black" type="checkbox" id="news" />
              <label htmlFor="news" className="text-sm text-gray-700">
                Email me with news and offers
              </label>
            </div>

            {/* DELIVERY SECTION */}
            <h3 className="text-lg font-semibold mt-10 mb-3">Delivery</h3>

            <div className="grid grid-cols-1 mb-4">
              <select
                onChange={handleChange}
                name="country"
                className="border border-gray-300 rounded-md px-3 py-3 text-gray-500"
              >
                <option value="">Select Country</option>
                {countryWithCurrency.map((country, index) => {
                  return (
                    <option value={country.currency}>{country.label}</option>
                  );
                })}
              </select>
              {errorMsg.country && (
                <p className="text-red-500 text-sm mt-1">{errorMsg.country}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  className="border border-gray-300 rounded-md px-3 py-3"
                  // value={form.firstName || ""}
                  onChange={handleChange}
                />
                {errorMsg.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorMsg.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  className="border border-gray-300 rounded-md px-3 py-3"
                  // value={form.lastName}
                  onChange={handleChange}
                />
                {errorMsg.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorMsg.lastName}
                  </p>
                )}
              </div>
            </div>

            <div>
              <input
                type="text"
                placeholder="Address"
                name="address"
                className="border border-gray-300 rounded-md px-3 py-3 mt-4 w-full"
                // value={form.address}
                onChange={handleChange}
              />
              {errorMsg.address && (
                <p className="text-red-500 text-sm">{errorMsg.address}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  className="border border-gray-300 rounded-md px-3 py-3"
                  // value={form.city}
                  onChange={handleChange}
                />
                {errorMsg.city && (
                  <p className="text-red-500 text-sm">{errorMsg.city}</p>
                )}
              </div>
              <div className="flex flex-col mb-4">
                {/* <input
                  type="text"
                  placeholder="State"
                  name="state"
                  className="border border-gray-300 rounded-md px-3 py-3"
                  // value={form.state}
                  onChange={handleChange}
                /> */}
                <select
                  name="state"
                  value={data.state}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-3 text-gray-500"
                  disabled={!data.country} // disable until country selected
                >
                  <option value="">Select State</option>

                  {data.country &&
                    statesByCountry[data.country]?.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                </select>
                {errorMsg.state && (
                  <p className="text-red-500 text-sm">{errorMsg.state}</p>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="ZIP code"
                  name="zip"
                  className="border border-gray-300 rounded-md px-3 py-3"
                  // value={form.zip}
                  onChange={handleChange}
                />
                {errorMsg.zip && (
                  <p className="text-red-500 text-sm">{errorMsg.zip}</p>
                )}
              </div>
            </div>

            <div>
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                className="border border-gray-300 rounded-md px-3 py-3 mt-4 w-full"
                // value={form.phone}
                onChange={handleChange}
              />
              {errorMsg.phone && (
                <p className="text-red-500 text-sm">{errorMsg.phone}</p>
              )}
            </div>

            {/* SHIPPING METHOD */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold mb-3">Shipping method</h3>
              <button className="w-full bg-[#F8F8F8] rounded-md px-4 py-4 text-left text-gray-500">
                Enter your shipping address to view available shipping methods.
              </button>
            </div>

            {/* PAYMENT SECTION */}
            <div className="mt-12">
              <h3 className="text-lg font-semibold mb-3">Payment</h3>

              <p className="text-xs text-gray-500 mb-3">
                All transactions are secure and encrypted.
              </p>

              {/* CREDIT CARD BOX */}
              <div className="border border-gray-300 rounded-md mb-4">
                <div className="flex items-center gap-2 p-4">
                  <input
                    className="accent-black"
                    id="creditCard"
                    type="radio"
                    name="payment"
                    defaultChecked
                  />
                  <label htmlFor="creditCard">Credit card</label>
                  <div className="ml-auto text-sm flex gap-1">
                    <img src={visa_card} alt="visa-card" />
                    <img src={master_card} alt="master-card" />
                    <img src={amex_card} alt="amex-card" />
                  </div>
                </div>

                <div className="bg-[#F4F4F4] p-4">
                  <div className="border border-gray-300 rounded-md px-3 py-3 w-full mb-3">
                    <CardNumberElement />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="border border-gray-300 rounded-md px-3 py-3">
                      <CardExpiryElement />
                    </div>
                    <div className="border border-gray-300 rounded-md px-3 py-3">
                      <CardCvcElement />
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder="Name on card"
                    className="border border-gray-300 rounded-md px-3 py-3 w-full"
                  />

                  <div className="flex items-center mt-3 gap-2">
                    <input
                      id="useShippingAddress"
                      className="accent-black"
                      type="checkbox"
                    />
                    <label
                      htmlFor="useShippingAddress"
                      className="text-sm text-gray-700"
                    >
                      Use shipping address as billing address
                    </label>
                  </div>
                  {errorMsg.stripe && (
                    <p className="text-red-500 text-sm mt-2">
                      {errorMsg.stripe}
                    </p>
                  )}
                </div>
              </div>

              {/* OTHER PAYMENT OPTIONS */}
              <div className="border border-gray-300 rounded-md px-4 py-3 mb-3 flex items-center gap-3">
                <input
                  className="accent-black"
                  id="paypal"
                  type="radio"
                  name="payment"
                />
                <label className="text-xs md:text-base" htmlFor="paypal">
                  PayPal
                </label>
              </div>

              <div className="border border-gray-300 rounded-md px-4 py-3 mb-6 flex items-center gap-3">
                <input
                  className="accent-black"
                  id="shopPay"
                  type="radio"
                  name="payment"
                />
                <label
                  className="flex items-center gap-8 text-xs md:text-base whitespace-nowrap"
                  htmlFor="shopPay"
                >
                  Shop Pay{" "}
                  <li className="text-gray-500">Pay in full or installments</li>
                </label>
              </div>

              {/* REMEMBER ME */}
              <div className=" mb-3 space-y-3">
                <h3 className="text-lg font-semibold">Remember Me</h3>
                <div className="border border-gray-300 rounded-md px-4 py-3 flex items-center gap-3">
                  <input
                    className="accent-black"
                    type="checkbox"
                    id="checkboxRememberMe"
                  />
                  <label
                    htmlFor="checkboxRememberMe"
                    className="text-xs md:text-base"
                  >
                    Save my information for faster checkout
                  </label>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <i className="fa-solid fa-lock text-xs text-gray-500"></i>
                    <span className="text-xs text-gray-500">
                      Secure and encrypted
                    </span>
                  </div>
                  <div className="text-lg font-bold text-gray-500">Shop</div>
                </div>
              </div>

              <div className="lg:hidden lg:min-h-screen w-full">
                <div className="w-full xl:w-[60%] py-7">
                  <h3 className="text-lg font-semibold mb-3">Order summary</h3>
                  {carts.map((cart) => {
                    return (
                      <>
                        <div
                          className="flex items-start justify-between gap-4 mb-6"
                          key={cart._id}
                        >
                          <div className="flex items-center gap-6">
                            <div className="relative bg-white border border-gray-300 rounded-lg w-16 h-16 flex items-center justify-center">
                              <img
                                src={cart.productId.productImage}
                                alt="product"
                                className="w-14 h-14 object-contain"
                              />
                              {/* Quantity Badge */}
                              <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-semibold h-5 w-5 flex justify-center items-center rounded-full">
                                {cart.quantity}
                              </span>
                            </div>
                            <p className="text-sm font-medium line-clamp-3">
                              {cart.productId.title}
                            </p>
                          </div>
                          <p className="text-sm font-semibold mt-1">
                            ${cart.productId.price.toFixed(2)}
                          </p>
                        </div>
                      </>
                    );
                  })}

                  <div className="flex justify-between text-sm text-gray-700 mt-3">
                    <span>Subtotal</span>
                    <span className="text-black font-semibold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-700 mt-2">
                    <span>Shipping</span>
                    <span>Enter shipping address</span>
                  </div>

                  {/* <hr className="my-6" /> */}

                  <div className="flex justify-between text-xl font-semibold mt-4">
                    <span>Total</span>
                    <span className="text-black">
                      <span className="text-gray-500 text-xs">USD</span> $
                      {subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* PAY NOW BUTTON */}
              <button
                onClick={handlePaymentSubmit}
                className="w-full bg-black text-white py-4 rounded-md text-lg font-semibold mt-0 mb-5 cursor-pointer"
              >
                {spinner ? (
                  <Spin
                    indicator={<LoadingOutlined spin={spinner} />}
                    size="default"
                  />
                ) : (
                  "Pay now"
                )}
              </button>

              <hr className="my-6 border border-gray-200" />

              <div className="flex flex-wrap items-center gap-3 text-sm underline text-black mt-6">
                <a className=" cursor-pointer">Refund policy</a>
                <a className=" cursor-pointer">Privacy policy</a>
                <a className=" cursor-pointer">Terms of service</a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE ORDER SUMMARY */}
        <div className="hidden lg:block bg-[#F8F8F8] lg:min-h-screen w-full lg:sticky lg:top-0">
          <div className="w-full xl:w-[60%] px-6 lg:px-10 py-10">
            {carts.map((cart) => {
              return (
                <>
                  <div
                    className="flex items-center justify-between gap-4 mb-6"
                    key={cart._id}
                  >
                    <div className="flex items-center gap-6">
                      <div className="relative bg-white rounded-lg w-16 h-16 flex items-center justify-center">
                        <img
                          src={cart.productId.productImage}
                          alt="product"
                          className="w-14 h-14 object-contain"
                        />
                        {/* Quantity Badge */}
                        <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-semibold h-5 w-5 flex justify-center items-center rounded-full">
                          {cart.quantity}
                        </span>
                      </div>
                      <p className="text-sm font-medium line-clamp-3">
                        {cart.productId.title}
                      </p>
                    </div>
                    <p className="text-sm">
                      ${cart.productId.price.toFixed(2)}
                    </p>
                  </div>
                </>
              );
            })}

            <div className="flex justify-between text-sm text-gray-700 mt-3">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700 mt-3">
              <span>Shipping</span>
              <span>Enter shipping address</span>
            </div>

            <div className="flex justify-between text-lg font-semibold mt-5">
              <span>Total</span>
              <span className="text-black">
                <span className="text-gray-500 text-xs">USD</span> $
                {subtotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
