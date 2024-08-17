import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _axios from "../../utils/axiosHelper";
import { logout } from "./authSlice";

export const getShippingInfo = createAsyncThunk(
  "shipping/getShippingInfo",
  async (_, thunkAPI) => {
    try {
      const response = await _axios.get("/shipping", { withCredentials: true });
      return response.data.response;
    } catch (err) {
      thunkAPI.dispatch(logout());
      const responseFromBackEndServer = err.response.data.error || err.message;
      if (responseFromBackEndServer) err.message = responseFromBackEndServer;
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const setShippingInfo = createAsyncThunk(
  "shipping/setShippingInfo",
  async (shippingDetails, thunkAPI) => {
    try {
      const response = await _axios.post("/shipping", shippingDetails, {
        withCredentials: true,
      });
      return response.data.response;
    } catch (err) {
      const responseFromBackEndServer = err.response.data.error || err.message;
      if (responseFromBackEndServer) err.message = responseFromBackEndServer;
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const initialState = {
  error: null,
  loading: false,
  successMessage: null,
  infoMessage: null,
  address: null,
  city: null,
  postalCode: null,
  country: null,
};

const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    resetSuccessMessage: (state) => {
      state.successMessage = null;
    },
    resetError: (state) => {
      state.error = null;
    },
    setShippingError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShippingInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getShippingInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.payload;
        state.successMessage = null;
        state.address = null;
        state.city = null;
        state.postalCode = null;
        state.country = null;
      })
      .addCase(getShippingInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.address = action.payload.address;
        state.city = action.payload.city;
        state.postalCode = action.payload.postalCode;
        state.country = action.payload.country;
      })
      .addCase(setShippingInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(setShippingInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.payload;
        state.successMessage = null;
        state.address = null;
        state.city = null;
        state.postalCode = null;
        state.country = null;
      })
      .addCase(setShippingInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.address = action.payload.address;
        state.city = action.payload.city;
        state.postalCode = action.payload.postalCode;
        state.country = action.payload.country;
      });
  },
});

export const { resetError, resetSuccessMessage } = shippingSlice.actions;

export default shippingSlice.reducer;
