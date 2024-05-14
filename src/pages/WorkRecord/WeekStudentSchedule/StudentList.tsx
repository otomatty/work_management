import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StudentEditModal from "./StudentEditModal";
import { Student } from "../../../types";

const ListContainer = styled.div<{ dayOfWeek: string }>`
  margin: 10px 8px 0 8px;
  border-bottom: ${({ dayOfWeek }) =>
    dayOfWeek === "Saturday"
      ? "1px solid #bbebfa"
      : dayOfWeek === "Sunday"
        ? "1px solid #ffd9df"
        : "1px solid #f0f0f0"};
`;

const ListItem = styled.div<{ dayOfWeek: string }>`
  padding: 8px;
  border-bottom: ${({ dayOfWeek }) =>
    dayOfWeek === "Saturday"
      ? "1px solid #bbebfa"
      : dayOfWeek === "Sunday"
        ? "1px solid #ffd9df"
        : "1px solid #f0f0f0"};
  &:last-child {
    border-bottom: none;
  }
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease; // アニメーションの追加

  &:hover {
    background-color: #fcfcfc; // ホバー時の背景色変更
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.4); // ホバー時に影を追加
  }
`;

const Title = styled.span`
  display: block;
  text-align: left;
  font-size: 0.8rem;
  margin-bottom: 8px;
`;

interface StudentListProps {
  students: Student[];
  onStudentSelect: (student: Student) => void;
  teacherId: string; // teacherId を追加
  dayOfWeek: string; // dayOfWeek を追加
}

const StudentList: React.FC<StudentListProps> = ({
  students,
  teacherId, // teacherId を関数の引数に追加
  dayOfWeek, // dayOfWeek を関数の引数に追加
}) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentList, setStudentList] = useState<Student[]>(students);

  useEffect(() => {
    setStudentList(students);
  }, [students]); // students プロップスが変更されたときに studentList を更新

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = (updatedStudent: Student) => {
    const updatedList = studentList.map((student) =>
      student.firestoreId === updatedStudent.firestoreId
        ? updatedStudent
        : student
    );
    setStudentList(updatedList);
    setIsModalOpen(false);
  };

  const handleDelete = (firestoreId: string) => {
    const updatedList = studentList.filter(
      (student) => student.firestoreId !== firestoreId
    );
    setStudentList(updatedList);
    setIsModalOpen(false);
  };

  return (
    <ListContainer dayOfWeek={dayOfWeek}>
      <Title>担当生徒</Title>
      {studentList.map((student) => (
        <ListItem
          dayOfWeek={dayOfWeek}
          key={student.firestoreId}
          onClick={() => handleStudentClick(student)}
        >
          {student.studentName} ({student.subjectAndGrade}) {student.time}
        </ListItem>
      ))}
      {isModalOpen && selectedStudent && (
        <StudentEditModal
          student={selectedStudent}
          onClose={handleClose}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          teacherId={teacherId} // teacherId を渡す
          dayOfWeek={dayOfWeek} // dayOfWeek を渡す
        />
      )}
    </ListContainer>
  );
};

export default StudentList;
