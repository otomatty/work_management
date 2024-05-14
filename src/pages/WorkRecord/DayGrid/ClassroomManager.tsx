import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  fetchClassroomByDate,
  saveClassroomByDate,
} from "../../../firebase/firestoreFunctions";
import { useDispatch } from "react-redux";
import { setSelectedClassroom as setReduxSelectedClassroom } from "../../../store/classroomSlice";

interface ClassroomManagerProps {
  teacherId: string;
  year: number;
  month: number;
  day: number;
}

const Container = styled.div<{ dayOfWeek: string }>`
  margin: 10px 8px 0 8px;
  padding-bottom: 8px;
  border-bottom: ${({ dayOfWeek }) =>
    dayOfWeek === "Saturday"
      ? "2px solid #bbebfa"
      : dayOfWeek === "Sunday"
        ? "2px solid #ffd9df"
        : "2px solid #f0f0f0"};
`;

const Title = styled.span`
  display: block;
  text-align: left;
  font-size: 0.8rem;
  margin: 0 0 4px 8px;
`;

const StyledSelect = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    border-color 0.3s,
    box-shadow 0.3s;

  &:hover {
    border-color: #888;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    border-color: #0056b3;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    outline: none;
  }
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
      const classroom = await fetchClassroomByDate(teacherId, year, month, day);
      setSelectedClassroom(classroom);
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
    <Container dayOfWeek={dayOfWeek}>
      <Title>教室</Title>
      <StyledSelect
        value={selectedClassroom}
        onChange={(e) => handleSelectClassroom(e.target.value)}
      >
        <option value="">選択してください</option>
        <option value="Off">休み</option>
        <option value="Ofunato">大船渡</option>
        <option value="Takata">高田</option>
        <option value="TwoClassrooms">2教室</option>
      </StyledSelect>
    </Container>
  );
};

export default ClassroomManager;
