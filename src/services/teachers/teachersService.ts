import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

// 講師一覧を取得する関数
export async function getTeachers(): Promise<{ id: string; name: string }[]> {
  const teachersCollection = collection(db, "teachers");
  const teachersSnapshot = await getDocs(teachersCollection);
  const teachersList = teachersSnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
  }));
  return teachersList;
}
