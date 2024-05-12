import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
`;

const Select = styled.select`
  margin-bottom: 10px;
  padding: 8px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
`;

interface Student {
  studentName: string;
  subjectAndGrade: string;
  time: string;
}

interface StudentRegisterProps {
  onRegister: (name: string, subjectGrade: string, time: string) => void;
  initialData: Student | null;
}

const StudentRegister: React.FC<StudentRegisterProps> = ({ onRegister }) => {
  const [name, setName] = useState("");
  const [subjectGrade, setSubjectGrade] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onRegister(name, subjectGrade, time);
    setName("");
    setSubjectGrade("");
    setTime("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="生徒名"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="教科と学年 (例: 中1英)"
        value={subjectGrade}
        onChange={(e) => setSubjectGrade(e.target.value)}
      />
      <Select value={time} onChange={(e) => setTime(e.target.value)}>
        {Array.from({ length: 11 }, (_, i) => i * 10).map((time, index) => (
          <option key={index} value={time.toString()}>
            {time} 分
          </option>
        ))}
      </Select>
      <Button type="submit">登録</Button>
    </Form>
  );
};

export default StudentRegister;
