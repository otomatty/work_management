export interface Teacher {
  id: string;
  name: string;
  // 他のプロパティがあればここに追加
}

export interface TeacherStudent {
  studentId: string; // Firebase のドキュメント ID
  studentName: string;
  grade: string;
  subject: string;
  time: number;
}

export interface StudentCollection {
  studentId: string; // Firebase のドキュメント ID
  studentName: string;
  gender: string;
  dateOfBirth: string;
  grade: string;
  schoolName: string;
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
  students: TeacherStudent[];
}

export interface WorkRecord {
  classroom: string;
  startTime: string;
  endTime: string;
  officeTime: number;
  teachTime: number;
  lessonInfo: LessonInfo[];
  workDescription: string;
}

export interface ContactInfo {
  studentId: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  address: string;
  lineId: string;
  lineRegisteredBy: string;
}

export interface NotificationInfo {
  studentId: string;
  notificationSent: boolean;
  notificationReceived: boolean;
}

export interface SiblingInfo {
  studentId: string;
  siblingNames: string[];
}

export interface LearningInfo {
  studentId: string;
  course: string;
  schedule: string;
  grades: string;
  homeworkStatus: string;
}

export interface Achievements {
  studentId: string;
  eikenLevel: string;
  sukenLevel: string;
  highSchoolAdmissions: string;
  universityAdmissions: string;
}
