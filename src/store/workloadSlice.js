import { createSlice } from "@reduxjs/toolkit";

const workloadSlice = createSlice({
  name: "workload",
  initialState: {
    openFilter: "",
    hiddenColumns: []
  },
  reducers: {
    setOpenFilter(state, action) {
      state.openFilter = action.payload;
    },
    setHiddenColumns(state, action) {
      state.hiddenColumns = action.payload;
    }
  },
});

export const { setOpenFilter, setHiddenColumns } = workloadSlice.actions;

export default workloadSlice.reducer;
