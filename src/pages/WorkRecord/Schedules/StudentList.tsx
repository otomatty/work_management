import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import StudentEditModal from "./StudentEditModal";
import { Student } from "../../../types";
import { addStudent, updateStudent, deleteStudent } from "../../../firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

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
  const teacherId = useSelector((state: RootState) => state.teacher.teacherId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleAddButtonClick = () => {
    setSelectedStudent({
      studentId: "", // 新しい生徒なのでIDは空
      studentName: "",
      grade: "",
      subject: "",
      time: 0,
    });
    setIsModalOpen(true);
  };

  const handleUpdateStudent = async (updatedStudent: Student) => {
    if (!updatedStudent.studentId) {
      // 新しい生徒を追加
      try {
        const newStudent = await addStudent(
          teacherId,
          dayOfWeek,
          updatedStudent
        );
        onStudentListChange([
          ...students,
          { ...updatedStudent, studentId: newStudent.id },
        ]);
      } catch (error) {
        console.error("Error adding new student:", error);
      }
    } else {
      // 既存の生徒を更新
      try {
        await updateStudent(
          teacherId,
          dayOfWeek,
          updatedStudent.studentId,
          updatedStudent
        );
        const updatedStudents = students.map((student) =>
          student.studentId === updatedStudent.studentId
            ? updatedStudent
            : student
        );
        onStudentListChange(updatedStudents);
      } catch (error) {
        console.error("Error updating student:", error);
      }
    }
    setIsModalOpen(false);
  };

  const handleDeleteStudent = async (studentId: string) => {
    try {
      await deleteStudent(teacherId, dayOfWeek, studentId);
      const updatedStudents = students.filter(
        (student) => student.studentId !== studentId
      );
      onStudentListChange(updatedStudents);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
    setIsModalOpen(false);
  };

  const formatGradeAndSubject = (grade: string, subject: string) => {
    if (!grade || !subject) {
      return "未設定";
    }

    const gradeMap: { [key: string]: string } = {
      年少: "年少",
      年中: "年中",
      年長: "年長",
      小学1年: "小1",
      小学2年: "小2",
      小学3年: "小3",
      小学4年: "小4",
      小学5年: "小5",
      小学6年: "小6",
      中学1年: "中1",
      中学2年: "中2",
      中学3年: "中3",
      高校1年: "高1",
      高校2年: "高2",
      高校3年: "高3",
      社会人: "Ad",
    };

    const subjectMap: { [key: string]: string } = {
      国語: "国",
      英語: "英",
      数学: "数",
      理科: "理",
      社会: "社",
      英会話: "会話",
    };

    return `${gradeMap[grade] || grade}${subjectMap[subject] || subject}`;
  };

  return (
    <>
      <ListContainer $dayOfWeek={dayOfWeek}>
        <Title>担当生徒</Title>
        {students.map((student) => {
          const key = student.studentId;
          return (
            <ListItem
              $dayOfWeek={dayOfWeek}
              key={key}
              onClick={() => handleStudentClick(student)}
            >
              {student.studentName} (
              {formatGradeAndSubject(student.grade, student.subject)}){" "}
              {student.time}
            </ListItem>
          );
        })}
        {isModalOpen && (
          <StudentEditModal
            key={selectedStudent ? selectedStudent.studentId : "new"}
            student={selectedStudent}
            onClose={() => setIsModalOpen(false)}
            onUpdate={handleUpdateStudent}
            onDelete={handleDeleteStudent}
            isNewStudent={!selectedStudent?.studentId}
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
