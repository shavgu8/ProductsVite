import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getData } from "./product.asyncActions";
import { Products } from "../../Static/type";

type InitialState = {
    data:Products[],
    rawData:Products[],
    status:"idle" | "loading" | "loaded" | "failed",
    error: string | undefined
}
const initialState:InitialState ={
    data:[],
    rawData:[],
    status:"idle",
    error:undefined
}

const ProductsSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        filterProductsByName:(state,action:PayloadAction<string>) =>{
            state.data = state.rawData.filter((item) =>{
                return item.category.includes(action.payload)
            })
            state.data=state.data.sort((a,b) =>{
                return Number(b.new)-Number(a.new)
            })
        }
    },
    extraReducers:(build) =>{
        build.addCase(getData.pending,(state) =>{
            state.status = 'loading',
            state.error = undefined
        }),
        build.addCase(getData.fulfilled,(state,action) =>{
            state.status ='loaded';
            if(action.payload){
                state.data =action.payload;
                state.rawData =action.payload
            }
        }),
        build.addCase(getData.rejected,(state,action) =>{
            state.status="failed";
            state.error = action.error.message
        })
    }
})

export default ProductsSlice.reducer
export const {filterProductsByName} = ProductsSlice.actions