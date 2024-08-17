import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _axios from "../../utils/axiosHelper";
import { resetUser } from "./userSlice";
import cookieParser from "../../utils/cookieParser";



export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await _axios.post('/auth/login', { email, password }, { withCredentials: true })
            localStorage.setItem('jwt', response.data.response)
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
            localStorage.setItem('jwt', response.data.response.authToken)
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
        try {

            await _axios.post('/auth/logout', {}, { withCredentials: true })
        }
        catch (err) {
            const responseFromBackEndServer = err.response.data.error
            if (responseFromBackEndServer)
                err.message = responseFromBackEndServer
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const sendOTPAsync = createAsyncThunk(
    'user/sendOTP',
    async (email, thunkAPI) => {
        try {
            const response = await _axios.post('/auth/sendOTP', { email })
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


export const passwordResetAsync = createAsyncThunk(
    'user/passwordReset',
    async ({ email, password, confirmPassword, otp }, thunkAPI) => {
        try {
            const response = await _axios.post('/auth/passwordReset', { email, password, confirmPassword, otp })
            return response.data.response.message
        }
        catch (err) {
            const responseFromBackEndServer = err.response.data.error || err.message
            if (responseFromBackEndServer)
                err.message = responseFromBackEndServer
            return thunkAPI.rejectWithValue(err)
        }
    }
)

const initialState = {
    error: null,
    loading: false,
    authToken: localStorage.getItem('jwt') || null,
    isLoggedIn: !!localStorage.getItem('jwt') || false,
    otpStatus: {
        sending: false,
        countDown: 0, // countDown in seconds
        message: null,
    },
    authSuccessMessage: null,
    infoMessage: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthError: (state, action) => { state.error = action.payload },
        resetError: (state) => { state.error = null },
        clearToken: (state) => {
            localStorage.removeItem('jwt')
            state.authToken = null
            state.isLoggedIn = false
        },
        setAuthToken: (state, action) => { state.authToken = action.payload },
        decOTPCountDown: (state) => {
            if (state.otpStatus.countDown > 0) {
                state.otpStatus.countDown -= 1
            }
        },
        resetOTPToast: (state) => {
            state.error = null
            state.loading = false
            state.otpStatus.sending = false
            state.otpStatus.message = null
        },
        setAuthSuccessMessage: (state, action) => { state.authSuccessMessage = action.payload },
        resetAuthSuccessMessage: (state) => {
            state.authSuccessMessage = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message ? action.payload.message : action.payload
                state.isLoggedIn = false
                state.authToken = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.authToken = action.payload
                state.isLoggedIn = !!action.payload
            })
            .addCase(logout.pending, (state) => {
                state.loading = true
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message || action.payload
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(signup.pending, (state) => {
                state.loading = true
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message ? action.payload.message : action.payload
                state.authToken = null
                state.isLoggedIn = false
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.error = null
                state.loading = true
                state.authToken = action.payload
                state.isLoggedIn = !!action.payload
            })
            .addCase(sendOTPAsync.pending, (state) => {
                state.loading = true
                state.otpStatus.sending = true
                state.otpStatus.message = null
            })
            .addCase(sendOTPAsync.rejected, (state, action) => {
                state.loading = false
                state.otpStatus.sending = false
                state.error = action.payload.message ? action.payload.message : action.payload
            })
            .addCase(sendOTPAsync.fulfilled, (state, action) => {
                state.loading = false
                state.otpStatus.sending = false
                state.otpStatus.countDown = action.payload.tenure || 60
                state.otpStatus.message = action.payload.message
            })
            .addCase(passwordResetAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(passwordResetAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message ? action.payload.message : action.payload
                state.otpStatus.countDown = 0
            })
            .addCase(passwordResetAsync.fulfilled, (state, action) => {
                state.loading = false
                state.authSuccessMessage = action.payload
                state.otpStatus.countDown = 0
            })
    }
})

export const {
    resetError,
    resetOTPToast,
    resetAuthSuccessMessage,
    resetCountDown,
    clearToken,
    setAuthError,
    setAuthToken,
    setAuthSuccessMessage,
    decOTPCountDown
} = authSlice.actions
export default authSlice.reducer