import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const StyledDatePicker = styled(DatePicker)`
  .react-datepicker {
    font-size: 16px;
  }

  .react-datepicker__month-container {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .react-datepicker__header {
    background-color: #f0f0f0;
    border-bottom: none;
  }

  .react-datepicker__current-month,
  .react-datepicker__day-name {
    color: #333;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: #3498db;
    color: white;
  }
`;

interface DrumRollDatePickerProps {
  selected: Date;
  onChange: (date: Date) => void;
}

const DrumRollDatePicker: React.FC<DrumRollDatePickerProps> = ({
  selected,
  onChange,
}) => {
  return (
    <StyledDatePicker
      selected={selected}
      onChange={onChange}
      dateFormat="yyyy/MM"
      showMonthYearPicker
      inline
    />
  );
};

export default DrumRollDatePicker;
