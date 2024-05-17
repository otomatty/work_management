import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import DaysGrid from "./WorkRecordCalender/DaysGrid";
import WeekTeacherSchedule from "./Schedules/WeekTeacherSchedule";
import { RootState } from "../../redux/store"; // RootStateをインポート

const CalendarContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 0;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const generateDaysForMonth = (year: number, month: number): Date[] => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

interface CalendarProps {
  teacherId: string;
}

const Calendar: React.FC<CalendarProps> = ({ teacherId }) => {
  const { currentYear, currentMonth, direction } = useSelector(
    (state: RootState) => state.dateNavigation
  );

  const days = generateDaysForMonth(currentYear, currentMonth);
  const dayNumbers = days.map((day) => day.getDate());

  const variants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <CalendarContainer>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentMonth}
          custom={direction}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <WeekTeacherSchedule />
          <DaysGrid
            teacherId={teacherId}
            days={dayNumbers}
            year={currentYear}
            month={currentMonth}
          />
        </motion.div>
      </AnimatePresence>
    </CalendarContainer>
  );
};

export default Calendar;
