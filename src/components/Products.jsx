import React, { useEffect, useState } from "react";
import Title from "./Title";
import product1 from "/products/product1.png";
import product2 from "/products/product2.png";
import product3 from "/products/product3.png";
import product4 from "/products/product4.png";
import product5 from "/products/product5.png";
import product6 from "/products/product6.png";
import product7 from "/products/product7.png";
import product8 from "/products/product8.png";
import product9 from "/products/product9.png";
import product10 from "/products/product10.png";
import product11 from "/products/product11.png";
import product12 from "/products/product12.png";
import product13 from "/products/product13.png";
import product14 from "/products/product14.png";
import product15 from "/products/product15.png";
import Product from "./Product";

const Products = () => {
  const [activeTab, setActiveTab] = useState("Bergdolt, Reif & Nett");
  const [filterProducts, setFilterProducts] = useState([]);

  // First Time Render Show "Bergdolt, Reif & Nett" Products
  useEffect(() => {
    const veryFirstTime = productDetails.filter(
      (item) => item.productType === "Bergdolt, Reif & Nett"
    );
    setFilterProducts(veryFirstTime);
  }, []);

  const productDetails = [
    {
      id: 1,
      productImage: product1,
      title: "Bergdolt, Reif & Nett Breakaway Merlot Dealcoholized",
      verity: "Grape Verity",
      isGold: true,
      price: 29.76,
      productType: "Bergdolt, Reif & Nett",
      wineType: "Merlot",
    },
    {
      id: 2,
      productImage: product2,
      title: "Bergdolt, Reif & Nett Breakaway Pinot NoirDealcoholized",
      verity: "Grape Verity",
      isGold: false,
      price: 29.38,
      productType: "Bergdolt, Reif & Nett",
      wineType: "Pinot Noir",
    },
    {
      id: 3,
      productImage: product3,
      title:
        "Bergdolt, Reif & Nett Reverse Sauvignon Blanc(vegan) Dealalcoolized",
      verity: "Grape Verity",
      isGold: false,
      price: 25.76,
      productType: "Bergdolt, Reif & Nett",
      wineType: "Sauvignon Blanc",
    },
    {
      id: 4,
      productImage: product4,
      title: "Bergdolt, Reif & Nett Reverse GewurztraminerDealcoholized",
      verity: "Grape Verity",
      isGold: false,
      price: 29.38,
      productType: "Bergdolt, Reif & Nett",
      wineType: "Gewurztraminer",
    },
    {
      id: 5,
      productImage: product5,
      title: "Bergdolt, Reif & Nett Reverse Rose (vegan) Dealcoholized",
      verity: "Grape Verity",
      isGold: false,
      price: 25.76,
      productType: "Bergdolt, Reif & Nett",
      wineType: "Rose",
    },
    {
      id: 6,
      productImage: product6,
      title: "Bergdolt, Reif & Nett Reverse Riesling (vegan) Dealcoholized",
      verity: "Grape Verity",
      isGold: false,
      price: 27.16,
      productType: "Bergdolt, Reif & Nett",
      wineType: "Riesling",
    },
    {
      id: 7,
      productImage: product7,
      title: "Lamm-Jung Riesling Dealcoholized (Vegan)",
      verity: "Grape Verity",
      isGold: true,
      price: 26.97,
      productType: "Lamm Jung",
      wineType: "Riesling",
    },
    {
      id: 8,
      productImage: product8,
      title:
        "KvD Strauch Sektmanufaktur GmbH Rouge Pur Alkoholfrei Dealcoholized",
      verity: "Grape Verity",
      isGold: false,
      price: 26.97,
      productType: "KvD Strauch Sektmanufaktur",
      wineType: "rouge Pur",
    },
    {
      id: 9,
      productImage: product9,
      title: "Chateau Clos de Bouard Eden dealcoholized",
      verity: "Grape Verity",
      isGold: false,
      price: 33.61,
      productType: "Chateau Clos de Bouard",
      wineType: "Sauvignon Blanc",
    },
    {
      id: 10,
      productImage: product10,
      title: "Chateau Clos de Bouard Prince Oscar dealcoholized",
      verity: "Grape Verity",
      isGold: false,
      price: 32.67,
      productType: "Chateau Clos de Bouard",
      wineType: (
        <>
          <p>80 % Merlot,</p>
          <p>15 % Cabernet Franc,</p>
          <p>5 % Cabernet Sauvignon</p>
        </>
      ),
    },
    {
      id: 11,
      productImage: product11,
      title: "Matthias Anton Blanc de Blancs sparkling (vegan) Dealcoholized",
      verity: "Grape Verity",
      isGold: false,
      price: 27.19,
      productType: "Matthias Anton",
      wineType: "Riesling",
    },
    {
      id: 12,
      productImage: product12,
      title: "Matthias Anton Pinot Grigio (vegan) – Dealcoholized",
      verity: "Grape Verity",
      isGold: false,
      price: 25.61,
      productType: "Matthias Anton",
      wineType: "Pinot Grigio",
    },
    {
      id: 13,
      productImage: product13,
      title: "Matthias Anton Rosé (vegan) Dealcoholized",
      verity: "Grape Verity",
      isGold: false,
      price: 25.61,
      productType: "Matthias Anton",
      wineType: "Pinot Noir",
    },
    {
      id: 14,
      productImage: product14,
      title: "Matthias Anton Rosé Sparkling (vegan) Dealcoholized",
      verity: "Grape Verity",
      isGold: false,
      price: 28.19,
      productType: "Matthias Anton",
      wineType: "Pinot Noir",
    },
    {
      id: 15,
      productImage: product15,
      title: "Matthias Anton Sauvignon Blanc (vegan) Dealcoholized",
      verity: "Grape Verity",
      isGold: false,
      price: 25.61,
      productType: "Matthias Anton",
      wineType: "Sauvignon Blanc",
    },
  ];

  const getProduct = async (e) => {
    console.log(e.target.name, "value");
    setActiveTab(e.target.name);

    const filteredProducts = await productDetails.filter(
      (item) => item.productType === e.target.name
    );
    setFilterProducts(filteredProducts);
  };

  return (
    <>
      <section className="w-full bg-[#F8F8F8] py-10 md:py-20">
        <div className="w-[90%] xl:w-[80%] mx-auto">
          {/* Title */}
          <Title text="products" />

          {/* Tabs */}
          <div className="tabs-container flex justify-between gap-5 mb-10 overflow-x-auto whitespace-nowrap pb-7">
            {[
              "Bergdolt, Reif & Nett",
              "Lamm Jung",
              "KvD Strauch Sektmanufaktur",
              "Château Clos de Boüard",
              "Matthias Anton",
            ].map((item) => {
              return (
                <button
                  onClick={getProduct}
                  name={item}
                  className={`lg:text-lg xl:text-xl px-5 xl:px-10 xl:py-3 py-2 border-2 ${
                    activeTab === item ? "bg-[#EED291]" : "bg-[#fff]"
                  } border-[#EED291] rounded-full hover:bg-[#EED291] font-[Urbanist] font-[500] cursor-pointer`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 xl:gap-20">
            {filterProducts.map((product, index) => {
              return (
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
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
