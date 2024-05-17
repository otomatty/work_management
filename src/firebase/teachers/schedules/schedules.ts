import {
  getCollectionData,
  saveData,
  deleteData,
  getData,
} from "../../helpers";
import { Schedule } from "../../../types";

// 講師IDに基づいてスケジュールを取得
export async function getSchedules(
  teacherId: string
): Promise<Record<string, Schedule>> {
  const schedules = await getCollectionData(teacherId, "schedules");
  const schedulesData: Record<string, Schedule> = {};

  schedules.forEach((schedule) => {
    schedulesData[schedule.dayOfWeek] = schedule;
  });

  return schedulesData;
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
