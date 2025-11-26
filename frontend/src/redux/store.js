import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import blogReducer from "./reducers/blogReducer";

export const store = configureStore({
    reducer:{
        products: productReducer,
        blogs: blogReducer
    }
})