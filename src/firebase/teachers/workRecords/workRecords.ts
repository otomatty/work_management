import {
  doc,
  deleteField,
  collection,
  query,
  where,
  getDocs,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { getDocIdAndDayKey, saveData, getData } from '../../helpers';
import { WorkRecord } from '../../../types';

// 勤務情報を追加する
export async function addWorkRecord(
  teacherId: string,
  year: number,
  month: number,
  day: number,
  workRecord: WorkRecord
): Promise<void> {
  const { docId, dayKey } = getDocIdAndDayKey(year, month, day);
  await saveData(
    teacherId,
    'workRecords',
    docId,
    { [dayKey]: workRecord },
    'Work record added'
  );
}

// 勤務情報を更新する
export async function updateWorkRecord(
  teacherId: string,
  year: number,
  month: number,
  day: number,
  workRecord: Partial<WorkRecord>
): Promise<void> {
  const { docId, dayKey } = getDocIdAndDayKey(year, month, day);
  await saveData(
    teacherId,
    'workRecords',
    docId,
    { [dayKey]: workRecord },
    'Work record updated'
  );
}

// 勤務情報を削除する
export async function deleteWorkRecord(
  teacherId: string,
  year: number,
  month: number,
  day: number
): Promise<void> {
  const { docId, dayKey } = getDocIdAndDayKey(year, month, day);
  await saveData(
    teacherId,
    'workRecords',
    docId,
    { [dayKey]: deleteField() },
    'Work record deleted'
  );
}

// 月毎の勤務記録を取得する
export async function getMonthlyWorkRecords(
  teacherId: string,
  year: number,
  month: number
): Promise<Record<string, WorkRecord>> {
  const { docId } = getDocIdAndDayKey(year, month, 1); // 月のドキュメントIDを取得
  const data = await getData(teacherId, 'workRecords', docId);
  if (!data) return {};

  const workRecords: Record<string, WorkRecord> = {};
  for (const dayKey in data) {
    if (data.hasOwnProperty(dayKey)) {
      workRecords[dayKey] = data[dayKey];
    }
  }
  // console.log("Monthly Work Records:", workRecords); // 取得したデータをコンソールに表示
  return workRecords;
}

// 期間指定でworkRecords内のデータを一括削除する
export async function deleteWorkRecordsByDateRange(
  teacherId: string,
  year: number,
  month: number,
  startDate: Date,
  endDate: Date
): Promise<void> {
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
}

// 月全体のworkRecords内のデータを一括削除する
export async function deleteAllWorkRecordsForMonth(
  teacherId: string,
  year: number,
  month: number
): Promise<void> {
  console.log('deleteAllWorkRecordsForMonth month value:', month); // monthの値を表示

  const startDate = new Date(year, month - 1, 1); // 月の最初の日を設定
  const endDate = new Date(year, month, 0); // 現在の月の最終日を設定

  await deleteWorkRecordsByDateRange(
    teacherId,
    year,
    month,
    startDate,
    endDate
  );
}

// 期間指定でworkRecords内にデータを一括登録する
export async function insertWorkRecordsByDateRange(
  teacherId: string,
  year: number,
  month: number,
  startDate: Date,
  endDate: Date,
  workRecords: Record<string, any>[]
): Promise<void> {
  try {
    const { docId } = getDocIdAndDayKey(year, month, 1); // 対象の年月のドキュメントIDを取得
    const workRecordsCollection = collection(db, 'workRecords', docId);
    const batch = writeBatch(db);

    workRecords.forEach((record) => {
      const dayKey = record.day.toString().padStart(2, '0'); // レコードの日にちを2桁の形式に変換
      const docRef = doc(workRecordsCollection, dayKey);
      batch.set(docRef, record);
    });

    await batch.commit();
    console.log('Work records inserted successfully');
  } catch (error) {
    console.error('Error inserting work records:', error);
    throw error;
  }
}

// 月全体のworkRecords内にデータを一括登録する
export async function insertAllWorkRecordsForMonth(
  teacherId: string,
  year: number,
  month: number,
  workRecords: Record<string, any>[]
): Promise<void> {
  const startDate = new Date(year, month, 1); // 月の最初の日を設定
  const endDate = new Date(year, month + 1, 0); // 月の最終日を設定

  await insertWorkRecordsByDateRange(
    teacherId,
    year,
    month,
    startDate,
    endDate,
    workRecords
  );
}
