import { db } from "../../firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";

// 出勤時間を追加
export async function addStartTime(
  teacherId: string,
  dayOfWeek: string,
  startTime: string
): Promise<void> {
  const scheduleRef = doc(db, "teachers", teacherId, "schedules", dayOfWeek);
  try {
    await setDoc(scheduleRef, { startTime }, { merge: true });
    console.log("Start time added successfully");
  } catch (e) {
    console.error("Error adding start time: ", e);
    throw new Error("Failed to add start time");
  }
}

// 退勤時間を追加
export async function addEndTime(
  teacherId: string,
  dayOfWeek: string,
  endTime: string
): Promise<void> {
  const scheduleRef = doc(db, "teachers", teacherId, "schedules", dayOfWeek);
  try {
    await setDoc(scheduleRef, { endTime }, { merge: true });
    console.log("End time added successfully");
  } catch (e) {
    console.error("Error adding end time: ", e);
    throw new Error("Failed to add end time");
  }
}

// 出勤時間を取得
export async function getStartTime(
  teacherId: string,
  dayOfWeek: string
): Promise<string | null> {
  const scheduleRef = doc(db, "teachers", teacherId, "schedules", dayOfWeek);
  try {
    const docSnap = await getDoc(scheduleRef);
    if (docSnap.exists() && docSnap.data().startTime) {
      return docSnap.data().startTime;
    } else {
      console.log("No such start time!");
      return null;
    }
  } catch (e) {
    console.error("Error fetching start time: ", e);
    return null;
  }
}

// 退勤時間を取得
export async function getEndTime(
  teacherId: string,
  dayOfWeek: string
): Promise<string | null> {
  const scheduleRef = doc(db, "teachers", teacherId, "schedules", dayOfWeek);
  try {
    const docSnap = await getDoc(scheduleRef);
    if (docSnap.exists() && docSnap.data().endTime) {
      return docSnap.data().endTime;
    } else {
      console.log("No such end time!");
      return null;
    }
  } catch (e) {
    console.error("Error fetching end time: ", e);
    return null;
  }
}

// 出勤時間を更新
export async function updateStartTime(
  teacherId: string,
  dayOfWeek: string,
  startTime: string
): Promise<void> {
  const scheduleRef = doc(db, "teachers", teacherId, "schedules", dayOfWeek);
  try {
    await setDoc(scheduleRef, { startTime }, { merge: true });
    console.log("Start time updated successfully");
  } catch (e) {
    console.error("Error updating start time: ", e);
    throw new Error("Failed to update start time");
  }
}

// 退勤時間を更新
export async function updateEndTime(
  teacherId: string,
  dayOfWeek: string,
  endTime: string
): Promise<void> {
  const scheduleRef = doc(db, "teachers", teacherId, "schedules", dayOfWeek);
  try {
    await setDoc(scheduleRef, { endTime }, { merge: true });
    console.log("End time updated successfully");
  } catch (e) {
    console.error("Error updating end time: ", e);
    throw new Error("Failed to update end time");
  }
}

// 出勤時間を削除
export async function deleteStartTime(
  teacherId: string,
  dayOfWeek: string
): Promise<void> {
  const scheduleRef = doc(db, "teachers", teacherId, "schedules", dayOfWeek);
  try {
    await updateDoc(scheduleRef, {
      startTime: deleteField(),
    });
    console.log("Start time deleted successfully");
  } catch (e) {
    console.error("Error deleting start time: ", e);
    throw new Error("Failed to delete start time");
  }
}

// 退勤時間を削除
export async function deleteEndTime(
  teacherId: string,
  dayOfWeek: string
): Promise<void> {
  const scheduleRef = doc(db, "teachers", teacherId, "schedules", dayOfWeek);
  try {
    await updateDoc(scheduleRef, {
      endTime: deleteField(),
    });
    console.log("End time deleted successfully");
  } catch (e) {
    console.error("Error deleting end time: ", e);
    throw new Error("Failed to delete end time");
  }
}
