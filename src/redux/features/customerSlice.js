import { createSlice } from "@reduxjs/toolkit";
export const customerSlice = createSlice({
  name: "Customer",
  initialState: [],
  reducers: {
    setCustomer(state, action) {
      state.push(action.payload);
    },
    revomeCustomer(state, action) {
      return [];
    },
  },
});
export default customerSlice.reducer;
export const { setCustomer, revomeCustomer } = customerSlice.actions;
