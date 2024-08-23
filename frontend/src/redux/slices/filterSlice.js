import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _axios from "../../utils/axiosHelper";


export const getFiltersAsync = createAsyncThunk(
    'filters/getFilters',
    async (_, thunkAPI) => {
        try {
            const response = await _axios.get('/products/filters')
            return response.data.response
        }
        catch (err) {
            const responseFromBackEndServer = err.response.data.error
            if (responseFromBackEndServer)
                err.message = responseFromBackEndServer
            return thunkAPI.rejectWithValue(err)
        }
    }
)

const defaultBrands = {
    default: "Select Brand"
}
const defaultCategories = {
    default: "Select Category"
}

const initialState = {
    loading: false,
    error: null,
    successMessage: null,
    infoMessage: null,
    brands: defaultBrands,
    categories: defaultCategories
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFiltersAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(getFiltersAsync.rejected, (state, action) => {
                state.loading = false
                state.brands = {
                    default: "Select Brand"
                }
                state.categories = {
                    default: "Select Category"
                }
                state.error = action.payload.message || action.payload;
            })
            .addCase(getFiltersAsync.fulfilled, (state, action) => {
                state.loading = false
                state.error = null

                const brands = action.payload.brands
                const categories = action.payload.categories
                state.brands = Object.keys(brands).length !== 0 ? { ...defaultBrands, ...brands } : defaultBrands
                state.categories = Object.keys(categories).length !== 0 ? { ...defaultCategories, ...categories } : defaultCategories
            })
    }
})

export default filterSlice.reducer