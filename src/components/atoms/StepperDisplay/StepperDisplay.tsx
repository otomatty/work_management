import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const StepperContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Step = styled(motion.div)<{ isActive: boolean; isCurrent: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ isActive, isCurrent }) =>
    isCurrent ? "#007bff" : isActive ? "#ccc" : "#eee"};
  color: ${({ isCurrent }) => (isCurrent ? "white" : "#555")};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  font-weight: bold;
`;

const StepLine = styled(motion.div)<{ isActive: boolean }>`
  width: 50px;
  height: 2px;
  background-color: ${({ isActive }) => (isActive ? "#007bff" : "#ccc")};
`;

interface StepperDisplayProps {
  steps: string[];
  currentStep: number;
}

const StepperDisplay: React.FC<StepperDisplayProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <StepperContainer>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <Step
            isActive={index < currentStep}
            isCurrent={index === currentStep - 1}
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {index + 1}
          </Step>
          {index < steps.length - 1 && (
            <StepLine
              isActive={index < currentStep - 1}
              initial={{ width: 0 }}
              animate={{ width: 50 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </React.Fragment>
      ))}
    </StepperContainer>
  );
};

export default StepperDisplay;
