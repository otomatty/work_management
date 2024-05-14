import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const Container = styled.div`
  width: 50%;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
`;

interface WorkHoursPanelProps {
  teacherId: string;
  year: number;
  month: number;
  day: number;
}

const WorkHoursPanel: React.FC<WorkHoursPanelProps> = ({
  teacherId,
  year,
  month,
  day,
}) => {
  const workHours = useSelector((state: RootState) => state.workHours);

  return (
    <Container>
      <p>教務時間: {workHours.teachingHours} 分</p>
      <p>事務時間: {workHours.adminHours} 分</p>
    </Container>
  );
};

export default WorkHoursPanel;
