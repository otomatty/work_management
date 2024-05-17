import React from "react";
import styled from "styled-components";

interface ClassroomSelectBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const StyledSelect = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    border-color 0.3s,
    box-shadow 0.3s;

  &:hover {
    border-color: #888;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    border-color: #0056b3;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    outline: none;
  }
`;

const ClassroomSelectBox: React.FC<ClassroomSelectBoxProps> = ({
  value,
  onChange,
}) => {
  return (
    <StyledSelect value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">選択してください</option>
      <option value="Off">休み</option>
      <option value="Ofunato">大船渡</option>
      <option value="Takata">高田</option>
      <option value="TwoClassrooms">2教室</option>
    </StyledSelect>
  );
};

export default ClassroomSelectBox;
