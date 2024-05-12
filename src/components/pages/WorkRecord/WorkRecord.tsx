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
  margin-bottom: 600px;
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
      <Header title={`勤務記録 - ${teacherName}`} />
      <CalendarHeader currentYear={currentYear} currentMonth={currentMonth} />
      <Calendar
        teacherId={selectedTeacherId}
        currentYear={currentYear}
        currentMonth={currentMonth}
      />
    </Container>
  );
};

export default WorkRecord;
