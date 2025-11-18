import React, { useEffect, useRef, useState } from "react";
import CommonFirstSection from "./CommonFirstSection";
import Product from "./Product";
import empty_product from "/filterProducts/empty-product.png";
import image from "/products/product-details-bg.jpg";
import Bergdolt_Reif_Nett from "/filterProducts/Bergdolt,-Reif-&-Nett.png";
import Lamm_Jung from "/filterProducts/Lamm-Jung.jpg";
import Château_Clos_de_Boüard from "/filterProducts/Château-Clos-de-Boüard.png";
import Matthias_Anton from "/filterProducts/Matthias -Anton.png";
import KvD_Strauch_Sektmanufaktur from "/aboutUs/kvd/kvd-bg.png";
import Slider from "@mui/material/Slider";
import { ChevronFirst, ChevronLast } from "lucide-react";
import { useSelector } from "react-redux";

const FilterProducts = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [productType, setProductType] = useState("Products");
  const [bgImage, setBgImage] = useState(image);
  const [selectedFilters, setSelectedFilters] = useState({
    Size: [],
    Grape: [],
    "Product Type": [],
    Availability: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);
  const singleSelectFilters = []; // Add in this one if want to single select on dropdown option
  const [sortOption, setSortOption] = useState("Alphabetically, A-Z");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [appliedPriceRange, setAppliedPriceRange] = useState([0, 100]);
  const dropdownRef = useRef(null);
  const { products } = useSelector((state) => state);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

      // -----------------------------
      // SINGLE SELECT FILTER (Radio)
      // -----------------------------
      if (isSingle) {
        return {
          ...prev,
          [label]: [option],
        };
      }

      // -----------------------------
      // MULTI-SELECT LOGIC (Checkbox)
      // -----------------------------
      let updated;

      if (existing.includes(option)) {
        updated = existing.filter((item) => item !== option);
      } else {
        updated = [...existing, option];
      }

      // Update background only for Product Type
      if (label === "Product Type") {
        if (updated.length === 1) {
          const selected = updated[0];

          if (selected === "Bergdolt, Reif & Nett") {
            setBgImage(Bergdolt_Reif_Nett);
            setProductType("Bergdolt, Reif & Nett");
          } else if (selected === "Lamm Jung") {
            setBgImage(Lamm_Jung);
            setProductType("Lamm Jung");
          } else if (selected === "KvD Strauch Sektmanufaktur") {
            setBgImage(KvD_Strauch_Sektmanufaktur);
            setProductType("KvD Strauch Sektmanufaktur");
          } else if (selected === "Château Clos de Boüard") {
            setBgImage(Château_Clos_de_Boüard);
            setProductType("Château Clos de Boüard");
          } else {
            setBgImage(Matthias_Anton);
            setProductType("Matthias Anton");
          }
        } else {
          // If multiple selected → default background
          setBgImage(image); // original hero image
          setProductType("Products");
        }
      }

      return {
        ...prev,
        [label]: updated,
      };
    });
  };

  // Add Product Types in Filter Array
  const uniqueProductTypes = [
    ...new Set(products.allProducts.map((p) => p.productType)),
  ];

  const uniqueGrapes = [
    ...new Set(
      products.allProducts
        .map((p) => (typeof p.wineType === "string" ? p.wineType : null))
        .filter(Boolean)
    ),
  ];

  const filters = [
    { label: "Size", options: ["Small", "Medium", "Large"] },
    { label: "Price", options: [] },
    { label: "Grape", options: uniqueGrapes },
    { label: "Product Type", options: uniqueProductTypes },
    { label: "Availability", options: ["In Stock", "Out of Stock"] },
  ];

  const applyFilters = () => {
    let filtered = [...products.allProducts];

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
    // Price range filtering
    filtered = filtered.filter(
      (p) => p.price >= appliedPriceRange[0] && p.price <= appliedPriceRange[1]
    );

    // Product Type filter
    if (selectedFilters["Product Type"].length > 0) {
      filtered = filtered.filter((p) =>
        selectedFilters["Product Type"].includes(p.productType)
      );
    }

    // SORTING
    if (sortOption === "Alphabetically, A-Z") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortOption === "Alphabetically, Z-A") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (sortOption === "Price: Low to High") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sortOption === "Price: High to Low") {
      filtered.sort((a, b) => b.price - a.price);
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

  // Selected Filters to Show on Desktop and Mobile Drawer
  const selectedFilter = () => {
    return (
      <>
        {Object.values(selectedFilters).some((arr) => arr.length > 0) ||
        appliedPriceRange[0] !== 0 ||
        appliedPriceRange[1] !== 100 ? (
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {/* Clear All */}
            <div className="flex justify-between w-full items-center">
              <h3 className="block xl:hidden">Filters</h3>
              <button
                onClick={() => {
                  setSelectedFilters({
                    Size: [],
                    Grape: [],
                    "Product Type": [],
                    Availability: [],
                  });
                  setPriceRange([0, 100]);
                  setAppliedPriceRange([0, 100]);
                  setOpenIndex(null);
                  setBgImage(image);
                  setProductType("Products");
                }}
                className="text-sm underlinetext-gray-700hover:text-black cursor-pointer underline"
              >
                Clear All
              </button>
            </div>

            {/* Price Range Tag */}
            {(appliedPriceRange[0] !== 0 || appliedPriceRange[1] !== 100) && (
              <span className="bg-[#EED291] px-3 py-1 rounded text-sm flex items-center gap-2">
                ${appliedPriceRange[0]} – ${appliedPriceRange[1]}
                <button
                  onClick={() => setAppliedPriceRange([0, 100])}
                  className="font-bold cursor-pointer"
                >
                  ×
                </button>
              </span>
            )}

            {/* Loop through all selected filters */}
            {Object.entries(selectedFilters).map(([label, values]) =>
              values.map((value) => (
                <span
                  key={label + value}
                  className="bg-[#EED291] px-3 py-1 rounded text-sm flex items-center gap-2 text-black"
                >
                  {value}
                  <button
                    onClick={() => {
                      setSelectedFilters((prev) => ({
                        ...prev,
                        [label]: prev[label].filter((item) => item !== value),
                      }));
                    }}
                    className="font-bold cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))
            )}
          </div>
        ) : null}
      </>
    );
  };

  return (
    <>
      <CommonFirstSection
        productImage={bgImage}
        productType={productType}
        alcohol={
          productType.toLowerCase() !== "products" &&
          "Non-alcoholic (<0.5% ABV). Regulated as a food product. Intended for adults."
        }
      />

      <div className="w-full">
        <section className="w-[90%] mx-auto py-10 font-[Urbanist]">
          {/* Dropdown Section */}
          {/* Show Only XL or above Screen */}
          <div
            className="w-full hidden xl:flex items-center justify-between bg-white"
            ref={dropdownRef}
          >
            <div className="flex items-center gap-4">
              <i class="fa-solid fa-filter"></i>
              <span className="text-sm font-medium">Filter</span>

              {filters.map((f, idx) => (
                <div className="relative" key={idx}>
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="flex items-center gap-2 px-4 py-2 cursor-pointer border border-[#EED291] shadow-sm text-sm bg-white hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <span>{f.label}</span>

                      {/* Show count only for multiselect filters */}
                      {!singleSelectFilters.includes(f.label) &&
                        selectedFilters[f.label]?.length > 0 && (
                          <span className="text-white bg-[#6A0D23] rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {selectedFilters[f.label].length}
                          </span>
                        )}
                    </div>

                    <i className="fa-solid fa-chevron-down"></i>
                  </button>

                  {openIndex === idx && (
                    <div className="absolute left-0 mt-2 w-60 bg-white border border-[#EED291] rounded-xl shadow p-4 z-10">
                      {f.label === "Price" ? (
                        <div className="w-full mt-2">
                          <Slider
                            value={priceRange}
                            onChange={(e, newValue) => setPriceRange(newValue)}
                            valueLabelDisplay="auto"
                            min={0}
                            max={100}
                            sx={{
                              color: "#EED291", // slider color
                              height: 4,
                              "& .MuiSlider-thumb": {
                                height: 16,
                                width: 16,
                                backgroundColor: "#fff",
                                border: "2px solid #EED291",
                              },
                              "& .MuiSlider-rail": {
                                opacity: 0.4,
                              },
                            }}
                          />

                          <div className="flex justify-between items-center text-sm mt-2 font-[Urbanist] font-semibold">
                            <div className="flex items-center w-16 justify-between border border-[#EED291] p-2">
                              <span>$</span>
                              <span>{priceRange[0]}</span>
                            </div>
                            <p>to</p>
                            <div className="flex items-center w-16 justify-between border border-[#EED291] p-2">
                              <span>$</span>
                              <span>{priceRange[1]}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setAppliedPriceRange(priceRange);
                              setOpenIndex(null);
                            }}
                            className="text-center bg-[#EED291] hover:bg-[#ecc56a] w-full rounded-full py-2 mt-3 cursor-pointer"
                          >
                            Apply
                          </button>
                        </div>
                      ) : (
                        f.options.map((option, i) => {
                          const isSingle = singleSelectFilters.includes(
                            f.label
                          );
                          const isChecked =
                            selectedFilters[f.label]?.includes(option);

                          return (
                            <label
                              key={i}
                              className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded cursor-pointer text-sm"
                            >
                              <input
                                type={isSingle ? "radio" : "checkbox"}
                                name={f.label}
                                checked={isChecked}
                                onChange={() =>
                                  handleFilterChange(f.label, option)
                                }
                                className="accent-[#EED291] cursor-pointer"
                              />
                              <span>{option}</span>
                            </label>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort By :</span>

              <div className="relative">
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === "sort" ? null : "sort")
                  }
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer border border-[#EED291] shadow-sm text-sm bg-white hover:bg-gray-50"
                >
                  {sortOption}
                  <i className="fa-solid fa-chevron-down"></i>
                </button>

                {openIndex === "sort" && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-[#EED291] rounded-xl shadow p-2 z-10 text-sm">
                    {[
                      "Alphabetically, A-Z",
                      "Alphabetically, Z-A",
                      "Price: Low to High",
                      "Price: High to Low",
                    ].map((option, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setSortOption(option);
                          setOpenIndex(null);
                        }}
                        className={`px-2 py-2 hover:bg-gray-100 rounded cursor-pointer ${
                          sortOption === option && "underline"
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
            ${
              drawerOpen
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
              <h2 className="text-lg font-semibold">Sidebar</h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="pb-5">{selectedFilter()}</div>

            {filters.map((f, idx) => (
              <div key={idx} className="mb-4 border-b pb-3">
                {/* Accordion Header */}
                <button
                  className="w-full flex justify-between items-center text-left cursor-pointer"
                  onClick={() =>
                    setOpenAccordion(openAccordion === idx ? null : idx)
                  }
                >
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm">{f.label}</h3>

                    {/* Multi-select badge */}
                    {Array.isArray(selectedFilters[f.label]) &&
                      selectedFilters[f.label].length > 0 && (
                        <span className="text-white bg-[#6A0D23] rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          {selectedFilters[f.label].length}
                        </span>
                      )}
                  </div>

                  {openAccordion === idx ? (
                    <i
                      className={`fa-solid fa-minus transition-transform duration-300 ${
                        openAccordion === idx ? "rotate-180" : ""
                      }`}
                    ></i>
                  ) : (
                    <i
                      className={`fa-solid fa-plus transition-transform duration-300 ${
                        openAccordion === idx ? "rotate-180" : ""
                      }`}
                    ></i>
                  )}
                </button>

                {/* Accordion Body */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openAccordion === idx ? "h-auto mt-3" : "max-h-0"
                  }`}
                >
                  <div className="space-y-2">
                    <div
                      className={` transition-all duration-300 ${
                        openAccordion === idx ? "h-auto mt-3" : "max-h-0"
                      }`}
                    >
                      <div className="space-y-2">
                        {/* CHECK IF PRICE FILTER */}
                        {f.label === "Price" ? (
                          <div className="p-3">
                            <div className="w-full mt-2 px-2.5 z-50">
                              <Slider
                                value={priceRange}
                                onChange={(e, newValue) =>
                                  setPriceRange(newValue)
                                }
                                valueLabelDisplay="on"
                                min={0}
                                max={100}
                                sx={{
                                  color: "#EED291",
                                  height: 4,
                                  "& .MuiSlider-thumb": {
                                    height: 16,
                                    width: 16,
                                    backgroundColor: "#fff",
                                    border: "2px solid #EED291",
                                  },
                                  "& .MuiSlider-rail": {
                                    opacity: 0.4,
                                  },
                                }}
                              />

                              <div className="flex justify-between items-center text-sm mt-2 font-[Urbanist] font-semibold">
                                <div className="flex items-center w-16 justify-between border border-[#EED291] p-2">
                                  <span>$</span>
                                  <span>{priceRange[0]}</span>
                                </div>
                                <p>to</p>
                                <div className="flex items-center w-16 justify-between border border-[#EED291] p-2">
                                  <span>$</span>
                                  <span>{priceRange[1]}</span>
                                </div>
                              </div>

                              {/* APPLY BUTTON */}
                              <button
                                onClick={() => {
                                  setAppliedPriceRange(priceRange);
                                }}
                                className="text-center bg-[#EED291] hover:bg-[#ecc56a] w-full rounded-full py-2 mt-3 cursor-pointer"
                              >
                                Apply
                              </button>
                            </div>
                          </div>
                        ) : (
                          // NORMAL FILTER OPTIONS (checkbox / radio)
                          f.options.map((option, i) => (
                            <label
                              key={i}
                              className="flex items-center gap-3 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                className="h-4 w-4 accent-[#EED291]"
                                checked={
                                  Array.isArray(selectedFilters[f.label]) &&
                                  selectedFilters[f.label].includes(option)
                                }
                                onChange={() =>
                                  handleFilterChange(f.label, option)
                                }
                              />
                              <span className="text-sm">{option}</span>
                            </label>
                          ))
                        )}
                      </div>
                    </div>
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
                  <h1 className="text-2xl font-semibold">
                    Product Not Matched!
                  </h1>
                </div>
              </>
            ) : (
              <>
                {/* Selected Filters — Appears Only When Filters Are Applied */}
                {isDesktop && <>{selectedFilter()}</>}

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
                        id={product.id}
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
                    className={`
      px-2 py-1 text-gray-500 disabled:opacity-30 flex items-center
      max-sm:px-1 max-sm:py-0.5 max-sm:text-xs ${
        currentPage !== 1 && "cursor-pointer"
      }
    `}
                  >
                    <ChevronFirst />
                  </button>

                  {/* Prev */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`
      px-2 py-1 text-gray-500 disabled:opacity-30
      max-sm:px-1 max-sm:py-0.5 max-sm:text-xs ${
        currentPage !== 1 && "cursor-pointer"
      }
    `}
                  >
                    <i className="fa-solid fa-angle-left max-sm:text-xs"></i>
                  </button>

                  {/* Next */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`
      px-2 py-1 text-gray-500 disabled:opacity-30
      max-sm:px-1 max-sm:py-0.5 max-sm:text-xs ${
        currentPage !== totalPages && "cursor-pointer"
      }
    `}
                  >
                    <i className="fa-solid fa-angle-right max-sm:text-xs"></i>
                  </button>

                  {/* Last Page */}
                  <button
                    onClick={() => goToPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className={`}
      px-2 py-1 text-gray-500 disabled:opacity-30 flex items-center
      max-sm:px-1 max-sm:py-0.5 max-sm:text-xs ${
        currentPage !== totalPages && "cursor-pointer"
      }
    `}
                  >
                    <ChevronLast />
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default FilterProducts;
