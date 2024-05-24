import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { workRecordsService } from "../../services/teachers/workRecordsService";
import { WorkRecord } from "../../types";

interface FetchMonthlyWorkRecordsParams {
  teacherId: string;
  year: number;
  month: number;
}

interface WorkRecordsState {
  workRecords: Record<string, WorkRecord | {}>;
  loading: boolean;
  error: string | null;
}

const initialState: WorkRecordsState = {
  workRecords: {},
  loading: false,
  error: null,
};

export const fetchMonthlyWorkRecords = createAsyncThunk(
  "workRecords/fetchMonthlyWorkRecords",
  async (
    { teacherId, year, month }: FetchMonthlyWorkRecordsParams,
    thunkAPI
  ) => {
    try {
      const response = await workRecordsService.getFullMonthlyWorkRecords(
        teacherId,
        year,
        month
      );
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

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
      action: PayloadAction<Record<string, WorkRecord | {}>>
    ) {
      state.workRecords = action.payload;
      state.loading = false;
    },
    fetchWorkRecordsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateWorkRecord(
      state,
      action: PayloadAction<{ day: string; workRecord: WorkRecord }>
    ) {
      const { day, workRecord } = action.payload;
      state.workRecords[day] = workRecord;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonthlyWorkRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMonthlyWorkRecords.fulfilled, (state, action) => {
        state.workRecords = action.payload;
        state.loading = false;
        // console.log("Fetched work records successfully:", action.payload);
      })
      .addCase(fetchMonthlyWorkRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as { error: string }).error;
        console.error("Failed to fetch work records:", action.payload);
      });
  },
});

export const {
  fetchWorkRecordsStart,
  fetchWorkRecordsSuccess,
  fetchWorkRecordsFailure,
  updateWorkRecord,
} = workRecordsSlice.actions;

export const selectWorkRecords = (state: RootState) => state.workRecords;

export default workRecordsSlice.reducer;
