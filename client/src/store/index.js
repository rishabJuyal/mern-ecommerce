import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
// import wishlistReducer from "./wishlistSlice";
// import orderReducer from "./orderSlice";
// import walletReducer from "./walletSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;
