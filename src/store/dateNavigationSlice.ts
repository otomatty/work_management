import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DateState {
  currentYear: number;
  currentMonth: number;
}

const initialState: DateState = {
  currentYear: new Date().getFullYear(),
  currentMonth: new Date().getMonth(),
};

export const dateNavigationSlice = createSlice({
  name: "dateNavigation",
  initialState,
  reducers: {
    setCurrentMonth: (state, action: PayloadAction<number>) => {
      state.currentMonth = action.payload;
    },
    setCurrentYear: (state, action: PayloadAction<number>) => {
      state.currentYear = action.payload;
    },
    incrementMonth: (state) => {
      if (state.currentMonth === 11) {
        state.currentMonth = 0;
        state.currentYear += 1;
      } else {
        state.currentMonth += 1;
      }
    },
    decrementMonth: (state) => {
      if (state.currentMonth === 0) {
        state.currentMonth = 11;
        state.currentYear -= 1;
      } else {
        state.currentMonth -= 1;
      }
    },
  },
});

export const {
  setCurrentMonth,
  setCurrentYear,
  incrementMonth,
  decrementMonth,
} = dateNavigationSlice.actions;

export default dateNavigationSlice.reducer;
