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
      
    ],
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

    // removeFromCart: (state, action) => {
    //   toast.success("Product Removed!");
    //   const id = action.payload;
    //   state.cart = state.cart.filter((item) => item.id !== id);
    // },

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

export const get_featured_products = createAsyncThunk(
  "get_all_products",
  (data, { dispatch }) => {
    const limit = 2;
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/product/get-featured-products?limit=${limit}`)
      .then((res) => {
        dispatch(getFeaturedProducts(res.data.data));
      });
  }
);

export const get_all_carts = createAsyncThunk(
  "get_all_carts",
  async (_, { dispatch }) => {
    try {
      const token = localStorage.getItem(import.meta.env.VITE_WINE_TOKEN);
      const guestId = localStorage.getItem("guestId");

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/cart/get-carts`,
        {
          params: { guestId },
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        }
      );

      dispatch(getAllCarts(res.data.cart.items));

      return res.data.cart.items;

    } catch (err) {
      console.log("Get carts error:", err.response?.data || err);
      throw err;
    }
  }
);

export const add_to_cart = createAsyncThunk(
  "add_to_cart",
  async ({ productId, quantity }, { dispatch }) => {
    try {
      const token = localStorage.getItem(import.meta.env.VITE_WINE_TOKEN);
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

      // UPDATE LOCAL STORAGE

      if (!token && data.guestId) {
        localStorage.setItem("guestId", data.guestId);
      }

      if (token && guestId) {
        localStorage.removeItem("guestId");
      }

      if (data.cart?.userId) {
        localStorage.setItem("userCartId", data.cart.userId);
      }

      dispatch(toggleCartDrawer());
      dispatch(get_all_carts());

      return data.cart.items;
    } catch (err) {
      console.log("Add-to-cart error:", err.response?.data || err);
      throw err;
    }
  }
);

export const remove_from_cart = createAsyncThunk(
  "remove_from_cart",
  async ({ productId }, { dispatch }) => {
    try {
      const payload = { productId };
      const guestId = localStorage.getItem("guestId");
      const token = localStorage.getItem(
        import.meta.env.VITE_WINE_TOKEN || null
      );

      if (!token && guestId) payload.guestId = guestId;

      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      // CALL REAL REMOVE API
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/cart/remove-cart`,
        {
          data: payload,
          headers,
        }
      );

      const data = res.data;

      // If cart deleted completely → remove guestId
      if (data.cart === null) {
        localStorage.removeItem("guestId");
      }

      // FETCH UPDATED CARTS
      dispatch(get_all_carts());
      dispatch(get_all_products());

      toast.success("Product removed!");

      return data.cart;
    } catch (err) {
      console.log("Remove-from-cart error:", err.response?.data || err);
      throw err;
    }
  }
);

export const increment_quantity = createAsyncThunk(
  "increment_quantity",
  async ({ productId }, { dispatch }) => {
    try {
      const token = localStorage.getItem(
        import.meta.env.VITE_WINE_TOKEN || null
      );
      const guestId = localStorage.getItem("guestId");

      const payload = { productId, type: "inc" };
      if (!token && guestId) payload.guestId = guestId;

      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/cart/update-quantity`,
        payload,
        { headers }
      );

      dispatch(get_all_carts());
      return res.data.cart;
    } catch (err) {
      console.log("Increment error:", err.response?.data || err);
      throw err;
    }
  }
);

export const decrement_quantity = createAsyncThunk(
  "decrement_quantity",
  async ({ productId }, { dispatch }) => {
    try {
      const token = localStorage.getItem(
        import.meta.env.VITE_WINE_TOKEN || null
      );
      const guestId = localStorage.getItem("guestId");

      const payload = { productId, type: "dec" };
      if (!token && guestId) payload.guestId = guestId;

      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/cart/update-quantity`,
        payload,
        { headers }
      );

      // if cart becomes empty → backend returns empty items
      // if guest is empty, delete guestId
      if (res.data.cart?.items?.length === 0) {
        localStorage.removeItem("guestId");
      }

      dispatch(get_all_carts());
      return res.data.cart;
    } catch (err) {
      console.log("Decrement error:", err.response?.data || err);
      throw err;
    }
  }
);

export const {
  getAllproducts,
  getFeaturedProducts,
  getAllCarts,
  addToCart,
  removeFromCart,
  toggleCartDrawer,
} = allPostsSlice.actions;

export default allPostsSlice.reducer;
