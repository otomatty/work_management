import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ClassroomSelectBox from "../../../components/molecules/ClassroomSelectBox";

interface ClassroomManagerProps {
  classroom: string;
  setClassroom: (classroom: string) => void;
}

const Container = styled.div`
  margin-top: 10px;
  padding-bottom: 8px;
`;

const ClassroomManager: React.FC<ClassroomManagerProps> = ({
  classroom,
  setClassroom,
}) => {
  const [selectedClassroom, setSelectedClassroom] = useState(classroom);

  useEffect(() => {
    setSelectedClassroom(classroom);
  }, [classroom]);

  const handleSelectClassroom = (classroom: string) => {
    setSelectedClassroom(classroom);
    setClassroom(classroom);
  };

  return (
    <Container>
      <ClassroomSelectBox
        value={selectedClassroom}
        onChange={handleSelectClassroom}
      />
    </Container>
  );
};

export default ClassroomManager;
