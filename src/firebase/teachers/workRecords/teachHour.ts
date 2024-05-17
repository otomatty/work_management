import { deleteField } from "firebase/firestore";
import { getDocIdAndDayKey, saveData, getData } from "../../helpers";

// 教務時間を保存
export async function addTeachHour(
  teacherId: string,
  year: number,
  month: number,
  day: number,
  teachHour: number
): Promise<void> {
  const { docId, dayKey } = getDocIdAndDayKey(year, month, day);
  await saveData(
    teacherId,
    "workRecords",
    docId,
    { [dayKey]: { teachHour } },
    "Teach hour saved"
  );
}

// 教務時間を取得
export async function getTeachHour(
  teacherId: string,
  year: number,
  month: number,
  day: number
): Promise<number | null> {
  const { docId, dayKey } = getDocIdAndDayKey(year, month, day);
  const data = await getData(teacherId, "workRecords", docId);
  return data?.[dayKey]?.teachHour || null;
}

// 教務時間を更新
export async function updateTeachHour(
  teacherId: string,
  year: number,
  month: number,
  day: number,
  teachHour: number
): Promise<void> {
  const { docId, dayKey } = getDocIdAndDayKey(year, month, day);
  await saveData(
    teacherId,
    "workRecords",
    docId,
    { [dayKey]: { teachHour } },
    "Teach hour updated"
  );
}

// 教務時間を削除
export async function deleteTeachHour(
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
    "Teach hour deleted"
  );
}
