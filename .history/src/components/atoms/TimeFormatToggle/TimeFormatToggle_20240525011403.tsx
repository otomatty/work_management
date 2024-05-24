import React from "react";
import styled from "styled-components";

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ToggleOption = styled.span<{ active: boolean }>`
  font-size: 0.8rem;
  padding: 10px 20px;
  background-color: ${({ active }) => (active ? "#2196f3" : "#ccc")};
  color: white;
  border-radius: 4px;
  margin: 0 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ active }) => (active ? "#1976d2" : "#bbb")};
  }
`;

interface ToggleSwitchProps {
  isChecked: boolean;
  onToggle: () => void;
}

const TimeFormatToggle: React.FC<ToggleSwitchProps> = ({
  isChecked,
  onToggle,
}) => (
  <ToggleContainer onClick={onToggle}>
    <ToggleOption active={!isChecked}>分</ToggleOption>
    <ToggleOption active={isChecked}>時間</ToggleOption>
  </ToggleContainer>
);

export default TimeFormatToggle;
