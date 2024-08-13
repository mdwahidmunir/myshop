import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import _axios from "../../utils/axiosHelper"
import { ITEMS_LIMIT } from "../../utils/constants"

// NOTE: the name of the asyc thunk shall be 'reducer_name/functionName'
export const fetchAllProducts = createAsyncThunk(
    'products/fetchAllProducts',
    async (_, thunkAPI) => {
        try {
            const response = await _axios.get('/products')
            return response.data.response
            // response.data gives basically the entire node backend response. Here our necessary datas are in response field
            // of node backend response 
        }
        catch (err) {
            const responseFromBackEndServer = err.response.data.error || err.message
            if (responseFromBackEndServer)
                err.message = responseFromBackEndServer
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id, thunkAPI) => {

        try {
            const response = await _axios.get(`/products/${id}`)
            return response.data.response
        }
        catch (err) {
            const responseFromBackEndServer = err.response.data.error || err.message
            if (responseFromBackEndServer)
                err.message = responseFromBackEndServer
            return thunkAPI.rejectWithValue(err)
        }
    }

)


export const fetchProducts = createAsyncThunk(
    'product/getProducts',
    async (keywords, thunkAPI) => {
        try {
            if (!keywords)
                keywords = `?page=1&limit=${ITEMS_LIMIT}`
            const response = await _axios.get(`/products/${keywords}`)
            return response.data
        }
        catch (err) {
            const responseFromBackEndServer = err.response.data.error || err.message
            if (responseFromBackEndServer)
                err.message = responseFromBackEndServer
            return thunkAPI.rejectWithValue(err)
        }
    }
)

const pageInfo = {
    currentPage: 1,
    totalItems: 0,
    totalPage: 1
}

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        currentProduct: null,
        loading: true,
        error: null,
        pageInfo
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
                    state.error = action.payload.message || action.payload
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
                    state.error = action.payload.message || action.payload
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false,
                    state.currentProduct = action.payload
            })
            .addCase(fetchProducts.pending, (state) => {
                // This state is local state i.e globalstate.reducerName
                state.loading = true,
                    state.error = null
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload.message || action.payload
                state.pageInfo = pageInfo
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false,
                    state.products = action.payload.response
                state.pageInfo = {
                    currentPage: action.payload.page,
                    totalItems: action.payload.totalItems,
                    totalPage: action.payload.page
                }
            })
    }
})

export const { clearProduct } = productSlice.actions
export default productSlice.reducer; 