export const selectUserInfo = (state) => state.user.user

export const selectUserState = (state) => state.user

export const selectUserName = (state) => state.user.user.name
export const selectUserEmail = (state) => state.user.user.email
export const selectUserRole = (state) => state.user.user.role