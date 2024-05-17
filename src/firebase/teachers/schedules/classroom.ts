import { saveData, deleteData, getData } from "../../helpers";

// スケジュールの教室情報を追加
export async function addScheduleClassroom(
  teacherId: string,
  dayOfWeek: string,
  classroom: string
): Promise<void> {
  await saveData(
    teacherId,
    "schedules",
    dayOfWeek,
    { classroom },
    "Classroom added"
  );
}

// スケジュールの教室情報を取得
export async function getScheduleClassroom(
  teacherId: string,
  dayOfWeek: string
): Promise<string | null> {
  const data = await getData(teacherId, "schedules", dayOfWeek);
  if (data && data.classroom) {
    return data.classroom;
  } else {
    console.log("No such classroom!");
    return null;
  }
}

// スケジュールの教室情報を更新
export async function updateScheduleClassroom(
  teacherId: string,
  dayOfWeek: string,
  classroom: string
): Promise<void> {
  await saveData(
    teacherId,
    "schedules",
    dayOfWeek,
    { classroom },
    "Classroom updated"
  );
}

// スケジュールの教室情報を削除
export async function deleteScheduleClassroom(
  teacherId: string,
  dayOfWeek: string
): Promise<void> {
  await deleteData(teacherId, "schedules", dayOfWeek, "Classroom deleted");
}
