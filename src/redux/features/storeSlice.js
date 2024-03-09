import { createSlice } from "@reduxjs/toolkit";
const storeSlice = createSlice({
  name: "Store",
  initialState: [],
  reducers: {
    setStoreData(state, action) {
      console.log("this is store slice", action.payload);
      return action.payload;
    },
    updateStore(state, action) {
      let index = state.indexOf(action.payload.itemName);
      state[index].quantity -= action.quantity;
    },
  },
});
export default storeSlice.reducer;
export const { updateStore, setStoreData } = storeSlice.actions;
