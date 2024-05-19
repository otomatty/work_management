import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getTeacher } from "../../firebase";
import { useDispatch } from "react-redux";
import { setTeacherId } from "../../redux/teacher/teacherSlice";

import Calendar from "./Calendar";
import Header from "../../components/organisms/Header";
import MonthNavigation from "./MonthNavigation";

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

  // const [direction, setDirection] = useState(0);

  useEffect(() => {
    const fetchName = async () => {
      const name = await getTeacher(selectedTeacherId);
      setTeacherName(name);
    };

    if (selectedTeacherId) {
      fetchName();
    }
  }, [selectedTeacherId]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedTeacherId) {
      dispatch(setTeacherId(selectedTeacherId));
      // console.log("Dispatched setTeacherId with:", selectedTeacherId); // デバッグ用ログ
    }
  }, [selectedTeacherId, dispatch]);

  return (
    <Container>
      <Header />
      <CalenderInfo>
        <h2>勤務記録票 - {teacherName}</h2>
        <MonthNavigation />
      </CalenderInfo>
      <Calendar />
    </Container>
  );
};

export default WorkRecord;
