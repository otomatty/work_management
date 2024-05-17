import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCH_SCHEDULE_REQUEST,
  fetchScheduleSuccess,
  fetchScheduleFailure,
  FETCH_WORK_RECORDS_REQUEST,
  fetchWorkRecordsSuccess,
  fetchWorkRecordsFailure,
  ADD_SCHEDULE_REQUEST,
  addScheduleSuccess,
  addScheduleFailure,
} from "./actions";
import { schedulesService, workRecordsService } from "../services";

function* fetchSchedule(action: any): any {
  try {
    const { teacherId, dayOfWeek } = action.payload;
    const schedules = yield call(schedulesService.getSchedules, teacherId);
    const schedule = schedules[dayOfWeek]; // dayOfWeekに対応するスケジュールを取得
    yield put(fetchScheduleSuccess(schedule));
  } catch (error) {
    yield put(fetchScheduleFailure(error));
  }
}

function* fetchWorkRecords(action: any): any {
  try {
    const { teacherId, year, month, day } = action.payload;
    const workRecords = yield call(
      workRecordsService.getWorkRecord,
      teacherId,
      year,
      month,
      day
    );
    yield put(fetchWorkRecordsSuccess(workRecords));
  } catch (error) {
    yield put(fetchWorkRecordsFailure(error));
  }
}

function* addSchedule(action: any): any {
  try {
    const { teacherId, dayOfWeek, schedule } = action.payload;
    yield call(schedulesService.addSchedule, teacherId, dayOfWeek, schedule);
    yield put(addScheduleSuccess(schedule));
  } catch (error) {
    yield put(addScheduleFailure(error));
  }
}

function* rootSaga() {
  yield takeEvery(FETCH_SCHEDULE_REQUEST, fetchSchedule);
  yield takeEvery(FETCH_WORK_RECORDS_REQUEST, fetchWorkRecords);
  yield takeEvery(ADD_SCHEDULE_REQUEST, addSchedule);
}

export default rootSaga;
