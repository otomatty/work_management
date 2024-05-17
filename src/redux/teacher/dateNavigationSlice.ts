import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DateNavigationState {
  currentYear: number;
  currentMonth: number;
  direction: number;
}

const today = new Date();
const initialState: DateNavigationState = {
  currentYear: today.getFullYear(),
  currentMonth: today.getMonth(),
  direction: 0,
};

const dateNavigationSlice = createSlice({
  name: "dateNavigation",
  initialState,
  reducers: {
    setDirection(state, action: PayloadAction<number>) {
      state.direction = action.payload;
    },
    incrementMonth(state) {
      if (state.currentMonth === 11) {
        state.currentMonth = 0;
        state.currentYear += 1;
      } else {
        state.currentMonth += 1;
      }
    },
    decrementMonth(state) {
      if (state.currentMonth === 0) {
        state.currentMonth = 11;
        state.currentYear -= 1;
      } else {
        state.currentMonth -= 1;
      }
    },
  },
});

export const { setDirection, incrementMonth, decrementMonth } =
  dateNavigationSlice.actions;
export default dateNavigationSlice.reducer;
