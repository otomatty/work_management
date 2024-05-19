import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import WorkTimeInputs from "./WorkTimeInput";
import LessonInputList from "./LessonInputList";
import WorkDescriptionInput from "./WorkDescriptionInput";
import ClassroomManager from "./ClassroomManager";
import Button from "../../../components/atoms/Button";
import { RootState } from "../../../redux/store";
import {
  fetchWorkRecordsRequest,
  saveWorkRecordRequest,
} from "../../../redux/actions";
import { LessonInfo } from "../../../types";

interface DayEditPanelProps {
  year: number;
  month: number;
  day: number;
  style: React.CSSProperties;
  slideDirection: number;
}

const EditPanelContainer = styled(motion.div)<{ style: React.CSSProperties }>`
  background-color: white;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 10px;
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
  year,
  month,
  day,
  style,
  slideDirection,
}) => {
  const dispatch = useDispatch();
  const teacherId = useSelector((state: RootState) => state.teacher.teacherId);
  const workRecord = useSelector(
    (state: RootState) =>
      state.workRecords.workRecords[`${year}-${month}-${day}`]
  );

  const [classroom, setClassroom] = useState(workRecord?.classroom || "");
  const [startTime, setStartTime] = useState(workRecord?.startTime || "");
  const [endTime, setEndTime] = useState(workRecord?.endTime || "");
  const [lessonInfo, setLessonInfo] = useState(workRecord?.lessonInfo || []);
  const [workDescription, setWorkDescription] = useState(
    workRecord?.workDescription || ""
  );

  useEffect(() => {
    if (teacherId) {
      dispatch(fetchWorkRecordsRequest(teacherId, year, month, day));
    }
  }, [dispatch, teacherId, year, month, day]);

  useEffect(() => {
    if (workRecord) {
      setClassroom(workRecord.classroom);
      setStartTime(workRecord.startTime);
      setEndTime(workRecord.endTime);
      setLessonInfo(workRecord.lessonInfo);
      setWorkDescription(workRecord.workDescription);
    }
  }, [workRecord]);

  const saveLessonInfo = async (
    teacherId: string,
    year: number,
    month: number,
    day: number,
    lessonInfo: LessonInfo[]
  ) => {
    try {
      const updatedWorkRecord = {
        classroom,
        startTime,
        endTime,
        lessonInfo,
        workDescription,
        officeHour: workRecord?.officeHour || "", // Added
        teachHour: workRecord?.teachHour || "", // Added
      };
      dispatch(
        saveWorkRecordRequest(teacherId, year, month, day, {
          ...updatedWorkRecord,
          officeHour: Number(workRecord?.officeHour) || 0,
          teachHour: Number(workRecord?.teachHour) || 0,
        })
      );
    } catch (error) {
      console.error("Failed to save lesson info:", error);
    }
  };

  const onSave = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    if (!teacherId) {
      console.error("Teacher ID is null");
      return;
    }
    try {
      const updatedWorkRecord = {
        classroom,
        startTime,
        endTime,
        lessonInfo,
        workDescription,
        officeHour: workRecord?.officeHour || "", // Added
        teachHour: workRecord?.teachHour || "", // Added
      };
      dispatch(
        saveWorkRecordRequest(teacherId, year, month, day, {
          ...updatedWorkRecord,
          officeHour: Number(workRecord?.officeHour) || 0,
          teachHour: Number(workRecord?.teachHour) || 0,
        })
      );
    } catch (error) {
      console.error("Failed to save work record:", error);
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
          <ClassroomManager classroom={classroom} setClassroom={setClassroom} />
          <WorkTimeInputs
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
          />

          <LessonInputList
            lessonInfo={lessonInfo}
            setLessonInfo={setLessonInfo}
            saveLessonInfo={saveLessonInfo}
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
