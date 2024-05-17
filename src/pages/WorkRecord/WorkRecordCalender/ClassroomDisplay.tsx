import React from "react";
import styled from "styled-components";

interface ClassroomDisplayProps {
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
      return "未設定";
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

const ClassroomDisplay: React.FC<ClassroomDisplayProps> = ({ classroom }) => {
  const classroomColor = getClassroomColor(classroom);
  const translatedClassroomName = translateClassroomName(classroom);

  return (
    <Container>
      <ClassroomTag color={classroomColor}>
        {translatedClassroomName}
      </ClassroomTag>
    </Container>
  );
};

export default ClassroomDisplay;
