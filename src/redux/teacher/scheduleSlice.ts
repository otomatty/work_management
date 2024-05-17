import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";
import { schedulesService } from "../../services/teachers/schedulesService"; // API呼び出し関数をインポート

interface ScheduleState {
  schedules: Record<string, any>;
  loading: boolean;
  error: string | null;
  classroom: string; // classroom プロパティを追加
  startTime: string;
  endTime: string;
  students: [];
}

const initialState: ScheduleState = {
  schedules: {},
  loading: false,
  error: null,
  classroom: "", // 初期値を設定
  startTime: "",
  endTime: "",
  students: [],
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    fetchSchedulesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSchedulesSuccess(state, action: PayloadAction<Record<string, any>>) {
      state.schedules = action.payload;
      state.loading = false;
    },
    fetchSchedulesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setClassroom(state, action: PayloadAction<string>) {
      state.classroom = action.payload;
    },
  },
});

export const {
  fetchSchedulesStart,
  fetchSchedulesSuccess,
  fetchSchedulesFailure,
  setClassroom, // 新しいアクションをエクスポート
} = scheduleSlice.actions;

export const fetchSchedules =
  (params: {
    teacherId: string;
    currentYear: number;
    currentMonth: number;
  }): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(fetchSchedulesStart());
      const schedules = await schedulesService.fetchSchedulesFromAPI(params);
      dispatch(fetchSchedulesSuccess(schedules));
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(fetchSchedulesFailure(errorMessage));
    }
  };

export const selectSchedulesByTeacher = (state: RootState, teacherId: string) =>
  state.schedule.schedules[teacherId] || {};

export default scheduleSlice.reducer;
