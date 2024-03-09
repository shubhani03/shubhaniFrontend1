import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "Orders",
  initialState: [],
  reducers: {
    setStoreData(state, action) {
      return action.payload;
    },
  },
});
export default orderSlice.reducer;
export const { setStoreData } = orderSlice.actions;
