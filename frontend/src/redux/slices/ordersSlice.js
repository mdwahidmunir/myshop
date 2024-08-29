import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _axios from "../../utils/axiosHelper";
import { logout } from "./authSlice";


export const getOrdersAsync = createAsyncThunk(
    'orders/getOrders',
    async (_, thunkAPI) => {
        try {
            const response = await _axios.get('/orders', { withCredentials: true })
            return response.data.response
        }
        catch (err) {
            console.log(err)
            if (err.response.status === 401 || err.response.status === 403) {
                thunkAPI.dispatch(logout());
            }
            else {
                const responseFromBackEndServer = err.response.data.error || err.message
                if (responseFromBackEndServer)
                    err.message = responseFromBackEndServer
            }
            return thunkAPI.rejectWithValue(err)
        }
    }
)

const initialState = {
    loading: false,
    error: null,
    orders: [],
    currentOrder: null,
    // user: {},
    // shippingAddress: {},
    // paymentMethod: null,
    // itemsPrice: 0,
    // taxPrice: 0,
    // shippingPrice: 0,
    // totalPrice: 0,
    // isPaid: false,
    // orderId: null,
    // createdAt: null,
    // updatedAt: null,
}
const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        resetError: (state) => { state.error = null }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrdersAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(getOrdersAsync.rejected, (state, action) => {
                state.loading = false
                const errorStatusCode = action.payload.response.status

                if (errorStatusCode === 401 || errorStatusCode === 403)
                    state.error = null
                else
                    state.error = action.payload.message || action.payload
            })
            .addCase(getOrdersAsync.fulfilled, (state, action) => {
                state.loading = false
                state.orders = action.payload || []
                // state.user = action.payload.user || {}
                // state.shippingAddress = action.payload.shippingAddress || {}
                // state.paymentMethod = action.payload.paymentMethod
                // state.itemsPrice = action.payload.itemsPrice
                // state.taxPrice = action.payload.taxPrice
                // state.shippingPrice = action.payload.shippingPrice
                // state.totalPrice = action.payload.totalPrice
                // state.isPaid = action.payload.isPaid
                // state.orderId = action.payload.orderId
                // state.createdAt = action.payload.createdAt
                // state.updatedAt = action.payload.updatedAt
            })
    }
})

export const { resetError } = orderSlice.actions
export default orderSlice.reducer