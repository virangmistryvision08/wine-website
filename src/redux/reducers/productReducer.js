import { createSlice } from "@reduxjs/toolkit";
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

const allPostsSlice = createSlice({
  name: "allCourses",
  initialState: {
    allProducts: [
      {
        id: 1,
        productImage: product1,
        title: "Bergdolt, Reif & Nett Breakaway Merlot Dealcoholized",
        verity: "Grape Verity",
        isGold: true,
        price: 29.76,
        productType: "Bergdolt, Reif & Nett",
        wineType: "Merlot",
        quantity: 0,
      },
      {
        id: 2,
        productImage: product2,
        title: "Bergdolt, Reif & Nett Breakaway Pinot NoirDealcoholized",
        verity: "Grape Verity",
        isGold: false,
        price: 29.38,
        productType: "Bergdolt, Reif & Nett",
        wineType: "Pinot Noir",
        quantity: 0,
      },
      {
        id: 3,
        productImage: product3,
        title:
          "Bergdolt, Reif & Nett Reverse Sauvignon Blanc(vegan) Dealalcoolized",
        verity: "Grape Verity",
        isGold: false,
        price: 25.76,
        productType: "Bergdolt, Reif & Nett",
        wineType: "Sauvignon Blanc",
        quantity: 0,
      },
      {
        id: 4,
        productImage: product4,
        title: "Bergdolt, Reif & Nett Reverse GewurztraminerDealcoholized",
        verity: "Grape Verity",
        isGold: false,
        price: 29.38,
        productType: "Bergdolt, Reif & Nett",
        wineType: "Gewurztraminer",
        quantity: 0,
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
        quantity: 0,
      },
      {
        id: 6,
        productImage: product6,
        title: "Bergdolt, Reif & Nett Reverse Riesling (vegan) Dealcoholized",
        verity: "Grape Verity",
        isGold: false,
        price: 27.16,
        productType: "Bergdolt, Reif & Nett",
        wineType: "Riesling",
        quantity: 0,
      },
      {
        id: 7,
        productImage: product7,
        title: "Lamm-Jung Riesling Dealcoholized (Vegan)",
        verity: "Grape Verity",
        isGold: true,
        price: 26.97,
        productType: "Lamm Jung",
        wineType: "Riesling",
        quantity: 0,
      },
      {
        id: 8,
        productImage: product8,
        title:
          "KvD Strauch Sektmanufaktur GmbH Rouge Pur Alkoholfrei Dealcoholized",
        verity: "Grape Verity",
        isGold: false,
        price: 26.97,
        productType: "KvD Strauch Sektmanufaktur",
        wineType: "rouge Pur",
        quantity: 0,
      },
      {
        id: 9,
        productImage: product9,
        title: "Chateau Clos de Bouard Eden dealcoholized",
        verity: "Grape Verity",
        isGold: false,
        price: 33.61,
        productType: "Chateau Clos de Bouard",
        wineType: "Sauvignon Blanc",
        quantity: 0,
      },
      {
        id: 10,
        productImage: product10,
        title: "Chateau Clos de Bouard Prince Oscar dealcoholized",
        verity: "Grape Verity",
        isGold: false,
        price: 32.67,
        productType: "Chateau Clos de Bouard",
        wineType: "80 % Merlot,",
        quantity: 0,
        // wineType: (
        // quantity:0
        //   <>
        //     <p>80 % Merlot,</p>
        //     <p>15 % Cabernet Franc,</p>
        //     <p>5 % Cabernet Sauvignon</p>
        //   </>
        // ),
      },
      {
        id: 11,
        productImage: product11,
        title: "Matthias Anton Blanc de Blancs sparkling (vegan) Dealcoholized",
        verity: "Grape Verity",
        isGold: false,
        price: 27.19,
        productType: "Matthias Anton",
        wineType: "Riesling",
        quantity: 0,
      },
      {
        id: 12,
        productImage: product12,
        title: "Matthias Anton Pinot Grigio (vegan) – Dealcoholized",
        verity: "Grape Verity",
        isGold: false,
        price: 25.61,
        productType: "Matthias Anton",
        wineType: "Pinot Grigio",
        quantity: 0,
      },
      {
        id: 13,
        productImage: product13,
        title: "Matthias Anton Rosé (vegan) Dealcoholized",
        verity: "Grape Verity",
        isGold: false,
        price: 25.61,
        productType: "Matthias Anton",
        wineType: "Pinot Noir",
        quantity: 0,
      },
      {
        id: 14,
        productImage: product14,
        title: "Matthias Anton Rosé Sparkling (vegan) Dealcoholized",
        verity: "Grape Verity",
        isGold: false,
        price: 28.19,
        productType: "Matthias Anton",
        wineType: "Pinot Noir",
        quantity: 0,
      },
      {
        id: 15,
        productImage: product15,
        title: "Matthias Anton Sauvignon Blanc (vegan) Dealcoholized",
        verity: "Grape Verity",
        isGold: false,
        price: 25.61,
        productType: "Matthias Anton",
        wineType: "Sauvignon Blanc",
        quantity: 0,
      },
    ],
    cart: [],
    isCartOpen: false,
  },

  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      toast.success("Product Added!")

      const existingItem = state.cart.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
        state.isCartOpen = true;
      } else {
        state.cart.push({ ...product, quantity: quantity ? quantity : 1 });
        state.isCartOpen = true;
      }
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

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  toggleCartDrawer,
} = allPostsSlice.actions;

export default allPostsSlice.reducer;
