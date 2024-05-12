import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const CalendarContainer = styled.div`
  display: inline-block;
  border: 1px solid #ccc;
  padding: 10px;
`;

const WeekRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Day = styled.div<{ $isSelected?: boolean; $isInRange?: boolean }>`
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin: 2px;
  cursor: pointer;
  background-color: ${(props) =>
    props.$isSelected
      ? "#4CAF50"
      : props.$isInRange
        ? "#C8E6C9"
        : "transparent"};
  color: ${(props) => (props.$isSelected ? "white" : "black")};
  &:hover {
    background-color: #eee;
  }
`;

const EmptyDay = styled(Day)`
  background-color: transparent;
  cursor: default;
`;

interface CustomDatePickerProps {
  onDateSelect: (date: Date) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  onDateSelect,
}) => {
  const currentMonth = useSelector(
    (state: RootState) => state.dateNavigation.currentMonth,
  );
  const currentYear = useSelector(
    (state: RootState) => state.dateNavigation.currentYear,
  );
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const daysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const dayOfWeek = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDayClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate && date >= startDate) {
      setEndDate(date);
    }
    onDateSelect(date);
  };

  const isDateSelected = (date: Date): boolean => {
    return (
      (!!startDate && date.getTime() === startDate.getTime()) ||
      (!!endDate && date.getTime() === endDate.getTime())
    );
  };

  const isDateInRange = (date: Date): boolean => {
    return !!startDate && !!endDate && date > startDate && date < endDate;
  };

  const renderDays = () => {
    const totalDays = daysInMonth(currentYear, currentMonth);
    const startDay = dayOfWeek(currentYear, currentMonth);
    const days = [];
    let daysRendered = 0;

    // Fill empty days for the start of the first week
    for (let i = 0; i < startDay; i++) {
      days.push(<EmptyDay key={`empty-${i}`} />);
      daysRendered++;
    }

    // Fill actual days of the month
    for (let i = 1; i <= totalDays; i++) {
      const dayDate = new Date(currentYear, currentMonth, i);
      days.push(
        <Day
          key={i}
          onClick={() => handleDayClick(dayDate)}
          $isSelected={isDateSelected(dayDate)}
          $isInRange={isDateInRange(dayDate)}
        >
          {i}
        </Day>,
      );
      daysRendered++;
    }

    // Fill empty days for the end of the last week
    while (daysRendered % 7 !== 0) {
      days.push(<EmptyDay key={`empty-end-${daysRendered}`} />);
      daysRendered++;
    }

    // Group days into weeks
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(<WeekRow key={`week-${i}`}>{days.slice(i, i + 7)}</WeekRow>);
    }

    return weeks;
  };

  return <CalendarContainer>{renderDays()}</CalendarContainer>;
};

export default CustomDatePicker;
