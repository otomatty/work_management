import React, { useState } from "react";

interface MonthSelectorProps {
  onMonthChange: (selectedMonth: string) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({ onMonthChange }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>("");

  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = event.target.value;
    setSelectedMonth(newMonth);
    onMonthChange(newMonth);
  };

  return (
    <select value={selectedMonth} onChange={handleMonthChange}>
      <option value="">月を選択</option>
      {months.map((month, index) => (
        <option key={index} value={month}>
          {month}月
        </option>
      ))}
    </select>
  );
};

export default MonthSelector;
