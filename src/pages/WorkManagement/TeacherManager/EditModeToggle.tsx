import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  font-size: 0.8rem;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #218838;
  }
`;

interface Props {
  editMode: boolean;
  onToggle: () => void;
}

const EditModeToggle: React.FC<Props> = ({ editMode, onToggle }) => {
  return (
    <Button onClick={onToggle}>
      {editMode ? '編集モード終了' : '講師編集'}
    </Button>
  );
};

export default EditModeToggle;
