import {
  addWorkRecord,
  getWorkRecord,
  updateWorkRecord,
  deleteWorkRecord,
  addWorkHour,
  getWorkHour,
  updateWorkHour,
  deleteWorkHour,
  addWorkRecordClassroom,
  getWorkRecordClassroom,
  updateWorkRecordClassroom,
  deleteWorkRecordClassroom,
  addWorkDescription,
  getWorkDescription,
  updateWorkDescription,
  deleteWorkDescription,
  addTeachHour,
  getTeachHour,
  updateTeachHour,
  deleteTeachHour,
  addOfficeHour,
  getOfficeHour,
  updateOfficeHour,
  deleteOfficeHour,
  addLessonInfo,
  getLessonInfo,
  updateLessonInfo,
  deleteLessonInfo,
} from "../../firebase";

import { WorkRecord, LessonInfo } from "../../types"; // 型定義をインポート

import {
  collection,
  query,
  where,
  getDocs,
  writeBatch,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const workRecordsService = {
  // Work Record related functions
  addWorkRecord: async (
    teacherId: string,
    year: number,
    month: number,
    day: number,
    workRecord: WorkRecord
  ): Promise<void> => {
    try {
      await addWorkRecord(teacherId, year, month, day, workRecord);
      console.log("Work record added successfully");
    } catch (error) {
      console.error("Error adding work record:", error);
      throw error;
    }
  },
  getWorkRecord: async (
    teacherId: string,
    year: number,
    month: number,
    day: number
  ): Promise<WorkRecord | null> => {
    try {
      return await getWorkRecord(teacherId, year, month, day);
    } catch (error) {
      console.error("Error fetching work record:", error);
      throw error;
    }
  },
  updateWorkRecord: async (
    teacherId: string,
    year: number,
    month: number,
    day: number,
    workRecord: Partial<WorkRecord>
  ): Promise<void> => {
    try {
      await updateWorkRecord(teacherId, year, month, day, workRecord);
      console.log("Work record updated successfully");
    } catch (error) {
      console.error("Error updating work record:", error);
      throw error;
    }
  },
  deleteWorkRecord: async (
    teacherId: string,
    year: number,
    month: number,
    day: number
  ): Promise<void> => {
    try {
      await deleteWorkRecord(teacherId, year, month, day);
      console.log("Work record deleted successfully");
    } catch (error) {
      console.error("Error deleting work record:", error);
      throw error;
    }
  },

  // Work Hour related functions
  addWorkHour: async (
    teacherId: string,
    year: number,
    month: number,
    day: number,
    startTime: string,
    endTime: string
  ): Promise<void> => {
    try {
      await addWorkHour(teacherId, year, month, day, startTime, endTime);
      console.log("Work hour added successfully");
    } catch (error) {
      console.error("Error adding work hour:", error);
      throw error;
    }
  },
  getWorkHour: async (
    teacherId: string,
    year: number,
    month: number,
    day: number
  ): Promise<any> => {
    try {
      return await getWorkHour(teacherId, year, month, day);
    } catch (error) {
      console.error("Error fetching work hour:", error);
      throw error;
    }
  },
  updateWorkHour: async (
    teacherId: string,
    year: number,
    month: number,
    day: number,
    startTime: string,
    endTime: string
  ): Promise<void> => {
    try {
      await updateWorkHour(teacherId, year, month, day, startTime, endTime);
      console.log("Work hour updated successfully");
    } catch (error) {
      console.error("Error updating work hour:", error);
      throw error;
    }
  },
  deleteWorkHour: async (
    teacherId: string,
    year: number,
    month: number,
    day: number
  ): Promise<void> => {
    try {
      await deleteWorkHour(teacherId, year, month, day);
      console.log("Work hour deleted successfully");
    } catch (error) {
      console.error("Error deleting work hour:", error);
      throw error;
    }
  },

  // Classroom related functions
  addWorkRecordClassroom: async (
    teacherId: string,
    year: number,
    month: number,
    day: number,
    classroom: string
  ): Promise<void> => {
    try {
      await addWorkRecordClassroom(teacherId, year, month, day, classroom);
      console.log("Classroom added successfully");
    } catch (error) {
      console.error("Error adding classroom:", error);
      throw error;
    }
  },
  getWorkRecordClassroom: async (
    teacherId: string,
    year: number,
    month: number,
    day: number
  ): Promise<string | null> => {
    try {
      return await getWorkRecordClassroom(teacherId, year, month, day);
    } catch (error) {
      console.error("Error fetching classroom:", error);
      throw error;
    }
  },
  updateWorkRecordClassroom: async (
    teacherId: string,
    year: number,
    month: number,
    day: number,
    classroom: string
  ): Promise<void> => {
    try {
      await updateWorkRecordClassroom(teacherId, year, month, day, classroom);
      console.log("Classroom updated successfully");
    } catch (error) {
      console.error("Error updating classroom:", error);
      throw error;
    }
  },
  deleteWorkRecordClassroom: async (
    teacherId: string,
    year: number,
    month: number,
    day: number
  ): Promise<void> => {
    try {
      await deleteWorkRecordClassroom(teacherId, year, month, day);
      console.log("Classroom deleted successfully");
    } catch (error) {
      console.error("Error deleting classroom:", error);
      throw error;
    }
  },

  // Work Description related functions
  addWorkDescription: async (
    teacherId: string,
    year: number,
    month: number,
    day: number,
    workDescription: string
  ): Promise<void> => {
    try {
      await addWorkDescription(teacherId, year, month, day, workDescription);
      console.log("Work description added successfully");
    } catch (error) {
      console.error("Error adding work description:", error);
      throw error;
    }
  },
  getWorkDescription: async (
    teacherId: string,
    year: number,
    month: number,
    day: number
  ): Promise<string | null> => {
    try {
      return await getWorkDescription(teacherId, year, month, day);
    } catch (error) {
      console.error("Error fetching work description:", error);
      throw error;
    }
  },
  updateWorkDescription: async (
    teacherId: string,
    year: number,
    month: number,
    day: number,
    workDescription: string
  ): Promise<void> => {
    try {
      await updateWorkDescription(teacherId, year, month, day, workDescription);
      console.log("Work description updated successfully");
    } catch (error) {
      console.error("Error updating work description:", error);
      throw error;
    }
  },
  deleteWorkDescription: async (
    teacherId: string,
    year: number,
    month: number,
    day: number
  ): Promise<void> => {
    try {
      await deleteWorkDescription(teacherId, year, month, day);
      console.log("Work description deleted successfully");
    } catch (error) {
      console.error("Error deleting work description:", error);
      throw error;
    }
  },

  // Teach Hour related functions
  addTeachHour: async (
    teacherId: string,
    year: number,
    month: number,
    day: number,
    teachHour: number
  ): Promise<void> => {
    try {
      await addTeachHour(teacherId, year, month, day, teachHour);
      console.log("Teach hour added successfully");
    } catch (error) {
      console.error("Error adding teach hour:", error);
      throw error;
    }
  },
  getTeachHour: async (
    teacherId: string,
    year: number,
    month: number,
    day: number
  ): Promise<number | null> => {
    try {
      return await getTeachHour(teacherId, year, month, day);
    } catch (error) {
      console.error("Error fetching teach hour:", error);
      throw error;
    }
  },
  updateTeachHour: async (
    teacherId: string,
    year: number,
    month: number,
    day: number,
    teachHour: number
  ): Promise<void> => {
    try {
      await updateTeachHour(teacherId, year, month, day, teachHour);
      console.log("Teach hour updated successfully");
    } catch (error) {
      console.error("Error updating teach hour:", error);
      throw error;
    }
  },
  deleteTeachHour: async (
    teacherId: string,
    year: number,
    month: number,
    day: number
  ): Promise<void> => {
    try {
      await deleteTeachHour(teacherId, year, month, day);
      console.log("Teach hour deleted successfully");
    } catch (error) {
      console.error("Error deleting teach hour:", error);
      throw error;
    }
  },

  // Office Hour related functions
  addOfficeHour: async (
    teacherId: string,
    year: number,
    month: number,
    day: number,
    officeHour: number
  ): Promise<void> => {
    try {
      await addOfficeHour(teacherId, year, month, day, officeHour);
      console.log("Office hour added successfully");
    } catch (error) {
      console.error("Error adding office hour:", error);
      throw error;
    }
  },
  getOfficeHour: async (
    teacherId: string,
    year: number,
    month: number,
    day: number
  ): Promise<number | null> => {
    try {
      return await getOfficeHour(teacherId, year, month, day);
    } catch (error) {
      console.error("Error fetching office hour:", error);
      throw error;
    }
  },
  updateOfficeHour: async (
    teacherId: string,
    year: number,
    month: number,
    day: number,
    officeHour: number
  ): Promise<void> => {
    try {
      await updateOfficeHour(teacherId, year, month, day, officeHour);
      console.log("Office hour updated successfully");
    } catch (error) {
      console.error("Error updating office hour:", error);
      throw error;
    }
  },
  deleteOfficeHour: async (
    teacherId: string,
    year: number,
    month: number,
    day: number
  ): Promise<void> => {
    try {
      await deleteOfficeHour(teacherId, year, month, day);
      console.log("Office hour deleted successfully");
    } catch (error) {
      console.error("Error deleting office hour:", error);
      throw error;
    }
  },

  // Lesson Info related functions
  addLessonInfo: async (
    teacherId: string,
    year: number,
    month: number,
    day: number,
    lessonInfo: LessonInfo[]
  ): Promise<void> => {
    try {
      await addLessonInfo(teacherId, year, month, day, lessonInfo);
      console.log("Lesson info added successfully");
    } catch (error) {
      console.error("Error adding lesson info:", error);
      throw error;
    }
  },
  getLessonInfo: async (
    teacherId: string,
    year: number,
    month: number,
    day: number
  ): Promise<LessonInfo[] | null> => {
    try {
      return await getLessonInfo(teacherId, year, month, day);
    } catch (error) {
      console.error("Error fetching lesson info:", error);
      throw error;
    }
  },
  updateLessonInfo: async (
    teacherId: string,
    year: number,
    month: number,
    day: number,
    lessonInfo: Partial<LessonInfo>[]
  ): Promise<void> => {
    try {
      await updateLessonInfo(teacherId, year, month, day, lessonInfo);
      console.log("Lesson info updated successfully");
    } catch (error) {
      console.error("Error updating lesson info:", error);
      throw error;
    }
  },
  deleteLessonInfo: async (
    teacherId: string,
    year: number,
    month: number,
    day: number
  ): Promise<void> => {
    try {
      await deleteLessonInfo(teacherId, year, month, day);
      console.log("Lesson info deleted successfully");
    } catch (error) {
      console.error("Error deleting lesson info:", error);
      throw error;
    }
  },

  deleteWorkRecords: async (
    teacherId: string,
    startDate: Date,
    endDate: Date
  ): Promise<void> => {
    try {
      const workRecordsCollection = collection(db, "workRecords");
      const q = query(
        workRecordsCollection,
        where("teacherId", "==", teacherId),
        where("date", ">=", startDate),
        where("date", "<=", endDate)
      );

      const querySnapshot = await getDocs(q);
      const batch = writeBatch(db);

      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      console.log("Work records deleted successfully");
    } catch (error) {
      console.error("Error deleting work records:", error);
      throw error;
    }
  },

  insertWorkRecords: async (
    teacherId: string,
    workRecords: { date: Date; workRecord: WorkRecord }[]
  ): Promise<void> => {
    try {
      const batch = writeBatch(db);
      const workRecordsCollection = collection(db, "workRecords");

      for (const { date, workRecord } of workRecords) {
        const docRef = doc(
          workRecordsCollection,
          `${teacherId}_${date.toISOString()}`
        );
        batch.set(docRef, {
          ...workRecord,
          date: date.toISOString(),
          teacherId, // teacherId を追加
        });
      }

      await batch.commit();
      console.log("Work records inserted successfully");
    } catch (error) {
      console.error("Error inserting work records:", error);
      throw error;
    }
  },
};
