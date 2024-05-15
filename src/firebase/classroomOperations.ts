import { db } from "./firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { Student, StudentChangeInfo, WorkHours, Schedule } from "../types";

// 教室を保存する関数
export async function saveClassroom(
  teacherId: string,
  dayOfWeek: string,
  classroom: string
): Promise<void> {
  const scheduleRef = doc(db, "teachers", teacherId, "schedules", dayOfWeek);
  try {
    await setDoc(scheduleRef, { classroom }, { merge: true });
    console.log("Classroom saved successfully");
  } catch (e) {
    console.error("Error saving classroom: ", e);
    throw new Error("Failed to save classroom");
  }
}

export async function saveClassroomByDate(
  teacherId: string,
  year: number,
  month: number,
  day: number,
  classroom: string
): Promise<void> {
  const yearMonth = `${year}-${month + 1}`; // 年月を YYYY-MM 形式でフォーマット
  const dayKey = day.toString().padStart(2, "0"); // 日を 2 桁の文字列でフォーマット
  const docRef = doc(db, "teachers", teacherId, "work_records", yearMonth);

  try {
    await setDoc(
      docRef,
      {
        [dayKey]: { classroom },
      },
      { merge: true }
    );
    console.log("Classroom saved successfully for:", dayKey);
  } catch (e) {
    console.error("Error saving classroom:", e);
    throw new Error("Failed to save classroom");
  }
}

// 教室情報を取得する関数（曜日または日付に基づく）
export async function fetchClassroom(
  teacherId: string,
  identifier: number | string, // 曜日（数値）または年月日（文字列）
  isDayOfWeek: boolean = true // デフォルトは曜日に基づく
): Promise<string> {
  let docPath = isDayOfWeek
    ? `schedules/${identifier.toString()}`
    : `work_records/${identifier}`;

  const docRef = doc(db, "teachers", teacherId, docPath);

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data().classroom) {
      return docSnap.data().classroom;
    } else {
      return "";
    }
  } catch (e) {
    console.error(
      `Error fetching classroom for ${isDayOfWeek ? "day of week" : "date"}: ${identifier}`,
      e
    );
    return "";
  }
}

export async function saveClassroomInfoForDate(
  teacherId: string,
  year: number,
  month: number,
  day: number
): Promise<void> {
  const date = new Date(year, month, day);
  const dayOfWeek = date.getDay(); // 曜日を取得 (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

  try {
    // 曜日に基づいて教室情報を取得
    const classroom = await fetchClassroom(teacherId, dayOfWeek);
    if (!classroom) {
      console.log(`No classroom found for day of week: ${dayOfWeek}`);
      return;
    }

    // 教室情報を指定された日付の勤務記録に保存
    const yearMonth = `${year}-${month + 1}`;
    const dayKey = day.toString().padStart(2, "0");
    const docRef = doc(db, "teachers", teacherId, "work_records", yearMonth);

    await setDoc(docRef, { [dayKey]: { classroom } }, { merge: true });
    console.log(`Classroom saved successfully for ${yearMonth}-${dayKey}`);
  } catch (e) {
    console.error("Error saving classroom info for date:", e);
    throw new Error("Failed to save classroom info for date");
  }
}
