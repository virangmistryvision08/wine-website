import React from "react";
import { useNavigate } from "react-router-dom";

const CommonFirstSection = ({ productImage, productType, alcohol }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(to left, #000000aa, #000000aa), url("${productImage}")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "30% 30%",
        }}
        className={`relative w-full h-64 xl:h-96 overflow-hidden`}
      >
        <div className="w-[96%] mx-auto">
          <div className="absolute text-white flex flex-col gap-3 bottom-5 xl:bottom-10 ">
            <h4 className="font-[Urbanist] flex items-center font-bold text-xs md:text-base capitalize">
              <span className="cursor-pointer hover:text-[#EED291]" onClick={() => navigate("/")}>Home</span> <span className="mx-2"><i className="fa-solid fa-angle-right"></i></span> {productType ? <span className="text-white">{productType}</span> : <><span className="cursor-pointer hover:text-[#EED291]" onClick={() => navigate("/shop")}>Shop</span>
              <span className="mx-2"><i class="fa-solid fa-angle-right"></i></span> Product Detail</>}
            </h4>
            <h1 className="font-[Cormorant-Upright-bold] text-2xl md:text-4xl 2xl:text-5xl text-white uppercase">
              {productType ? productType : "Product Detail"}
            </h1>
            <p>{alcohol}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommonFirstSection;
