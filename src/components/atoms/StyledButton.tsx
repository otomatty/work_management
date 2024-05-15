import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

interface ButtonProps {
  label: React.ReactNode; // Type changed to React.ReactNode
  onClick: () => void;
  disabled?: boolean;
}

const StyledButton = styled(motion.button)<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#4caf50")};
  color: ${({ disabled }) => (disabled ? "#666" : "white")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "#45a045")};
  }
`;

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
}) => {
  // アニメーションの設定
  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 300,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? "hover" : undefined}
      whileTap={!disabled ? "tap" : undefined}
      variants={buttonVariants}
    >
      {label}
    </StyledButton>
  );
};

export default Button;
