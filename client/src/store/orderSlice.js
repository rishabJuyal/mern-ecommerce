import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// 1. Place Order
export const placeOrder = createAsyncThunk("order/place", async (orderData, thunkAPI) => {
  try {
    const res = await api.post("/orders", orderData);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Order creation failed");
  }
});

// 2. Fetch My Orders
export const fetchMyOrders = createAsyncThunk("order/fetchMy", async (_, thunkAPI) => {
  try {
    const res = await api.get("/orders");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Failed to load orders");
  }
});

// 3. Pay Order
export const payOrder = createAsyncThunk("order/pay", async (orderId, thunkAPI) => {
  try {
    const res = await api.post(`/orders/${orderId}/pay`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Payment failed");
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearOrderState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Order placed successfully";
        state.currentOrder = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(payOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(payOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Payment successful";
        state.currentOrder = action.payload.order;
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;
