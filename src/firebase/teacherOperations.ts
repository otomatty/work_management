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
