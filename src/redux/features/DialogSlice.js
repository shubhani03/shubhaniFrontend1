import { createSlice } from "@reduxjs/toolkit";
export const dialogSlice = createSlice({
  name: "Dialog",
  initialState: {
    loading: false,
  },
  reducers: {
    showDialog: (state) => {
      state.loading = true;
    },
    hideDialog: (state) => {
      state.loading = false;
    },
  },
});
export const { showDialog, hideDialog } = dialogSlice.actions;
