import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { setMonthlyWorkHours } from "../../../firebase/firestoreFunctions";
import { StudentChangeInfo } from "../../../types";
import { fetchWorkRecord } from "../../../firebase/firestoreFunctions";
import DayCell from "./DayCell";
import DayEditPanel from "./DayEditPanel";
import Toolbar from "./Toolbar";

interface DaysGridProps {
  teacherId: string;
  days: number[];
  year: number;
  month: number;
}

const Container = styled.div`
  margin: 20px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  margin: 0 8px 0 4px;
`;

const calculateRowForEditDay = (editDay: number, days: number[]): number => {
  const dayIndex = days.findIndex((day) => day === editDay);
  return Math.floor(dayIndex / 7) + 2;
};

const DaysGrid: React.FC<DaysGridProps> = ({
  teacherId,
  days,
  year,
  month,
}) => {
  const [dataVersion, setDataVersion] = useState(0);

  const [editDay, setEditDay] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [studentsChangeInfo, setStudentsChangeInfo] = useState<
    StudentChangeInfo[]
  >([]);
  const [workDescription, setWorkDescription] = useState<string>("");
  const [slideDirection, setSlideDirection] = useState(0); // スライド方向の状態を追加
  const [isLoading, setIsLoading] = useState(false); // ローディング状態を追加
  const [message, setMessage] = useState(""); // メッセージ表示用の状態を追加

  useEffect(() => {
    if (editDay !== null) {
      // Additional logic can be placed here if needed when editDay changes
    }
  }, [editDay]);

  const handleSave = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    console.log("Save data");
    setDataVersion((prev) => prev + 1); // データを保存した後、dataVersion を更新
  };

  const handleSetMonthlySchedule = async () => {
    try {
      await setMonthlyWorkHours(teacherId, year, month);
      console.log("Monthly schedule set for all days");
      setDataVersion((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to set monthly schedule:", error);
    }
  };

  const handleBulkDelete = async () => {
    try {
      // ここに一括削除のロジックを実装
      console.log("Bulk delete executed");
      setDataVersion((prev) => prev + 1); // データのバージョンを更新してUIをリフレッシュ
    } catch (error) {
      console.error("Failed to bulk delete:", error);
    }
  };

  const handleEditDay = async (day: number) => {
    if (editDay === day) {
      setEditDay(null); // 同じ日が再度クリックされた場合、editDayをnullに設定して折りたたむ
    } else {
      const currentRow =
        editDay !== null
          ? Math.floor(days.findIndex((d) => d === editDay) / 7)
          : -1;
      const newRow = Math.floor(days.findIndex((d) => d === day) / 7);

      if (
        currentRow !== -1 &&
        newRow !== -1 &&
        currentRow === newRow &&
        editDay !== null
      ) {
        const direction = day > editDay ? 1 : -1;
        setSlideDirection(direction); // スライド方向を設定
        setEditDay(day); // 編集画面を閉じずに新しい日に更新
      } else {
        setEditDay(null);
        await new Promise((resolve) => setTimeout(resolve, 500)); // スクロールのための遅延
        const element = document.querySelector(`#day-${day}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          await new Promise((resolve) => setTimeout(resolve, 500)); // スクロール完了を待つ
        }
        setEditDay(day);
        setSlideDirection(0);
      }
      try {
        const workRecord = await fetchWorkRecord(teacherId, year, month, day);
        if (workRecord) {
          setStartTime(workRecord.startTime || "");
          setEndTime(workRecord.endTime || "");
          setStudentsChangeInfo(workRecord.studentsChangeInfo || []);
          setWorkDescription(workRecord.workDescription || "");
        } else {
          setStartTime("");
          setEndTime("");
          setStudentsChangeInfo([]);
          setWorkDescription("");
        }
      } catch (error) {
        console.error("Failed to fetch work record:", error);
        setStartTime("");
        setEndTime("");
        setStudentsChangeInfo([]);
        setWorkDescription("");
      }
    }
  };

  return (
    <Container>
      <TitleContainer>
        <Title>勤務記録表</Title>
      </TitleContainer>
      <Toolbar
        onBulkInsert={handleSetMonthlySchedule}
        onBulkDelete={handleBulkDelete}
        teacherId={teacherId}
        year={year} // 年を渡す
        month={month} // 月を渡す
      />
      <GridContainer>
        {days.map((day, index) => {
          const date = new Date(year, month, day);
          const dayOfWeek = date.getDay();
          const isEditDay = editDay === day;
          return (
            <React.Fragment key={index}>
              <DayCell
                day={day}
                isSaturday={dayOfWeek === 6}
                isSunday={dayOfWeek === 0}
                teacherId={teacherId}
                year={year}
                month={month}
                dataVersion={dataVersion}
                onEdit={() => handleEditDay(day)}
              />
              <AnimatePresence>
                {isEditDay && editDay !== null && (
                  <DayEditPanel
                    teacherId={teacherId}
                    year={year}
                    month={month}
                    key={editDay}
                    day={editDay}
                    startTime={startTime}
                    setStartTime={setStartTime}
                    endTime={endTime}
                    setEndTime={setEndTime}
                    studentsChangeInfo={studentsChangeInfo}
                    setStudentsChangeInfo={setStudentsChangeInfo}
                    workDescription={workDescription}
                    setWorkDescription={setWorkDescription}
                    onSave={handleSave}
                    style={{
                      gridColumn: "1 / -1",
                      gridRow: calculateRowForEditDay(editDay, days),
                    }}
                    slideDirection={slideDirection}
                  />
                )}
              </AnimatePresence>
            </React.Fragment>
          );
        })}
      </GridContainer>
    </Container>
  );
};

export default DaysGrid;
