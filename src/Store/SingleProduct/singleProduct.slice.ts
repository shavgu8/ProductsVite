import { createSlice } from "@reduxjs/toolkit";
import { Products } from "../../Static/type";
import { getSingleProductData } from "./singleProduct.asyncActions";

type InitialState = {
    singleData: Products | null,
    cartData:Products[],
    status: "idle" | "loading" | "loaded" | "failed",
    error: string | undefined
}

const initialState: InitialState = {
    singleData: null,
    cartData:[],
    status: "idle",
    error: undefined
}

export const SingleProductSlice = createSlice({
    name: "singleProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSingleProductData.pending, (state) => {
            state.status = "loading";
            state.error = undefined;
        });
        builder.addCase(getSingleProductData.fulfilled, (state, action) => {
            state.status = "loaded";
            state.singleData = action.payload || null;
        });
        builder.addCase(getSingleProductData.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
    }
});

export default SingleProductSlice.reducer;