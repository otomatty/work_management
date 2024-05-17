export interface Student {
  firestoreId: string; // Firebase のドキュメント ID
  studentName: string;
  grade: string;
  subject: string;
  time: number;
}

export interface LessonInfo {
  studentName: string;
  grade: string;
  subject: string;
  status: string;
  time: number;
}

export interface Schedule {
  dayOfWeek: string;
  classroom: string;
  startTime: string;
  endTime: string;
  students: Student[];
}

export interface WorkRecord {
  classroom: string;
  startTime: string;
  endTime: string;
  officeHour: number;
  teachHour: number;
  lessonInfo: LessonInfo[];
  workDescription: string;
}
