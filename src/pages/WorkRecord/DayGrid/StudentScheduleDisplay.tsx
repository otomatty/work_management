import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchStudentsForWorkRecords } from "../../../firebase/firestoreFunctions";
import { Student } from "../../../types";
import Section from "../../../components/layout/SectionComponent";
import Tooltip from "../../../components/atoms/Tooltip";
import ModalSubTitle from "../../../components/atoms/ModalSubTitle";

interface StudentScheduleDisplayProps {
  teacherId: string;
  dayOfWeek: string;
  year: number;
  month: number;
  day: number;
}
const TitleContainer = styled.div`
  display: flex;
`;

const StyledTable = styled.table`
  width: 50%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const StyledTh = styled.th`
  background-color: #f4f4f4;
  color: #333;
  font-weight: bold;
  padding: 8px;
`;

const StyledTd = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
  text-align: center;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const StudentScheduleDisplay: React.FC<StudentScheduleDisplayProps> = ({
  teacherId,
  dayOfWeek,
  year,
  month,
  day,
}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAndSaveStudents = async () => {
      setLoading(true);
      try {
        const fetchedStudents = await fetchStudentsForWorkRecords(
          teacherId,
          year,
          month,
          day
        );
        setStudents(fetchedStudents);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
      setLoading(false);
    };

    fetchAndSaveStudents();
  }, [teacherId, year, month, day]); // dayOfWeek は不要なので削除

  if (loading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  return (
    <Section marginBottom="30px">
      <TitleContainer>
        <ModalSubTitle>担当生徒</ModalSubTitle>
        <Tooltip
          text="「業務内容」から変更してください。"
          linkText="業務内容はこちら"
          href="weekStudentSchedule"
        />
      </TitleContainer>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>生徒名</StyledTh>
            <StyledTh>科目・学年</StyledTh>
            <StyledTh>時間</StyledTh>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <StyledTd>{student.studentName}</StyledTd>
              <StyledTd>{student.subjectAndGrade}</StyledTd>
              <StyledTd>{student.time}</StyledTd>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Section>
  );
};
export default StudentScheduleDisplay;
