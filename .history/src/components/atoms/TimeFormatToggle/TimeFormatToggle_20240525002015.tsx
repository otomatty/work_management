import React from "react";
import styled from "styled-components";

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${Slider} {
    background-color: #2196f3;
  }

  &:checked + ${Slider}:before {
    transform: translateX(26px);
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
  <Switch>
    <Input type="checkbox" checked={isChecked} onChange={onToggle} />
    <Slider />
  </Switch>
);

export default TimeFormatToggle;
