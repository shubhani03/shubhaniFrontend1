import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./features/alertSlice";
import sellItemsSlice from "./features/sellSlice";
import storeSlice from "./features/storeSlice";
import { userSlice } from "./features/userSlice";
import customerSlice from "./features/customerSlice";
import totalAmountSlice from "./features/totalAmountSlice";
import { dialogSlice } from "./features/DialogSlice";
import orderProductSlice from "./features/orderProductSlice";
import orderSlice from "./features/orderSlice";
import overallorderslice from "./features/overallorderslice";

const store = configureStore({
  reducer: {
    alerts: alertSlice.reducer,
    storeData: storeSlice,
    sellItems: sellItemsSlice,
    user: userSlice.reducer,
    customer: customerSlice,
    totalAmount: totalAmountSlice,
    printT: dialogSlice.reducer,
    orderedProductCustomer: orderProductSlice,
    allOrder: orderSlice,
    overAllOrders: overallorderslice,
  },
});

export default store;
