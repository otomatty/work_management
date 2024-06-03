import React from "react";
import styled from "styled-components";

const Button = styled.button`
  font-size: 0.8rem;
  padding: 10px 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #c82333;
  }
`;

interface Props {
  deleteMode: boolean;
  onToggle: () => void;
  activeLabel: string; // Added
  inactiveLabel: string; // Added
}

const DeleteModeToggle: React.FC<Props> = ({
  deleteMode,
  onToggle,
  activeLabel,
  inactiveLabel,
}) => {
  return (
    <Button onClick={onToggle}>
      {deleteMode ? activeLabel : inactiveLabel}
    </Button>
  );
};

export default DeleteModeToggle;
