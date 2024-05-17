import { deleteField } from "firebase/firestore";
import { getDocIdAndDayKey, saveData, getData } from "../../helpers";

// 業務内容を保存
export async function addWorkDescription(
  teacherId: string,
  year: number,
  month: number,
  day: number,
  workDescription: string
): Promise<void> {
  const { docId, dayKey } = getDocIdAndDayKey(year, month, day);
  await saveData(
    teacherId,
    "workRecords",
    docId,
    { [dayKey]: { workDescription } },
    "Work description saved"
  );
}

// 業務内容を取得
export async function getWorkDescription(
  teacherId: string,
  year: number,
  month: number,
  day: number
): Promise<string | null> {
  const { docId, dayKey } = getDocIdAndDayKey(year, month, day);
  const data = await getData(teacherId, "workRecords", docId);
  return data?.[dayKey]?.workDescription || null;
}

// 業務内容を更新
export async function updateWorkDescription(
  teacherId: string,
  year: number,
  month: number,
  day: number,
  workDescription: string
): Promise<void> {
  const { docId, dayKey } = getDocIdAndDayKey(year, month, day);
  await saveData(
    teacherId,
    "workRecords",
    docId,
    { [dayKey]: { workDescription } },
    "Work description updated"
  );
}

// 業務内容を削除
export async function deleteWorkDescription(
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
    "Work description deleted"
  );
}
