import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '../../../components/molecules/Modal';
import TimeInput from '../../../components/atoms/TimeInput';
import CellComponent from '../../../components/atoms/AnimatedCell/AnimatedCell';
import Button from '../../../components/atoms/Button'; // Added

const Container = styled.div<{ $dayOfWeek: string }>`
  padding-bottom: 8px;
  margin: 8px;
  border-bottom: ${({ $dayOfWeek }) =>
    $dayOfWeek === 'Saturday'
      ? '2px solid #bbebfa'
      : $dayOfWeek === 'Sunday'
        ? '2px solid #ffd9df'
        : '2px solid #f0f0f0'};
`;

const TimeContainer = styled.div<{ $dayOfWeek: string }>`
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
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  onWorkTimeChange: (startTime: string, endTime: string) => void;
}

const WorkTimeDisplay: React.FC<WorkTimeDisplayProps> = ({
  dayOfWeek,
  startTime,
  endTime,
  onWorkTimeChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStartTime, setNewStartTime] = useState(startTime);
  const [newEndTime, setNewEndTime] = useState(endTime);

  useEffect(() => {
    setNewStartTime(startTime);
    setNewEndTime(endTime);
  }, [startTime, endTime]);

  const handleSave = () => {
    onWorkTimeChange(newStartTime, newEndTime);
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <Container $dayOfWeek={dayOfWeek}>
      <CellComponent>
        <TimeContainer $dayOfWeek={dayOfWeek} onClick={openModal}>
          <Title>出勤時間</Title>
          <Time>{startTime || ''}</Time>
          <Title>退勤時間</Title>
          <Time>{endTime || ''}</Time>
        </TimeContainer>
      </CellComponent>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <TimeModalContent>
            <TimeInput
              label="出勤時間:"
              value={newStartTime}
              onChange={(value: string) => {
                setNewStartTime(value);
              }}
              placeholder="HH:MM"
            />
            <TimeInput
              label="退勤時間:"
              value={newEndTime}
              onChange={(value: string) => {
                setNewEndTime(value);
              }}
              placeholder="HH:MM"
            />
            <Button
              label="保存"
              onClick={handleSave}
              backgroundColor="#4caf50"
            />
          </TimeModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default WorkTimeDisplay;
