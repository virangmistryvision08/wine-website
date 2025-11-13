import React, { useState } from "react";
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

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [showModal, setShowModal] = useState(false);

  const tabs = [
    {
      id: "description",
      label: "Description",
      content: (
        <div>
          <p>
            <strong>Type / Style:</strong> Non-alcoholic Pinot Noir (0.2 % ABV)
          </p>
          <p>
            <strong>Region / Producer:</strong> Pfalz, Germany
          </p>

          <h4 className="font-semibold mt-4">Aromas & Visual</h4>
          <p>
            Deep red with ruby reflections. Aromas of sour cherry and Morello
            cherry, with a fine fruit clarity.
          </p>

          <h4 className="font-semibold mt-4">Palate & Texture</h4>
          <p>
            Juicy cherry fruit dominates, supported by lively but elegant
            acidity. Soft mouthfeel, barely perceptible tannins, smooth
            structure. Served slightly chilled, it’s fresh yet full of varietal
            character.
          </p>

          <h4 className="font-semibold mt-4">Pairing & Serving</h4>
          <p>
            At 17–19 °C, ideal with grilled poultry, mushroom risotto, or soft
            cheeses.
          </p>

          <h4 className="font-semibold mt-4">Vinification</h4>
          <p>
            Aged in wooden barrels before gentle dealcoholization, preserving
            Pinot Noir’s signature finesse.
          </p>
        </div>
      ),
    },
    {
      id: "shipping-return",
      label: "Shipping & Return",
      content: (
        <div>
          <h2 className="text-lg font-semibold mb-2">Returns Policy</h2>
          <p className="mb-2">
            You may return most new, unopened items within 30 days of delivery
            for a full refund. We'll also pay the return shipping costs if the
            return is a result of our error (you received an incorrect or
            defective item, etc.).
          </p>
          <p className="mb-2">
            You should expect to receive your refund within four weeks of giving
            your package to the return shipper, however, in many cases you will
            receive a refund more quickly. This time period includes the transit
            time for us to receive your return from the shipper (5 to 10
            business days), the time it takes us to process your return once we
            receive it (3 to 5 business days), and the time it takes your bank
            to process our refund request (5 to 10 business days).
          </p>
          <p className="mb-2">
            If you need to return an item, simply login to your account, view
            the order using the "Complete Orders" link under the My Account menu
            and click the Return Item(s) button. We'll notify you via e-mail of
            your refund once we've received and processed the returned item.
          </p>

          <h2 className="text-lg font-semibold mt-4 mb-2">Shipping</h2>
          <p className="mb-2">
            We can ship to virtually any address in the world. Note that there
            are restrictions on some products, and some products cannot be
            shipped to international destinations.
          </p>
          <p className="mb-2">
            When you place an order, we will estimate shipping and delivery
            dates for you based on the availability of your items and the
            shipping options you choose. Depending on the shipping provider you
            choose, shipping date estimates may appear on the shipping quotes
            page.
          </p>
          <p>
            Please also note that the shipping rates for many items we sell are
            weight-based. The weight of any such item can be found on its detail
            page. To reflect the policies of the shipping companies we use, all
            weights will be rounded up to the next full pound.
          </p>
        </div>
      ),
    },
  ];

  const productDetails = [
    {
      productImage: product1,
      title: "Bergdolt, Reif & Nett Breakaway Merlot Dealcoholized",
      verity: "Grape Verity",
      isGold: true,
      price: 29.76,
      productType: "Bergdolt, Reif & Nett",
      wineType: "Merlot",
    },
    {
      productImage: product2,
      title: "Bergdolt, Reif & Nett Breakaway Pinot NoirDealcoholized",
      verity: "Grape Verity",
      isGold: false,
      price: 29.38,
      productType: "Bergdolt, Reif & Nett",
      wineType: "Pinot Noir",
    },
    {
      productImage: product3,
      title:
        "Bergdolt, Reif & Nett Reverse Sauvignon Blanc(vegan) Dealcoholized",
      verity: "Grape Verity",
      isGold: false,
      price: 25.76,
      productType: "Bergdolt, Reif & Nett",
      wineType: "Sauvignon Blanc",
    },
  ];

  const openModal = (tab) => {
    setActiveTab(tab);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);
  return (
    <>
      <CommonFirstSection productImage={bg_image} />

      <section className="bg-white w-full pt-10 md:pt-24">
        <div className="w-[90%] xl:w-[80%] mx-auto">
          <div className=" flex flex-col md:flex-row justify-between gap-10 font-[Urbanist]">
            <div className="flex flex-col items-center w-full md:w-1/2">
              {/* Main Product Image */}
              <div className="border w-full flex items-center justify-center border-gray-200 p-4 rounded-md bg-white">
                <img
                  src={productImage}
                  alt="Bergdolt Reif & Nett Breakaway Pinot Noir"
                  className="w-52 lg:w-72 max-w-sm object-contain"
                />
              </div>

              {/* Thumbnail Below */}
              <div className="mt-6 w-52 border border-gray-200 flex items-center justify-center">
                <img
                  src={productImage}
                  alt="Thumbnail"
                  className="w-18 lg:w-24 rounded-md opacity-50 hover:opacity-100 transition duration-300"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <div className="flex flex-col gap-1">
                <h1 className="font-[Cormorant-Upright-bold] text-2xl">
                  Bergdolt, Reif & Nett Breakaway Merlot Dealcoholized
                </h1>
                <span className="capitalize">De-Alcoholized</span>
                <p className="text-xl font-bold">$ 29.76</p>
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
                      <span className=" capitalize">
                        {" "}
                        {"MERLOT".toLowerCase()}
                      </span>
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
                    smooth, fruit-driven Merlot with deep notes of dark
                    berries, plum, and a hint of spice. On the palate, it’s soft
                    and rounded, with gentle tannins and a pleasantly dry
                    finish. A refined and full-bodied red – without the alcohol.
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
                      <button className="flex-1 text-center py-2 text-xl cursor-pointer">
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <p className="flex-1 text-center py-2 text-xl font-bold">
                        1
                      </p>
                      <button className="flex-1 text-center py-2 text-xl cursor-pointer">
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 w-full 2xl:w-[85%]">
                      <button className=" w-full 2xl:w-[80%] bg-[#EED291] py-3 rounded-full hover:bg-[#f3c968] transition duration-200 cursor-pointer">
                        BUY NOW
                      </button>
                      <div className="bg-[#EED291] hover:bg-[#f3c968] transition duration-200 h-[40px] w-[40px] flex items-center justify-center rounded-full cursor-pointer">
                        <i class="fa-regular fa-heart"></i>
                      </div>
                      <i class="fa-solid fa-share-nodes cursor-pointer"></i>
                    </div>
                    <button className=" w-full 2xl:w-[80%] bg-[#fff] outline outline-[#f3c968] py-3 rounded-full hover:bg-[#f3c968] transition duration-200 cursor-pointer">
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

          <div className="w-full mx-auto p-4 py-10">
            {/* Desktop Tabs */}
            <div className="hidden md:block">
              <div className="flex justify-center border-b border-gray-300">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                      activeTab === tab.id
                        ? "border-b-2 border-black text-black"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    {tab.label}
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
                <div className="flex justify-between font-[Cormorant-Upright-bold] items-center border-b bg-[#EED291] border-gray-300 p-4">
                  <h2 className="text-lg font-semibold uppercase">
                    {activeTab?.label || "Details"}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-5xl font-bold text-gray-600 hover:text-black"
                  >
                    ×
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-4 text-sm text-gray-700 leading-relaxed">
                  {activeTab?.content}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#F8F8F8] py-10">
        <div className="w-[90%] xl:w-[80%] mx-auto">
          <div className="mt-10">
            <Title text="Related Products" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 xl:gap-20">
              {productDetails.map((product, index) => {
                return (
                  <Product
                    key={index}
                    productImage={product.productImage}
                    title={product.title}
                    verity={product.verity}
                    isGold={product.isGold}
                    price={product.price}
                    wineType={product.wineType}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
