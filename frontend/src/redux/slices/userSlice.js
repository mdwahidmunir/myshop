import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _axios from "../../utils/axiosHelper";

export const getUserAsync = createAsyncThunk(
    'user/getUser',
    async (thunkAPI) => {
        try {
            const response = await _axios.get('/users/user', { withCredentials: true })
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

const initialState = {
    loading: false,
    user: {
        name: null,
        email: null,
        role: null,
    },
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { name, email, role } = action.payload
            state.name = name
            state.email = email
            state.role = role ? role : 'user'
        },
        resetUser: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserAsync.pending, (state) => {
                // Case I : You can directly mutate
                state.loading = true
            })
            .addCase(getUserAsync.rejected, (state, action) => {
                // Case II : You can return a new state object
                return {
                    ...initialState,
                    error: action.payload.message ? action.payload.message : action.payload
                };
            })
            .addCase(getUserAsync.fulfilled, (state, action) => {
                const { name, email, role } = action.payload
                return {
                    ...initialState,
                    user: { name, email, role }
                }
            })
    }
}
)
export const { setUser, resetUser } = userSlice.actions
export default userSlice.reducer