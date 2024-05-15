import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setIsVisible } from "../../../store";
import { fetchWorkRecord, fetchClassroom } from "../../../firebase";
import { StudentChangeInfo } from "../../../types";
import CellComponent from "../../../components/atoms/AnimatedCell";
import WorkDescriptionDisplay from "./WorkDescriptionDisplay";
import ClassroomDisplay from "./ClassroomDisplay";

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

const Time = styled.time`
  display: inline-block;
  font-size: 1.6rem;
  font-weight: bold;
  margin: 4px 0;
  height: 2.4rem;
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

interface DayCellProps {
  day: number;
  isSaturday: boolean;
  isSunday: boolean;
  teacherId: string;
  year: number;
  month: number;
  dataVersion: number;
  onEdit: () => void;
}

const DayCell: React.FC<DayCellProps> = ({
  day,
  isSaturday,
  isSunday,
  teacherId,
  year,
  month,
  dataVersion,
  onEdit,
}) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [studentsChangeInfo, setStudentsChangeInfo] = useState<
    StudentChangeInfo[]
  >([{ studentName: "", status: "", time: "" }]);
  const [workDescription, setWorkDescription] = useState("");
  const cellRef = useRef<HTMLDivElement>(null);
  const [weekday, setWeekday] = useState("");
  const dispatch = useDispatch();
  const [classroom, setClassroom] = useState(""); // classroom 状態を追加

  useEffect(() => {
    const date = new Date(year, month, day);
    const weekdayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    setWeekday(weekdayNames[date.getDay()]);
    const loadData = async () => {
      const workRecord = await fetchWorkRecord(teacherId, year, month, day);
      if (workRecord) {
        setStartTime(workRecord.startTime || "");
        setEndTime(workRecord.endTime || "");
        const formattedStudentsChangeInfo =
          workRecord.studentsChangeInfo?.map((studentChangeInfo) => ({
            studentName: studentChangeInfo.studentName,
            status: studentChangeInfo.status,
            time: studentChangeInfo.time,
          })) || [];
        setStudentsChangeInfo(formattedStudentsChangeInfo);
        setWorkDescription(workRecord.workDescription || "");
      }
    };
    loadData();
  }, [teacherId, year, month, day, dataVersion]);

  useEffect(() => {
    const loadClassroom = async () => {
      const dateIdentifier = `${year}-${month + 1}-${day.toString().padStart(2, "0")}`;
      const fetchedClassroom = await fetchClassroom(
        teacherId,
        dateIdentifier,
        false
      );
      setClassroom(fetchedClassroom);
    };

    loadClassroom();
  }, [teacherId, year, month, day, dataVersion]); // 依存関係に dataVersion を追加

  const handleClick = () => {
    dispatch(setIsVisible(true));
    if (cellRef.current) {
      cellRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        onEdit();
      }, 500);
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
            <ClassroomDisplay
              teacherId={teacherId}
              year={year}
              month={month}
              day={day}
              classroom={classroom} // 状態から classroom を渡す
            />
            <div>
              <Title>出勤時間</Title>
              <Time>{startTime || ""}</Time>
            </div>
            <div>
              <Title>退勤時間</Title>
              <Time>{endTime || ""}</Time>
            </div>
            <div>
              <Title>レッスン変更</Title>
              <Table>
                <tbody>
                  {studentsChangeInfo.map((studentChangesInfo, index) => (
                    <Tr key={index}>
                      <Td $status={studentChangesInfo.status}>
                        {studentChangesInfo.studentName}
                      </Td>
                      <Td $status={studentChangesInfo.status}>
                        {studentChangesInfo.status}
                      </Td>
                      <Td $status={studentChangesInfo.status}>
                        {studentChangesInfo.time}
                      </Td>
                    </Tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <WorkDescriptionDisplay description={workDescription} />
          </InfoBox>
        </Wrapper>
      </CellComponent>
    </div>
  );
};

export default DayCell;
