import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCH_SCHEDULE_REQUEST,
  fetchScheduleSuccess,
  fetchScheduleFailure,
  FETCH_WORK_RECORDS_REQUEST,
  fetchWorkRecordsSuccess,
  fetchWorkRecordsFailure,
  SAVE_WORK_RECORD_REQUEST,
  saveWorkRecordSuccess,
  saveWorkRecordFailure,
  ADD_SCHEDULE_REQUEST,
  addScheduleSuccess,
  addScheduleFailure,
  DELETE_WORK_RECORDS_REQUEST,
  deleteWorkRecordsSuccess,
  deleteWorkRecordsFailure,
  INSERT_WORK_RECORDS_REQUEST,
  insertWorkRecordsSuccess,
  insertWorkRecordsFailure,
} from "./actions";
import { schedulesService, workRecordsService } from "../services";
import { Schedule, WorkRecord } from "../types"; // 型をインポート

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

function* saveWorkRecord(action: any): any {
  try {
    const { teacherId, year, month, day, workRecord } = action.payload;
    yield call(
      workRecordsService.updateWorkRecord,
      teacherId,
      year,
      month,
      day,
      workRecord
    );
    yield put(saveWorkRecordSuccess(workRecord));
  } catch (error) {
    yield put(saveWorkRecordFailure(error));
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

function* deleteWorkRecords(action: any): any {
  try {
    const { teacherId, startDate, endDate } = action.payload;
    yield call(
      workRecordsService.deleteWorkRecords,
      teacherId,
      startDate,
      endDate
    );
    yield put(deleteWorkRecordsSuccess());
  } catch (error) {
    yield put(deleteWorkRecordsFailure(error));
  }
}

function* insertWorkRecords(action: any): any {
  try {
    const { teacherId, startDate, endDate } = action.payload;
    const schedules: Schedule[] = yield call(
      schedulesService.getSchedules,
      teacherId
    );

    const workRecords: { date: Date; workRecord: WorkRecord }[] = [];
    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const dayOfWeek = date.getDay();
      const schedule = schedules.find(
        (s) => s.dayOfWeek === dayOfWeek.toString()
      );
      if (schedule) {
        const lessonInfo = schedule.students.map((student) => ({
          studentName: student.studentName,
          grade: student.grade,
          subject: student.subject,
          status: "通常",
          time: student.time,
        }));

        const workRecord: WorkRecord = {
          classroom: schedule.classroom,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          officeHour: 0, // 必要に応じて適切な値を設定
          teachHour: 0, // 必要に応じて適切な値を設���
          lessonInfo,
          workDescription: "",
        };

        workRecords.push({ date: new Date(date), workRecord });
      }
    }

    yield call(workRecordsService.insertWorkRecords, teacherId, workRecords);
    yield put(insertWorkRecordsSuccess());
  } catch (error) {
    yield put(insertWorkRecordsFailure(error));
  }
}

function* rootSaga() {
  yield takeEvery(FETCH_SCHEDULE_REQUEST, fetchSchedule);
  yield takeEvery(FETCH_WORK_RECORDS_REQUEST, fetchWorkRecords);
  yield takeEvery(SAVE_WORK_RECORD_REQUEST, saveWorkRecord);
  yield takeEvery(ADD_SCHEDULE_REQUEST, addSchedule);
  yield takeEvery(DELETE_WORK_RECORDS_REQUEST, deleteWorkRecords);
  yield takeEvery(INSERT_WORK_RECORDS_REQUEST, insertWorkRecords);
}

export default rootSaga;
