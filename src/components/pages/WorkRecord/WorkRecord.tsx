import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Calendar from "./Calendar";
import Header from "../../layouts/Header";
import CalendarHeader from "./CalendarHeader"; // CalendarHeaderをインポート
import { fetchTeacherNameById } from "../../../firebase/firestoreFunctions";

interface WorkRecordProps {
  selectedTeacherId: string;
}

const Container = styled.div`
  margin: 0;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto 600px auto;
`;

// const HeaderWrapper = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
// `;

const CalenderInfo = styled.div`
  margin: 20px auto 20px auto;
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const WorkRecord: React.FC<WorkRecordProps> = ({ selectedTeacherId }) => {
  const [teacherName, setTeacherName] = useState("");
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  // const [direction, setDirection] = useState(0);

  useEffect(() => {
    const fetchName = async () => {
      const name = await fetchTeacherNameById(selectedTeacherId);
      setTeacherName(name);
    };

    if (selectedTeacherId) {
      fetchName();
    }
  }, [selectedTeacherId]);

  return (
    <Container>
      <Header />
      <CalenderInfo>
        <h2>勤務記録票 - {teacherName}</h2>
        <CalendarHeader currentYear={currentYear} currentMonth={currentMonth} />
      </CalenderInfo>
      <Calendar
        teacherId={selectedTeacherId}
        currentYear={currentYear}
        currentMonth={currentMonth}
      />
    </Container>
  );
};

export default WorkRecord;
