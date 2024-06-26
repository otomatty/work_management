import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CellComponent from "../../../components/atoms/AnimatedCell/AnimatedCell";
import WorkDescriptionDisplay from "./WorkDescriptionDisplay";
import ClassroomDisplay from "./ClassroomDisplay";
import WorkTimesDisplay from "./WorkTimesDisplay";
import { WorkRecord } from "../../../types";
import { RootState } from "../../../redux/store";
import { fetchWorkRecordsRequest } from "../../../redux/actions";

const Wrapper = styled.div<{ $isSaturday: boolean; $isSunday: boolean }>`
  border-radius: 8px;
  border: 2px solid
    ${(props) =>
      props.$isSaturday ? "#c3f0ff" : props.$isSunday ? "#ffd8df" : "#f0f0f0"};
  height: 100%;
  box-sizing: border-box;
`;

const Daybox = styled.div<{ $isSaturday: boolean; $isSunday: boolean }>`
  background-color: ${(props) =>
    props.$isSaturday ? "#c3f0ff" : props.$isSunday ? "#ffd8df" : "#f0f0f0"};
  padding: 4px;
  margin-bottom: 10px;
`;

const Day = styled.h4`
  text-align: center;
  margin: 0 auto;
`;

const InfoBox = styled.div`
  padding: 0 10px 10px 10px;
`;

const Title = styled.span`
  display: block;
  text-align: left;
  font-size: 0.8rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const Td = styled.td<{ $status: string }>`
  padding: 4px;
  color: ${(props) =>
    props.$status === "MU"
      ? "red"
      : props.$status === "休み"
        ? "blue"
        : "black"};
`;

const formatGradeAndTime = (grade: string, time: number) => {
  const gradeMap: { [key: string]: string } = {
    年少: "年少",
    年中: "年中",
    年長: "年長",
    小学1年: "小1",
    小学2年: "小2",
    小学3年: "小3",
    小学4年: "小4",
    小学5年: "小5",
    小学6年: "小6",
    中学1年: "中1",
    中学2年: "中2",
    中学3年: "中3",
    高校1年: "高1",
    高校2年: "高2",
    高校3年: "高3",
    社会人: "Ad",
  };

  return `${gradeMap[grade] || grade} (${time}分)`;
};

interface DayCellProps {
  day: number;
  isSaturday: boolean;
  isSunday: boolean;
  year: number;
  month: number;
  workRecords: WorkRecord;
  onEdit: () => void;
}

const DayCell: React.FC<DayCellProps> = ({
  day,
  isSaturday,
  isSunday,
  year,
  month,
  workRecords,
  onEdit,
}) => {
  const dispatch = useDispatch();
  const teacherId = useSelector((state: RootState) => state.teacher.teacherId);
  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (teacherId) {
      dispatch(fetchWorkRecordsRequest(teacherId, year, month, day));
    }
  }, [dispatch, teacherId, year, month, day]);

  const handleClick = () => {
    if (cellRef.current) {
      cellRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      onEdit();
    }
  };

  return (
    <div ref={cellRef} onClick={handleClick}>
      <CellComponent>
        <Wrapper $isSaturday={isSaturday} $isSunday={isSunday}>
          <Daybox $isSaturday={isSaturday} $isSunday={isSunday}>
            <Day>{day}</Day>
          </Daybox>
          <InfoBox>
            <ClassroomDisplay classroom={workRecords?.classroom || ""} />
            <WorkTimesDisplay
              teachTime={workRecords?.teachTime || 0}
              officeTime={workRecords?.officeTime || 0}
            />
            <div>
              <Title>レッスン内容</Title>
              <Table>
                <tbody>
                  {workRecords?.lessonInfo?.map((lessonInfo, index) => (
                    <Tr key={index}>
                      <Td $status={lessonInfo.status}>
                        {lessonInfo.studentName}
                      </Td>
                      <Td $status={lessonInfo.status}>
                        {formatGradeAndTime(lessonInfo.grade, lessonInfo.time)}
                      </Td>

                      <Td $status={lessonInfo.status}>{lessonInfo.status}</Td>
                    </Tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <WorkDescriptionDisplay
              description={workRecords?.workDescription || ""}
            />
          </InfoBox>
        </Wrapper>
      </CellComponent>
    </div>
  );
};

export default DayCell;
