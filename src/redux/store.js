import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer.jsx";

export const store = configureStore({
    reducer:{
        products: productReducer
    }
})