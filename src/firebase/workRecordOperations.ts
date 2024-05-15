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
import { fetchClassroom } from "./classroomOperations";

// 勤務情報を取得する
export async function fetchWorkRecord(
  teacherId: string,
  year: number,
  month: number,
  day: number
): Promise<{
  startTime?: string;
  endTime?: string;
  students?: { studentName: string; subjectAndGrade: string; time: string }[];
  studentsChangeInfo?: { studentName: string; status: string; time: string }[];
  workDescription?: string;
}> {
  const yearMonth = `${year}-${month + 1}`;
  const dayKey = day.toString().padStart(2, "0");
  const docRef = doc(db, "teachers", teacherId, "work_records", yearMonth);

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data()[dayKey]) {
      return docSnap.data()[dayKey];
    } else {
      // console.log("No work record found for this day.");
      return {};
    }
  } catch (e) {
    console.error("Error fetching work record:", e);
    return {};
  }
}

// 勤務情報を削除する
export async function deleteWorkRecords(
  teacherId: string,
  year: number,
  month: number,
  startDay?: number,
  endDay?: number
) {
  const yearMonth = `${year}-${month + 1}`;
  const docRef = doc(db, "teachers", teacherId, "work_records", yearMonth);

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const updateData: Record<string, any> = {};
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const formattedDay = day.toString().padStart(2, "0"); // 日付を2桁の文字列でフォーマット
        if (!startDay || !endDay || (day >= startDay && day <= endDay)) {
          updateData[formattedDay] = deleteField();
          console.log(`Deleting field for day ${formattedDay}`);
        }
      }

      await updateDoc(docRef, updateData);
      console.log("Work records deleted successfully.");
    } else {
      console.log("No document exists for the specified year and month.");
    }
  } catch (e) {
    console.error("Error deleting work records:", e);
  }
}

// 教務時間を取得する
export async function fetchTeachHour(
  teacherId: string,
  year: number,
  month: number,
  day: number
): Promise<WorkHours> {
  const yearMonth = `${year}-${month + 1}`;
  const dayKey = day.toString().padStart(2, "0");
  const docRef = doc(db, "teachers", teacherId, "work_records", yearMonth);

  try {
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      console.error("Document does not exist!");
      return { teachingHours: 0, adminHours: 0 };
    }

    const data = docSnap.data()[dayKey];
    if (!data) {
      console.error("No data found for this day.");
      return { teachingHours: 0, adminHours: 0 };
    }

    let teachingHours = 0;
    if (data.students) {
      teachingHours += data.students.reduce(
        (sum: number, student: { time: string }) =>
          sum + parseFloat(student.time),
        0
      );
    }
    if (data.studentChangeInfo) {
      data.studentChangeInfo.forEach(
        (info: { status: string; time: string }) => {
          if (info.status === "MU") {
            teachingHours += parseFloat(info.time);
          } else if (info.status === "休み") {
            teachingHours -= parseFloat(info.time);
          }
        }
      );
    }

    // 事務時間は仮に固定値を返す（実際の計算方法に応じて変更）
    const adminHours = 2; // 事務時間を2時間とする

    return { teachingHours, adminHours };
  } catch (e) {
    console.error("Error fetching work hours:", e);
    return { teachingHours: 0, adminHours: 0 };
  }
}

// 勤務記録を保存する
export async function saveDayData(
  teacherId: string,
  year: number,
  month: number,
  day: number,
  startTime: string,
  endTime: string,
  students: Student[],
  studentsChangeInfo: StudentChangeInfo[],
  workDescription: string
): Promise<void> {
  const date = new Date(year, month, day);
  const dayOfWeek = date.getDay(); // 曜日を取得 (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

  // 曜日に基づいて教室情報を取得
  const classroom = await fetchClassroom(teacherId, dayOfWeek);

  const yearMonth = `${year}-${month + 1}`;
  const dayKey = day.toString().padStart(2, "0");
  const docRef = doc(db, "teachers", teacherId, "work_records", yearMonth);

  const record = {
    startTime,
    endTime,
    students: students.map((student) => ({
      studentName: student.studentName,
      subjectAndGrade: student.subjectAndGrade,
      time: student.time,
    })),
    studentsChangeInfo: studentsChangeInfo.map((info) => ({
      studentName: info.studentName,
      status: info.status,
      time: info.time,
    })),
    workDescription,
    classroom, // 教室情報を記録に追加
  };

  try {
    await setDoc(docRef, { [dayKey]: record }, { merge: true });
    console.log("Work record saved successfully:", record);
  } catch (e) {
    console.error("Error saving work record:", e);
    throw new Error("Failed to save work record");
  }
}

// 勤務記録の追加
export async function addWorkRecord(
  teacherId: string,
  yearMonth: string,
  day: string,
  record: object
) {
  const docRef = doc(db, "teachers", teacherId, "work_records", yearMonth);
  await setDoc(
    docRef,
    {
      [day]: record,
    },
    { merge: true }
  );
}

// 勤務時間を保存する
export async function saveWorkHours(
  teacherId: string,
  year: number,
  month: number,
  day: number,
  workHours: { startTime: string; endTime: string; workHours: string }
): Promise<void> {
  const yearMonth = `${year}-${month + 1}`;
  const dayKey = day.toString().padStart(2, "0");
  const docRef = doc(db, "teachers", teacherId, "work_records", yearMonth);

  try {
    await setDoc(
      docRef,
      {
        [dayKey]: { ...workHours },
      },
      { merge: true }
    );
    console.log("Work hours saved successfully");
  } catch (e) {
    console.error("Error saving work hours:", e);
    throw new Error("Failed to save work hours");
  }
}
