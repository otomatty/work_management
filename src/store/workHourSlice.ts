import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkHours } from "../types"; // WorkHours 型を適切にインポート

interface WorkHoursState {
  teachingHours: number;
  adminHours: number;
}

const initialState: WorkHoursState = {
  teachingHours: 0,
  adminHours: 0,
};

const workHoursSlice = createSlice({
  name: "workHours",
  initialState,
  reducers: {
    setWorkHours(state, action: PayloadAction<WorkHours>) {
      state.teachingHours = action.payload.teachingHours;
      state.adminHours = action.payload.adminHours;
    },
  },
});

export const { setWorkHours } = workHoursSlice.actions;
export default workHoursSlice.reducer;
