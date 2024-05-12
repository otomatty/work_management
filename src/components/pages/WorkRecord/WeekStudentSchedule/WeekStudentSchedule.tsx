import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import DayStudentSchedule from "./DayStudentSchedule";
import {
  fetchSchedulesByTeacherId,
  setTeacherScheduleWithDetails,
} from "../../../../firebase/firestoreFunctions";
import { Schedule } from "../../../../firebase/firestoreFunctions"; // Schedule 型をインポート
import AnimatedCaret from "../../../ui/AnimatedCaret";
import Tooltip from "../../../ui/Tooltip"; // Tooltip コンポーネントをインポート

const dayOfWeekMap: Record<string, string> = {
  Monday: "月曜日",
  Tuesday: "火曜日",
  Wednesday: "水曜日",
  Thursday: "木曜日",
  Friday: "金曜日",
  Saturday: "土曜日",
  Sunday: "日曜日",
};

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface WeekStudentScheduleProps {
  currentYear: number;
  currentMonth: number;
  teacherId: string;
}

const Container = styled.div`
  padding-bottom: 20px;
  margin: 20px;
  border-bottom: 2px solid #f0f0f0;
`;

const WeekContainer = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  overflow: hidden;
  padding: 0 4px;
`;

const DayContainer = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  margin: 0 0 20px 4px;
  gap: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const WeekStudentSchedule: React.FC<WeekStudentScheduleProps> = ({
  currentYear,
  currentMonth,
  teacherId,
}) => {
  const [schedules, setSchedules] = useState<Record<string, Schedule>>({});
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const loadSchedules = async () => {
      const fetchedSchedules = await fetchSchedulesByTeacherId(teacherId);
      setSchedules(fetchedSchedules);
    };

    loadSchedules();
  }, [teacherId]);

  const firstDay = new Date(currentYear, currentMonth, 0).getDay();

  const rotatedDaysOfWeek = [
    ...daysOfWeek.slice(firstDay),
    ...daysOfWeek.slice(0, firstDay),
  ];

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const saveSchedule = (
    dayOfWeek: string,
    scheduleData: {
      startTime: string;
      endTime: string;
      // 【注意】コレクションと配列があるかもしれない
      students: Array<{
        studentName: string;
        subjectAndGrade: string;
        time: string;
      }>;
    },
  ) => {
    setTeacherScheduleWithDetails(teacherId, dayOfWeek, scheduleData);
  };

  const dayStudentSchedules = rotatedDaysOfWeek.map((day) => {
    const dayOfWeekJapanese = dayOfWeekMap[day];
    const scheduleData = schedules[day] || {
      students: [],
      startTime: "",
      endTime: "",
    };
    return (
      <DayContainer key={day}>
        <DayStudentSchedule
          teacherId={teacherId}
          day={dayOfWeekJapanese}
          dayOfWeek={day}
          schedule={scheduleData}
          saveSchedule={saveSchedule}
        />
      </DayContainer>
    );
  });

  return (
    <Container id="weekStudentSchedule">
      <Title onClick={toggleAccordion}>
        業務内容
        <Tooltip text="曜日ごとに「出勤時間」「退勤時間」「担当生徒」を登録できます。" />
        <AnimatedCaret isOpen={isOpen} />
      </Title>
      <AnimatePresence>
        {isOpen && (
          <WeekContainer
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {dayStudentSchedules}
          </WeekContainer>
        )}
      </AnimatePresence>
    </Container>
  );
};
export default WeekStudentSchedule;
