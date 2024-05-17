import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TeacherState {
  teacherId: string;
}

const initialState: TeacherState = {
  teacherId: "",
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    setTeacherId(state, action: PayloadAction<string>) {
      state.teacherId = action.payload;
    },
  },
});

export const { setTeacherId } = teacherSlice.actions;
export default teacherSlice.reducer;
