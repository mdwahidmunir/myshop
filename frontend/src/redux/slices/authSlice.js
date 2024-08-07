import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _axios from "../../utils/axiosHelper";
import { getUserAsync, resetUser } from "./userSlice";



export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await _axios.post('/auth/login', { email, password }, { withCredentials: true })
            thunkAPI.dispatch(getUserAsync());
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

export const signup = createAsyncThunk(
    'auth/signup',
    async ({ name, email, password, confirmPassword }, thunkAPI) => {
        try {
            const response = await _axios.post('/auth/signup', { name, email, password, confirmPassword }, { withCredentials: true })
            return response.data.response.authToken
        }
        catch (err) {
            const responseFromBackEndServer = err.response.data.error
            if (responseFromBackEndServer)
                err.message = responseFromBackEndServer
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(clearToken())
        thunkAPI.dispatch(resetUser())
    }
)

const initialState = {
    error: null,
    loading: false,
    authToken: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthError: (state, action) => { state.error = action.payload },
        resetError: (state) => { state.error = null },
        clearToken: (state) => { state.authToken = null },
        setAuthToken: (state, action) => { state.authToken = action.payload }
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
            .addCase(signup.pending, (state) => {
                state.loading = true
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message ? action.payload.message : action.payload
                state.authToken = null
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.error = null
                state.loading = true
                state.authToken = action.payload
            })
    }
})

export const { resetError, clearToken, setAuthError, setAuthToken } = authSlice.actions
export default authSlice.reducer