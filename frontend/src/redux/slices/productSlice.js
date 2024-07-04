import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import _axios from "../../utils/axiosHelper"

// NOTE: the name of the asyc thunk shall be 'reducer_name/functionName'
export const fetchAllProducts = createAsyncThunk(
    'products/fetchAllProducts',
    async (_, thunkApi) => {
        try {
            const response = await _axios.get('/products')
            return response.data.response
            // response.data gives basically the entire node backend response. Here our necessary datas are in response field
            // of node backend response 
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.message)
        }
    }
)

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id, thunkApi) => {

        try {
            const response = await _axios.get(`/products/${id}`)
            return response.data.response
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.message)
        }
    }

)


const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        currentProduct: null,
        loading: true,
        error: null
    },
    reducers: {
        clearProduct: (state) => {
            state.currentProduct = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                // This state is local state i.e globalstate.reducerName
                state.loading = true,
                    state.error = null
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false,
                    state.products = action.payload
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false,
                    state.currentProduct = action.payload
            })
    }
})

export const { clearProduct } = productSlice.actions
export default productSlice.reducer; 