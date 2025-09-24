import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// Async thunks
export const register = createAsyncThunk(
    "auth/register",
    async ({ username, password }, thunkAPI) => {
        console.log("register thunk called with:", username, password);
        try {
            const res = await api.post("/auth/register", { username, password });
            console.log("register response:", res.data);
            return res.data.accessToken;
        } catch (err) {
            console.log("register error:", err.response || err);
            return thunkAPI.rejectWithValue(err.response?.data || "Registration failed");
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async ({ username, password }, thunkAPI) => {
        console.log("login thunk called with:", username, password);
        try {
            const res = await api.post("/auth/login", { username, password });
            console.log("login response:", res.data);
            return res.data.jwt;
        } catch (err) {
            console.log("login error:", err.response || err);
            return thunkAPI.rejectWithValue(err.response?.data || "Login failed");
        }
    }
);


export const refreshToken = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
    try {
        const res = await api.post("/auth/refresh");
        return res.data.accessToken;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || "Refresh failed");
    }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        await api.post("/auth/logout");
        return true;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || "Logout failed");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        accessToken: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearAuth: (state) => {
            state.accessToken = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.accessToken = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.accessToken = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // refresh
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.accessToken = action.payload;
            })
            .addCase(refreshToken.rejected, (state) => {
                state.accessToken = null;
            })

            // logout
            .addCase(logout.fulfilled, (state) => {
                state.accessToken = null;
            });
    },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
