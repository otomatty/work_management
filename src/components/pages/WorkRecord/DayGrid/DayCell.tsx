import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setIsVisible } from "../../../../store/workRecordSlice";
import styled from "styled-components";
import CellComponent from "../../../ui/AnimatedCell";
import WorkDescriptionDisplay from "./WorkDescriptionDisplay";
import { StudentChangeInfo } from "../../../../types";
import { fetchWorkRecord } from "../../../../firebase/firestoreFunctions"; // 関数をインポート

const Wrapper = styled.div<{ $isSaturday: boolean; $isSunday: boolean }>`
  border-radius: 8px;
  border: 2px solid
    ${(props) =>
      props.$isSaturday ? "#ADD8E6" : props.$isSunday ? "#FFC0CB" : "#f0f0f0"};
  height: 100%;
  box-sizing: border-box;
`;

const Daybox = styled.div<{ $isSaturday: boolean; $isSunday: boolean }>`
  background-color: ${(props) =>
    props.$isSaturday ? "#ADD8E6" : props.$isSunday ? "#FFC0CB" : "#f0f0f0"};
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
  teacherId: string; // 教師IDを追加
  year: number; // 年を追加
  month: number; // 月を追加
  dataVersion: number; // データバージョンを受け取る
  onEdit: () => void;
}

const DayCell: React.FC<DayCellProps> = ({
  day,
  isSaturday,
  isSunday,
  teacherId,
  year,
  month,
  dataVersion, // データバージョンを受け取る
  onEdit,
}) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [studentsChangeInfo, setStudentsChangeInfo] = useState<
    StudentChangeInfo[]
  >([{ studentName: "", status: "", time: "" }]);
  const [workDescription, setWorkDescription] = useState("");
  const cellRef = useRef<HTMLDivElement>(null); // refを作成
  const [weekday, setWeekday] = useState(""); // 曜日を保存するための state

  useEffect(() => {
    const date = new Date(year, month, day); // 月は0から始まるため、month - 1 が必要
    const weekdayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    setWeekday(weekdayNames[date.getDay()]); // 曜日を設定
    const loadData = async () => {
      const workRecord = await fetchWorkRecord(teacherId, year, month, day);
      if (workRecord) {
        setStartTime(workRecord.startTime || "");
        setEndTime(workRecord.endTime || "");
        // students データを StudentInfo 型に変換
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
  }, [teacherId, year, month, day, dataVersion]); // dataVersion が変更されたときに再フェッチ

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setIsVisible(true)); // isVisible を true に設定
    if (cellRef.current) {
      cellRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        onEdit(); // スクロール完了後に onEdit を呼び出す
      }, 500); // スムーススクロールの時間を考慮して遅延を設定
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
