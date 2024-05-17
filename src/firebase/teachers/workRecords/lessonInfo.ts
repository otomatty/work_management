import { deleteField } from "firebase/firestore";
import { getDocIdAndDayKey, saveData, getData } from "../../helpers";
import { LessonInfo } from "../../../types";

// レッスン情報を保存
export async function addLessonInfo(
  teacherId: string,
  year: number,
  month: number,
  day: number,
  lessonInfo: LessonInfo[]
): Promise<void> {
  const { docId, dayKey } = getDocIdAndDayKey(year, month, day);
  await saveData(
    teacherId,
    "workRecords",
    docId,
    { [dayKey]: { lessonInfo } },
    "Lesson info saved"
  );
}

// レッスン情報を取得
export async function getLessonInfo(
  teacherId: string,
  year: number,
  month: number,
  day: number
): Promise<LessonInfo[] | null> {
  const { docId, dayKey } = getDocIdAndDayKey(year, month, day);
  const data = await getData(teacherId, "workRecords", docId);
  return data?.[dayKey]?.lessonInfo || null;
}

// レッスン情報を更新
export async function updateLessonInfo(
  teacherId: string,
  year: number,
  month: number,
  day: number,
  lessonInfo: Partial<LessonInfo>[]
): Promise<void> {
  const { docId, dayKey } = getDocIdAndDayKey(year, month, day);
  await saveData(
    teacherId,
    "workRecords",
    docId,
    { [dayKey]: lessonInfo },
    "Lesson info updated"
  );
}

// レッスン情報を削除
export async function deleteLessonInfo(
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
    "Lesson info deleted"
  );
}
