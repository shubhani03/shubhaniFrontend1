import { createSlice } from "@reduxjs/toolkit";

const orderoverallslice = createSlice({
  name: "AllOrders",
  initialState: [],
  reducers: {
    setAllStoreData(state, action) {
      return action.payload;
    },
  },
});
export default orderoverallslice.reducer;
export const { setAllStoreData } = orderoverallslice.actions;
