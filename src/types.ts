export interface Student {
  firestoreId: string; // Firebase のドキュメント ID
  studentName: string;
  subjectAndGrade: string;
  time: number;
}

export interface LessonInfo {
  studentName: string;
  subject: string;
  grade: string;
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
  lessonInfo: LessonInfo[];
  workDescription: string;
}
