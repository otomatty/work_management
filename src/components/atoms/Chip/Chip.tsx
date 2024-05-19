import React from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

interface ChipContainerProps {
  checked?: boolean;
}

const ChipContainer = styled(motion.div)<ChipContainerProps>`
  width: 10%;
  height: 100px;
  min-width: 60px;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  border-radius: 8px;
  background-color: #f0f0f0;
  cursor: pointer;
  margin: 5px 5px 20px;
  user-select: none;
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #333;

  &:hover {
    background-color: #e0e0e0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  ${(props) =>
    props.checked &&
    css`
      background-color: #007bff;
      color: white;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);

      &:hover {
        background-color: #0090ff;
      }
    `}
`;

const CheckMark = styled(motion.div)`
  position: absolute;
  top: 5%;
  left: 15%;
  transform: translateX(-50%);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: white;
  color: #007bff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: "spring", stiffness: 260, damping: 20 }}
`;

interface IconProps {
  fontSize?: string;
}

const Icon = styled.div<IconProps>`
  margin-bottom: 8px;
  font-size: ${(props) => props.fontSize || "24px"};
`;

const Label = styled.span`
  font-size: 1rem;
  font-weight: bold;
`;

interface ChipProps {
  icon: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  fontSize?: string;
}

const Chip = ({ icon, label, checked, onChange, fontSize }: ChipProps) => {
  return (
    <ChipContainer
      checked={checked}
      onClick={onChange}
      whileTap={{ scale: 0.95 }}
    >
      {checked && (
        <CheckMark
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <FaCheck />
        </CheckMark>
      )}
      <Icon fontSize={fontSize}>
        <InlineMath math={icon} />
      </Icon>
      <Label>{label}</Label>
    </ChipContainer>
  );
};

export default Chip;
