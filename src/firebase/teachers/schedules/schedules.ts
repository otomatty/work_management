import {
  getCollectionData,
  saveData,
  deleteData,
  getData,
} from "../../helpers";
import { getStudents } from "./students";
import { Schedule } from "../../../types";

// 講師IDに基づいてスケジュールを取得
export async function getSchedules(
  teacherId: string
): Promise<Record<string, Schedule>> {
  try {
    const schedules = await getCollectionData(teacherId, "schedules");
    // console.log("Schedules fetched from Firestore:", schedules); // デバッグ用ログ
    const schedulesData: Record<string, Schedule> = {};

    for (const schedule of schedules) {
      const dayOfWeek = schedule.id;
      if (dayOfWeek) {
        const students = await getStudents(teacherId, dayOfWeek); // 追加
        schedulesData[dayOfWeek] = {
          dayOfWeek,
          classroom: schedule.classroom || "",
          startTime: schedule.startTime || "",
          endTime: schedule.endTime || "",
          students: students || [], // 追加
        } as Schedule;
      } else {
        console.warn("Schedule without dayOfWeek found:", schedule);
      }
    }

    return schedulesData;
  } catch (error) {
    console.error("Error fetching schedules from Firestore:", error); // エラーログ
    throw error;
  }
}

// スケジュールを追加
export async function addSchedule(
  teacherId: string,
  dayOfWeek: string,
  schedule: Schedule
): Promise<void> {
  await saveData(teacherId, "schedules", dayOfWeek, schedule, "Schedule added");
}

// スケジュールを更新
export async function updateSchedule(
  teacherId: string,
  dayOfWeek: string,
  schedule: Partial<Schedule>
): Promise<void> {
  await saveData(
    teacherId,
    "schedules",
    dayOfWeek,
    schedule,
    "Schedule updated"
  );
}

// スケジュールを削除
export async function deleteSchedule(
  teacherId: string,
  dayOfWeek: string
): Promise<void> {
  await deleteData(teacherId, "schedules", dayOfWeek, "Schedule deleted");
}

// 特定の曜日のスケジュールを取得
export async function getScheduleByDay(
  teacherId: string,
  dayOfWeek: string
): Promise<Schedule | null> {
  const data = await getData(teacherId, "schedules", dayOfWeek);
  return data as Schedule | null;
}
