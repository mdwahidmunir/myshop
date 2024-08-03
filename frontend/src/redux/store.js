import { configureStore } from "@reduxjs/toolkit";
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice'
import authSlice from "./slices/authSlice";

const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        auth: authSlice,
    },
    // Add this middleware to resolve the serialization issue happening while incorrect auth in authSlice
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export default store;
