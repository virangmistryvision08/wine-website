import React, { useEffect, useState } from "react";
import CommonFirstSection from "./CommonFirstSection";
import bg_image from "/products/product-details-bg.jpg";
import productImage from "/products/product1.png";
import alcohol from "/productDetails/alcohol.svg";
import sugar from "/productDetails/sugar.svg";
import grapes from "/productDetails/grapes.svg";
import acidity from "/productDetails/acidity.svg";
import barrel from "/productDetails/barrel.svg";
import payment_card from "/productDetails/payment-card.svg";
import wine_bottles from "/shipping/shipping-wine-bottles.svg";
import toy_truck from "/shipping/shipping-toy-truck.svg";
import product1 from "/products/product1.png";
import product2 from "/products/product2.png";
import product3 from "/products/product2.png";
import Product from "./Product";
import Title from "./Title";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addToCart,
  decreaseQty,
  increaseQty,
} from "../redux/reducers/productReducer";

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [showModal, setShowModal] = useState(false);
  const [showPagination, setShowPagination] = useState(true);
  const { id } = useParams();
  const { products } = useSelector((state) => state);
  const [quantityState, setQuantityState] = useState(1);
  const dispatch = useDispatch();
  const product = products.allProducts.find((product) => product.id === +id);

  const cartItem = useSelector((state) =>
    state.products.cart.find((c) => c.id === +id)
  );

  const quantity = cartItem?.quantity || quantityState;

  useEffect(() => {
    setQuantityState(1);
  }, [id]);

  console.log(cartItem, "product");

  const handleSwiperInit = (swiper) => {
    const slidesPerView = swiper.params.slidesPerView;
    if (swiper.slides.length <= slidesPerView) {
      setShowPagination(false);
    } else {
      setShowPagination(true);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && showModal) {
        setShowModal(false);
        setActiveTab((prev) => prev);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showModal]);

  const tabs = [
    {
      id: "description",
      label: "Description",
      content: (
        <div>
          <p className="md:text-base">
            Sensorik this merlot presents a deep, appealing color that is nearly
            indistinguishable from a conventional red wine. The nose reveals a
            spicy-fruity bouquet with notes of dried berries and a hint of red
            pepper. On the palate, It is juicy with cherry-like flavors,
            supported by vibrant acidity. The body remains lean and completely
            free of tannins. The finish is smooth and well-rounded. Also
            enjoyable lightly chilled in summer – a fitting companion to salads,
            picnics, or mild cheeses.
          </p>
        </div>
      ),
    },
    {
      id: "shipping-return",
      label: "Shipping & Return",
      content: (
        <div className="space-y-3">
          <h2 className="text-2xl text-black font-[Cormorant-Upright-bold]">
            Returns Policy
          </h2>
          <p className="md:text-base">
            You may return most new, unopened items within 30 days of delivery
            for a full refund. We'll also pay the return shipping costs if the
            return is a result of our error (you received an incorrect or
            defective item, etc.).
          </p>
          <p className="md:text-base">
            You should expect to receive your refund within four weeks of giving
            your package to the return shipper, however, in many cases you will
            receive a refund more quickly. This time period includes the transit
            time for us to receive your return from the shipper (5 to 10
            business days), the time it takes us to process your return once we
            receive it (3 to 5 business days), and the time it takes your bank
            to process our refund request (5 to 10 business days).
          </p>
          <p className="md:text-base">
            If you need to return an item, simply login to your account, view
            the order using the "Complete Orders" link under the My Account menu
            and click the Return Item(s) button. We'll notify you via e-mail of
            your refund once we've received and processed the returned item.
          </p>

          <h2 className="text-2xl text-black font-[Cormorant-Upright-bold] mt-4">
            Shipping
          </h2>
          <p className="md:text-base">
            We can ship to virtually any address in the world. Note that there
            are restrictions on some products, and some products cannot be
            shipped to international destinations.
          </p>
          <p className="md:text-base">
            When you place an order, we will estimate shipping and delivery
            dates for you based on the availability of your items and the
            shipping options you choose. Depending on the shipping provider you
            choose, shipping date estimates may appear on the shipping quotes
            page.
          </p>
          <p className="md:text-base">
            Please also note that the shipping rates for many items we sell are
            weight-based. The weight of any such item can be found on its detail
            page. To reflect the policies of the shipping companies we use, all
            weights will be rounded up to the next full pound.
          </p>
        </div>
      ),
    },
  ];

  // Get Random Three Products
  const allProducts = products.allProducts;

  const getRandomThree = (arr) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };
  const productDetails = getRandomThree(allProducts);

  const openModal = (tab) => {
    setActiveTab(tab.id);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);
  return (
    <>
      <CommonFirstSection productImage={bg_image} />

      <section className="bg-white w-full pt-10 md:pt-24">
        <div className="w-[90%] xl:w-[80%] mx-auto">
          <div className="flex flex-col md:flex-row relative justify-between gap-10 font-[Urbanist] md:items-start">
            <div className="flex flex-col items-center md:sticky md:top-28 w-full md:w-1/2">
              {/* Main Product Image */}
              <div className="border w-full flex items-center justify-center border-gray-200 p-4 rounded-md bg-white">
                <img
                  src={product.productImage}
                  alt="Bergdolt Reif & Nett Breakaway Pinot Noir"
                  className="w-52 lg:w-72 max-w-sm object-contain"
                />
              </div>

              {/* Thumbnail Below */}
              <div className="mt-6 w-52 border border-gray-200 flex items-center justify-center">
                <img
                  src={product.productImage}
                  alt="Thumbnail"
                  className="w-18 lg:w-24 rounded-md opacity-50 hover:opacity-100 transition duration-300"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <div className="flex flex-col gap-1">
                <h1 className="font-[Cormorant-Upright-bold] text-2xl 2xl:text-3xl">
                  {product.title}
                </h1>
                <span className="capitalize">De-Alcoholized</span>
                <p className="text-xl font-bold">$ {product.price}</p>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 xl:gap-5">
                  <div className="flex items-center gap-2 xl:gap-5">
                    <img src={alcohol} alt="alcohol" />
                    <p>
                      <span className="font-bold text-sm xl:text-lg">
                        Alcohol &lt;
                      </span>
                      <span> 0.5%</span> abv
                    </p>
                  </div>
                  <div className="flex items-center gap-2 xl:gap-5">
                    <img src={sugar} alt="alcohol" />
                    <p className="lowercase">
                      <span className="font-bold text-sm xl:text-lg capitalize">
                        {"RESIDUAL SUGAR".toLowerCase()}
                      </span>
                      <span> 20.9</span>G/L
                    </p>
                  </div>
                  <div className="flex items-center gap-2 xl:gap-5">
                    <img src={grapes} alt="alcohol" />
                    <p className="lowercase">
                      <span className="font-bold text-sm xl:text-lg capitalize">
                        {"GRAPE VARIETY".toLowerCase()}
                      </span>
                      <span className=" capitalize"> {product.wineType}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 xl:gap-5">
                    <img src={acidity} alt="alcohol" />
                    <p className="lowercase">
                      <span className="font-bold text-sm xl:text-lg capitalize">
                        {"TOTAL ACIDITY".toLowerCase()}
                      </span>
                      <span> 5.5</span>G/L
                    </p>
                  </div>
                  <div className="flex items-center gap-2 xl:gap-5">
                    <img src={barrel} alt="alcohol" />
                    <p className="lowercase">
                      <span className="font-bold text-sm xl:text-lg capitalize">
                        {"MATURATION".toLowerCase()}
                      </span>
                      <span className=" capitalize">
                        {" "}
                        {"IN WOODEN BARRELS".toLowerCase()}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <p>
                    <span className="font-semibold">
                      Sensory Characteristics{" "}
                    </span>
                    {"THIS MERLOT PRESENTS A DEEP, APPEALING COLOR THAT IS NEARLY INDISTINGUISHABLE FROM A CONVENTIONAL RED WINE. THE NOSE REVEALS A SPICY-FRUITY BOUQUET WITH A HINT OF RED PEPPER.".toLowerCase()}
                  </p>

                  <p>
                    <span className="font-semibold">Tasting Notes </span>A
                    smooth, fruit-driven Merlot with deep notes of dark berries,
                    plum, and a hint of spice. On the palate, it’s soft and
                    rounded, with gentle tannins and a pleasantly dry finish. A
                    refined and full-bodied red – without the alcohol.
                  </p>

                  <div>
                    <span className="font-semibold">Serving Suggestions</span>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>
                        Best enjoyed slightly chilled at 14–16°C / 57.2–59°F.
                      </li>
                      <li>
                        Pair with roasted vegetables, grilled dishes, or hearty
                        pasta.
                      </li>
                      <li>
                        Perfect for mindful sipping, dinners without compromise,
                        or casual evenings.
                      </li>
                    </ul>
                  </div>

                  <p>
                    <span className="font-semibold capitalize">
                      {"SERVING TEMPERATURE".toLowerCase()}
                    </span>{" "}
                    10°-12° C
                  </p>

                  <p>
                    <span className="font-semibold capitalize">
                      {"BOTTLE SIZE".toLowerCase()}
                    </span>{" "}
                    0.75L / 25.4 oz
                  </p>

                  <p className="capitalize font-semibold">
                    {"MADE IN GERMANY".toLowerCase()}
                  </p>

                  <div className="flex flex-col gap-3">
                    <span className="font-semibold">Quantity</span>
                    <div className="flex items-center border border-[#EED291] w-36 rounded-full overflow-hidden">
                      <button
                        onClick={() => {
                          if (!cartItem) {
                            setQuantityState((prev) =>
                              prev > 1 ? prev - 1 : 1
                            );
                          } else {
                            dispatch(decreaseQty(product.id));
                          }
                        }}
                        className="flex-1 text-center py-2 text-xl cursor-pointer"
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <p className="flex-1 text-center py-2 text-xl font-bold">
                        {quantity}
                      </p>
                      <button
                        onClick={() => {
                          if (!cartItem) {
                            setQuantityState((prev) => prev + 1);
                          } else {
                            dispatch(increaseQty(product.id));
                          }
                        }}
                        className="flex-1 text-center py-2 text-xl cursor-pointer"
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 w-full 2xl:w-[85%]">
                      <button
                        onClick={() => {
                          dispatch(
                            addToCart({ product, quantity: quantityState })
                          );
                        }}
                        className="font-semibold w-full 2xl:w-[80%] bg-[#EED291] py-3 rounded-full hover:bg-[#000000] hover:text-[#EED291] transition duration-300 cursor-pointer uppercase"
                      >
                        Add To Cart
                      </button>
                      <div className="bg-white border border-gray-300 hover:border-none hover:bg-[#EED291] transition duration-200 h-[40px] w-[40px] flex items-center justify-center rounded-full cursor-pointer flex-shrink-0">
                        <i class="fa-regular fa-heart"></i>
                      </div>
                      <i class="fa-solid fa-share-nodes cursor-pointer"></i>
                    </div>
                    <button className="font-semibold w-full 2xl:w-[80%] bg-white outline outline-[#f3c968] py-3 rounded-full hover:bg-[#EED291] transition duration-200 cursor-pointer">
                      BUY IT NOW
                    </button>
                  </div>

                  {/* Payment Cards */}
                  <img src={payment_card} alt="payment card" />

                  <div>
                    <div className="flex items-center gap-5">
                      <img src={wine_bottles} alt="wine bottles" />
                      <p>Flat Fee $15 nationwide for 3-bottle bundles</p>
                    </div>
                    <div className="flex items-center gap-5">
                      <img src={toy_truck} alt="toy truck" />
                      <p>Free shipping at $99+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="w-full mx-auto py-4 py-10 font-[Urbanist]">
            {/* Desktop Tabs */}
            <div className="hidden md:block">
              <div className="flex justify-center gap-5 border-b border-gray-300">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="relative px-4 py-2 text-lg font-medium transition-colors duration-300 cursor-pointer group"
                  >
                    <span
                      className={`transition-colors duration-300 ${
                        activeTab === tab.id
                          ? "text-black"
                          : "text-gray-500 group-hover:text-black"
                      }`}
                    >
                      {tab.label}
                    </span>

                    {/* underline animation */}
                    <span
                      className={`absolute left-0 bottom-0 h-[2px] bg-black transition-all duration-500 ease-in-out
          ${activeTab === tab.id ? "w-full left-0" : "w-0 right-0"}
        `}
                    ></span>
                  </button>
                ))}
              </div>

              <div className="mt-6 text-gray-700 text-sm leading-relaxed">
                {tabs.map(
                  (tab) =>
                    activeTab === tab.id && (
                      <div key={tab.id}>{tab.content}</div>
                    )
                )}
              </div>
            </div>

            {/* Mobile Accordion Style */}
            <div className="md:hidden space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => openModal(tab)}
                  className="w-full flex justify-between items-center border-b border-gray-300 py-3 text-left text-base font-medium text-gray-800"
                >
                  {tab.label}
                  <span className="text-xl">&#8250;</span>
                </button>
              ))}
            </div>

            {/* Full-Screen Modal for Mobile */}
            {showModal && (
              <div className="fixed inset-0 bg-white z-50 flex flex-col animate-slideUp">
                {/* Header */}
                <div className="flex justify-between font-[Urbanist] font-normal items-center border-b bg-[#EED291] border-gray-300 px-4 py-2">
                  {/* <h2 className="text-lg font-semibold uppercase">
                    {activeTab?.label || "Details"}
                  </h2> */}
                  <h2 className="text-lg font-semibold uppercase font-[Cormorant-Upright-bold]">
                    {tabs.find((t) => t.id === activeTab)?.label || "Details"}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-5xl font-normal text-gray-600 hover:text-black"
                  >
                    ×
                  </button>
                </div>

                {/* Scrollable Content */}
                {/* <div className="flex-1 overflow-y-auto p-4 text-sm text-gray-700 leading-relaxed">
                  {activeTab?.content}
                </div> */}
                <div className="flex-1 overflow-y-auto p-4 text-sm text-gray-700 leading-relaxed">
                  {tabs.find((t) => t.id === activeTab)?.content}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#F8F8F8] py-5 md:py-10">
        <div className="w-[90%] xl:w-[80%] mx-auto">
          <Title text="Related Products" />

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

export default ProductDetails;
