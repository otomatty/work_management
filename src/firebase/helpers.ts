import { db } from "./firebase";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

// エラーハンドリングを共通化するヘルパー関数
export const handleFirestoreError = (e: any, action: string) => {
  console.error(`Error ${action} record:`, e);
  throw new Error(`Failed to ${action} record`);
};

// workRecordsにおいてドキュメントIDと日付キーを生成するヘルパー関数
export const getDocIdAndDayKey = (year: number, month: number, day: number) => {
  const docId = `${year}-${month + 1}`;
  const dayKey = day.toString().padStart(2, "0");
  return { docId, dayKey };
};

// ドキュメント参照を生成する汎用ヘルパー関数
export const getDocRef = (
  teacherId: string,
  collectionName: string,
  docId: string
) => {
  return doc(db, "teachers", teacherId, collectionName, docId);
};

// データを保存する汎用ヘルパー関数
export const saveData = async (
  teacherId: string,
  collectionName: string,
  docId: string,
  data: Record<string, any>,
  action: string
) => {
  const docRef = getDocRef(teacherId, collectionName, docId);

  try {
    await setDoc(docRef, data, { merge: true });
    console.log(`${action} successfully for:`, docId);
  } catch (e) {
    handleFirestoreError(e, action);
  }
};

// データを削除する汎用ヘルパー関数
export const deleteData = async (
  teacherId: string,
  collectionName: string,
  docId: string,
  action: string
) => {
  const docRef = getDocRef(teacherId, collectionName, docId);

  try {
    await deleteDoc(docRef);
    console.log(`${action} successfully for:`, docId);
  } catch (e) {
    handleFirestoreError(e, action);
  }
};

// ドキュメントを取得する汎用ヘルパー関数
export const getData = async (
  teacherId: string,
  collectionName: string,
  docId: string
) => {
  const docRef = getDocRef(teacherId, collectionName, docId);

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log(`No such document in ${collectionName} with ID: ${docId}`);
      return null;
    }
  } catch (e) {
    console.error(`Error fetching document from ${collectionName}:`, e);
    return null;
  }
};

// コレクションを取得する汎用ヘルパー関数
export const getCollectionData = async (
  teacherId: string,
  collectionName: string
) => {
  const collectionRef = collection(db, "teachers", teacherId, collectionName);
  const data: any[] = [];

  try {
    const querySnapshot = await getDocs(collectionRef);
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  } catch (e) {
    console.error(`Error fetching collection ${collectionName}:`, e);
    return [];
  }
};

// コレクションにドキュメントを追加する汎用ヘルパー関数
export const addCollectionData = async (
  teacherId: string,
  collectionName: string,
  data: Record<string, any>,
  action: string
) => {
  const collectionRef = collection(db, "teachers", teacherId, collectionName);

  try {
    const docRef = await addDoc(collectionRef, data);
    console.log(`${action} successfully with ID:`, docRef.id);
  } catch (e) {
    handleFirestoreError(e, action);
  }
};
