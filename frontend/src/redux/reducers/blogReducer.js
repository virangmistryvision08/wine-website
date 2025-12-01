import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allBlogs: [],
};

const blogReducer = createSlice({
  name: "blog",
  initialState,
  reducers: {
    getAllBlogs: (state, action) => {
      state.allBlogs = action.payload;
    },
  },
});

export const get_all_blogs = createAsyncThunk(
  "get_all_blogs",
  (data, { dispatch }) => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/blog/get-all-blogs`)
      .then((res) => {
        dispatch(getAllBlogs(res.data.data));
      })
      .catch((error) => {
        console.log(error, "error");
      });
  }
);

export const { getAllBlogs } = blogReducer.actions;

export default blogReducer.reducer;
