import React, { useState } from "react";
import CustomDatePicker from "./CustomDatePicker";

interface DateRangePickerProps {
  onDateRangeSelect: (startDate: Date, endDate: Date) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onDateRangeSelect,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateSelect = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (date < startDate) {
      setStartDate(date);
    } else {
      setEndDate(date);
      onDateRangeSelect(startDate, date);
    }
  };

  return (
    <div>
      <div>
        <p>開始日: {startDate ? startDate.toLocaleDateString() : "未選択"}</p>
        <p>終了日: {endDate ? endDate.toLocaleDateString() : "未選択"}</p>
      </div>
      <CustomDatePicker onDateSelect={handleDateSelect} />
    </div>
  );
};

export default DateRangePicker;
