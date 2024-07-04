import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _axios from "../../utils/axiosHelper";

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

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: initialCartItems,
        loading: true,
        error: null
    },
    reducers: {
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload)
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
                state.cartItems.length !== 0 && localStorage.setItem('cart', JSON.stringify(state.cartItems))
            })
    }
})

export const { removeFromCart } = cartSlice.actions
export default cartSlice.reducer