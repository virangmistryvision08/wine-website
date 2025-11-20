import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../redux/reducers/productReducer";
import Title from "./Title";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Product from "./Product";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
} from "@mui/material";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state);
  const carts = products.cart;
  const [showPagination, setShowPagination] = useState(true);

  const subtotal = products.cart?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleSwiperInit = (swiper) => {
    const slidesPerView = swiper.params.slidesPerView;
    if (swiper.slides.length <= slidesPerView) {
      setShowPagination(false);
    } else {
      setShowPagination(true);
    }
  };

  // Get Random Three Products
  const allProducts = products.allProducts;

  const getRandomThree = (arr) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };
  const productDetails = getRandomThree(allProducts);

  return (
    <>
      <section className="w-[96%] mx-auto">
        <div className=" relative h-40 xl:h-72">
          <div className="flex items-center gap-2 absolute bottom-5">
            <span
              onClick={() => navigate("/")}
              className="text-base font-semibold cursor-pointer hover:text-[#EED291]"
            >
              Home
            </span>
            <i class="fa-solid fa-angle-right"></i>
            <span className="text-base font-semibold">Your Cart</span>
          </div>
        </div>

        {products.cart.length === 0 ? (
          <>
            <div className="pb-32 font-[Urbanist]">
              {/* Header */}
              <h1 className="text-center text-2xl md:text-3xl xl:text-4xl font-semibold tracking-wide pb-6">
                YOUR CART
              </h1>
              <p className="text-sm md:text-lg font-semibold">
                Free shipping for all orders over $85.00!
              </p>
              <div className="flex flex-col items-center gap-3 mt-10">
                <h3 className="text-lg md:text-xl xl:text-2xl">
                  Your cart is empty
                </h3>
                <button
                  onClick={() => navigate("/shop")}
                  className="px-12 py-4 rounded-full bg-[#EED291] hover:bg-black hover:text-white transition duration-400 cursor-pointer w-fit text-sm xl:text-base font-semibold uppercase"
                >
                  Continue shopping
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-full mx-auto pb-10 font-[Urbanist]">
              {/* Header */}
              <h1 className="text-center text-2xl md:text-3xl xl:text-4xl font-semibold tracking-wide pb-6">
                YOUR CART
              </h1>
              {/* Free shipping bar */}
              <div className="mx-auto">
                <div className="w-full h-2 bg-gradient-to-r from-green-200 to-green-300 rounded-full"></div>

                {/* Alert */}
                <div className="bg-[#E6C885] w-full py-3 px-4 mt-6 rounded flex items-center justify-center gap-2">
                  <i className="fa-solid fa-circle-info"></i>
                  <p className="text-sm">
                    Please, hurry! Someone has placed an order on one of the
                    items you have in the cart. We'll keep it for you for{" "}
                    <b>40:00</b> minutes.
                  </p>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 mt-10">
                  {/* CART LEFT SECTION */}
                  <div className="lg:col-span-2">
                    {/* Table Header */}
                    <div className="w-full max-w-[1100px] px-0 py-10 font-[Urbanist]">
                      {/* ---------- MUI TABLE ----------- */}
                      <TableContainer component={Paper} elevation={0}>
                        <Table className="!font-[Urbanist]">
                          {/* TABLE HEADER */}
                          <TableHead>
                            <TableRow className="bg-gray-100">
                              <TableCell></TableCell>
                              <TableCell
                                align="start"
                                className="!font-bold w-[50%] !ps-0 !font-[Urbanist]"
                              >
                                Product
                              </TableCell>
                              <TableCell
                                align="start"
                                className="!font-bold !font-[Urbanist]"
                              >
                                Price
                              </TableCell>
                              <TableCell className="!font-bold !font-[Urbanist]">
                                Quantity
                              </TableCell>
                              <TableCell className="!font-bold !font-[Urbanist]">
                                Total
                              </TableCell>
                            </TableRow>
                          </TableHead>

                          {/* TABLE BODY */}
                          {carts.map((cart) => {
                            return (
                              <>
                                <TableBody key={cart.id}>
                                  {/* SINGLE PRODUCT ROW */}
                                  <TableRow className="align-top">
                                    {/* Remove Button */}
                                    <TableCell size="small" className="">
                                      <i
                                        onClick={() =>
                                          dispatch(removeFromCart(cart.id))
                                        }
                                        className="fa-solid fa-xmark text-black text-[18px] cursor-pointer !flex !justify-center !items-center !h-8 !w-8 !border-2 !border-black !rounded-full hover:!bg-gray-200"
                                      ></i>
                                    </TableCell>
                                    {/* IMAGE + TITLE */}
                                    <TableCell className="!ps-0 !font-[Urbanist]">
                                      <div className="pe-7 flex items-center gap-5">
                                        {/* Product Image */}
                                        <img
                                          onClick={() => {
                                            navigate(`/products/${cart.id}`);
                                          }}
                                          src={cart.productImage}
                                          alt="wine"
                                          className="!w-28 !h-28 object-contain border border-gray-300 p-2 flex-shrink-0 cursor-pointer"
                                        />

                                        {/* Title */}
                                        <div
                                          onClick={() => {
                                            navigate(`/products/${cart.id}`);
                                          }}
                                         className="font-bold whitespace-nowrap cursor-pointer hover:underline">
                                          {cart.title}
                                        </div>
                                      </div>
                                    </TableCell>

                                    {/* PRICE */}
                                    <TableCell className="!text-[15px] text-start !font-bold !font-[Urbanist] whitespace-nowrap">
                                      $ {cart.price.toFixed(2)}
                                    </TableCell>

                                    {/* QUANTITY BOX */}
                                    <TableCell>
                                      <div className="flex items-center w-fit border border-[#EED291] rounded-full px-6 py-[6px] gap-8 text-[16px] !font-bold !font-[Urbanist]">
                                        <button
                                          className="cursor-pointer"
                                          onClick={() =>
                                            dispatch(decreaseQty(cart.id))
                                          }
                                        >
                                          –
                                        </button>
                                        <span>{cart.quantity}</span>
                                        <button
                                          className="cursor-pointer"
                                          onClick={() =>
                                            dispatch(increaseQty(cart.id))
                                          }
                                        >
                                          +
                                        </button>
                                      </div>
                                    </TableCell>

                                    {/* TOTAL */}
                                    <TableCell className="!text-[15px] !font-bold !font-[Urbanist] whitespace-nowrap">
                                      ${" "}
                                      {(cart.price * cart.quantity).toFixed(2)}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </>
                            );
                          })}
                        </Table>
                      </TableContainer>

                      {/* ---------- GIFT WRAP ROW ---------- */}
                      <div className="flex items-center gap-3 text-[14px] my-8">
                        <i className="fa-solid fa-gift text-[18px]"></i>
                        <span className="text-gray-700">
                          DO YOU WANT A GIFT WRAP? ONLY FOR $10.00
                        </span>
                        <button className="font-semibold underline text-black hover:text-gray-700">
                          ADD
                        </button>
                      </div>

                      {/* ---------- ADDITIONAL COMMENTS ---------- */}
                      <p className="font-medium mb-3">Additional Comments</p>
                      <textarea
                        placeholder="Special Instruction For Seller...."
                        className="w-full xl:w-[75%] min-h-[170px] border border-gray-300 rounded-3xl py-4 px-6 outline-none placeholder:text-gray-700 text-gray-500 text-[15px]"
                      ></textarea>

                      {/* ---------- SECURITY GUARANTEE ---------- */}
                      <div className="flex items-center gap-3 mt-4 text-[14px]">
                        <i className="fa-solid fa-shield-halved text-[18px]"></i>
                        <span>Secure Shopping Guarantee</span>
                      </div>
                    </div>
                  </div>

                  {/* ORDER SUMMARY */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-5 bg-[#f7f7f7] p-6 rounded-lg h-fit">
                    <div>
                      <h2 className="text-lg font-semibold mb-5">
                        ORDER SUMMARY
                      </h2>

                      {/* Subtotal */}
                      <div className="flex justify-between py-4 border-b border-gray-300">
                        <p className="font-medium">Subtotal</p>
                        <p className="font-semibold">${subtotal?.toFixed(2)}</p>
                      </div>

                      {/* Shipping Estimate */}
                      <div className="mt-5">
                        <p className="mb-2 font-medium">
                          Get shipping estimate:
                        </p>

                        <select className="w-full border border-gray-300 rounded-full px-3 py-3">
                          <option>United States</option>
                          <option>Canada</option>
                          <option>India</option>
                        </select>

                        <div className="flex gap-3 mt-3">
                          <select className="w-1/2 border border-gray-300 rounded-full px-3 py-3">
                            <option>Alabama</option>
                          </select>

                          <input
                            className="w-1/2 border border-gray-300 rounded-full px-3 py-3"
                            placeholder="Postal code"
                          />
                        </div>

                        <button className="w-full mt-4 bg-[#EED291] hover:bg-black hover:text-white transition duration-300 cursor-pointer py-3 rounded-full">
                          CALCULATE SHIPPING
                        </button>
                      </div>

                      {/* Coupon */}
                      <div className="mt-6 border-b border-gray-300 pb-6 mb-6">
                        <p className="font-medium">Coupon code</p>
                        <input
                          placeholder="Enter coupon code"
                          className="w-full border border-gray-300 rounded-full mt-2 px-4 py-3"
                        />
                      </div>

                      {/* Total */}
                      <div className="justify-between text-lg font-semibold hidden md:flex">
                        <p>TOTAL:</p>
                        <p>${subtotal?.toFixed(2)}</p>
                      </div>

                      <p className="text-sm text-gray-600 mt-1">
                        Tax included and shipping calculated at checkout
                      </p>
                    </div>

                    {/* Buttons */}
                    <div>
                      <button className="w-full mt-6 bg-[#EED291] hover:bg-black hover:text-white transition duration-300 cursor-pointer py-3 rounded-full font-semibold hidden md:block">
                        PROCEED TO CHECKOUT
                      </button>

                      <button className="w-full mt-0 md:mt-3 bg-[#EED291] hover:bg-black hover:text-white transition duration-300 cursor-pointer py-3 rounded-full font-semibold">
                        CONTINUE SHOPPING
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
      <div className={`w-full z-[300] flex md:hidden flex-col items-center gap-4 fixed bottom-0 bg-white p-2 ${carts.length === 0 && "hidden"}`}>
        <div className="flex justify-between w-full text-base font-semibold">
          <p>TOTAL:</p>
          <p>${subtotal?.toFixed(2)}</p>
        </div>

        <button className="w-full bg-[#E6C885] py-3 rounded-full font-semibold">
          PROCEED TO CHECKOUT
        </button>
      </div>

      <section className="w-full bg-[#F8F8F8] py-5 md:py-10 xl:py-20">
        <div className="w-[90%] xl:w-[80%] mx-auto">
          <Title text="Best Sellers" />

          <Swiper
            className="!pb-10 md:!pb-0"
            modules={[Pagination]}
            spaceBetween={20}
            speed={800}
            pagination={showPagination ? { clickable: true } : false}
            onInit={handleSwiperInit}
            onResize={handleSwiperInit}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {productDetails.map((product, index) => {
              return (
                <SwiperSlide key={index}>
                  <Product
                    key={index}
                    productImage={product.productImage}
                    title={product.title}
                    verity={product.verity}
                    isGold={product.isGold}
                    price={product.price}
                    wineType={product.wineType}
                    id={product.id}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Cart;
