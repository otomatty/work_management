import { createSlice } from "@reduxjs/toolkit";

export const monthNavigationSlice = createSlice({
  name: "monthNavigation",
  initialState: {
    direction: 0,
  },
  reducers: {
    setDirection: (state, action) => {
      state.direction = action.payload;
    },
  },
});

export const { setDirection } = monthNavigationSlice.actions;

export default monthNavigationSlice.reducer;
