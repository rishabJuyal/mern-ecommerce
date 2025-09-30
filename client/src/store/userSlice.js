import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api"; // Your API wrapper (Axios etc)

// Fetch user profile with addresses
export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/users/me");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to fetch user");
    }
  }
);

// Add new address
export const addAddress = createAsyncThunk(
  "user/addAddress",
  async (addressData, thunkAPI) => {
    try {
      const res = await api.post("/users/address", addressData);
      return res.data; // Should return updated address or user data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to add address");
    }
  }
);

// Update existing address
export const updateAddress = createAsyncThunk(
  "user/updateAddress",
  async ({ addressId, ...addressData }, thunkAPI) => {
    try {
      const res = await api.put(`/users/address/${addressId}`, addressData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to update address");
    }
  }
);

// Delete address
export const deleteAddress = createAsyncThunk(
  "user/deleteAddress",
  async (addressId, thunkAPI) => {
    try {
      await api.delete(`/users/address/${addressId}`);
      return addressId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to delete address");
    }
  }
);

// Set default address
export const setDefaultAddress = createAsyncThunk(
  "user/setDefaultAddress",
  async (addressId, thunkAPI) => {
    try {
      const res = await api.patch(`/users/address/${addressId}/default`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to set default address");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUserError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
            state.profile.address = action.payload.addresses; // assuming backend returns updated addresses list
        }
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
            state.profile.address = action.payload.addresses; // assuming backend returns updated addresses list
        }
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile.address = state.profile.address.filter(a => a._id !== action.payload);
        }
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(setDefaultAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setDefaultAddress.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile.address = action.payload.addresses; // assuming backend returns updated addresses list
        }
      })
      .addCase(setDefaultAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;
