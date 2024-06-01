import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { getDocIdAndDayKey } from "../../helpers";

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

export const getCurrentAndPreviousMonthTimes = async (
  teacherId: string,
  year: number,
  month: number
): Promise<{
  currentMonth: { totalTeachTime: number; totalOfficeTime: number } | null;
  previousMonth: { totalTeachTime: number; totalOfficeTime: number } | null;
}> => {
  const currentMonthData = await getTotalTimes(teacherId, year, month);

  // 先月の年と月を計算
  const previousMonthDate = new Date(year, month - 2); // monthは0から始まるため-2
  const previousYear = previousMonthDate.getFullYear();
  const previousMonth = previousMonthDate.getMonth() + 1; // monthは0から始まるため+1

  const previousMonthData = await getTotalTimes(
    teacherId,
    previousYear,
    previousMonth
  );

  return {
    currentMonth: currentMonthData,
    previousMonth: previousMonthData,
  };
};
