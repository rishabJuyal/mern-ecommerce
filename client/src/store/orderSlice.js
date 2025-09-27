import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// ---------------------------------------------
// 🔄 CREATE ORDER (Step 1)
// ---------------------------------------------
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/orders", orderData); // POST /orders
      return data.order; // Only returning the `order`
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// ---------------------------------------------
// ✅ PLACE ORDER (Step 2: finalize - COD / Stripe)
// ---------------------------------------------
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async ({ orderId }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/orders/place-order", { orderId });
      return data; // Can be order (COD) or { url } (Stripe)
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ---------------------------------------------
// 👤 GET LOGGED-IN USER ORDERS
// ---------------------------------------------
export const fetchMyOrders = createAsyncThunk(
  "orders/fetchMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/orders");
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// ---------------------------------------------
// 💳 Create Stripe Checkout Session (optional)
// ---------------------------------------------
export const createCheckoutSession = createAsyncThunk(
  "orders/createCheckoutSession",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/orders/create-checkout-session`, { orderId });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ---------------------------------------------
// 🧾 PAY ORDER (for testing/manual use)
// ---------------------------------------------
export const payOrder = createAsyncThunk(
  "orders/payOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/orders/${orderId}/pay`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ---------------------------------------------
// 🧠 SLICE
// ---------------------------------------------
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    myOrders: [],
    currentOrder: null,
    paymentClientSecret: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearOrderState: (state) => {
      state.currentOrder = null;
      state.paymentClientSecret = null;
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // ---------------------------------------------
      // CREATE ORDER
      // ---------------------------------------------
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ---------------------------------------------
      // PLACE ORDER (COD or Stripe)
      // ---------------------------------------------
      .addCase(placeOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = "succeeded";

        // If response has `url`, it's a Stripe payment
        if (action.payload?.url) {
          // We don’t set currentOrder here because Stripe redirects
          // and the success page will fetch again
        } else {
          // COD - update currentOrder state
          state.currentOrder = action.payload;
        }
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ---------------------------------------------
      // FETCH USER ORDERS
      // ---------------------------------------------
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.myOrders = action.payload;
      })

      // ---------------------------------------------
      // PAY ORDER
      // ---------------------------------------------
      .addCase(payOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload.order;
      })

      // ---------------------------------------------
      // STRIPE CHECKOUT SESSION (optional)
      // ---------------------------------------------
      .addCase(createCheckoutSession.fulfilled, (state, action) => {
        // Handled in frontend after redirect
      });
  },
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;
