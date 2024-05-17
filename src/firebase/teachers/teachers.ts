import { db } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

// 講師の登録
export async function addTeacher(name: string) {
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
