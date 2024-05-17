import { deleteField } from "firebase/firestore";
import { getDocIdAndDayKey, saveData, getData } from "../../helpers";

// オフィスアワーを保存
export async function addOfficeHour(
  teacherId: string,
  year: number,
  month: number,
  day: number,
  officeHour: number
): Promise<void> {
  const { docId, dayKey } = getDocIdAndDayKey(year, month, day);
  await saveData(
    teacherId,
    "workRecords",
    docId,
    { [dayKey]: { officeHour } },
    "Office hour saved"
  );
}

// オフィスアワーを取得
export async function getOfficeHour(
  teacherId: string,
  year: number,
  month: number,
  day: number
): Promise<number | null> {
  const { docId, dayKey } = getDocIdAndDayKey(year, month, day);
  const data = await getData(teacherId, "workRecords", docId);
  return data?.[dayKey]?.officeHour || null;
}

// オフィスアワーを更新
export async function updateOfficeHour(
  teacherId: string,
  year: number,
  month: number,
  day: number,
  officeHour: number
): Promise<void> {
  const { docId, dayKey } = getDocIdAndDayKey(year, month, day);
  await saveData(
    teacherId,
    "workRecords",
    docId,
    { [dayKey]: { officeHour } },
    "Office hour updated"
  );
}

// オフィスアワーを削除
export async function deleteOfficeHour(
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
    "Office hour deleted"
  );
}
