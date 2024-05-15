import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { StudentChangeInfo } from "../../../types";
import { fetchTeachHour } from "../../../firebase";
import { useDispatch } from "react-redux";
import { setWorkHours } from "../../../store";
import WorkTimeInputs from "./WorkTimeInput";
import StudentInputList from "./StudentInputList";
import WorkDescriptionInput from "./WorkDescriptionInput";
import StudentScheduleDisplay from "./StudentScheduleDisplay";
import ClassroomManager from "./ClassroomManager"; // ClassroomManager component imported
import Button from "../../../components/atoms/Button";

interface DayEditPanelProps {
  teacherId: string;
  year: number;
  month: number;
  day: number;
  startTime: string;
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
  endTime: string;
  setEndTime: React.Dispatch<React.SetStateAction<string>>;
  studentsChangeInfo: StudentChangeInfo[];
  setStudentsChangeInfo: React.Dispatch<
    React.SetStateAction<StudentChangeInfo[]>
  >;
  workDescription: string;
  setWorkDescription: React.Dispatch<React.SetStateAction<string>>;
  onSave: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  style: React.CSSProperties;
  slideDirection: number;
}

const EditPanelContainer = styled(motion.div)<{ style: React.CSSProperties }>`
  background-color: white;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  grid-column: ${(props) => props.style.gridColumn};
  grid-row: ${(props) => props.style.gridRow};
  overflow: hidden;
`;

const InputArea = styled.div`
  width: 50%;
`;

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  slide: (direction: number) => ({
    x: [direction * 500, 0],
    opacity: [0, 1],
    height: "auto",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.5,
    },
  }),
};

const DayEditPanel: React.FC<DayEditPanelProps> = ({
  teacherId,
  year,
  month,
  day,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  studentsChangeInfo,
  setStudentsChangeInfo,
  workDescription,
  setWorkDescription,
  style,
  slideDirection,
}) => {
  const dispatch = useDispatch(); // ディスパッチ関数を取得

  // 日付から曜日を計算
  const date = new Date(year, month, day); // JavaScript の月は 0 から始まるため、month - 1 が必要
  const dayOfWeek = date.toLocaleString("en-us", { weekday: "long" });

  const onSave = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    try {
      const workHours = await fetchTeachHour(teacherId, year, month, day);
      // Redux ストアを更新するアクションをディスパッチ
      dispatch(setWorkHours(workHours));
    } catch (error) {
      console.error("Failed to fetch work hours:", error);
    }
  };

  return (
    <AnimatePresence>
      <EditPanelContainer
        style={style}
        variants={containerVariants}
        initial="hidden"
        animate={slideDirection !== 0 ? "slide" : "visible"}
        exit="exit"
        custom={slideDirection}
        layout
      >
        <h3>{day}日</h3>

        <InputArea>
          <ClassroomManager
            teacherId={teacherId}
            year={year}
            month={month}
            day={day}
          />
          <WorkTimeInputs
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
          />
          <StudentScheduleDisplay
            teacherId={teacherId}
            dayOfWeek={dayOfWeek}
            year={year}
            month={month}
            day={day}
          />
          <StudentInputList
            teacherId={teacherId}
            year={year}
            month={month}
            day={day}
            studentChangeInfo={studentsChangeInfo}
            setStudentChangeInfo={setStudentsChangeInfo}
          />
          <WorkDescriptionInput
            value={workDescription}
            onChange={(e) => setWorkDescription(e.target.value)}
          />
          <Button label="保存" onClick={onSave} />
        </InputArea>
      </EditPanelContainer>
    </AnimatePresence>
  );
};

export default DayEditPanel;
