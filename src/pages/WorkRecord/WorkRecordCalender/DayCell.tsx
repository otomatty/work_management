import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CellComponent from "../../../components/atoms/AnimatedCell";
import WorkDescriptionDisplay from "./WorkDescriptionDisplay";
import ClassroomDisplay from "./ClassroomDisplay";
import WorkHoursDisplay from "./WorkHoursDisplay"; // New component imported
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

interface DayCellProps {
  day: number;
  isSaturday: boolean;
  isSunday: boolean;
  year: number;
  month: number;
  onEdit: () => void;
}

const DayCell: React.FC<DayCellProps> = ({
  day,
  isSaturday,
  isSunday,
  year,
  month,
  onEdit,
}) => {
  const dispatch = useDispatch();
  const teacherId = useSelector((state: RootState) => state.teacher.teacherId);
  const dateKey = `${year}-${month}-${day}`;
  const workRecord = useSelector(
    (state: RootState) => state.workRecords.workRecords[dateKey]
  );
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
            <ClassroomDisplay classroom={workRecord?.classroom || ""} />
            <WorkHoursDisplay
              teachHour={workRecord?.teachHour || 0}
              officeHour={workRecord?.officeHour || 0}
            />
            <div>
              <Title>レッスン内容</Title>
              <Table>
                <tbody>
                  {workRecord?.lessonInfo?.map((lessonInfo, index) => (
                    <Tr key={index}>
                      <Td $status={lessonInfo.status}>
                        {lessonInfo.studentName}
                      </Td>
                      <Td $status={lessonInfo.status}>{lessonInfo.status}</Td>
                      <Td $status={lessonInfo.status}>{lessonInfo.time}</Td>
                    </Tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <WorkDescriptionDisplay
              description={workRecord?.workDescription || ""}
            />
          </InfoBox>
        </Wrapper>
      </CellComponent>
    </div>
  );
};

export default DayCell;
