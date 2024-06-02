import {
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  addScheduleClassroom,
  getScheduleClassroom,
  updateScheduleClassroom,
  deleteScheduleClassroom,
  addStartTime,
  addEndTime,
  getStartTime,
  getEndTime,
  updateStartTime,
  updateEndTime,
  deleteStartTime,
  deleteEndTime,
  getSchedules as fetchSchedulesFromFirebase,
  addSchedule as addScheduleToFirebase,
} from '../../firebase';

import { TeacherStudent, Schedule } from '../../types';

import { updateSchedule as updateScheduleInFirebase } from '../../firebase/teachers/schedules/schedules';

export const schedulesService = {
  // Student related functions
  addStudent: async (
    teacherId: string,
    dayOfWeek: string,
    student: TeacherStudent
  ) => {
    try {
      // Firestore が自動的に一意の ID を生成する
      const docRef = await addStudent(teacherId, dayOfWeek, student);
      console.log('Student added successfully with ID: ', docRef.id);
      return docRef.id; // 追加された生徒の ID を返す
    } catch (error) {
      console.error('Error adding student:', error);
      throw error;
    }
  },
  getStudents: async (teacherId: string, dayOfWeek: string) => {
    try {
      return await getStudents(teacherId, dayOfWeek);
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },
  updateStudent: async (
    teacherId: string,
    dayOfWeek: string,
    studentId: string,
    student: Partial<TeacherStudent>
  ) => {
    try {
      await updateStudent(teacherId, dayOfWeek, studentId, student);
      console.log('Student updated successfully');
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  },
  deleteStudent: async (
    teacherId: string,
    dayOfWeek: string,
    studentId: string
  ) => {
    try {
      await deleteStudent(teacherId, dayOfWeek, studentId);
      console.log('Student deleted successfully');
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  },

  // Classroom related functions
  addScheduleClassroom: async (
    teacherId: string,
    dayOfWeek: string,
    classroom: string
  ) => {
    try {
      await addScheduleClassroom(teacherId, dayOfWeek, classroom);
      console.log('Classroom added successfully');
    } catch (error) {
      console.error('Error adding classroom:', error);
      throw error;
    }
  },
  getScheduleClassroom: async (teacherId: string, dayOfWeek: string) => {
    try {
      return await getScheduleClassroom(teacherId, dayOfWeek);
    } catch (error) {
      console.error('Error fetching classroom:', error);
      throw error;
    }
  },
  updateScheduleClassroom: async (
    teacherId: string,
    dayOfWeek: string,
    classroom: string
  ) => {
    try {
      await updateScheduleClassroom(teacherId, dayOfWeek, classroom);
      console.log('Classroom updated successfully');
    } catch (error) {
      console.error('Error updating classroom:', error);
      throw error;
    }
  },
  deleteScheduleClassroom: async (teacherId: string, dayOfWeek: string) => {
    try {
      await deleteScheduleClassroom(teacherId, dayOfWeek);
      console.log('Classroom deleted successfully');
    } catch (error) {
      console.error('Error deleting classroom:', error);
      throw error;
    }
  },

  // Work hour related functions
  addStartTime: async (
    teacherId: string,
    dayOfWeek: string,
    startTime: string
  ) => {
    try {
      await addStartTime(teacherId, dayOfWeek, startTime);
      console.log('Start time added successfully');
    } catch (error) {
      console.error('Error adding start time:', error);
      throw error;
    }
  },
  addEndTime: async (teacherId: string, dayOfWeek: string, endTime: string) => {
    try {
      await addEndTime(teacherId, dayOfWeek, endTime);
      console.log('End time added successfully');
    } catch (error) {
      console.error('Error adding end time:', error);
      throw error;
    }
  },
  getStartTime: async (teacherId: string, dayOfWeek: string) => {
    try {
      return await getStartTime(teacherId, dayOfWeek);
    } catch (error) {
      console.error('Error fetching start time:', error);
      throw error;
    }
  },
  getEndTime: async (teacherId: string, dayOfWeek: string) => {
    try {
      return await getEndTime(teacherId, dayOfWeek);
    } catch (error) {
      console.error('Error fetching end time:', error);
      throw error;
    }
  },
  updateStartTime: async (
    teacherId: string,
    dayOfWeek: string,
    startTime: string
  ) => {
    try {
      await updateStartTime(teacherId, dayOfWeek, startTime);
      console.log('Start time updated successfully');
    } catch (error) {
      console.error('Error updating start time:', error);
      throw error;
    }
  },
  updateEndTime: async (
    teacherId: string,
    dayOfWeek: string,
    endTime: string
  ) => {
    try {
      await updateEndTime(teacherId, dayOfWeek, endTime);
      console.log('End time updated successfully');
    } catch (error) {
      console.error('Error updating end time:', error);
      throw error;
    }
  },
  deleteStartTime: async (teacherId: string, dayOfWeek: string) => {
    try {
      await deleteStartTime(teacherId, dayOfWeek);
      console.log('Start time deleted successfully');
    } catch (error) {
      console.error('Error deleting start time:', error);
      throw error;
    }
  },
  deleteEndTime: async (teacherId: string, dayOfWeek: string) => {
    try {
      await deleteEndTime(teacherId, dayOfWeek);
      console.log('End time deleted successfully');
    } catch (error) {
      console.error('Error deleting end time:', error);
      throw error;
    }
  },
  // getSchedulesメソッドの追加
  getSchedules: async (
    teacherId: string
  ): Promise<Record<string, Schedule>> => {
    try {
      const schedules = await fetchSchedulesFromFirebase(teacherId);
      for (const dayOfWeek in schedules) {
        const students = await getStudents(teacherId, dayOfWeek);
        schedules[dayOfWeek].students = students;
      }
      return schedules;
    } catch (error) {
      console.error('Error fetching schedules:', error);
      throw error;
    }
  },
  // fetchSchedulesFromAPIメソッドの追加
  fetchSchedulesFromAPI: async (params: {
    teacherId: string;
    currentYear: number;
    currentMonth: number;
  }) => {
    try {
      // API呼び出し処理を実装
      const schedules = await schedulesService.getSchedules(params.teacherId);
      return schedules;
    } catch (error) {
      console.error('Error fetching schedules from API:', error);
      throw error;
    }
  },
  // addScheduleメソッドの修正
  addSchedule: async (
    teacherId: string,
    dayOfWeek: string,
    schedule: Schedule
  ) => {
    try {
      // スケジュールを追加
      await addScheduleToFirebase(teacherId, dayOfWeek, schedule);

      // スケジュールの学生をサブコレクションに追加または更新
      if (schedule.students) {
        for (const student of schedule.students) {
          await updateStudent(teacherId, dayOfWeek, student.studentId, student);
        }
      }

      console.log('Schedule and students added/updated successfully');
    } catch (error) {
      console.error('Error adding/updating schedule and students:', error);
      throw error;
    }
  },
  fetchSchedules: async () => {
    const response = await fetch('/api/schedules');
    if (!response.ok) {
      throw new Error('Failed to fetch schedules');
    }
    return await response.json();
  },
  async updateSchedule(
    teacherId: string,
    dayOfWeek: string,
    schedule: Schedule
  ): Promise<void> {
    try {
      const { students, ...scheduleWithoutStudents } = schedule;
      await updateScheduleInFirebase(
        teacherId,
        dayOfWeek,
        scheduleWithoutStudents
      );
      if (students) {
        for (const student of students) {
          await updateStudent(teacherId, dayOfWeek, student.studentId, student);
        }
      }
      console.log('Schedule and students updated successfully');
    } catch (error) {
      console.error('Error updating schedule and students:', error);
      throw error;
    }
  },
};
