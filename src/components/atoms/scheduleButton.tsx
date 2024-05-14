import React from "react";
import styled from "styled-components";

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

interface ScheduleButtonProps {
  onClick: () => void;
  label: string;
}

const ScheduleButton: React.FC<ScheduleButtonProps> = ({ onClick, label }) => {
  return <Button onClick={onClick}>{label}</Button>;
};

export default ScheduleButton;
