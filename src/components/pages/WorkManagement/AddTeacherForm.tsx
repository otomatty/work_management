import React, { useState } from "react";
import styled from "styled-components";

const Input = styled.input`
  padding: 8px;
  margin: 8px 0;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

interface Props {
  onAdd: (name: string) => void;
  onCancel: () => void;
}

const AddTeacherForm: React.FC<Props> = ({ onAdd, onCancel }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onAdd(name);
      setName("");
    }
  };

  return (
    <div>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={handleSubmit}
        placeholder="講師名を入力"
      />
      <Button onClick={() => onAdd(name)}>登録</Button>
      <Button onClick={onCancel}>キャンセル</Button>
    </div>
  );
};

export default AddTeacherForm;
