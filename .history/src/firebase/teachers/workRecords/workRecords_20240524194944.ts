import { deleteField } from 'firebase/firestore';
import { getDocIdAndDayKey, saveData, getData } from '../../helpers';
import { WorkRecord } from '../../../types';

// 勤務情報を追加する

// 勤務情報を更新する
export async function updateWorkRecord(
  teacherId: string,
  year: number,
  month: number,
  day: number,
  workRecord: Partial<WorkRecord>
): Promise<void> {
  const { docId, dayKey } = getDocIdAndDayKey(year, month + 1, day);
    teacherId,
    docId,
    dayKey,
    workRecord,
  }); // 追加
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
