import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _axios from "../../utils/axiosHelper";


export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await _axios.post('/auth/login', { email, password }, { withCredentials: true })
            return response.data.response
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        error: null,
        loading: false,
        authToken: null,
    },
    reducers: {
        resetError: (state) => { state.error = null },
        clearToken: (state) => { state.authToken = null }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message ? action.payload.message : action.payload
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.authToken = action.payload
            })
    }
})

export const { resetError, clearToken } = authSlice.actions
export default authSlice.reducer