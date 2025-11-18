import React, { useEffect, useState } from "react";
import Title from "./Title";
import Product from "./Product";
import { useSelector } from "react-redux";

const Products = () => {
  const [activeTab, setActiveTab] = useState("Bergdolt, Reif & Nett");
  const [filterProducts, setFilterProducts] = useState([]);
  const { products } = useSelector((state) => state);

  // First Time Render Show "Bergdolt, Reif & Nett" Products
  useEffect(() => {
    const veryFirstTime = products.allProducts.filter(
      (item) => item.productType === "Bergdolt, Reif & Nett"
    );
    setFilterProducts(veryFirstTime);
  }, []);

  const getProduct = async (e) => {
    console.log(e.target.name, "value");
    setActiveTab(e.target.name);

    const filteredProducts = await products.allProducts.filter(
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
              "Chateau Clos de Bouard",
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
