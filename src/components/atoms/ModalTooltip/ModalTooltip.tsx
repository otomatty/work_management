import React, { useState, ReactNode } from "react";
import styled from "styled-components";

const TooltipContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TooltipTrigger = styled.span`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #333;
  color: white;
  font-size: 14px;
  user-select: none;
`;

interface ModalBackgroundProps {
  $isVisible: boolean;
}

const ModalBackground = styled.div.attrs<ModalBackgroundProps>((props) => ({
  style: {
    visibility: props.$isVisible ? "visible" : "hidden",
    opacity: props.$isVisible ? 1 : 0,
  },
}))<ModalBackgroundProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  max-height: 80%;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

interface ModalTooltipProps {
  children: ReactNode;
}

const ModalTooltip = ({ children }: ModalTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <TooltipContainer>
        <TooltipTrigger onClick={toggleVisibility}>?</TooltipTrigger>
      </TooltipContainer>
      <ModalBackground $isVisible={isVisible} onClick={toggleVisibility}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={toggleVisibility}>&times;</CloseButton>
          {children}
        </ModalContent>
      </ModalBackground>
    </>
  );
};

export default ModalTooltip;
