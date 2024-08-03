import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _axios from "../../utils/axiosHelper";


export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await _axios.post('/auth/login', { email, password }, { withCredentials: true })
            console.log("Response :", response)
            return response.data.response
        }
        catch (err) {
            /***
             * err.response give you the entire axios response including header, status code, data
             * err.response.data is the response you are getting from backend server
             * For our case err.response.data is in form of {status:"123",error:"abcdef"}
             */
            const responseFromBackEndServer = err.response.data.error
            if (responseFromBackEndServer)
                err.message = responseFromBackEndServer
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
                console.log("INside reducer error ", action.payload)
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