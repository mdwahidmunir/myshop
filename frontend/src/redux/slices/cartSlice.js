import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _axios from "../../utils/axiosHelper";
import { SHIPPING_CHARGE, TAX } from "../../utils/constants";

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ id, qty }, thunkApi) => {
        try {
            const response = await _axios.get(`/products/${id}`);
            const data = { ...response.data.response, qty: Number(qty) } // response.data.response is the product detail from backend and we are adding qty to it
            return data
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.message)
        }
    }
)

const cartItemFromStorage = JSON.parse(localStorage.getItem('cart')) || []
const initialCartItems = cartItemFromStorage.length !== 0 ? cartItemFromStorage : []
const totalItems = initialCartItems ? initialCartItems.reduce((acc, item) => acc + item.qty, 0) : 0
const totalItemsPrice = initialCartItems ? +(initialCartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2)) : 0
const taxAmt = +(TAX * totalItemsPrice).toFixed(2)
const totalPayableAmt = (totalItemsPrice + taxAmt + SHIPPING_CHARGE).toFixed(2)


const initialState = {
    cartItems: initialCartItems,
    loading: true,
    error: null,
    totalItemsPrice,
    totalItems,
    taxAmt,
    totalPayableAmt
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload)
            state.totalItems = state.cartItems.reduce((acc, item) => acc + item.qty, 0)
            state.totalItemsPrice = +(state.cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2))
            state.taxAmt = +(TAX * state.totalItemsPrice).toFixed(2)
            state.totalPayableAmt = (state.totalItemsPrice + state.taxAmt + SHIPPING_CHARGE).toFixed(2)
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.loading = true
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                const currentItem = action.payload
                const existItem = state.cartItems.find(product => product._id === currentItem._id)

                state.loading = false
                state.error = null
                if (existItem) {
                    const cartIndex = state.cartItems.indexOf(existItem)
                    state.cartItems[cartIndex] = currentItem
                }
                else {
                    state.cartItems.push(currentItem)
                }
                state.totalItems = state.cartItems.reduce((acc, item) => acc + item.qty, 0)
                state.totalItemsPrice = +(state.cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2))
                state.taxAmt = +(TAX * state.totalItemsPrice).toFixed(2)
                state.totalPayableAmt = (state.totalItemsPrice + state.taxAmt + SHIPPING_CHARGE).toFixed(2)

                state.cartItems.length !== 0 && localStorage.setItem('cart', JSON.stringify(state.cartItems))
            })
    }
})

export const { removeFromCart } = cartSlice.actions
export default cartSlice.reducer