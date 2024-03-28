import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
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

export const { setOpenFilter, setHiddenColumns } = usersSlice.actions;

export default usersSlice.reducer;
