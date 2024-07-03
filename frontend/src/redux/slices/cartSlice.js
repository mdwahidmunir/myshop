import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _axios from "../../utils/axiosHelper";

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ id, qty }, thunkApi) => {
        try {
            const response = await _axios.get(`/products/${id}`);
            const data = { ...response.data.response, qty } // response.data.response is the product detail from backend and we are adding qty to it
            return data
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.message)
        }
    }
)
export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        loading: true,
        error: null
    },
    reducers: {},
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
                const existItem = state.cart.find(product => product._id === currentItem._id)

                state.loading = false
                state.error = null
                if (existItem) {
                    const cartIndex = state.cart.indexOf(existItem)
                    state.cart[cartIndex] = currentItem
                }
                else {
                    state.cart.push(currentItem)
                }
                state.cart.length !== 0 && localStorage.setItem('cart', JSON.stringify(state.cart))
            })
    }
})

export default cartSlice.reducer