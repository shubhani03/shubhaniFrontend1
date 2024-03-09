import { createSlice } from "@reduxjs/toolkit";
export const selectedStoreSlice = createSlice({
  name: "Customer",
  initialState: [],
    reducers: {
        setSelectItem(state, action) {
            state.push(action.payload);
        },
        revomeSelectedItem(state, action) {
      return [];
    },
  },
});
export default selectedStoreSlice.reducer;
export const { setCustomer, revomeCustomer } = selectedStoreSlice.actions;
