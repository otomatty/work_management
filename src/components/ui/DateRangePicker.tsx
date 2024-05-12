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

  const handleStartDateSelect = (date: Date) => {
    setStartDate(date);
    // If endDate is already set and is before the new startDate, reset endDate
    if (endDate && date > endDate) {
      setEndDate(null);
    }
  };

  const handleEndDateSelect = (date: Date) => {
    if (startDate && date >= startDate) {
      setEndDate(date);
      onDateRangeSelect(startDate, date);
    }
  };

  return (
    <div>
      <CustomDatePicker onDateSelect={handleStartDateSelect} />
      {startDate && <CustomDatePicker onDateSelect={handleEndDateSelect} />}
    </div>
  );
};

export default DateRangePicker;
