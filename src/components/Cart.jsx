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
  console.log(products,'products')

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
        <div className=" relative min-h-72">
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
            <div className="pb-32">
              {/* Header */}
              <h1 className="text-center text-2xl md:text-3xl xl:text-4xl font-semibold tracking-wide pb-6">
                YOUR CART
              </h1>
              <p className="text-sm md:text-lg">
                Free shipping for all orders over $85.00!
              </p>
              <div className="flex flex-col items-center gap-3 mt-10">
                <h3 className="text-lg md:text-xl xl:text-2xl">Your cart is empty</h3>
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
                  {/* CART LEFT SECTION */}
                  <div className="lg:col-span-2">
                    {/* Table Header */}
                    <div className="w-full grid grid-cols-4 font-semibold text-gray-600 border-b pb-3">
                      <p className="col-span-2">Product</p>
                      <p className="text-center">Price</p>
                      <p className="text-center">Quantity</p>
                    </div>

                    {/* Cart items */}
                    {carts?.map((cart) => (
                      <div
                        key={cart.id}
                        className="grid grid-cols-4 items-center py-6 border-b"
                      >
                        {/* Product */}
                        <div className="col-span-2 flex items-center gap-4">
                          <img
                            src={cart.productImage}
                            alt={cart.title}
                            className="w-20 h-28 object-contain"
                          />
                          <p className="font-medium">{cart.title}</p>
                        </div>

                        {/* Price */}
                        <p className="text-center font-medium">
                          ${cart.price?.toFixed(2)}
                        </p>

                        {/* Quantity */}
                        <div className="flex items-center justify-center gap-5">
                          <button
                            onClick={() => dispatch(decreaseQty(cart.id))}
                            className="h-10 w-10 border rounded-full flex items-center justify-center"
                          >
                            –
                          </button>

                          <span className="font-medium">{cart.quantity}</span>

                          <button
                            onClick={() => dispatch(increaseQty(cart.id))}
                            className="h-10 w-10 border rounded-full flex items-center justify-center"
                          >
                            +
                          </button>

                          <button
                            onClick={() => dispatch(removeFromCart(cart.id))}
                            className="ml-4 text-xl"
                          >
                            ❌
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Comments */}
                    <div className="mt-6">
                      <p className="font-medium mb-2">Additional Comments</p>
                      <textarea
                        placeholder="Special instruction for seller..."
                        className="w-full h-28 border rounded-md px-4 py-3 outline-none"
                      ></textarea>
                    </div>

                    <p className="flex items-center gap-2 mt-4 text-sm text-gray-600">
                      <i className="fa-solid fa-shield"></i>
                      Secure shopping guarantee
                    </p>
                  </div>

                  {/* ORDER SUMMARY */}
                  <div className="bg-[#f7f7f7] p-6 rounded-lg h-fit">
                    <h2 className="text-lg font-semibold mb-5">
                      ORDER SUMMARY
                    </h2>

                    {/* Subtotal */}
                    <div className="flex justify-between py-4 border-b">
                      <p className="font-medium">Subtotal</p>
                      <p className="font-semibold">${subtotal?.toFixed(2)}</p>
                    </div>

                    {/* Shipping Estimate */}
                    <div className="mt-5">
                      <p className="mb-2 font-medium">Get shipping estimate:</p>

                      <select className="w-full border rounded px-3 py-2">
                        <option>United States</option>
                        <option>Canada</option>
                        <option>India</option>
                      </select>

                      <div className="flex gap-3 mt-3">
                        <select className="w-1/2 border rounded px-3 py-2">
                          <option>Alabama</option>
                        </select>

                        <input
                          className="w-1/2 border rounded px-3 py-2"
                          placeholder="Postal code"
                        />
                      </div>

                      <button className="w-full mt-4 bg-[#E6C885] py-3 rounded-full">
                        CALCULATE SHIPPING
                      </button>
                    </div>

                    {/* Coupon */}
                    <div className="mt-6">
                      <p className="font-medium">Coupon code</p>
                      <input
                        placeholder="Enter coupon code"
                        className="w-full border mt-2 px-4 py-2 rounded"
                      />
                    </div>

                    {/* Total */}
                    <div className="flex justify-between mt-6 text-lg font-semibold border-t pt-4">
                      <p>TOTAL:</p>
                      <p>${subtotal?.toFixed(2)}</p>
                    </div>

                    <p className="text-sm text-gray-600 mt-1">
                      Tax included and shipping calculated at checkout
                    </p>

                    {/* Buttons */}
                    <button className="w-full mt-6 bg-[#E6C885] py-3 rounded-full font-semibold">
                      PROCEED TO CHECKOUT
                    </button>

                    <button className="w-full mt-3 border py-3 rounded-full font-semibold">
                      CONTINUE SHOPPING
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>

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
