export const selectAuthToken = (state) => state.auth.authToken
export const selectAuthState = (state) => state.auth
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectOTPStatus = (state) => state.auth.otpStatus
export const selectAuthMessage = (state) => state.auth.message