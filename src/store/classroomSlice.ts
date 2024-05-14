import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ClassroomState {
  selectedClassroom: {
    [date: string]: string; // 日付をキーとして教室名を格納
  };
}

const initialState: ClassroomState = {
  selectedClassroom: {},
};

export const classroomSlice = createSlice({
  name: "classroom",
  initialState,
  reducers: {
    setSelectedClassroom: (
      state,
      action: PayloadAction<{ date: string; classroom: string }>
    ) => {
      const { date, classroom } = action.payload;
      state.selectedClassroom[date] = classroom;
    },
  },
});

export const { setSelectedClassroom } = classroomSlice.actions;
export default classroomSlice.reducer;
