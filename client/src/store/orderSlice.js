import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// Create Order
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/orders", orderData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Get Logged-in User Orders
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

// Pay Order (Test only)
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

// Create Stripe Payment Intent
export const createPaymentIntent = createAsyncThunk(
  "orders/createPaymentIntent",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/orders/create-payment-intent`, { orderId });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Create Stripe Checkout Session
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
      // createOrder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // fetchMyOrders
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.myOrders = action.payload;
      })
      // payOrder
      .addCase(payOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload.order;
      })
      // createPaymentIntent
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.paymentClientSecret = action.payload.clientSecret;
      });
  },
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;
