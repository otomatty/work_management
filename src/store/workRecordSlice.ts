import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const workRecordSlice = createSlice({
  name: "workRecord",
  initialState: {
    startTime: "",
    endTime: "",
    students: [],
    workDescription: "",
    isVisible: false, // isVisible 状態を追加
  },
  reducers: {
    setStartTime: (state, action) => {
      state.startTime = action.payload;
    },
    setEndTime: (state, action) => {
      state.endTime = action.payload;
    },
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    setWorkDescription: (state, action) => {
      state.workDescription = action.payload;
    },
    setIsVisible(state, action: PayloadAction<boolean>) {
      state.isVisible = action.payload;
    },
  },
});

export const {
  setStartTime,
  setEndTime,
  setStudents,
  setWorkDescription,
  setIsVisible,
} = workRecordSlice.actions;

export default workRecordSlice.reducer;
