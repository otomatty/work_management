import React, { useState, useEffect } from "react";
import { fetchClassroom } from "../../../firebase";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface ClassroomDisplayProps {
  teacherId: string;
  year: number;
  month: number;
  day: number;
  classroom: string;
}

// 教室名に基づいて背景色を決定するヘルパー関数
const getClassroomColor = (classroom: string): string => {
  switch (classroom) {
    case "Off":
      return "#318512";
    case "Ofunato":
      return "#d62020";
    case "Takata":
      return "#3b50f5";
    case "TwoClassrooms":
      return "#9120c4";
    default:
      return "#525252";
  }
};

// 教室名を日本語に変換するヘルパー関数
const translateClassroomName = (classroom: string): string => {
  switch (classroom) {
    case "Off":
      return "休み";
    case "Ofunato":
      return "大船渡";
    case "Takata":
      return "高田";
    case "TwoClassrooms":
      return "2教室";
    default:
      return "未割り当て";
  }
};

const Container = styled.div`
  margin-bottom: 8px;
`;

// スタイル付きのタグコンポーネント
const ClassroomTag = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  text-align: center;
`;

const NoDataTag = styled(ClassroomTag).attrs({
  color: "#525252", // Default gray color
})``;

const ClassroomDisplay: React.FC<ClassroomDisplayProps> = ({
  teacherId,
  year,
  month,
  day,
}) => {
  const [fetchedClassroom, setFetchedClassroom] = useState("");
  const selectedClassroom = useSelector(
    (state: RootState) =>
      state.classroom.selectedClassroom[`${year}-${month}-${day}`]
  );

  useEffect(() => {
    const loadClassroom = async () => {
      const dateIdentifier = `${year}-${month + 1}-${day.toString().padStart(2, "0")}`;
      const fetchedClassroom = await fetchClassroom(
        teacherId,
        dateIdentifier,
        false
      );
      setFetchedClassroom(fetchedClassroom);
    };

    loadClassroom();
  }, [teacherId, year, month, day]); // 依存関係に dataVersion を追加

  // 最終的に表示する教室情報を決定
  const classroomToShow = selectedClassroom || fetchedClassroom;

  const classroomColor = getClassroomColor(classroomToShow);
  const translatedClassroomName = translateClassroomName(classroomToShow);

  return (
    <Container>
      {classroomToShow ? (
        <ClassroomTag color={classroomColor}>
          {translatedClassroomName}
        </ClassroomTag>
      ) : (
        <NoDataTag color="#D3D3D3">未設定</NoDataTag>
      )}
    </Container>
  );
};

export default ClassroomDisplay;
