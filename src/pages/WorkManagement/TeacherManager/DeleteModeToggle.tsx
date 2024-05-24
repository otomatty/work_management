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
}

const DeleteModeToggle: React.FC<Props> = ({ deleteMode, onToggle }) => {
  return (
    <Button onClick={onToggle}>
      {deleteMode ? "削除モード終了" : "講師削除"}
    </Button>
  );
};

export default DeleteModeToggle;
