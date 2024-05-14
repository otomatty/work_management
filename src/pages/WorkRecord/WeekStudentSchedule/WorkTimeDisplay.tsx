import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../../../components/molecules/Modal";
import TimeInput from "../TimeInput"; // Import the TimeInput component
import CellComponent from "../../../components/atoms/AnimatedCell"; // Import the AnimatedCell component

const Container = styled.div<{ dayOfWeek: string }>`
  padding-bottom: 8px;
  margin: 8px;
  border-bottom: ${({ dayOfWeek }) =>
    dayOfWeek === "Saturday"
      ? "2px solid #bbebfa"
      : dayOfWeek === "Sunday"
        ? "2px solid #ffd9df"
        : "2px solid #f0f0f0"};
`;

const TimeContainer = styled.div<{ dayOfWeek: string }>`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  display: block;
  text-align: left;
  font-size: 0.8rem;
`;

const Time = styled.time`
  display: inline-block;
  height: 2.4rem;
  font-size: 1.6rem;
  font-weight: bold;
  margin: 4px 0;
`;

const TimeModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface WorkTimeDisplayProps {
  startTime: string;
  endTime: string;
  onTimeUpdate: (startTime: string, endTime: string) => void;
  dayOfWeek: string;
}

const WorkTimeDisplay: React.FC<WorkTimeDisplayProps> = ({
  startTime,
  endTime,
  onTimeUpdate,
  dayOfWeek,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStartTime, setNewStartTime] = useState(startTime);
  const [newEndTime, setNewEndTime] = useState(endTime);

  const handleSave = () => {
    onTimeUpdate(newStartTime, newEndTime);
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <Container dayOfWeek={dayOfWeek}>
      <CellComponent>
        <TimeContainer dayOfWeek={dayOfWeek} onClick={openModal}>
          <Title>出勤時間</Title>
          <Time>{startTime || ""}</Time>
          <Title>退勤時間</Title>
          <Time>{endTime || ""}</Time>
        </TimeContainer>
      </CellComponent>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <TimeModalContent>
            <TimeInput
              label="出勤時間:"
              value={newStartTime}
              onChange={(value: string) => {
                console.log("New start time:", value); // 新しい開始時間をログに出力
                setNewStartTime(value);
              }}
              placeholder="HH:MM"
            />
            <TimeInput
              label="退勤時間:"
              value={newEndTime}
              onChange={(value: string) => {
                console.log("New end time:", value); // 新しい終了時間をログに出力
                setNewEndTime(value);
              }}
              placeholder="HH:MM"
            />
            <button onClick={handleSave}>保存</button>
          </TimeModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default WorkTimeDisplay;
