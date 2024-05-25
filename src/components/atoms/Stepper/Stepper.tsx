import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const StepperContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 5px;
`;

const Button = styled(motion.button)`
  border: none;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
  color: white;
  font-size: 16px;
  padding: 10px 15px;
  border-radius: 50%;
  cursor: pointer;
  margin: 0 5px;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#0056b3")};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const Value = styled.input`
  width: 40px;
  text-align: center;
  font-size: 16px;
  color: #333;
  border: none;
  background-color: transparent;

  &:focus {
    outline: none;
  }

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

interface StepperProps {
  initialValue?: number;
  onValueChange: (newValue: number) => void;
}

const Stepper = ({ initialValue = 0, onValueChange }: StepperProps) => {
  const [value, setValue] = useState<number>(
    parseInt(initialValue.toString(), 10)
  );

  const handleIncrement = () => {
    updateValue(value + 1);
  };

  const handleDecrement = () => {
    if (value > 1) {
      updateValue(value - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    updateValue(isNaN(newValue) ? 0 : Math.max(0, newValue));
  };

  const updateValue = (newValue: number) => {
    setValue(newValue);
    onValueChange(newValue);
  };

  return (
    <StepperContainer>
      <Button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleDecrement}
        disabled={value <= 1}
      >
        -
      </Button>
      <Value type="number" value={value} onChange={handleChange} />
      <Button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleIncrement}
      >
        +
      </Button>
    </StepperContainer>
  );
};

export default Stepper;
