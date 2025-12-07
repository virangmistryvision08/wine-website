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
import ToastMessage from "../../components/toastMessage/toastMessage";
import axios from "../../intercepter/axiosInstance";

const allPostsSlice = createSlice({
  name: "allCourses",
  initialState: {
    allProducts: [],
    cart: [],
    isCartOpen: false,
    featuredProducts: [],
    popularProducts: [],
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
    getPopularProducts: (state, action) => {
      state.popularProducts = action.payload;
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
      .get(`/product/get-all-products`)
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
        `/product/get-featured-products?limit=${limit}`
      )
      .then((res) => {
        dispatch(getFeaturedProducts(res.data.data));
      });
  }
);

/* GET Popular Products */
export const get_popular_products = createAsyncThunk(
  "get_popular_products",
  (limit, { dispatch }) => {
    axios
      .get(
        `/product/get-popular-products?limit=${limit}`
      )
      .then((res) => {
        dispatch(getPopularProducts(res.data.data));
      }).catch((error) => {
        console.log(error,'error');
      });
  }
);

/* GET ALL CARTS */
export const get_all_carts = createAsyncThunk(
  "get_all_carts",
  async (_, { dispatch }) => {
    try {

      const res = await axios.get(
        `/cart/get-carts`
      );

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
      const res = await axios.post(
        `/cart/add`,{ productId, quantity });

      // If backend assigns new guestId
      if (res.data.assignedGuestId) {
        localStorage.setItem("guestId", res.data.assignedGuestId);
      }

      dispatch(toggleCartDrawer());
      dispatch(get_all_carts());
    } catch (err) {
      ToastMessage.error(err.response?.data?.message || err.message);
      throw err;
    }
  }
);

/* REMOVE FROM CART */
export const remove_from_cart = createAsyncThunk(
  "remove_from_cart",
  async ({ productId }, { dispatch }) => {
    try {
      await axios.delete(`/cart/remove-cart`, {
        data: { productId },
      });

      dispatch(get_all_carts());
      ToastMessage.success("Product removed!");
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
      await axios.post(`/cart/update-quantity`, {
        productId,
        type: "inc",
      });

      dispatch(get_all_carts());
    } catch (err) {
      ToastMessage.error(err.response?.data?.message || err.message);
      throw err;
    }
  }
);


/* DECREMENT QTY */
export const decrement_quantity = createAsyncThunk(
  "decrement_quantity",
  async ({ productId }, { dispatch }) => {
    try {
      await axios.post(`/cart/update-quantity`, {
        productId,
        type: "dec",
      });

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
  getPopularProducts,
  getAllCarts,
  toggleCartDrawer,
} = allPostsSlice.actions;

export default allPostsSlice.reducer;
