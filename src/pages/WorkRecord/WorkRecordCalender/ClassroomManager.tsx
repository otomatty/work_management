import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchClassroom, saveClassroomByDate } from "../../../firebase";
import { useDispatch } from "react-redux";
import { setSelectedClassroom as setReduxSelectedClassroom } from "../../../redux";
import ClassroomSelectBox from "../../../components/molecules/ClassroomSelectBox";

interface ClassroomManagerProps {
  teacherId: string;
  year: number;
  month: number;
  day: number;
}

const Container = styled.div<{ $dayOfWeek: string }>`
  margin-top: 10px;
  padding-bottom: 8px;
  border-bottom: ${({ $dayOfWeek }) =>
    $dayOfWeek === "Saturday"
      ? "2px solid #bbebfa"
      : $dayOfWeek === "Sunday"
        ? "2px solid #ffd9df"
        : "2px solid #f0f0f0"};
`;

const ClassroomManager: React.FC<ClassroomManagerProps> = ({
  teacherId,
  year,
  month,
  day,
}) => {
  const [selectedClassroom, setSelectedClassroom] = useState("");
  const dispatch = useDispatch();
  const dayOfWeek = `${year}-${month + 1}-${day}`;

  useEffect(() => {
    const loadClassroom = async () => {
      const dateIdentifier = `${year}-${month + 1}-${day.toString().padStart(2, "0")}`;
      const fetchedClassroom = await fetchClassroom(
        teacherId,
        dateIdentifier,
        false
      );
      setSelectedClassroom(fetchedClassroom);
    };

    loadClassroom();
  }, [teacherId, year, month, day]);

  const handleSelectClassroom = (classroom: string) => {
    setSelectedClassroom(classroom);
    saveClassroomByDate(teacherId, year, month, day, classroom).then(() => {
      const dateKey = `${year}-${month}-${day}`;
      dispatch(setReduxSelectedClassroom({ date: dateKey, classroom }));
    });
  };

  return (
    <Container $dayOfWeek={dayOfWeek}>
      <ClassroomSelectBox
        value={selectedClassroom}
        onChange={handleSelectClassroom}
      />
    </Container>
  );
};

export default ClassroomManager;
