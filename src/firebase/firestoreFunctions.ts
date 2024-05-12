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
import { Student, StudentChangeInfo, WorkHours } from "../types";

export interface Schedule {
  dayOfWeek: string;
  startTime?: string;
  endTime?: string;
  students?: Array<{
    studentName: string;
    subjectAndGrade: string;
    time: string;
  }>;
}

// 新規生徒情報をデータベースに登録
export async function addStudent(
  teacherId: string,
  dayOfWeek: string,
  student: Student,
) {
  try {
    const docRef = await addDoc(
      collection(db, "teachers", teacherId, "schedules", dayOfWeek, "students"),
      student,
    );
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function saveStudent(
  teacherId: string,
  dayOfWeek: string,
  studentData: Omit<Student, "firestoreId">,
): Promise<Student> {
  try {
    const docRef = await addDoc(
      collection(db, "teachers", teacherId, "schedules", dayOfWeek, "students"),
      studentData,
    );
    // console.log("Document written with ID: ", docRef.id);
    return { ...studentData, firestoreId: docRef.id }; // 新しい生徒オブジェクトに firestoreId を追加
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Failed to save student");
  }
}

export async function updateStudent(
  teacherId: string,
  dayOfWeek: string,
  student: Student,
) {
  const studentRef = doc(
    db,
    "teachers",
    teacherId,
    "schedules",
    dayOfWeek,
    "students",
    student.firestoreId,
  );
  try {
    await updateDoc(studentRef, {
      name: student.studentName,
      subjectAndGrade: student.subjectAndGrade,
      time: student.time,
    });
    console.log("Student updated successfully");
  } catch (e) {
    console.error("Error updating student: ", e);
    throw new Error("Failed to update student");
  }
}

export async function deleteStudent(
  teacherId: string,
  dayOfWeek: string,
  studentId: string,
) {
  const studentRef = doc(
    db,
    "teachers",
    teacherId,
    "schedules",
    dayOfWeek,
    "students",
    studentId,
  );
  try {
    await deleteDoc(studentRef);
    console.log("Student deleted successfully");
  } catch (e) {
    console.error("Error deleting student: ", e);
  }
}

// 講師IDに基づいてスケジュールを取得
export async function fetchSchedulesByTeacherId(
  teacherId: string,
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

export async function fetchWorkRecord(
  teacherId: string,
  year: number,
  month: number,
  day: number,
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
// schedulesから曜日ごとの時間を取得
export async function fetchScheduleByDay(
  teacherId: string,
  dayOfWeek: string,
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
  month: number,
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
        dayOfWeek,
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
        "", // workDescription は空文字列または適切な説明を設定
      );
    }
    console.log("Monthly work hours set successfully.");
  } catch (e) {
    console.error("Error setting monthly work hours:", e);
  }
}

export async function deleteWorkRecords(
  teacherId: string,
  year: number,
  month: number,
  startDay?: number,
  endDay?: number,
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

// 講師IDと曜日に基づいてschedulesから生徒を取得
export async function fetchStudentsByTeacherIdAndDay(
  teacherId: string,
  dayOfWeek: string,
): Promise<Student[]> {
  const studentsRef = collection(
    db,
    "teachers",
    teacherId,
    "schedules",
    dayOfWeek,
    "students",
  );
  const students: Student[] = [];

  try {
    const querySnapshot = await getDocs(studentsRef);
    querySnapshot.forEach((doc) => {
      const studentData = doc.data() as Student;
      students.push({
        ...studentData,
        firestoreId: doc.id, // Firestore のドキュメント ID を設定
      });
    });
    return students;
  } catch (e) {
    console.error("Error fetching students: ", e);
    return [];
  }
}

// 講師ID、年、月、日に基づいてwork_recordsから生徒を取得
export async function fetchStudentsForWorkRecords(
  teacherId: string,
  year: number,
  month: number,
  day: number,
): Promise<Student[]> {
  const yearMonth = `${year}-${month + 1}`; // 年月を YYYY-MM 形式でフォーマット
  const dayKey = day.toString().padStart(2, "0"); // 日を 2 桁の文字列でフォーマット
  const docRef = doc(db, "teachers", teacherId, "work_records", yearMonth); // 年月のドキュメント参照

  try {
    const docSnap = await getDoc(docRef);
    if (
      docSnap.exists() &&
      docSnap.data()[dayKey] &&
      docSnap.data()[dayKey].students
    ) {
      const fetchedStudents = docSnap.data()[dayKey].students as Student[];
      return fetchedStudents.map((student) => ({
        ...student,
        firestoreId: student.firestoreId, // 仮に firestoreId が含まれていると仮定
      }));
    }
    return [];
  } catch (e) {
    console.error("Error fetching students:", e);
    return [];
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
  },
) {
  const scheduleRef = doc(db, "teachers", teacherId, "schedules", dayOfWeek);
  try {
    await setDoc(scheduleRef, scheduleDetails, { merge: true });
    // console.log("Detailed schedule updated successfully");
  } catch (e) {
    console.error("Error updating detailed schedule: ", e);
  }
}
// 講師の登録
export async function registerTeacher(name: string) {
  try {
    const docRef = await addDoc(collection(db, "teachers"), {
      name: name,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// 講師の削除
export async function deleteTeacher(teacherId: string) {
  try {
    await deleteDoc(doc(db, "teachers", teacherId));
    console.log("Document successfully deleted!");
  } catch (e) {
    console.error("Error removing document: ", e);
  }
}

// 講師一覧の取得
export async function fetchTeachers() {
  const teachers: { id: string; name: string }[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, "teachers"));
    querySnapshot.forEach((doc) => {
      teachers.push({
        id: doc.id,
        name: doc.data().name,
      });
    });
  } catch (e) {
    console.error("Error fetching documents: ", e);
  }
  return teachers;
}

// 講師の名前をIDに基づいて取得
export async function fetchTeacherNameById(teacherId: string): Promise<string> {
  const docRef = doc(db, "teachers", teacherId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().name; // 講師の名前を返す
  } else {
    console.log("No such document!");
    return ""; // ドキュメントが存在しない場合は空文字を返す
  }
}

// 勤務記録を保存する関数
export async function saveDayData(
  teacherId: string,
  year: number,
  month: number,
  day: number,
  startTime: string,
  endTime: string,
  students: Student[],
  studentsChangeInfo: StudentChangeInfo[],
  workDescription: string,
) {
  const yearMonth = `${year}-${month + 1}`; // 年月を YYYY-MM 形式でフォーマット
  const dayKey = day.toString().padStart(2, "0"); // 日を 2 桁の文字列でフォーマット

  const record = {
    startTime,
    endTime,
    students: students.map((student) => ({
      studentName: student.studentName,
      subjectAndGrade: student.subjectAndGrade,
      time: student.time,
    })),
    studentsChangeInfo: studentsChangeInfo.map((studentsChangeInfo) => ({
      studentName: studentsChangeInfo.studentName,
      status: studentsChangeInfo.status,
      time: studentsChangeInfo.time,
    })),
    workDescription,
  };

  try {
    await addWorkRecord(teacherId, yearMonth, dayKey, record);
    // console.log("Work record saved successfully for day:", dayKey);
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
  record: object,
) {
  const docRef = doc(db, "teachers", teacherId, "work_records", yearMonth);
  await setDoc(
    docRef,
    {
      [day]: record,
    },
    { merge: true },
  );
}

// 教室を保存する関数
export async function saveClassroom(
  teacherId: string,
  dayOfWeek: string,
  classroom: string,
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

// 教室情報を取得する関数
export async function fetchClassroom(
  teacherId: string,
  dayOfWeek: string,
): Promise<string> {
  const scheduleRef = doc(db, "teachers", teacherId, "schedules", dayOfWeek);
  try {
    const docSnap = await getDoc(scheduleRef);
    if (docSnap.exists() && docSnap.data().classroom) {
      return docSnap.data().classroom;
    } else {
      console.log("No classroom found for this day.");
      return ""; // 教室情報がない場合は空文字を返す
    }
  } catch (e) {
    console.error("Error fetching classroom:", e);
    return "";
  }
}

// studentChangeInfo を保存する関数
export async function saveStudentChangeInfo(
  teacherId: string,
  year: number,
  month: number,
  day: number,
  studentChangeInfo: StudentChangeInfo[],
): Promise<void> {
  const yearMonth = `${year}-${month + 1}`; // 年月を YYYY-MM 形式でフォーマット
  const dayKey = day.toString().padStart(2, "0"); // 日を 2 桁の文字列でフォーマット
  const docRef = doc(db, "teachers", teacherId, "work_records", yearMonth);

  try {
    await setDoc(
      docRef,
      {
        [dayKey]: { studentChangeInfo },
      },
      { merge: true },
    );
    console.log("Student change info saved successfully");
  } catch (e) {
    console.error("Error saving student change info:", e);
    throw new Error("Failed to save student change info");
  }
}

export async function fetchStudentChangeInfo(
  teacherId: string,
  year: number,
  month: number,
  day: number,
): Promise<StudentChangeInfo[]> {
  const yearMonth = `${year}-${month + 1}`;
  const dayKey = day.toString().padStart(2, "0");
  const docRef = doc(db, "teachers", teacherId, "work_records", yearMonth);

  try {
    const docSnap = await getDoc(docRef);
    if (
      docSnap.exists() &&
      docSnap.data()[dayKey] &&
      docSnap.data()[dayKey].studentChangeInfo
    ) {
      return docSnap.data()[dayKey].studentChangeInfo as StudentChangeInfo[];
    }
    return [];
  } catch (e) {
    console.error("Error fetching student change info:", e);
    return [];
  }
}

export async function saveWorkHours(
  teacherId: string,
  year: number,
  month: number,
  day: number,
  workHours: { startTime: string; endTime: string; workHours: string },
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
      { merge: true },
    );
    console.log("Work hours saved successfully");
  } catch (e) {
    console.error("Error saving work hours:", e);
    throw new Error("Failed to save work hours");
  }
}

export async function fetchTeachHour(
  teacherId: string,
  year: number,
  month: number,
  day: number,
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
        0,
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
        },
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
