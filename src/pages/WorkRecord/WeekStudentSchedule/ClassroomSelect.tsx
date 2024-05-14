import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchClassroom } from "../../../firebase/firestoreFunctions";

interface ClassroomSelectProps {
  teacherId: string;
  dayOfWeek: string;
  selectedClassroom: string; // この行を追加
  onSelectClassroom: (classroom: string) => void;
}

const Container = styled.div<{ dayOfWeek: string }>`
  margin: 10px 8px 0 8px;
  padding-bottom: 8px;
  border-bottom: ${({ dayOfWeek }) =>
    dayOfWeek === "Saturday"
      ? "2px solid #bbebfa"
      : dayOfWeek === "Sunday"
        ? "2px solid #ffd9df"
        : "2px solid #f0f0f0"};
`;

const Title = styled.span`
  display: block;
  text-align: left;
  font-size: 0.8rem;
  margin: 0 0 4px 8px;
`;

const StyledSelect = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    border-color 0.3s,
    box-shadow 0.3s;

  &:hover {
    border-color: #888;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    border-color: #0056b3;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    outline: none;
  }
`;

const ClassroomSelect: React.FC<ClassroomSelectProps> = ({
  teacherId,
  dayOfWeek,
  selectedClassroom: initialSelectedClassroom, // プロパティ名を変更して明確にする
  onSelectClassroom,
}) => {
  const [selectedClassroom, setSelectedClassroom] = useState(
    initialSelectedClassroom
  );

  useEffect(() => {
    const loadClassroom = async () => {
      const classroom = await fetchClassroom(teacherId, dayOfWeek);
      setSelectedClassroom(classroom);
    };

    if (!initialSelectedClassroom) {
      // 初期値が設定されていない場合のみデータベースからロード
      loadClassroom();
    }
  }, [teacherId, dayOfWeek, initialSelectedClassroom]);

  return (
    <Container dayOfWeek={dayOfWeek}>
      <Title>教室</Title>
      <StyledSelect
        value={selectedClassroom}
        onChange={(e) => {
          onSelectClassroom(e.target.value);
          setSelectedClassroom(e.target.value);
        }}
      >
        <option value="">選択してください</option>
        <option value="Off">休み</option>
        <option value="Ofunato">大船渡</option>
        <option value="Takata">高田</option>
        <option value="TwoClassrooms">2教室</option>
      </StyledSelect>
    </Container>
  );
};

export default ClassroomSelect;
