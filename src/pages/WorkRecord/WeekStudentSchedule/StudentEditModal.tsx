import React, { useState } from "react";
import styled from "styled-components";
import { Student } from "../../../types";
import Modal from "../../../components/molecules/Modal";
import { updateStudent, deleteStudent } from "../../../firebase";

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
  background-color: #f44336; // 赤色に設定
`;

interface StudentEditModalProps {
  student: Student;
  teacherId: string; // teacherId を props に追加
  dayOfWeek: string; // dayOfWeek を props に追加
  onClose: () => void;
  onUpdate: (student: Student) => void; // この関数はもはや不要かもしれません
  onDelete: (firestoreId: string) => void; // この関数はもはや不要かもしれません
}

const StudentEditModal: React.FC<StudentEditModalProps> = ({
  student,
  teacherId,
  dayOfWeek,
  onClose,
  onUpdate, // この関数はもはや不要かもしれません
  onDelete, // この関数はもはや不要かもしれません
}) => {
  const [studentName, setStudentName] = useState(student.studentName);
  const [subjectAndGrade, setSubjectGrade] = useState(student.subjectAndGrade);
  const [time, setTime] = useState(student.time);

  const handleUpdateClick = async () => {
    const updatedStudent = { ...student, studentName, subjectAndGrade, time };
    console.log("Updating student:", updatedStudent); // ログ追加
    await updateStudent(teacherId, dayOfWeek, updatedStudent);
    onUpdate(updatedStudent);
  };

  const handleDeleteClick = async () => {
    console.log("Deleting student ID:", student.firestoreId); // ログ追加
    await deleteStudent(teacherId, dayOfWeek, student.firestoreId);
    onDelete(student.firestoreId);
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
        <Select value={time} onChange={(e) => setTime(e.target.value)}>
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
