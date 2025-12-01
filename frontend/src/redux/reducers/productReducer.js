import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
import { toast } from "react-toastify";
import axios from "axios";

const allPostsSlice = createSlice({
  name: "allCourses",
  initialState: {
    allProducts: [],
    cart: [],
    isCartOpen: false,
    featuredProducts: [
      {
        id: 1,
        productImage: product1,
        title: "Bergdolt, Reif & Nett Breakaway Merlot Dealcoholized",
        verity: "Grape Verity",
        isGold: true,
        price: 29.76,
        productType: "Bergdolt, Reif & Nett",
        wineType: "Merlot",
        quantity: 1,
        slug: "bergdolt,-reif-&-nett",
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
        quantity: 1,
        slug: "bergdolt,-reif-&-nett",
      },
    ],
  },

  reducers: {
    getAllproducts: (state, action) => {
      state.allProducts = action.payload;
    },
    addToCart: (state, action) => {
      state.cart = action.payload;
      state.isCartOpen = true;
      // const { product, quantity } = action.payload;
      // toast.success("Product Added!");

      // const existingItem = state.cart.find((item) => item.id === product.id);

      // if (existingItem) {
      //   existingItem.quantity += 1;
      //   state.isCartOpen = true;
      // } else {
      //   state.cart.push({ ...product, quantity: quantity ? quantity : 1 });
      //   state.isCartOpen = true;
      // }
    },

    removeFromCart: (state, action) => {
      toast.success("Product Removed!");
      const id = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
    },

    increaseQty: (state, action) => {
      toast.success("Increment Quantity!");
      const id = action.payload;
      const item = state.cart.find((item) => item.id === id);
      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQty: (state, action) => {
      toast.success("Decrement Quantity!");
      const id = action.payload;
      const item = state.cart.find((item) => item.id === id);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cart = state.cart.filter((item) => item.id !== id);
      }
    },

    toggleCartDrawer: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const get_all_products = createAsyncThunk(
  "get_all_products",
  (data, { dispatch }) => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/product/get-all-products`)
      .then((res) => {
        dispatch(getAllproducts(res.data.data));
      });
  }
);

export const add_to_cart = createAsyncThunk(
  "add_to_cart",
  async ({ productId, quantity }, { dispatch }) => {
    try {
      // const token = localStorage.getItem("token");
      // const token = null;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5Mjk2N2VlYzAyMTQ0NTM1N2QyMDNiZCIsImZpcnN0TmFtZSI6IlZpc2lvbiIsImxhc3ROYW1lIjoiSW5mb3RlY2giLCJlbWFpbCI6InZpc2lvbjZAdGVzdC5jb20iLCJpYXQiOjE3NjQzMjEyNjIsImV4cCI6MTc2NDkyNjA2Mn0.BEjsVrBx7Nqkg0dboYNW-LGm37EW3xtAjEZUur3skdk";
      let guestId = localStorage.getItem("guestId");

      const payload = { productId, quantity };
      if (guestId) payload.guestId = guestId;

      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/cart/add`,
        payload,
        { headers }
      );

      const data = res.data;

      // ---------------------------
      // ⭐ UPDATE LOCAL STORAGE
      // ---------------------------

      if (!token && data.guestId) {
        localStorage.setItem("guestId", data.guestId);
      }

      if (token && guestId) {
        localStorage.removeItem("guestId");
      }

      if (data.cart?.userId) {
        localStorage.setItem("userCartId", data.cart.userId);
      }

      // ---------------------------
      // PUSH cart to redux
      // ---------------------------
      dispatch(addToCart(data.cart.items));

      return data.cart.items;
    } catch (err) {
      console.log("Add-to-cart error:", err.response?.data || err);
      throw err;
    }
  }
);

export const {
  getAllproducts,
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  toggleCartDrawer,
} = allPostsSlice.actions;

export default allPostsSlice.reducer;
