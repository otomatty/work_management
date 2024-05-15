import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import TimeInput from "../TimeInput";
import ModalSubTitle from "../../../components/atoms/ModalSubTitle";

const Container = styled.div``;

interface WorkTimeInputsProps {
  startTime: string;
  setStartTime: Dispatch<SetStateAction<string>>;
  endTime: string;
  setEndTime: Dispatch<SetStateAction<string>>;
}

const WorkTimeInputs: React.FC<WorkTimeInputsProps> = ({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}) => {
  const handleStartTimeChange = (value: string) => {
    setStartTime(value);
  };

  const handleEndTimeChange = (value: string) => {
    setEndTime(value);
  };

  return (
    <Container>
      <ModalSubTitle>勤務時間</ModalSubTitle>
      <TimeInput
        label="出勤時間:"
        value={startTime}
        onChange={handleStartTimeChange}
        placeholder="HH:MM"
      />
      <TimeInput
        label="退勤時間:"
        value={endTime}
        onChange={handleEndTimeChange}
        placeholder="HH:MM"
      />
    </Container>
  );
};
export default WorkTimeInputs;
