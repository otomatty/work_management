import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  StudentCollection,
  ContactInfo,
  NotificationInfo,
  SiblingInfo,
  LearningInfo,
  Achievements,
} from "../../types";

// 生徒情報を追加
export async function addStudent(student: StudentCollection) {
  const studentsRef = collection(db, "students");
  const studentRef = await addDoc(studentsRef, student);
  return studentRef;
}

// 連絡先情報を追加
export async function addContactInfo(contactInfo: ContactInfo) {
  const contactInfoRef = collection(
    db,
    "students",
    contactInfo.studentId,
    "contactInfo"
  );
  await addDoc(contactInfoRef, contactInfo);
}

// お知らせ情報を追加
export async function addNotificationInfo(notificationInfo: NotificationInfo) {
  const notificationInfoRef = collection(
    db,
    "students",
    notificationInfo.studentId,
    "notificationInfo"
  );
  await addDoc(notificationInfoRef, notificationInfo);
}

// 兄弟情報を追加
export async function addSiblingInfo(siblingInfo: SiblingInfo) {
  const siblingInfoRef = collection(
    db,
    "students",
    siblingInfo.studentId,
    "siblingInfo"
  );
  await addDoc(siblingInfoRef, siblingInfo);
}

// 学習情報を追加
export async function addLearningInfo(learningInfo: LearningInfo) {
  const learningInfoRef = collection(
    db,
    "students",
    learningInfo.studentId,
    "learningInfo"
  );
  await addDoc(learningInfoRef, learningInfo);
}

// 検定および合格実績を追加
export async function addAchievements(achievements: Achievements) {
  const achievementsRef = collection(
    db,
    "students",
    achievements.studentId,
    "achievements"
  );
  await addDoc(achievementsRef, achievements);
}

// 生徒情報を取得
export async function getStudents(): Promise<StudentCollection[]> {
  const studentsRef = collection(db, "students");
  const querySnapshot = await getDocs(studentsRef);
  const students: StudentCollection[] = [];
  querySnapshot.forEach((doc) => {
    students.push({ ...doc.data(), studentId: doc.id } as StudentCollection);
  });
  return students;
}

export async function deleteStudent(studentId: string) {
  const studentRef = doc(db, "students", studentId);
  await deleteDoc(studentRef);
}

// 生徒情報を更新
export async function updateStudent(
  studentId: string,
  student: Partial<StudentCollection>
) {
  const studentRef = doc(db, "students", studentId);
  try {
    await updateDoc(studentRef, student);
    console.log("Student updated successfully");
  } catch (e) {
    console.error("Error updating student: ", e);
    throw new Error("Failed to update student");
  }
}
