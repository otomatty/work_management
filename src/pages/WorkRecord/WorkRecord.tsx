import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { getTeacher } from "../../firebase";
import { useDispatch } from "react-redux";
import { setTeacherId } from "../../redux/teacher/teacherSlice";

import Calendar from "./Calendar";
import Header from "../../components/organisms/Header";
import MonthNavigation from "./MonthNavigation";
import MonthlySummary from "./MonthlySummary"; // New component imported
import SectionContainer from "../../components/layout/SectionContainer";

interface WorkRecordProps {
  selectedTeacherId: string;
}

const Container = styled.div`
  margin: 0;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto 600px auto;
`;

const CalenderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 60px 10px 20px;
  border-radius: 8px;
  box-sizing: border-box;
`;

const WorkRecord: React.FC<WorkRecordProps> = ({ selectedTeacherId }) => {
  const [teacherName, setTeacherName] = useState("");

  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    if (selectedTeacherId) {
      const name = await getTeacher(selectedTeacherId);
      setTeacherName(name);
      dispatch(setTeacherId(selectedTeacherId));
    }
  }, [selectedTeacherId, dispatch]);

  useEffect(() => {
    fetchData();
  }, [selectedTeacherId, fetchData]);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // Months are zero-based, so add 1

  return (
    <Container>
      <SectionContainer>
        <Header />
      </SectionContainer>
      <SectionContainer>
        <CalenderInfo>
          <div>
            <h2>勤務記録票 - {teacherName}</h2>
            <MonthNavigation />
          </div>
          <MonthlySummary
            teacherId={selectedTeacherId}
            year={currentYear}
            month={currentMonth}
          />
        </CalenderInfo>
      </SectionContainer>
      <Calendar />
    </Container>
  );
};

export default WorkRecord;
