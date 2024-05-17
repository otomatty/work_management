import React, { useState } from "react";
import styled from "styled-components";
import { Student } from "../../../types";
import Modal from "../../../components/molecules/Modal";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  width: 80%;
`;

const Select = styled.select`
  margin-bottom: 10px;
  padding: 8px;
  width: 80%;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  width: 80%;
`;

const DeleteButton = styled(Button)`
  background-color: #f44336;
`;

interface StudentEditModalProps {
  student: Student | null;
  onClose: () => void;
  onUpdate: (student: Student) => void;
  onDelete: (firestoreId: string) => void;
}

const StudentEditModal: React.FC<StudentEditModalProps> = ({
  student,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const [studentName, setStudentName] = useState(student?.studentName || "");
  const [subjectAndGrade, setSubjectGrade] = useState(
    student?.subjectAndGrade || ""
  );
  const [time, setTime] = useState<string | number>(student?.time || "");

  const handleUpdateClick = () => {
    if (student) {
      const updatedStudent: Student = {
        ...student,
        studentName,
        subjectAndGrade,
        time: Number(time),
      };
      onUpdate(updatedStudent);
    }
  };

  const handleDeleteClick = () => {
    if (student) {
      onDelete(student.firestoreId);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <Form>
        <Input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
        <Input
          type="text"
          value={subjectAndGrade}
          onChange={(e) => setSubjectGrade(e.target.value)}
        />
        <Select value={time} onChange={(e) => setTime(Number(e.target.value))}>
          {Array.from({ length: 11 }, (_, i) => i * 10).map((time, index) => (
            <option key={index} value={time.toString()}>
              {time} 分
            </option>
          ))}
        </Select>
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleUpdateClick();
          }}
        >
          変更
        </Button>
        <DeleteButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDeleteClick();
          }}
        >
          削除
        </DeleteButton>
      </Form>
    </Modal>
  );
};

export default StudentEditModal;
