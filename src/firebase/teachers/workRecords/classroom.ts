import { deleteField } from "firebase/firestore";
import { getDocIdAndDayKey, saveData, getData } from "../../helpers";

// 勤務記録の教室情報を保存
export async function addWorkRecordClassroom(
  teacherId: string,
  year: number,
  month: number,
  day: number,
  classroom: string
): Promise<void> {
  const { docId, dayKey } = getDocIdAndDayKey(year, month, day);
  await saveData(
    teacherId,
    "workRecords",
    docId,
    { [dayKey]: { classroom } },
    "Classroom saved"
  );
}

// 勤務記録の教室情報を取得
export async function getWorkRecordClassroom(
  teacherId: string,
  year: number,
  month: number,
  day: number
): Promise<string | null> {
  const { docId, dayKey } = getDocIdAndDayKey(year, month, day);
  const data = await getData(teacherId, "workRecords", docId);
  return data?.[dayKey]?.classroom || null;
}

// 勤務記録の教室情報を更新
export async function updateWorkRecordClassroom(
  teacherId: string,
  year: number,
  month: number,
  day: number,
  classroom: string
): Promise<void> {
  const { docId, dayKey } = getDocIdAndDayKey(year, month, day);
  await saveData(
    teacherId,
    "workRecords",
    docId,
    { [dayKey]: { classroom } },
    "Classroom updated"
  );
}

// 勤務記録の教室情報を削除
export async function deleteWorkRecordClassroom(
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
    "Classroom deleted"
  );
}
