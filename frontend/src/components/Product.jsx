import React from "react";
import grapes from "/products/grapes.svg";
import gold_medal from "/Gold_Medal.webp";
import { useNavigate } from "react-router-dom";
import { add_to_cart, addToCart } from "../redux/reducers/productReducer";
import { useDispatch } from "react-redux";
import axios from "axios";
import cookie from "js-cookie";

const Product = ({
  productImage,
  title,
  verity,
  isGold,
  price,
  wineType,
  id,
  quantity,
  slug
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productData = {
    id,
    productImage,
    title,
    verity,
    isGold,
    price,
    wineType,
    quantity,
    slug
  };


  /* Get Carts */

//   const getCart = async () => {
//   const guestId = localStorage.getItem("guestId");
//   const token = localStorage.getItem("token");

//   if (token) {
//     const res = await axios.get("/cart", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return res.data.cart;
//   }

//   if (guestId) {
//     const res = await axios.get(`/cart?guestId=${guestId}`);
//     return res.data.cart;
//   }

//   return [];
// };


const handleAddToCart = async (e) => {
  e.stopPropagation();

  dispatch(add_to_cart({
    productId: id,
    quantity: quantity ? quantity : 1
  }));
  
  // const token = localStorage.getItem("token");
  // const token = null;
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5Mjk2N2VlYzAyMTQ0NTM1N2QyMDNiZCIsImZpcnN0TmFtZSI6IlZpc2lvbiIsImxhc3ROYW1lIjoiSW5mb3RlY2giLCJlbWFpbCI6InZpc2lvbjZAdGVzdC5jb20iLCJpYXQiOjE3NjQzMjEyNjIsImV4cCI6MTc2NDkyNjA2Mn0.BEjsVrBx7Nqkg0dboYNW-LGm37EW3xtAjEZUur3skdk";
  // let guestId = localStorage.getItem("guestId");

  // const productId = "6926c04475dea0195975d41a";
  // const quantity = 3;

  // try {
  //   const payload = { productId, quantity };

  //   // Attach guestId if available
  //   if (guestId) payload.guestId = guestId;

  //   const headers = token
  //     ? { Authorization: `Bearer ${token}` }
  //     : {};

  //   // -------------------------
  //   //  ⭐ SINGLE API CALL
  //   // -------------------------
  //   const res = await axios.post(
  //     "http://localhost:7000/cart/add",
  //     payload,
  //     { headers }
  //   );

  //   const data = res.data;

  //   // -------------------------
  //   // 1) HANDLE GUEST USER
  //   // -------------------------
  //   if (!token) {
  //     if (data.guestId) {
  //       localStorage.setItem("guestId", data.guestId);
  //     }
  //     console.log("Guest Cart:", data.cart);
  //     return;
  //   }

  //   // -------------------------
  //   // 2) HANDLE LOGGED-IN USER
  //   // -------------------------

  //   // If guest cart was merged or converted -> remove guestId
  //   if (guestId) {
  //     localStorage.removeItem("guestId");
  //   }

  //   // Save user cart ID if returned
  //   if (data.cart && data.cart.userId) {
  //     localStorage.setItem("userCartId", data.cart.userId);
  //   }

  //   console.log("User Cart:", data.cart);
  // } catch (err) {
  //   console.error("Cart error:", err?.response?.data || err);
  // }
};



const handleLogout = async (e) => {
  e.stopPropagation();

  const userCartId = localStorage.getItem("userCartId");

  if (userCartId) {
    await axios.post("http://localhost:7000/cart/convert-to-guest", {
      userCartId,
    });

    localStorage.setItem("guestId", userCartId);
  }

  // localStorage.removeItem("token");
  localStorage.removeItem("userCartId");
};




  return (
    <div
      onClick={() => navigate(`/products/${slug}`)}
      className="font-[Urbanist] flex flex-col gap-3 group cursor-pointer"
    > 
      {/* Image container */}
      <div className="relative h-[300px] md:h-[500px] xl:h-[600px] w-full bg-white p-8 flex justify-center items-center rounded-sm overflow-hidden">
        {/* <div onClick={handleLogout}>Logout</div> */}
        <img
          className="h-full w-full object-contain rounded-sm"
          src={productImage}
          alt={wineType}
        />

        {/* Hover button (initially hidden, slides up) */}
        <button
          onClick={handleAddToCart}
          // onClick={(e) => {
          //   e.stopPropagation();
          //   // dispatch(addToCart({product: productData, quantity: 1}));
          // }}
          className="
        absolute bottom-[-100px] left-1/2 -translate-x-1/2
        bg-[#EED291] text-black font-bold px-6 py-4 rounded-full
        transition-all duration-500 ease-in-out
        group-hover:bottom-4
        shadow-md hover:bg-[#6d0718] hover:text-[#EED291] uppercase w-full text-lg cursor-pointer
      "
        >
          Add To Cart
        </button>
      </div>

      {/* Text Section */}
      <div className="h-auto flex flex-col justify-between gap-3">
        <h1 className="text-xl font-semibold line-clamp-2">{title}</h1>

        <div className="flex flex-col lg:flex-row justify-between items-start">
          <div className="flex items-center gap-1">
            <p className="font-semibold text-gray-600">{verity}</p>
            <img src={grapes} alt="grapes" />
          </div>
          <p className="flex items-center gap-1">
            {isGold && (
              <img className="h-10 lg:h-14" src={gold_medal} alt="gold medal" />
            )}
            <span className="font-semibold text-gray-600">{wineType}</span>
          </p>
        </div>

        <span className="font-bold text-xl">$ {price}</span>
      </div>
    </div>
  );
};

export default Product;
