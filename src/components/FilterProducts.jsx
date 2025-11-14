import React, { useEffect, useState } from "react";
import CommonFirstSection from "./CommonFirstSection";
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
import empty_product from "/filterProducts/empty-product.png";
import image from "/products/product-details-bg.jpg";
import Bergdolt_Reif_Nett from "/filterProducts/Bergdolt,-Reif-&-Nett.png";
import Lamm_Jung from "/filterProducts/Lamm-Jung.jpg";
import Château_Clos_de_Boüard from "/filterProducts/Château-Clos-de-Boüard.png";
import Matthias_Anton from "/filterProducts/Matthias -Anton.png";
import KvD_Strauch_Sektmanufaktur from "/hero-section-bg-bottle.svg";

const FilterProducts = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [productType, setProductType] = useState("All");
  const [bgImage, setBgImage] = useState(image);
  const [selectedFilters, setSelectedFilters] = useState({
    Size: [],
    Price: [],
    Grape: [],
    "Product Type": [],
    Availability: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);
  const singleSelectFilters = ["Product Type", "Availability", "Size"];

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const handleFilterChange = (label, option) => {
    const isSingle = singleSelectFilters.includes(label);

    setSelectedFilters((prev) => {
      const existing = prev[label] || [];

      if (isSingle) {
        // Only ONE selection allowed

        if (option === "Bergdolt, Reif & Nett") setBgImage(Bergdolt_Reif_Nett);
        else if (option === "Lamm Jung") setBgImage(Lamm_Jung);
        else if (option === "KvD Strauch Sektmanufaktur") setBgImage(KvD_Strauch_Sektmanufaktur);
        else if (option === "Château Clos de Boüard") setBgImage(Château_Clos_de_Boüard);
        else { setBgImage(Matthias_Anton) };
        return {
          ...prev,
          [label]: [option],
        };
      }

      // Multi-select logic (checkbox)
      if (existing.includes(option)) {
        return {
          ...prev,
          [label]: existing.filter((item) => item !== option),
        };
      }

      return {
        ...prev,
        [label]: [...existing, option],
      };
    });
  };


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
    {
      productImage: product4,
      title: "Bergdolt, Reif & Nett Reverse GewurztraminerDealcoholized",
      verity: "Grape Verity",
      isGold: false,
      price: 29.38,
      productType: "Bergdolt, Reif & Nett",
      wineType: "Gewurztraminer",
    },
    {
      productImage: product5,
      title: "Bergdolt, Reif & Nett Reverse Rose (vegan) Dealcoholized",
      verity: "Grape Verity",
      isGold: false,
      price: 25.76,
      productType: "Bergdolt, Reif & Nett",
      wineType: "Rose",
    },
    {
      productImage: product6,
      title: "Bergdolt, Reif & Nett Reverse Riesling (vegan) Dealcoholized",
      verity: "Grape Verity",
      isGold: false,
      price: 27.16,
      productType: "Bergdolt, Reif & Nett",
      wineType: "Riesling",
    },
    {
      productImage: product7,
      title: "Lamm-Jung Riesling Dealcoholized (Vegan)",
      verity: "Grape Verity",
      isGold: true,
      price: 26.97,
      productType: "Lamm Jung",
      wineType: "Riesling",
    },
    {
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
      productImage: product9,
      title: "Château Clos de Boüard Eden dealcoholized",
      verity: "Grape Verity",
      isGold: false,
      price: 33.61,
      productType: "Château Clos de Boüard",
      wineType: "Sauvignon Blanc",
    },
    {
      productImage: product10,
      title: "Château Clos de Boüard Prince Oscar dealcoholized",
      verity: "Grape Verity",
      isGold: false,
      price: 32.67,
      productType: "Château Clos de Boüard",
      wineType: (
        <>
          <p>80 % Merlot,</p>
          <p>15 % Cabernet Franc,</p>
          <p> 5 % Cabernet Sauvignon</p>
        </>
      ),
    },
    {
      productImage: product11,
      title: "Matthias Anton Blanc de Blancs sparkling (vegan) Dealcoholized",
      verity: "Grape Verity",
      isGold: false,
      price: 27.19,
      productType: "Matthias Anton",
      wineType: "Riesling",
    },
    {
      productImage: product12,
      title: "Matthias Anton Pinot Grigio (vegan) – Dealcoholized",
      verity: "Grape Verity",
      isGold: false,
      price: 25.61,
      productType: "Matthias Anton",
      wineType: "Pinot Grigio",
    },
    {
      productImage: product13,
      title: "Matthias Anton Rosé (vegan) Dealcoholized",
      verity: "Grape Verity",
      isGold: false,
      price: 25.61,
      productType: "Matthias Anton",
      wineType: "Pinot Noir",
    },
    {
      productImage: product14,
      title: "Matthias Anton Rosé Sparkling (vegan) Dealcoholized",
      verity: "Grape Verity",
      isGold: false,
      price: 28.19,
      productType: "Matthias Anton",
      wineType: "Pinot Noir",
    },
    {
      productImage: product15,
      title: "Matthias Anton Sauvignon Blanc (vegan) Dealcoholized",
      verity: "Grape Verity",
      isGold: false,
      price: 25.61,
      productType: "Matthias Anton",
      wineType: "Sauvignon Blanc",
    },
  ];

  // Add Product Types in Filter Array
  const uniqueProductTypes = [
    ...new Set(productDetails.map((p) => p.productType)),
  ];

  const uniqueGrapes = [
    ...new Set(
      productDetails
        .map((p) => (typeof p.wineType === "string" ? p.wineType : null))
        .filter(Boolean)
    ),
  ];

  const filters = [
    { label: "Size", options: ["Small", "Medium", "Large"] },
    { label: "Price", options: ["Under $20", "$20-$50", "$50-$100"] },
    { label: "Grape", options: uniqueGrapes },
    { label: "Product Type", options: uniqueProductTypes },
    { label: "Availability", options: ["In Stock", "Out of Stock"] },
  ];

  const applyFilters = () => {
    let filtered = [...productDetails];

    // Grape filter
    if (selectedFilters.Grape.length > 0) {
      filtered = filtered.filter(
        (p) =>
          typeof p.wineType === "string" &&
          selectedFilters.Grape.some((g) =>
            p.wineType.toLowerCase().includes(g.toLowerCase())
          )
      );
    }

    // Price filter
    if (selectedFilters.Price.length > 0) {
      filtered = filtered.filter((p) => {
        return selectedFilters.Price.some((price) => {
          if (price === "Under $20") return p.price < 20;
          if (price === "$20-$50") return p.price >= 20 && p.price <= 50;
          if (price === "$50-$100") return p.price >= 50 && p.price <= 100;
        });
      });
    }

    // Product Type filter
    if (selectedFilters["Product Type"].length > 0) {
      filtered = filtered.filter((p) =>
        selectedFilters["Product Type"].includes(p.productType)
      );
    }

    return filtered;
  };

  const filteredProducts = applyFilters();

  // Auto-reset page if filtered products are fewer than current page
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(1);
  }

  // Slice products
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const paginatedProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <>
      <CommonFirstSection
        productImage={bgImage}
        productType={productType}
        alcohol="Non-alcoholic (<0.5% ABV). Regulated as a food product. Intended for adults."
      />

      <section className="w-[90%] mx-auto py-10 font-[Urbanist]">
        {/* Dropdown Section */}
        {/* Show Only XL or above Screen */}
        <div className="w-full hidden xl:flex items-center justify-between bg-white">
          <div className="flex items-center gap-4">
            <i class="fa-solid fa-filter"></i>
            <span className="text-sm font-medium">Filter</span>

            {filters.map((f, idx) => (
              <div className="relative" key={idx}>
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer border border-[#EED291] shadow-sm text-sm bg-white hover:bg-gray-50"
                >
                  {selectedFilters[f.label]?.length > 0
                    ? selectedFilters[f.label].join(", ")
                    : f.label}

                  <i className="fa-solid fa-chevron-down"></i>
                </button>

                {openIndex === idx && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-[#EED291] rounded-xl shadow p-2 z-10">

                    {f.options.map((option, i) => {
                      const isSingle = singleSelectFilters.includes(f.label);
                      const isChecked = selectedFilters[f.label]?.includes(option);

                      return (
                        <label
                          key={i}
                          className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded cursor-pointer text-sm"
                        >
                          <input
                            type={isSingle ? "radio" : "checkbox"}
                            name={f.label} // required for radio
                            checked={isChecked}
                            onChange={() => handleFilterChange(f.label, option)}
                            className="accent-[#EED291] cursor-pointer"
                          />
                          <span>{option}</span>
                        </label>
                      );
                    })}


                  </div>
                )}
              </div>
            ))}

          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort By :</span>
            <button className="flex items-center gap-2 px-4 py-2 cursor-pointer border border-[#EED291] shadow-sm text-sm bg-white hover:bg-gray-50">
              Best Sellers
              <i class="fa-solid fa-chevron-down"></i>
            </button>
          </div>
        </div>

        {/* Filter Button (Mobile) */}
        <div className="flex xl:hidden mb-4">
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-[#EED291] shadow-sm bg-white"
          >
            <i className="fa-solid fa-filter"></i>
            Filter
          </button>
        </div>

        {/* Drawer Overlay */}
        <div
          className={`fixed inset-0 bg-black/40 z-40 transition-opacity xl:hidden
            ${drawerOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
            }`}
          onClick={() => setDrawerOpen(false)}
        ></div>

        {/* Drawer */}
        <div
          className={`fixed top-0 left-0 w-72 h-full bg-white shadow-xl z-50 p-5 overflow-y-auto
            transition-transform duration-300 xl:hidden
            ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={() => setDrawerOpen(false)} className="text-xl">
              ✕
            </button>
          </div>

          {filters.map((f, idx) => (
            <div key={idx} className="mb-4 border-b pb-3">
              {/* Accordion Header */}
              <button
                className="w-full flex justify-between items-center text-left"
                onClick={() =>
                  setOpenAccordion(openAccordion === idx ? null : idx)
                }
              >
                <h3 className="font-medium text-sm">{f.label}</h3>
                {openAccordion === idx ? (
                  <i
                    className={`fa-solid fa-minus transition-transform duration-300 ${openAccordion === idx ? "rotate-180" : ""
                      }`}
                  ></i>
                ) : (
                  <i
                    className={`fa-solid fa-plus transition-transform duration-300 ${openAccordion === idx ? "rotate-180" : ""
                      }`}
                  ></i>
                )}
              </button>

              {/* Accordion Body */}
              <div
                className={`overflow-hidden transition-all duration-300 ${openAccordion === idx ? "max-h-40 mt-3" : "max-h-0"
                  }`}
              >
                <div className="space-y-2 pl-1">
                  {f.options.map((option, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        checked={
                          Array.isArray(selectedFilters[f.label]) &&
                          selectedFilters[f.label].includes(option)
                        }
                        onChange={() => handleFilterChange(f.label, option)}
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="min-h-96">
          {paginatedProducts.length <= 0 ? (
            <>
              <div className="p-10">
                <img src={empty_product} alt="empty product" />
                <h1 className="text-2xl font-semibold">Product Not Matched!</h1>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5 xl:gap-20">
                {paginatedProducts.map((product, index) => {
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

              {/* PAGINATION UI */}
              <div
                className="
    flex justify-end items-center gap-6 mt-10 bg-white p-4 rounded
    max-sm:justify-between max-sm:gap-3 max-sm:px-3 max-sm:py-2
  "
              >
                {/* Rows per page dropdown */}
                <div className="flex items-center gap-2 text-sm max-sm:gap-1">
                  <span className="text-gray-600 max-sm:hidden">
                    Rows per page:
                  </span>

                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                    }}
                    className="
        border border-gray-300 rounded px-2 py-1 bg-white
        max-sm:px-1 max-sm:py-0.5 max-sm:text-xs
      "
                  >
                    {[6, 10, 15, 20].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Showing text */}
                <div className="text-sm text-gray-700 max-sm:text-xs">
                  {filteredProducts.length === 0
                    ? "0–0 / 0"
                    : `${indexOfFirst + 1}–${Math.min(
                      indexOfLast,
                      filteredProducts.length
                    )} / ${filteredProducts.length}`}
                </div>

                {/* First Page */}
                <button
                  onClick={() => goToPage(1)}
                  disabled={currentPage === 1}
                  className="
      px-2 py-1 text-gray-500 disabled:opacity-30 flex items-center
      max-sm:px-1 max-sm:py-0.5 max-sm:text-xs
    "
                >
                  |<i className="fa-solid fa-angle-left max-sm:text-xs"></i>
                </button>

                {/* Prev */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="
      px-2 py-1 text-gray-500 disabled:opacity-30
      max-sm:px-1 max-sm:py-0.5 max-sm:text-xs
    "
                >
                  <i className="fa-solid fa-angle-left max-sm:text-xs"></i>
                </button>

                {/* Next */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="
      px-2 py-1 text-gray-500 disabled:opacity-30
      max-sm:px-1 max-sm:py-0.5 max-sm:text-xs
    "
                >
                  <i className="fa-solid fa-angle-right max-sm:text-xs"></i>
                </button>

                {/* Last Page */}
                <button
                  onClick={() => goToPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="
      px-2 py-1 text-gray-500 disabled:opacity-30 flex items-center
      max-sm:px-1 max-sm:py-0.5 max-sm:text-xs
    "
                >
                  <i className="fa-solid fa-angle-right max-sm:text-xs"></i>|
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default FilterProducts;
