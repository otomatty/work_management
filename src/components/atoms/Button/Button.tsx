import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ButtonProps {
  label: string;
  onClick: () => void;
  backgroundColor?: string;
  disabled?: boolean;
  icon?: IconDefinition;
}

const StyledButton = styled(motion.button)<{ style: React.CSSProperties }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: ${(props) => props.style.backgroundColor || '#007bff'};
  color: white;
  border-radius: 8px;
  font-size: 13px;
  padding: 10px 15px;
  cursor: pointer;
  border: none;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }
`;

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      type: 'spring',
      stiffness: 300,
    },
  },
  tap: {
    scale: 0.95,
  },
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  backgroundColor = 'blue',
  disabled,
  icon,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      style={{ backgroundColor }}
      disabled={disabled}
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {label}
    </StyledButton>
  );
};

export default Button;
