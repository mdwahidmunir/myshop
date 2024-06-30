export const selectAllProducts = (state) => state.products.products // state.reducer_name_in_store.state_variable . Here state is gloabal state

export const selectProductById = (state) => state.products.currentProduct

export const selectProductState = state => state.products