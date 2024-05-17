import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import StudentEditModal from "./StudentEditModal";
import { Student } from "../../../types";

const ListContainer = styled.div<{ $dayOfWeek: string }>`
  margin: 10px 8px 0 8px;
  border-bottom: ${({ $dayOfWeek }) =>
    $dayOfWeek === "Saturday"
      ? "1px solid #bbebfa"
      : $dayOfWeek === "Sunday"
        ? "1px solid #ffd9df"
        : "1px solid #f0f0f0"};
`;

const ListItem = styled.div<{ $dayOfWeek: string }>`
  padding: 8px;
  border-bottom: ${({ $dayOfWeek }) =>
    $dayOfWeek === "Saturday"
      ? "1px solid #bbebfa"
      : $dayOfWeek === "Sunday"
        ? "1px solid #ffd9df"
        : "1px solid #f0f0f0"};
  &:last-child {
    border-bottom: none;
  }
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    background-color: #fcfcfc;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.4);
  }
`;

const Title = styled.span`
  display: block;
  text-align: left;
  font-size: 0.8rem;
  margin-bottom: 8px;
`;

const AddButton = styled(motion.button)`
  background-color: #4caf50;
  color: white;
  padding: 0;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 24px;
`;

interface StudentListProps {
  dayOfWeek: string;
  students: Student[];
  onStudentListChange: (students: Student[]) => void;
}

const StudentList: React.FC<StudentListProps> = ({
  dayOfWeek,
  students,
  onStudentListChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleAddButtonClick = () => {
    setSelectedStudent(null);
    setIsModalOpen(true);
  };

  const handleUpdateStudent = (updatedStudent: Student) => {
    const updatedStudents = students.map((student) =>
      student.firestoreId === updatedStudent.firestoreId
        ? updatedStudent
        : student
    );
    onStudentListChange(updatedStudents);
    setIsModalOpen(false);
  };

  const handleDeleteStudent = (firestoreId: string) => {
    const updatedStudents = students.filter(
      (student) => student.firestoreId !== firestoreId
    );
    onStudentListChange(updatedStudents);
    setIsModalOpen(false);
  };

  return (
    <>
      <ListContainer $dayOfWeek={dayOfWeek}>
        <Title>担当生徒</Title>
        {students.map((student) => (
          <ListItem
            $dayOfWeek={dayOfWeek}
            key={student.firestoreId}
            onClick={() => handleStudentClick(student)}
          >
            {student.studentName} ({student.subject}) {student.time}
          </ListItem>
        ))}
        {isModalOpen && (
          <StudentEditModal
            student={selectedStudent}
            onClose={() => setIsModalOpen(false)}
            onUpdate={handleUpdateStudent}
            onDelete={handleDeleteStudent}
          />
        )}
      </ListContainer>
      <AddButton
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)",
        }}
        transition={{ duration: 0.3 }}
        onClick={handleAddButtonClick}
      >
        +
      </AddButton>
    </>
  );
};

export default StudentList;
