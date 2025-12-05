import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import product1 from "/products/product1.png";
// import product2 from "/products/product2.png";
// import product3 from "/products/product3.png";
// import product4 from "/products/product4.png";
// import product5 from "/products/product5.png";
// import product6 from "/products/product6.png";
// import product7 from "/products/product7.png";
// import product8 from "/products/product8.png";
// import product9 from "/products/product9.png";
// import product10 from "/products/product10.png";
// import product11 from "/products/product11.png";
// import product12 from "/products/product12.png";
// import product13 from "/products/product13.png";
// import product14 from "/products/product14.png";
// import product15 from "/products/product15.png";
import { toast } from "react-toastify";
import axios from "axios";

const allPostsSlice = createSlice({
  name: "allCourses",
  initialState: {
    allProducts: [],
    cart: [],
    isCartOpen: false,
    featuredProducts: [],
  },

  reducers: {
    getAllproducts: (state, action) => {
      state.allProducts = action.payload;
    },
    getAllCarts: (state, action) => {
      state.cart = action.payload;
    },
    getFeaturedProducts: (state, action) => {
      state.featuredProducts = action.payload;
    },
    toggleCartDrawer: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

/* GET ALL Products */
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

/* GET Featured Products */
export const get_featured_products = createAsyncThunk(
  "get_featured_products",
  (limit, { dispatch }) => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/product/get-featured-products?limit=${limit}`
      )
      .then((res) => {
        dispatch(getFeaturedProducts(res.data.data));
      });
  }
);

/* GET ALL CARTS */
export const get_all_carts = createAsyncThunk(
  "get_all_carts",
  async (_, { dispatch }) => {
    try {
      const token = localStorage.getItem(import.meta.env.VITE_WINE_TOKEN);
      const guestId = localStorage.getItem("guestId");

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/cart/get-carts`,
        {
          params: token ? {} : { guestId },
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      // console.log(res.data,'res.data')

      dispatch(getAllCarts(res.data.cart.items || []));
      return res.data.cart.items;
    } catch (err) {
      console.log("Cart Load Error:", err);
    }
  }
);

/* ADD TO CART: USER + GUEST */
export const add_to_cart = createAsyncThunk(
  "add_to_cart",
  async ({ productId, quantity }, { dispatch }) => {
    try {
      const token = localStorage.getItem(import.meta.env.VITE_WINE_TOKEN);
      let guestId = localStorage.getItem("guestId");

      const payload = { productId, quantity };
      if (!token && guestId) payload.guestId = guestId;

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/cart/add`,
        payload,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      // If backend assigns new guestId
      if (res.data.assignedGuestId) {
        localStorage.setItem("guestId", res.data.assignedGuestId);
      }

      dispatch(toggleCartDrawer());
      dispatch(get_all_carts());
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      throw err;
    }
  }
);

/* REMOVE FROM CART */
export const remove_from_cart = createAsyncThunk(
  "remove_from_cart",
  async ({ productId }, { dispatch }) => {
    try {
      const token = localStorage.getItem(import.meta.env.VITE_WINE_TOKEN);
      const guestId = localStorage.getItem("guestId");

      const payload = { productId };
      if (!token && guestId) payload.guestId = guestId;

      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/cart/remove-cart`,
        {
          data: payload,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      dispatch(get_all_carts());
      toast.success("Product removed!");
    } catch (err) {
      console.log("Remove error:", err);
      throw err;
    }
  }
);

/* INCREMENT QTY */
export const increment_quantity = createAsyncThunk(
  "increment_quantity",
  async ({ productId }, { dispatch }) => {
    try {
      const token = localStorage.getItem(import.meta.env.VITE_WINE_TOKEN);
      const guestId = localStorage.getItem("guestId");

      const payload = { productId, type: "inc" };
      if (!token && guestId) payload.guestId = guestId;

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/cart/update-quantity`,
        payload,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      dispatch(get_all_carts());
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      throw err;
    }
  }
);

/* DECREMENT QTY */
export const decrement_quantity = createAsyncThunk(
  "decrement_quantity",
  async ({ productId }, { dispatch }) => {
    try {
      const token = localStorage.getItem(import.meta.env.VITE_WINE_TOKEN);
      const guestId = localStorage.getItem("guestId");

      const payload = { productId, type: "dec" };
      if (!token && guestId) payload.guestId = guestId;

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/cart/update-quantity`,
        payload,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      dispatch(get_all_carts());
    } catch (err) {
      console.log("Dec error:", err);
      throw err;
    }
  }
);

export const {
  getAllproducts,
  getFeaturedProducts,
  getAllCarts,
  toggleCartDrawer,
} = allPostsSlice.actions;

export default allPostsSlice.reducer;
