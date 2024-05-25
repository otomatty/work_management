import React from "react";
import styled from "styled-components";

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ToggleButton = styled.button<{ active: boolean }>`
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: ${({ active }) => (active ? "#007bff" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: ${({ active }) => (active ? "#0056b3" : "#f0f0f0")};
  }
`;

interface TimeFormatToggleProps {
  format: "minutes" | "hours";
  onToggle: (format: "minutes" | "hours") => void;
}

const TimeFormatToggle: React.FC<TimeFormatToggleProps> = ({
  format,
  onToggle,
}) => {
  return (
    <ToggleContainer>
      <ToggleButton
        active={format === "minutes"}
        onClick={() => onToggle("minutes")}
      >
        分
      </ToggleButton>
      <ToggleButton
        active={format === "hours"}
        onClick={() => onToggle("hours")}
      >
        時間
      </ToggleButton>
    </ToggleContainer>
  );
};

export default TimeFormatToggle;
