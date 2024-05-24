import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import WorkTimeInputs from "./WorkTimeInput";
import LessonInputList from "./LessonInputList";
import WorkDescriptionInput from "./WorkDescriptionInput";
import ClassroomManager from "./ClassroomManager";
import Button from "../../../components/atoms/Button";
import Snackbar from "../../../components/atoms/Snackbar/Snackbar"; // スナックバーのインポート
import { RootState } from "../../../redux/store";
import { fetchWorkRecordsRequest } from "../../../redux/actions";
import { LessonInfo, WorkRecord } from "../../../types";
import { updateWorkRecord as updateWorkRecordInFirestore } from "../../../firebase/teachers/workRecords/workRecords"; // 名前変更
import { updateWorkRecord } from "../../../redux/teacher/workRecordsSlice"; // 追加

interface DayEditPanelProps {
  year: number;
  month: number;
  day: number;
  workRecords: WorkRecord[];
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
  workRecords,
  style,
  slideDirection,
}) => {
  const dispatch = useDispatch();
  const teacherId = useSelector((state: RootState) => state.teacher.teacherId);

  const [classroom, setClassroom] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [lessonInfo, setLessonInfo] = useState<LessonInfo[]>([]);
  const [workDescription, setWorkDescription] = useState("");
  const [isSnackbarVisible, setSnackbarVisible] = useState(false); // スナックバーの表示状態を管理するステート

  useEffect(() => {
    if (teacherId) {
      dispatch(fetchWorkRecordsRequest(teacherId, year, month, day));
    }
  }, [dispatch, teacherId, year, month, day]);

  useEffect(() => {
    if (workRecords.length > 0) {
      const workRecord = workRecords[0];
      setClassroom(workRecord.classroom);
      setStartTime(workRecord.startTime);
      setEndTime(workRecord.endTime);
      setLessonInfo(workRecord.lessonInfo);
      setWorkDescription(workRecord.workDescription);
    }
  }, [workRecords]);

  const getDayOfWeek = (year: number, month: number, day: number): string => {
    const date = new Date(year, month, day); // 月は0から始まるため、1を引く
    const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
    return daysOfWeek[date.getDay()];
  };

  const onSave = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    console.log("保存ボタンが押されました");
    if (!teacherId) {
      console.error("Teacher ID is null");
      return;
    }
    try {
      // lessonInfoからtimeを合計してteachTimeを計算
      const teachTime = lessonInfo.reduce((total, lesson) => {
        if (lesson.status === "通常" || lesson.status === "MU") {
          return total + lesson.time;
        } else if (lesson.status === "休み") {
          return total - lesson.time;
        }
        return total;
      }, 0);

      // startTimeとendTimeからofficeTimeを計算
      const [startHour, startMinute] = startTime.split(":").map(Number);
      const [endHour, endMinute] = endTime.split(":").map(Number);
      const totalOfficeTime =
        endHour * 60 + endMinute - (startHour * 60 + startMinute); // 分に変換
      const officeTime = totalOfficeTime - teachTime; // teachTimeを引く

      const updatedWorkRecord = {
        classroom,
        startTime,
        endTime,
        lessonInfo,
        workDescription,
        officeTime,
        teachTime,
      };
      console.log("保存するデータ:", updatedWorkRecord);
      await updateWorkRecordInFirestore(
        teacherId,
        year,
        month,
        day,
        updatedWorkRecord
      );
      dispatch(
        updateWorkRecord({
          day: day.toString().padStart(2, "0"),
          workRecord: updatedWorkRecord,
        })
      );
    } catch (error) {
      console.error("Failed to save work record:", error);
    }
  };

  // 各入力フィールドの変更時にスナックバーを表示するロジックを追加
  useEffect(() => {
    const hasChanges =
      workRecords.length > 0 &&
      (workRecords[0].classroom !== classroom ||
        workRecords[0].startTime !== startTime ||
        workRecords[0].endTime !== endTime ||
        JSON.stringify(workRecords[0].lessonInfo) !==
          JSON.stringify(lessonInfo) ||
        workRecords[0].workDescription !== workDescription);
    setSnackbarVisible(hasChanges);
  }, [workRecords, classroom, startTime, endTime, lessonInfo, workDescription]);

  // 保存ボタンを押したときにスナックバーを非表示にするロジックを追加
  const handleSave = () => {
    onSave();
    setSnackbarVisible(false);
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
        <h3>
          {day}日 ({getDayOfWeek(year, month, day)})
        </h3>

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
          />
          <WorkDescriptionInput
            value={workDescription}
            onChange={(e) => setWorkDescription(e.target.value)}
          />
          <Button label="保存" onClick={handleSave} />
        </InputArea>
      </EditPanelContainer>
      <Snackbar
        message="保存してください"
        isVisible={isSnackbarVisible}
        onClose={() => setSnackbarVisible(false)}
      />
    </AnimatePresence>
  );
};

export default DayEditPanel;
