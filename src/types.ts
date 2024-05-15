export interface Student {
  firestoreId: string; // Firebase のドキュメント ID
  studentName: string;
  subjectAndGrade: string;
  time: string;
}

export interface StudentChangeInfo {
  studentName: string;
  status: string;
  time: string;
}

export interface WorkHours {
  teachingHours: number;
  adminHours: number;
}

export interface Schedule {
  dayOfWeek: string;
  startTime?: string;
  endTime?: string;
  students?: Array<{
    studentName: string;
    subjectAndGrade: string;
    time: string;
  }>;
}
