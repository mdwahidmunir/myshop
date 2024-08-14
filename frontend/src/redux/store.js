import { configureStore } from "@reduxjs/toolkit";
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice'
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import shippingSlice from "./slices/shippingSlice";

const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        auth: authSlice,
        user: userSlice,
        shipping: shippingSlice
    },
    // Add this middleware to resolve the serialization issue happening while incorrect auth in authSlice
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export default store;
