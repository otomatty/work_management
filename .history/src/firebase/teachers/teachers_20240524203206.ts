import { db } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { Teacher } from "../../types";

// 講師情報を取得
export async function getTeachers(): Promise<Teacher[]> {
  const teachersRef = collection(db, "teachers");
  const teachers: Teacher[] = [];

  try {
    const querySnapshot = await getDocs(teachersRef);
    querySnapshot.forEach((doc) => {
      teachers.push({ id: doc.id, ...doc.data() } as Teacher);
    });
    return teachers;
  } catch (e) {
    console.error("Error fetching teachers: ", e);
    throw new Error("Failed to fetch teachers");
  }
}

// 講師の削除
export async function deleteTeacher(teacherId: string) {
  try {
    await deleteDoc(doc(db, "teachers", teacherId));
  } catch (e) {
    console.error("Error removing document: ", e);
  }
}

// 講師の更新
export async function updateTeacher(teacherId: string, name: string) {
  try {
    const teacherRef = doc(db, "teachers", teacherId);
    await updateDoc(teacherRef, { name });
    console.log("Document successfully updated!");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

// 講師の名前をIDに基づいて取得
export async function getTeacher(teacherId: string): Promise<string> {
  const docRef = doc(db, "teachers", teacherId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().name; // 講師の名前を返す
  } else {
    console.log("No such document!");
    return ""; // ドキュメントが存在しない場合は空文字を返す
  }
}
