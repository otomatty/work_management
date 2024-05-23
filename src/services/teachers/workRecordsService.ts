import {
  addWorkRecord,
  updateWorkRecord,
  deleteWorkRecord,
  getMonthlyWorkRecords,
  getSchedules,
} from '../../firebase';

import { getData, getDocIdAndDayKey } from '../../firebase/helpers';

import { WorkRecord, LessonInfo, Schedule } from '../../types'; // 型定義をインポート

import {
  collection,
  query,
  where,
  getDocs,
  writeBatch,
  doc,
  deleteField,
} from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export const workRecordsService = {
  // Work Record related functions
  addWorkRecord: async (
    teacherId: string,
    year: number,
    month: number,
    day: number,
    workRecord: WorkRecord
  ): Promise<void> => {
    try {
      await addWorkRecord(teacherId, year, month, day, workRecord);
      console.log('Work record added successfully');
    } catch (error) {
      console.error('Error adding work record:', error);
      throw error;
    }
  },

  updateWorkRecord: async (
    teacherId: string,
    year: number,
    month: number,
    day: number,
    workRecord: Partial<WorkRecord>
  ): Promise<void> => {
    try {
      await updateWorkRecord(teacherId, year, month, day, workRecord);
      console.log('Work record updated successfully');
    } catch (error) {
      console.error('Error updating work record:', error);
      throw error;
    }
  },
  deleteWorkRecord: async (
    teacherId: string,
    year: number,
    month: number,
    day: number
  ): Promise<void> => {
    try {
      await deleteWorkRecord(teacherId, year, month, day);
      console.log('Work record deleted successfully');
    } catch (error) {
      console.error('Error deleting work record:', error);
      throw error;
    }
  },

  deleteWorkRecords: async (
    teacherId: string,
    startDate: Date,
    endDate: Date
  ): Promise<void> => {
    try {
      const workRecordsCollection = collection(db, 'workRecords');
      const q = query(
        workRecordsCollection,
        where('teacherId', '==', teacherId),
        where('date', '>=', startDate),
        where('date', '<=', endDate)
      );

      const querySnapshot = await getDocs(q);
      const batch = writeBatch(db);

      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      console.log('Work records deleted successfully');
    } catch (error) {
      console.error('Error deleting work records:', error);
      throw error;
    }
  },

  insertWorkRecords: async (
    teacherId: string,
    workRecords: { date: Date; workRecord: WorkRecord }[]
  ): Promise<void> => {
    try {
      const batch = writeBatch(db);
      const workRecordsCollection = collection(db, 'workRecords');

      for (const { date, workRecord } of workRecords) {
        const docRef = doc(
          workRecordsCollection,
          `${teacherId}_${date.toISOString()}`
        );
        batch.set(docRef, {
          ...workRecord,
          date: date.toISOString(),
          teacherId, // teacherId を追加
        });
      }

      await batch.commit();
      console.log('Work records inserted successfully');
    } catch (error) {
      console.error('Error inserting work records:', error);
      throw error;
    }
  },

  // 月毎勤務記録を取得し、全日に対してデータを整形する関数
  getFullMonthlyWorkRecords: async (
    teacherId: string,
    year: number,
    month: number
  ): Promise<Record<string, WorkRecord | {}>> => {
    try {
      const numDays = new Date(year, month + 1, 0).getDate(); // その月の日数を取得
      const monthlyRecords = await getMonthlyWorkRecords(
        teacherId,
        year,
        month - 1
      ); // 月は0から始まるため、1を引く
      const fullMonthlyRecords: Record<string, WorkRecord | {}> = {};

      // 全日して空のデータを初期化
      for (let day = 1; day <= numDays; day++) {
        const dayKey = day.toString().padStart(2, '0');
        fullMonthlyRecords[dayKey] = {
          classroom: '',
          startTime: '',
          endTime: '',
          teachHour: 0,
          officeHour: 0,
          workDescription: '',
          lessonInfo: [] as LessonInfo[],
        }; // 空のデータで初期化
      }

      // 取得したデータで上書き
      Object.keys(monthlyRecords).forEach((dayKey) => {
        fullMonthlyRecords[dayKey] = {
          ...fullMonthlyRecords[dayKey],
          ...monthlyRecords[dayKey],
        };
      });

      return fullMonthlyRecords;
    } catch (error) {
      console.error('Error fetching full monthly work records:', error);
      throw error;
    }
  },

  // 期間指定でworkRecords内のデータを一括削除する
  deleteWorkRecordsByDateRange: async (
    teacherId: string,
    year: number,
    month: number,
    startDate: Date,
    endDate: Date
  ): Promise<void> => {
    try {
      console.log('deleteWorkRecordsByDateRange month value:', month); // monthの値を表示

      const startDay = startDate.getDate().toString().padStart(2, '0'); // 日にちを2桁の形式に変換
      const endDay = endDate.getDate().toString().padStart(2, '0'); // 日にちを2桁の形式に変換

      const { docId } = getDocIdAndDayKey(year, month - 1, 1); // 対象の年月のドキュメントIDを取得
      const docRef = doc(db, `teachers/${teacherId}/workRecords`, docId);
      const data = (await getData(teacherId, 'workRecords', docId)) || {};

      const batch = writeBatch(db);

      for (let day = parseInt(startDay); day <= parseInt(endDay); day++) {
        const dayKey = day.toString().padStart(2, '0');
        if (data[dayKey]) {
          batch.update(docRef, { [dayKey]: deleteField() });
        }
      }

      await batch.commit();
      console.log('Work records deleted successfully');
    } catch (error) {
      console.error('Error deleting work records:', error);
      throw error;
    }
  },

  // 期間指定でworkRecords内にデータを一括登録する
  insertWorkRecordsByDateRange: async (
    teacherId: string,
    year: number,
    month: number,
    startDate: Date,
    endDate: Date
  ): Promise<void> => {
    try {
      const { docId } = getDocIdAndDayKey(year, month - 1, 1); // 対象の年月のドキュメントIDを取得
      const docRef = doc(db, `teachers/${teacherId}/workRecords`, docId);

      const batch = writeBatch(db);

      // getMonthlyScheduleを呼���出してスケジュールを取得
      const monthlySchedule = await workRecordsService.getMonthlySchedule(
        teacherId,
        year,
        month
      );
      console.log('Monthly Schedule:', monthlySchedule); // デバッグ用ログを追加

      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
      ) {
        const dayKey = d.getDate().toString().padStart(2, '0'); // 日にちを2桁の形式に変換
        const { dayOfWeek, students, ...scheduleWithoutDayOfWeek } =
          monthlySchedule[dayKey]; // dayOfWeekフィールドを除外

        // studentsフィールドをlessonInfoフィールドに変更し、各レッスン情報にstatusを追加
        const lessonInfo = students
          ? students.map((student) => ({ ...student, status: '通常' }))
          : [{ status: '通常' }];

        batch.set(
          docRef,
          { [dayKey]: { ...scheduleWithoutDayOfWeek, lessonInfo } }, // スケジュールを追加
          { merge: true }
        );
      }

      await batch.commit();
      console.log('Work records inserted successfully');
    } catch (error) {
      console.error('Error inserting work records:', error);
      throw error;
    }
  },

  deleteAllWorkRecordsForMonth: async (
    teacherId: string,
    year: number,
    month: number
  ): Promise<void> => {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);

    await workRecordsService.deleteWorkRecordsByDateRange(
      teacherId,
      year,
      month,
      startDate,
      endDate
    );
  },

  insertAllWorkRecordsForMonth: async (
    teacherId: string,
    year: number,
    month: number
  ): Promise<void> => {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);

    await workRecordsService.insertWorkRecordsByDateRange(
      teacherId,
      year,
      month,
      startDate,
      endDate
    );
  },

  // 指定された月の最初の曜日を基準に週間スケジュールを並び替え、��り返し適用する関数
  getMonthlySchedule: async (
    teacherId: string,
    year: number,
    month: number
  ): Promise<Record<string, Schedule>> => {
    const schedules = await getSchedules(teacherId);
    // console.log('Schedules:', schedules); // デバッグ用ログを追加
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 月の日数を取得

    const weeklySchedule = Object.values(schedules);

    const monthlySchedule: Record<string, Schedule> = {};

    for (let day = 0; day < daysInMonth; day++) {
      const schedule = weeklySchedule.find(
        (s) =>
          s.dayOfWeek ===
          new Date(year, month, day + 1).toLocaleDateString('en-US', {
            weekday: 'long',
          })
      );
      if (schedule) {
        const dayKey = (day + 1).toString().padStart(2, '0'); // 日にちを2桁の形式に変換
        monthlySchedule[dayKey] = {
          ...schedule,
          dayOfWeek: new Date(year, month, day + 1).toLocaleDateString(
            'en-US',
            { weekday: 'long' }
          ), // 曜日を文字列で設定
        };
      }
    }

    console.log('Monthly Schedule:', monthlySchedule); // デバッグ用ログを追加
    return monthlySchedule;
  },
};
