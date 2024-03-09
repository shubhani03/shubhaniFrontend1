import { createSlice } from "@reduxjs/toolkit";

const orderProductSlice = createSlice({
  name: "OrderProduct",
  initialState: [],
  reducers: {
    setProductStoreData(state, action) {
      console.log("this is store slice", action.payload);
      return action.payload;
    },
  },
});
export default orderProductSlice.reducer;
export const { setProductStoreData } = orderProductSlice.actions;
