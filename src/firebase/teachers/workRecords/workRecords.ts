import { deleteField } from "firebase/firestore";
import { getDocIdAndDayKey, saveData, getData } from "../../helpers";
import { WorkRecord } from "../../../types";

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
    "workRecords",
    docId,
    { [dayKey]: workRecord },
    "Work record added"
  );
}

// 勤務情報を取得する
export async function getWorkRecord(
  teacherId: string,
  year: number,
  month: number,
  day: number
): Promise<WorkRecord | null> {
  const { docId, dayKey } = getDocIdAndDayKey(year, month, day);
  const data = await getData(teacherId, "workRecords", docId);
  return data?.[dayKey] || null;
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
    "workRecords",
    docId,
    { [dayKey]: workRecord },
    "Work record updated"
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
    "workRecords",
    docId,
    { [dayKey]: deleteField() },
    "Work record deleted"
  );
}
