import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../hook";
import styled from "styled-components";
import ClassroomSelect from "./ClassroomSelect";
import WorkTimeDisplay from "./WorkTimeDisplay";
import StudentList from "./StudentList";
import {
  fetchSchedules,
  updateSchedule,
} from "../../../redux/teacher/scheduleSlice";
import { RootState } from "../../../redux/store";

interface DayTeacherScheduleProps {
  day: string;
  dayOfWeek: string;
}

const DayContainer = styled.div<{ $dayOfWeek: string }>`
  flex: 1;
  border-radius: 5px;
  border: ${({ $dayOfWeek }) =>
    $dayOfWeek === "Saturday"
      ? "2px solid #bbebfa"
      : $dayOfWeek === "Sunday"
        ? "2px solid #ffd9df"
        : "2px solid #f0f0f0"};
`;

const Title = styled.h4<{ $dayOfWeek: string }>`
  margin: 0;
  padding: 8px 0 10px 10px;
  background-color: ${({ $dayOfWeek }) =>
    $dayOfWeek === "Saturday"
      ? "#c3f0ff"
      : $dayOfWeek === "Sunday"
        ? "#ffd9df"
        : "#f0f0f0"};
`;

const DayTeacherSchedule: React.FC<DayTeacherScheduleProps> = ({
  day,
  dayOfWeek,
}) => {
  const dispatch = useAppDispatch();
  const schedule = useSelector(
    (state: RootState) => state.schedule.schedules[dayOfWeek]
  );
  // console.log("Schedule from useSelector:", schedule); // Added for debugging
  const teacherId = useSelector((state: RootState) => state.teacher.teacherId);
  const loading = useSelector((state: RootState) => state.schedule.loading);
  const error = useSelector((state: RootState) => state.schedule.error);

  useEffect(() => {
    if (teacherId) {
      dispatch(fetchSchedules(teacherId));
    }
  }, [dispatch, teacherId]);

  const handleClassroomChange = (classroom: string) => {
    if (teacherId) {
      const updatedSchedule = { ...schedule, classroom };
      dispatch(updateSchedule(teacherId, dayOfWeek, updatedSchedule));
    }
  };

  const handleWorkTimeChange = (startTime: string, endTime: string) => {
    if (teacherId) {
      const updatedSchedule = { ...schedule, startTime, endTime };
      dispatch(updateSchedule(teacherId, dayOfWeek, updatedSchedule));
    }
  };

  const handleStudentListChange = (students: any[]) => {
    if (teacherId) {
      const updatedSchedule = { ...schedule, students };
      dispatch(updateSchedule(teacherId, dayOfWeek, updatedSchedule));
    }
  };

  // デフォルト値を設定
  const defaultSchedule = {
    classroom: "",
    startTime: "",
    endTime: "",
    students: [],
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // console.log(schedule.students);

  return (
    <DayContainer $dayOfWeek={dayOfWeek}>
      <Title $dayOfWeek={dayOfWeek}>{day}</Title>
      <ClassroomSelect
        dayOfWeek={dayOfWeek}
        classroom={schedule?.classroom || defaultSchedule.classroom}
        onClassroomChange={handleClassroomChange}
      />
      <WorkTimeDisplay
        dayOfWeek={dayOfWeek}
        startTime={schedule?.startTime || defaultSchedule.startTime}
        endTime={schedule?.endTime || defaultSchedule.endTime}
        onWorkTimeChange={handleWorkTimeChange}
      />
      <StudentList
        dayOfWeek={dayOfWeek}
        students={schedule?.students || defaultSchedule.students}
        onStudentListChange={handleStudentListChange}
      />
    </DayContainer>
  );
};

export default DayTeacherSchedule;
