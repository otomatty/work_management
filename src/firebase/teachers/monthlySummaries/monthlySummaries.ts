import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { getDocIdAndDayKey } from '../../helpers';

export const saveTotalTimes = async (
  teacherId: string,
  year: number,
  month: number,
  totalTeachTime: number,
  totalOfficeTime: number
): Promise<void> => {
  const { docId } = getDocIdAndDayKey(year, month, 1); // 年月に基づいたドキュメントIDを生成
  const docRef = doc(db, `teachers/${teacherId}/monthlySummaries`, docId);

  try {
    await setDoc(
      docRef,
      {
        totalTeachTime,
        totalOfficeTime,
      },
      { merge: true }
    );
  } catch (e) {
    console.error(`Error saving monthly summary for ${docId}:`, e);
    throw new Error(`Failed to save monthly summary for ${docId}`);
  }
};

export const getTotalTimes = async (
  teacherId: string,
  year: number,
  month: number
): Promise<{ totalTeachTime: number; totalOfficeTime: number } | null> => {
  const { docId } = getDocIdAndDayKey(year, month, 1);
  const docRef = doc(db, `teachers/${teacherId}/monthlySummaries`, docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      totalTeachTime: data.totalTeachTime || 0,
      totalOfficeTime: data.totalOfficeTime || 0,
    };
  }

  return null;
};
