export const FETCH_SCHEDULE_REQUEST = "FETCH_SCHEDULE_REQUEST";
export const FETCH_SCHEDULE_SUCCESS = "FETCH_SCHEDULE_SUCCESS";
export const FETCH_SCHEDULE_FAILURE = "FETCH_SCHEDULE_FAILURE";
export const SET_TEACHER_ID = "SET_TEACHER_ID";
export const ADD_SCHEDULE_REQUEST = "ADD_SCHEDULE_REQUEST";
export const ADD_SCHEDULE_SUCCESS = "ADD_SCHEDULE_SUCCESS";
export const ADD_SCHEDULE_FAILURE = "ADD_SCHEDULE_FAILURE";

// Action creators
export const fetchScheduleRequest = (teacherId: string, dayOfWeek: string) => ({
  type: FETCH_SCHEDULE_REQUEST,
  payload: { teacherId, dayOfWeek },
});
export const setTeacherId = (teacherId: string) => ({
  type: SET_TEACHER_ID,
  payload: teacherId,
});

export const fetchScheduleSuccess = (schedule: any) => ({
  type: FETCH_SCHEDULE_SUCCESS,
  payload: schedule,
});

export const fetchScheduleFailure = (error: any) => ({
  type: FETCH_SCHEDULE_FAILURE,
  payload: error,
});

export const addScheduleRequest = (
  teacherId: string,
  dayOfWeek: string,
  schedule: any
) => ({
  type: ADD_SCHEDULE_REQUEST,
  payload: { teacherId, dayOfWeek, schedule },
});

export const addScheduleSuccess = (schedule: any) => ({
  type: ADD_SCHEDULE_SUCCESS,
  payload: schedule,
});

export const addScheduleFailure = (error: any) => ({
  type: ADD_SCHEDULE_FAILURE,
  payload: error,
});

export const FETCH_WORK_RECORDS_REQUEST = "FETCH_WORK_RECORDS_REQUEST";
export const FETCH_WORK_RECORDS_SUCCESS = "FETCH_WORK_RECORDS_SUCCESS";
export const FETCH_WORK_RECORDS_FAILURE = "FETCH_WORK_RECORDS_FAILURE";

export const fetchWorkRecordsRequest = (
  teacherId: string,
  year: number,
  month: number,
  day: number
) => ({
  type: FETCH_WORK_RECORDS_REQUEST,
  payload: { teacherId, year, month, day },
});

export const fetchWorkRecordsSuccess = (workRecords: any) => ({
  type: FETCH_WORK_RECORDS_SUCCESS,
  payload: workRecords,
});

export const fetchWorkRecordsFailure = (error: any) => ({
  type: FETCH_WORK_RECORDS_FAILURE,
  payload: error,
});

export const SAVE_WORK_RECORD_REQUEST = "SAVE_WORK_RECORD_REQUEST";
export const SAVE_WORK_RECORD_SUCCESS = "SAVE_WORK_RECORD_SUCCESS";
export const SAVE_WORK_RECORD_FAILURE = "SAVE_WORK_RECORD_FAILURE";

export const saveWorkRecordRequest = (
  teacherId: string,
  year: number,
  month: number,
  day: number,
  workRecord: any
) => ({
  type: SAVE_WORK_RECORD_REQUEST,
  payload: { teacherId, year, month, day, workRecord },
});

export const saveWorkRecordSuccess = (workRecord: any) => ({
  type: SAVE_WORK_RECORD_SUCCESS,
  payload: workRecord,
});

export const saveWorkRecordFailure = (error: any) => ({
  type: SAVE_WORK_RECORD_FAILURE,
  payload: error,
});

export const DELETE_WORK_RECORDS_REQUEST = "DELETE_WORK_RECORDS_REQUEST";
export const DELETE_WORK_RECORDS_SUCCESS = "DELETE_WORK_RECORDS_SUCCESS";
export const DELETE_WORK_RECORDS_FAILURE = "DELETE_WORK_RECORDS_FAILURE";

export const INSERT_WORK_RECORDS_REQUEST = "INSERT_WORK_RECORDS_REQUEST";
export const INSERT_WORK_RECORDS_SUCCESS = "INSERT_WORK_RECORDS_SUCCESS";
export const INSERT_WORK_RECORDS_FAILURE = "INSERT_WORK_RECORDS_FAILURE";

export const deleteWorkRecordsRequest = (
  startDate: Date,
  endDate: Date,
  year: number,
  month: number
) => ({
  type: DELETE_WORK_RECORDS_REQUEST,
  payload: { startDate, endDate, year, month },
});

export const deleteWorkRecordsSuccess = () => ({
  type: DELETE_WORK_RECORDS_SUCCESS,
});

export const deleteWorkRecordsFailure = (error: any) => ({
  type: DELETE_WORK_RECORDS_FAILURE,
  payload: error,
});

export const insertWorkRecordsRequest = (
  startDate: Date,
  endDate: Date,
  year: number,
  month: number
) => ({
  type: INSERT_WORK_RECORDS_REQUEST,
  payload: { startDate, endDate, year, month },
});

export const insertWorkRecordsSuccess = () => ({
  type: INSERT_WORK_RECORDS_SUCCESS,
});

export const insertWorkRecordsFailure = (error: any) => ({
  type: INSERT_WORK_RECORDS_FAILURE,
  payload: error,
});
