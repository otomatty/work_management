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
