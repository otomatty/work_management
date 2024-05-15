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

// 新規生徒情報をデータベースに登録
export async function addStudent(
  teacherId: string,
  dayOfWeek: string,
  student: Student
) {
  try {
    const docRef = await addDoc(
      collection(db, "teachers", teacherId, "schedules", dayOfWeek, "students"),
      student
    );
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function saveStudent(
  teacherId: string,
  dayOfWeek: string,
  studentData: Omit<Student, "firestoreId">
): Promise<Student> {
  try {
    const docRef = await addDoc(
      collection(db, "teachers", teacherId, "schedules", dayOfWeek, "students"),
      studentData
    );
    // console.log("Document written with ID: ", docRef.id);
    return { ...studentData, firestoreId: docRef.id }; // 新しい生徒オブジェクトに firestoreId を追加
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Failed to save student");
  }
}

// 生徒情報を更新する
export async function updateStudent(
  teacherId: string,
  dayOfWeek: string,
  student: Student
) {
  const studentRef = doc(
    db,
    "teachers",
    teacherId,
    "schedules",
    dayOfWeek,
    "students",
    student.firestoreId
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

// 生徒情報を削除する
export async function deleteStudent(
  teacherId: string,
  dayOfWeek: string,
  studentId: string
) {
  const studentRef = doc(
    db,
    "teachers",
    teacherId,
    "schedules",
    dayOfWeek,
    "students",
    studentId
  );
  try {
    await deleteDoc(studentRef);
    console.log("Student deleted successfully");
  } catch (e) {
    console.error("Error deleting student: ", e);
  }
}
// 講師IDと曜日に基づいてschedulesから生徒を取得
export async function fetchStudentsByTeacherIdAndDay(
  teacherId: string,
  dayOfWeek: string
): Promise<Student[]> {
  const studentsRef = collection(
    db,
    "teachers",
    teacherId,
    "schedules",
    dayOfWeek,
    "students"
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
  day: number
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

// studentChangeInfo を保存する関数
export async function saveStudentChangeInfo(
  teacherId: string,
  year: number,
  month: number,
  day: number,
  studentChangeInfo: StudentChangeInfo[]
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
      { merge: true }
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
  day: number
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
