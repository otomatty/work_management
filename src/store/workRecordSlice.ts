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
  clearDayCellData: boolean; // 新しい状態を追加
}

const initialState: WorkRecordState = {
  startTime: "",
  endTime: "",
  students: [],
  workDescription: "",
  isVisible: false,
  dataVersion: 0,
  clearDayCellData: false,
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

    incrementDataVersion: (state) => {
      state.dataVersion += 1;
    },

    setClearDayCellData: (state, action: PayloadAction<boolean>) => {
      // 新しいアクションを追加
      state.clearDayCellData = action.payload;
    },

    clearWorkRecords: (state) => {
      state.startTime = "";
      state.endTime = "";
      state.students = [];
    },
  },
});

export const {
  setStartTime,
  setEndTime,
  setStudents,
  setWorkDescription,
  setIsVisible,
  incrementDataVersion,
  setClearDayCellData,
  clearWorkRecords,
} = workRecordSlice.actions;

export const deleteAllWorkRecords =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      // 一括削除のロジックを実行
      await deleteAllWorkRecords(); // 関数名を確認してください
      setTimeout(() => {
        dispatch(incrementDataVersion()); // データバージョンをインクリメント
      }, 500);
    } catch (error) {
      console.error("Error deleting records:", error);
    }
  };

export default workRecordSlice.reducer;
