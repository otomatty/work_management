import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import DayTeacherSchedule from "./DayTeacherSchedule";
import AnimatedCaret from "../../../components/atoms/AnimatedCaret";
import Tooltip from "../../../components/atoms/Tooltip";

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
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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

const WeekTeacherSchedule: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleDayClick = (day: string) => {
    setSelectedDay(day);
  };

  return (
    <Container id="weekTeacherSchedule">
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
            {daysOfWeek.map((day) => (
              <DayContainer key={day} onClick={() => handleDayClick(day)}>
                {dayOfWeekMap[day]}
              </DayContainer>
            ))}
          </WeekContainer>
        )}
      </AnimatePresence>
      {selectedDay && (
        <DayTeacherSchedule
          day={dayOfWeekMap[selectedDay]}
          dayOfWeek={selectedDay}
        />
      )}
    </Container>
  );
};

export default WeekTeacherSchedule;
