import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { StudentChangeInfo } from "../types";
import { RootState } from "./store"; // 適切なパスに修正してください
import { Action } from "redux";

interface WorkRecordState {
  startTime: string;
  endTime: string;
  students: StudentChangeInfo[];
  workDescription: string;
  isVisible: boolean;
  dataVersion: number;
  classroom: string; // Added classroom field
}

const initialState: WorkRecordState = {
  startTime: "",
  endTime: "",
  students: [],
  workDescription: "",
  isVisible: false,
  dataVersion: 0,
  classroom: "", // Initialized with an empty string
};

export const workRecordSlice = createSlice({
  name: "workRecord",
  initialState,
  reducers: {
    setStartTime: (state, action: PayloadAction<string>) => {
      state.startTime = action.payload;
    },
    setEndTime: (state, action: PayloadAction<string>) => {
      state.endTime = action.payload;
    },
    setStudents: (state, action: PayloadAction<StudentChangeInfo[]>) => {
      state.students = action.payload;
    },
    setWorkDescription: (state, action: PayloadAction<string>) => {
      state.workDescription = action.payload;
    },
    setIsVisible: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },
    setClassroom: (state, action: PayloadAction<string>) => {
      // Added setClassroom action
      state.classroom = action.payload;
    },
    incrementDataVersion: (state) => {
      state.dataVersion += 1;
    },
    clearWorkRecords: (state) => {
      state.startTime = "";
      state.endTime = "";
      state.students = [];
      state.classroom = ""; // Clear classroom as well
    },
  },
});

export const {
  setStartTime,
  setEndTime,
  setStudents,
  setWorkDescription,
  setIsVisible,
  setClassroom,
  incrementDataVersion,
  clearWorkRecords,
} = workRecordSlice.actions;

export default workRecordSlice.reducer;
