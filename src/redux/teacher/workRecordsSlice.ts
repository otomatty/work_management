import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";
import { workRecordsService } from "../../services/teachers/workRecordsService";
import { WorkRecord } from "../../types"; // WorkRecord type imported

interface WorkRecordState {
  workRecords: Record<string, WorkRecord | null>; // Type changed to Record<string, WorkRecord | null>
  loading: boolean;
  error: string | null;
}

const initialState: WorkRecordState = {
  workRecords: {},
  loading: false,
  error: null,
};

const workRecordsSlice = createSlice({
  name: "workRecords",
  initialState,
  reducers: {
    fetchWorkRecordsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchWorkRecordsSuccess(
      state,
      action: PayloadAction<Record<string, WorkRecord | null>>
    ) {
      state.workRecords = {
        ...state.workRecords,
        ...action.payload,
      };
      state.loading = false;
    },
    fetchWorkRecordsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    saveWorkRecordStart(state) {
      state.loading = true;
      state.error = null;
    },
    saveWorkRecordSuccess(
      state,
      action: PayloadAction<{
        year: number;
        month: number;
        day: number;
        workRecord: WorkRecord;
      }>
    ) {
      const { year, month, day, workRecord } = action.payload;
      state.workRecords[`${year}-${month}-${day}`] = workRecord;
      state.loading = false;
    },
    saveWorkRecordFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchWorkRecordsStart,
  fetchWorkRecordsSuccess,
  fetchWorkRecordsFailure,
  saveWorkRecordStart,
  saveWorkRecordSuccess,
  saveWorkRecordFailure,
} = workRecordsSlice.actions;

export const fetchWorkRecords =
  (teacherId: string, year: number, month: number, day: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(fetchWorkRecordsStart());
      const workRecord = await workRecordsService.getWorkRecord(
        teacherId,
        year,
        month,
        day
      );
      dispatch(
        fetchWorkRecordsSuccess({ [`${year}-${month}-${day}`]: workRecord })
      );
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(fetchWorkRecordsFailure(errorMessage));
    }
  };

export const selectWorkRecordsByDate = (state: RootState, date: string) =>
  state.workRecords.workRecords[date] || {};

export default workRecordsSlice.reducer;
