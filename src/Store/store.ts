import { configureStore } from "@reduxjs/toolkit";
import ProductsReduce from "./Products/product.slice"
import singleProductSReduce from "./SingleProduct/singleProduct.slice";
import  CartReduce from './Cart/cart.slice'

export const store = configureStore({
    reducer:{
        products:ProductsReduce,
        singleProduct:singleProductSReduce,
        cart:CartReduce
    }
})
