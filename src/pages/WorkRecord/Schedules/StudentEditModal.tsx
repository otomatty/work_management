import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Student } from "../../../types";
import Modal from "../../../components/molecules/Modal";
import GradeSelector from "../../../components/molecules/GradeSelector";

const Form = styled(motion.form)`
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

const GradeSelect = styled.button`
  text-align: left;
  padding: 8px;
  background-color: #fff;
  border: 1px solid #333;
  cursor: pointer;
  margin-bottom: 10px;
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

const BackButton = styled(Button)`
  background-color: #2196f3;
`;

interface StudentEditModalProps {
  student: Student | null;
  onClose: () => void;
  onUpdate: (student: Student) => void;
  onDelete: (firestoreId: string) => void;
  isNewStudent: boolean; // New prop added
}

const StudentEditModal: React.FC<StudentEditModalProps> = ({
  student,
  onClose,
  onUpdate,
  onDelete,
  isNewStudent,
}) => {
  const [studentName, setStudentName] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [time, setTime] = useState<string | number>("");
  const [isGradeSelectorOpen, setIsGradeSelectorOpen] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(true);

  useEffect(() => {
    if (student) {
      setStudentName(student.studentName);
      setGrade(student.grade);
      setSubject(student.subject);
      setTime(student.time);
    }
  }, [student]);

  const handleUpdateClick = () => {
    if (student) {
      const updatedStudent: Student = {
        ...student,
        studentId: student.studentId, // 一意のIDを生成
        studentName,
        grade,
        subject,
        time: Number(time),
      };
      onUpdate(updatedStudent);
    }
  };

  const handleDeleteClick = () => {
    if (student && student.studentId) {
      onDelete(student.studentId);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} showCloseButton={showCloseButton}>
      <Form
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {!isGradeSelectorOpen ? (
          <>
            <Input
              type="text"
              placeholder="生徒名"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
            <GradeSelect
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsGradeSelectorOpen(true);
                setShowCloseButton(false);
              }}
            >
              {grade || "学年を選択"}
            </GradeSelect>
            <Select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="">教科を選択</option>
              <option value="国語">国語</option>
              <option value="英語">英語</option>
              <option value="数学">数学</option>
              <option value="理科">理科</option>
              <option value="社会">社会</option>
              <option value="英会話">英会話</option>
            </Select>
            <Select
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
            >
              {Array.from({ length: 11 }, (_, i) => i * 10).map(
                (time, index) => (
                  <option key={index} value={time.toString()}>
                    {time} 分
                  </option>
                )
              )}
            </Select>
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleUpdateClick();
              }}
            >
              {isNewStudent ? "追加する" : "更新する"}
            </Button>
            {!isNewStudent && (
              <DeleteButton onClick={handleDeleteClick}>削除する</DeleteButton>
            )}
          </>
        ) : (
          <>
            <GradeSelector
              grade={grade}
              setGrade={(newGrade) => {
                setGrade(newGrade);
                setIsGradeSelectorOpen(false);
                setShowCloseButton(true);
              }}
            />
            <BackButton
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsGradeSelectorOpen(false);
                setShowCloseButton(true);
              }}
            >
              戻る
            </BackButton>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default StudentEditModal;
