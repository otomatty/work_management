import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import {
  saveStudent,
  fetchStudentsByTeacherIdAndDay,
  saveClassroom,
} from "../../../firebase/";
import { Student, Schedule } from "../../../types";
import StudentList from "./StudentList";
import StudentRegister from "./StudentRegister";
import Modal from "../../../components/molecules/Modal";
import WorkTimeDisplay from "./WorkTimeDisplay"; // 新しいコンポーネントをインポート
import ClassroomSelect from "./ClassroomSelect"; // ClassroomSelect コンポーネントをインポート

const DayContainer = styled.div<{ dayOfWeek: string }>`
  flex: 1;
  border-radius: 5px;
  border: ${({ dayOfWeek }) =>
    dayOfWeek === "Saturday"
      ? "2px solid #bbebfa"
      : dayOfWeek === "Sunday"
        ? "2px solid #ffd9df"
        : "2px solid #f0f0f0"};
`;

const Title = styled.h4<{ dayOfWeek: string }>`
  margin: 0;
  padding: 8px 0 10px 10px;
  background-color: ${({ dayOfWeek }) =>
    dayOfWeek === "Saturday"
      ? "#c3f0ff"
      : dayOfWeek === "Sunday"
        ? "#ffd9df"
        : "#f0f0f0"};
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

interface DayStudentScheduleProps {
  teacherId: string;
  day: string;
  dayOfWeek: string;
  schedule: Schedule; // Schedule 型のプロパティを追加
  saveSchedule: (
    dayOfWeek: string,
    scheduleData: {
      startTime: string;
      endTime: string;
      // 【注意】コレクションと配列の2つのstudentsがあるかも？
      students: Array<{
        studentName: string;
        subjectAndGrade: string;
        time: string;
      }>;
    }
  ) => void;
}

const DayStudentSchedule: React.FC<DayStudentScheduleProps> = ({
  teacherId,
  day,
  dayOfWeek,
  schedule,
  saveSchedule,
}) => {
  const [classroom, setClassroom] = useState(""); // 教室の状態を管理
  const [students, setStudents] = useState<Student[]>([]); // scheduleから生徒データを初期値として設定
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    fetchStudentsByTeacherIdAndDay(teacherId, dayOfWeek).then(
      (fetchedStudents) => {
        setStudents(fetchedStudents);
      }
    );
    setStartTime(schedule.startTime || "");
    setEndTime(schedule.endTime || "");
  }, [teacherId, dayOfWeek, schedule.startTime, schedule.endTime]); // 依存配列を更新

  const handleTimeUpdate = (newStartTime: string, newEndTime: string) => {
    setStartTime(newStartTime);
    setEndTime(newEndTime);
    // ここで saveSchedule を呼び出して、変更を親コンポーネントに伝播させます。
    saveSchedule(dayOfWeek, {
      startTime: newStartTime,
      endTime: newEndTime,
      students: students.map(({ studentName, subjectAndGrade, time }) => ({
        studentName,
        subjectAndGrade: subjectAndGrade,
        time,
      })),
    });
  };

  const handleAddButtonClick = () => {
    setSelectedStudent(null); // 新し���生徒を追加すためにselectedStudentをnullに設定
    setIsModalOpen(true);
  };

  const handleClassroomChange = async (newClassroom: string) => {
    setClassroom(newClassroom);
    try {
      await saveClassroom(teacherId, dayOfWeek, newClassroom);
      console.log("Classroom updated successfully");
    } catch (error) {
      console.error("Failed to update classroom:", error);
    }
  };

  return (
    <DayContainer dayOfWeek={dayOfWeek}>
      <Title dayOfWeek={dayOfWeek}>{day}</Title>
      <ClassroomSelect
        teacherId={teacherId}
        dayOfWeek={dayOfWeek}
        selectedClassroom={classroom}
        onSelectClassroom={handleClassroomChange}
      />
      <WorkTimeDisplay
        startTime={startTime}
        endTime={endTime}
        onTimeUpdate={handleTimeUpdate}
        dayOfWeek={dayOfWeek}
      />
      <StudentList
        students={students}
        onStudentSelect={(student) => {
          setSelectedStudent(student);
          setIsModalOpen(true);
        }}
        teacherId={teacherId} // teacherId を StudentList に渡す
        dayOfWeek={dayOfWeek} // dayOfWeek を StudentList に渡す
      />
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <StudentRegister
            onRegister={async (studentName, subjectAndGrade, time) => {
              const newStudentData = {
                studentName,
                subjectAndGrade,
                time,
              };
              try {
                const newStudent = await saveStudent(
                  teacherId,
                  dayOfWeek,
                  newStudentData
                );
                setStudents([...students, newStudent]); // firestoreId を含む新しい生徒を追加
                setIsModalOpen(false);
              } catch (error) {
                console.error("Failed to register new student:", error);
              }
            }}
            initialData={selectedStudent}
          />
        </Modal>
      )}
      <AddButton
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)",
        }} // ホバー時に影を追加
        transition={{ duration: 0.3 }} // アニメーションの持続時間を設定
        onClick={handleAddButtonClick}
      >
        +
      </AddButton>
    </DayContainer>
  );
};

export default DayStudentSchedule;
