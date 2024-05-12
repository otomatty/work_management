import React, { useState } from "react";
import styled from "styled-components";
import NameSelector from "./NameSelector";
import Button from "../../../ui/Button";
import { useNavigate } from "react-router-dom";

const TeacherSelectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const TeacherSelection: React.FC = () => {
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(
    null,
  );
  const navigate = useNavigate();

  const handleTeacherSelect = (id: string) => {
    setSelectedTeacherId(id);
  };

  const handleCheckCurrentRecord = () => {
    if (selectedTeacherId) {
      navigate(`/work-record/${selectedTeacherId}`);
    }
  };

  return (
    <TeacherSelectBox>
      <NameSelector onSelect={handleTeacherSelect} />
      <Button
        label="今月の勤務記録表を確認する"
        onClick={handleCheckCurrentRecord}
      />
    </TeacherSelectBox>
  );
};

export default TeacherSelection;
