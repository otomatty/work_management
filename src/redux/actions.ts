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
