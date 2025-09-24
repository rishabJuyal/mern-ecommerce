import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/products");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to fetch products");
    }
  }
);

// Fetch single product by ID
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id, thunkAPI) => {
    try {
      const res = await api.get(`/products/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to fetch product");
    }
  }
);

// Create a new product (admin only)
export const createProduct = createAsyncThunk(
  "products/create",
  async (productData, thunkAPI) => {
    try {
      const res = await api.post("/products", productData, {
        headers: { "Content-Type": "multipart/form-data" }, // for images upload
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to create product");
    }
  }
);

// Update existing product by ID (admin only)
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, updateData }, thunkAPI) => {
    try {
      const res = await api.put(`/products/${id}`, updateData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to update product");
    }
  }
);

// Delete product by ID (admin only)
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/products/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to delete product");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,

    loadingAll: false,
    errorAll: null,

    loadingSelected: false,
    errorSelected: null,

    success: null,
  },
  reducers: {
    clearProductState: (state) => {
      state.loadingAll = false;
      state.errorAll = null;
      state.loadingSelected = false;
      state.errorSelected = null;
      state.success = null;
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loadingAll = true;
        state.errorAll = null;
        state.success = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loadingAll = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loadingAll = false;
        state.errorAll = action.payload;
      })

      // fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loadingSelected = true;
        state.errorSelected = null;
        state.success = null;
        state.selectedProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loadingSelected = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loadingSelected = false;
        state.errorSelected = action.payload;
      })

      // create product
      .addCase(createProduct.pending, (state) => {
        state.loadingAll = true;
        state.errorAll = null;
        state.success = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loadingAll = false;
        state.products.push(action.payload);
        state.success = "Product created successfully";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loadingAll = false;
        state.errorAll = action.payload;
      })

      // update product
      .addCase(updateProduct.pending, (state) => {
        state.loadingAll = true;
        state.errorAll = null;
        state.success = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loadingAll = false;
        const index = state.products.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.success = "Product updated successfully";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loadingAll = false;
        state.errorAll = action.payload;
      })

      // delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loadingAll = true;
        state.errorAll = null;
        state.success = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loadingAll = false;
        state.products = state.products.filter(p => p._id !== action.payload);
        state.success = "Product deleted successfully";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loadingAll = false;
        state.errorAll = action.payload;
      });
  },
});

export const { clearProductState } = productSlice.actions;
export default productSlice.reducer;
