import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ClassroomSelect from "./ClassroomSelect";
import WorkTimeDisplay from "./WorkTimeDisplay";
import StudentList from "./StudentList";
import {
  fetchScheduleRequest,
  addScheduleRequest,
} from "../../../redux/actions";
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
  const dispatch = useDispatch();
  const schedule = useSelector((state: RootState) => state.schedule);
  const teacherId = useSelector((state: RootState) => state.teacher.teacherId);

  useEffect(() => {
    if (teacherId) {
      dispatch(fetchScheduleRequest(teacherId, dayOfWeek));
    }
  }, [dispatch, dayOfWeek, teacherId]);

  useEffect(() => {
    console.log("Fetched schedule:", schedule);
  }, [schedule]);

  const handleClassroomChange = (classroom: string) => {
    if (teacherId) {
      const updatedSchedule = { ...schedule, classroom };
      dispatch(addScheduleRequest(teacherId, dayOfWeek, updatedSchedule));
    }
  };

  const handleWorkTimeChange = (startTime: string, endTime: string) => {
    if (teacherId) {
      const updatedSchedule = { ...schedule, startTime, endTime };
      dispatch(addScheduleRequest(teacherId, dayOfWeek, updatedSchedule));
    }
  };

  const handleStudentListChange = (students: any[]) => {
    if (teacherId) {
      const updatedSchedule = { ...schedule, students };
      dispatch(addScheduleRequest(teacherId, dayOfWeek, updatedSchedule));
    }
  };

  return (
    <DayContainer $dayOfWeek={dayOfWeek}>
      <Title $dayOfWeek={dayOfWeek}>{day}</Title>
      <ClassroomSelect
        dayOfWeek={dayOfWeek}
        classroom={schedule.classroom}
        onClassroomChange={handleClassroomChange}
      />
      <WorkTimeDisplay
        dayOfWeek={dayOfWeek}
        startTime={schedule?.startTime}
        endTime={schedule?.endTime}
        onWorkTimeChange={handleWorkTimeChange}
      />
      <StudentList
        dayOfWeek={dayOfWeek}
        students={schedule?.students}
        onStudentListChange={handleStudentListChange}
      />
    </DayContainer>
  );
};

export default DayTeacherSchedule;
