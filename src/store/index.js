import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./globalSlice";
import workloadReucer from "./workloadSlice";
import usersSlice from "./usersSlice";

export default configureStore({
  reducer: {
    global: globalReducer,
    workload: workloadReucer,
    users: usersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
