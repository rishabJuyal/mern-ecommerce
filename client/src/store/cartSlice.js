// ✅ Updated cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// Fetch Cart
export const fetchCart = createAsyncThunk("cart/fetch", async (_, thunkAPI) => {
  try {
    const res = await api.get("/cart");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Failed to fetch cart");
  }
});

// Add to Cart
export const addToCart = createAsyncThunk("cart/add", async ({ productId, quantity }, thunkAPI) => {
  try {
    await api.post("/cart", { productId, quantity });
    thunkAPI.dispatch(fetchCart()); // ⬅️ Refresh cart after action
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Failed to add to cart");
  }
});

// Update Quantity
export const updateCartItem = createAsyncThunk("cart/update", async ({ productId, quantity }, thunkAPI) => {
  try {
    await api.put("/cart", { productId, quantity });
    thunkAPI.dispatch(fetchCart()); // ⬅️ Refresh cart after update
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Failed to update cart item");
  }
});

// Remove Cart Item
export const removeCartItem = createAsyncThunk("cart/remove", async (productId, thunkAPI) => {
  try {
    await api.delete(`/cart/${productId}`);
    thunkAPI.dispatch(fetchCart()); // ⬅️ Refresh cart after removal
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Failed to remove cart item");
  }
});

const initialState = {
  items: [],
  loading: false,
  error: null,
  success: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
    resetCart: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Only show loading/error for add/update/remove — don't update state directly
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.loading = false;
        state.success = "Product added to cart";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state) => {
        state.loading = false;
        state.success = "Cart updated";
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state) => {
        state.loading = false;
        state.success = "Item removed";
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCartState, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
