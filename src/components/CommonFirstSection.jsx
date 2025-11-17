import React from "react";

const CommonFirstSection = ({ productImage, productType, alcohol }) => {
  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(to left, #000000aa, #000000aa), url("${productImage}")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "30% 30%",
        }}
        className={`relative w-full h-96 overflow-hidden`}
      >
        <div className="w-[96%] mx-auto">
          <div className="absolute text-white flex flex-col gap-3 bottom-10 ">
            <h4 className="font-[Urbanist] flex items-center font-bold text-xs md:text-base capitalize">
              Home <span className="mx-2"><i class="fa-solid fa-angle-right"></i></span> {productType ? <span className="text-white">{productType}</span> : <>{"Shop "}
              <span className="mx-2">&gt;</span> Product Detail</>}
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
