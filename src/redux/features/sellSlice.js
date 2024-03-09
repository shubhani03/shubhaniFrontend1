import { createSlice } from "@reduxjs/toolkit";
const sellItemsSlice = createSlice({
  name: "sell",
  initialState: [],
  reducers: {
    addItems(state, action) {
      console.log("action : ", action.payload);
      state.push(action.payload);
    },
    removeItem(state, action) {
      let index = state.indexOf(action.payload);
      state.splice(index, 1);
    },
    removeAllItems(state, action) {
      return [];
    },
  },
});
export default sellItemsSlice.reducer;
export const { addItems, removeItem, removeAllItems } = sellItemsSlice.actions;
