import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ClassroomSelectBox from "../../../components/molecules/ClassroomSelectBox";

interface ClassroomSelectProps {
  dayOfWeek: string;
  classroom: string;
  onClassroomChange: (classroom: string) => void;
}

const Container = styled.div<{ $dayOfWeek: string }>`
  margin: 10px 8px 0 8px;
  padding-bottom: 8px;
  border-bottom: ${({ $dayOfWeek }) =>
    $dayOfWeek === "Saturday"
      ? "2px solid #bbebfa"
      : $dayOfWeek === "Sunday"
        ? "2px solid #ffd9df"
        : "2px solid #f0f0f0"};
`;

const Title = styled.span`
  display: block;
  text-align: left;
  font-size: 0.8rem;
  margin: 0 0 4px 8px;
`;

const ClassroomSelect: React.FC<ClassroomSelectProps> = ({
  dayOfWeek,
  classroom,
  onClassroomChange,
}) => {
  const [selectedClassroom, setSelectedClassroom] = useState(classroom);

  useEffect(() => {
    setSelectedClassroom(classroom);
  }, [classroom]);

  const handleSelectClassroom = (classroom: string) => {
    setSelectedClassroom(classroom);
    onClassroomChange(classroom);
  };

  return (
    <Container $dayOfWeek={dayOfWeek}>
      <Title>教室</Title>
      <ClassroomSelectBox
        value={selectedClassroom}
        onChange={handleSelectClassroom}
      />
    </Container>
  );
};

export default ClassroomSelect;
