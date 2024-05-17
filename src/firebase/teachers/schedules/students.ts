import { db } from "../../firebase";
import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { Student } from "../../../types";

// 生徒情報を追加
export async function addStudent(
  teacherId: string,
  dayOfWeek: string,
  student: Student
) {
  const studentsRef = collection(
    db,
    "teachers",
    teacherId,
    "schedules",
    dayOfWeek,
    "students"
  );
  try {
    const docRef = await addDoc(studentsRef, student);
    console.log("Student added successfully with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding student: ", e);
    throw new Error("Failed to add student");
  }
}

// 生徒情報を取得
export async function getStudents(
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
      });
    });
    return students;
  } catch (e) {
    console.error("Error fetching students: ", e);
    return [];
  }
}

// 生徒情報を更新
export async function updateStudent(
  teacherId: string,
  dayOfWeek: string,
  studentId: string,
  student: Partial<Student>
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
    await updateDoc(studentRef, student);
    console.log("Student updated successfully");
  } catch (e) {
    console.error("Error updating student: ", e);
    throw new Error("Failed to update student");
  }
}

// 生徒情報を削除
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
    throw new Error("Failed to delete student");
  }
}
