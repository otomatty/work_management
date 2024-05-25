import { db } from '../../firebase/firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

// 講師一覧を取得する関数
export async function getTeachers(): Promise<{ id: string; name: string }[]> {
  const teachersCollection = collection(db, 'teachers');
  const teachersSnapshot = await getDocs(teachersCollection);
  const teachersList = teachersSnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
  }));
  return teachersList;
}

// 講師を追加する関数
export async function addTeacher(
  name: string
): Promise<{ id: string; name: string }> {
  const teachersCollection = collection(db, 'teachers');
  const newTeacherRef = await addDoc(teachersCollection, { name });
  return { id: newTeacherRef.id, name };
}

// 講師を削除する関数
export async function deleteTeacher(id: string): Promise<void> {
  const teacherDoc = doc(db, 'teachers', id);
  await deleteDoc(teacherDoc);
}

// 講師の名前を更新する関数
export const updateTeacher = async (
  id: string,
  newName: string
): Promise<void> => {
  const teacherDoc = doc(db, 'teachers', id);
  await updateDoc(teacherDoc, { name: newName });
};
