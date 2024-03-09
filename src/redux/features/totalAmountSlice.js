import { createSlice } from "@reduxjs/toolkit";
// const initialState = {
//   amount: 0,
// };
const totalAmountSlice = createSlice({
  name: "Total",
  initialState: { amount: 0 },
  reducers: {
    addAmount(state, action) {
      console.log("action : ", action.payload);
      state.amount += action.payload;
      console.log(" first addd ", state.amount);
    },

    removeAmount(state, action) {
      return 0;
    },
  },
});
export default totalAmountSlice.reducer;
export const { addAmount, removeAmount } = totalAmountSlice.actions;
