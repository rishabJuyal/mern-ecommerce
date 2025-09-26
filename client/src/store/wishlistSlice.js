import { createSlice } from "@reduxjs/toolkit";
import reducer from "./authSlice";

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        val:0,
        response: null,
        loading : null,
    },
    reducers:{
        INC : (state,action)=>{
            state.val =action.payload;
        }
    }
})

export const {INC} = wishlistSlice.actions;
export default wishlistSlice.reducer; 