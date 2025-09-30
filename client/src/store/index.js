import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
import orderReducer from "./orderSlice";
import userReducer from "./userSlice";

// import wishlistReducer from "./wishlistSlice";
// import orderReducer from "./orderSlice";
// import walletReducer from "./walletSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
    orders: orderReducer,
    user:userReducer,
  },
});

export default store;
