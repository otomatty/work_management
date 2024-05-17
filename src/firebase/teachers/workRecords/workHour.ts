import { deleteField } from "firebase/firestore";
import { getDocIdAndDayKey, saveData, getData } from "../../helpers";

// 出勤時間と退勤時間を保存
export async function addWorkHour(
  teacherId: string,
  year: number,
  month: number,
  day: number,
  startTime: string,
  endTime: string
): Promise<void> {
  const { docId, dayKey } = getDocIdAndDayKey(year, month, day);
  await saveData(
    teacherId,
    "workRecords",
    docId,
    { [dayKey]: { startTime, endTime } },
    "Work hour saved"
  );
}

// 出勤時間と退勤時間を取得
export async function getWorkHour(
  teacherId: string,
  year: number,
  month: number,
  day: number
): Promise<{ startTime: string; endTime: string } | null> {
  const { docId, dayKey } = getDocIdAndDayKey(year, month, day);
  const data = await getData(teacherId, "workRecords", docId);
  if (data?.[dayKey]?.startTime && data?.[dayKey]?.endTime) {
    return {
      startTime: data[dayKey].startTime,
      endTime: data[dayKey].endTime,
    };
  }
  return null;
}

// 出勤時間と退勤時間を更新
export async function updateWorkHour(
  teacherId: string,
  year: number,
  month: number,
  day: number,
  startTime: string,
  endTime: string
): Promise<void> {
  const { docId, dayKey } = getDocIdAndDayKey(year, month, day);
  await saveData(
    teacherId,
    "workRecords",
    docId,
    { [dayKey]: { startTime, endTime } },
    "Work hour updated"
  );
}

// 出勤時間と退勤時間を削除
export async function deleteWorkHour(
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
    "Work hour deleted"
  );
}
