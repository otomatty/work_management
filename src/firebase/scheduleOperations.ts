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

// 依存関係にあるFirestore関数をインポート
import { fetchStudentsByTeacherIdAndDay } from "./studentOperations";
import { saveDayData } from "./workRecordOperations";

// 講師IDに基づいてスケジュールを取得
export async function fetchSchedulesByTeacherId(
  teacherId: string
): Promise<Record<string, Schedule>> {
  const schedulesRef = collection(db, "teachers", teacherId, "schedules");
  const schedulesData: Record<string, Schedule> = {}; // オブジェクトを使用してスケジュールをグループ化

  try {
    const querySnapshot = await getDocs(schedulesRef);
    querySnapshot.forEach((doc) => {
      const schedule = {
        ...(doc.data() as Schedule),
        dayOfWeek: doc.id,
      };
      schedulesData[schedule.dayOfWeek] = schedule; // dayOfWeek をキーとしてスケジュールをグループ化
    });
    // console.log("Schedules fetched successfully");
    return schedulesData;
  } catch (e) {
    console.error("Error fetching schedules: ", e);
    return {}; // エラーが発生した場合は空のオブジェクトを返す
  }
}

// schedulesから曜日ごとの時間を取得
export async function fetchScheduleByDay(
  teacherId: string,
  dayOfWeek: string
): Promise<{ startTime?: string; endTime?: string }> {
  const docRef = doc(db, "teachers", teacherId, "schedules", dayOfWeek);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        startTime: data.startTime,
        endTime: data.endTime,
      };
    } else {
      console.log("No schedule found for this day.");
      return {};
    }
  } catch (e) {
    console.error("Error fetching schedule:", e);
    return {};
  }
}

// 月の全日に対して曜日ごとの出勤時間と退勤時間を設定する関数
export async function setMonthlyWorkHours(
  teacherId: string,
  year: number,
  month: number
) {
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // その月の日数を取得
  const weekdayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  try {
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = weekdayNames[date.getDay()]; // 曜日を取得

      // 曜日ごとのスケジュールを取得
      const schedule = await fetchScheduleByDay(teacherId, dayOfWeek);
      // 生徒情報を取得
      const students = await fetchStudentsByTeacherIdAndDay(
        teacherId,
        dayOfWeek
      );
      // 勤務記録を保存
      await saveDayData(
        teacherId,
        year,
        month,
        day,
        schedule.startTime || "", // startTimeがない場合は"未設定"を使用
        schedule.endTime || "", // endTimeがない場合は"未設定"を使用
        students,
        [], // studentsChangeInfo は空の配列または適切なデータを設定
        "" // workDescription は空文字列または適切な説明を設定
      );
    }
    console.log("Monthly work hours set successfully.");
  } catch (e) {
    console.error("Error setting monthly work hours:", e);
  }
}

// 講師のスケジュール詳細を追加または更新
export async function setTeacherScheduleWithDetails(
  teacherId: string,
  dayOfWeek: string,
  scheduleDetails: {
    startTime: string;
    endTime: string;
    students: Array<{
      studentName: string;
      subjectAndGrade: string;
      time: string;
    }>;
  }
) {
  const scheduleRef = doc(db, "teachers", teacherId, "schedules", dayOfWeek);
  try {
    await setDoc(scheduleRef, scheduleDetails, { merge: true });
    // console.log("Detailed schedule updated successfully");
  } catch (e) {
    console.error("Error updating detailed schedule: ", e);
  }
}
