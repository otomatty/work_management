import React from "react";
import styled from "styled-components";
import ModalSubTitle from "../../../components/atoms/ModalSubTitle";
import Section from "../../../components/layout/SectionComponent";
import { LessonInfo } from "../../../types";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #f4f4f4;
  padding: 8px;
  text-align: center;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const Td = styled.td`
  padding: 8px;
`;

const AddButtonWrapper = styled.div`
  width: 100%;
`;

const AddButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 0;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 24px;

  &:hover {
    background-color: #45a049;
  }
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 0;
  width: 30px;
  height: 30px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

interface LessonInputListProps {
  lessonInfo: LessonInfo[];
  setLessonInfo: (lessonInfo: LessonInfo[]) => void;
  saveLessonInfo: (
    teacherId: string,
    year: number,
    month: number,
    day: number,
    lessonInfo: LessonInfo[]
  ) => Promise<void>;
}

const LessonInputList: React.FC<LessonInputListProps> = ({
  lessonInfo,
  setLessonInfo,
}) => {
  const handleInputChange = async (
    index: number,
    field: keyof LessonInfo,
    value: string
  ) => {
    const updatedLessons = [...lessonInfo];
    updatedLessons[index] = {
      ...updatedLessons[index],
      [field]: field === "time" ? Number(value) : value,
    };
    setLessonInfo(updatedLessons);
  };

  const handleAddLesson = async () => {
    const newLesson: LessonInfo = {
      studentName: "",
      grade: "",
      subject: "",
      status: "",
      time: 0, // 初期値を number 型に変更
    };
    const newLessonInfo = [...lessonInfo, newLesson];
    setLessonInfo(newLessonInfo);
  };

  const handleRemoveLesson = async (index: number) => {
    const filteredLessons = lessonInfo.filter((_, i) => i !== index);
    setLessonInfo(filteredLessons);
  };

  return (
    <Section marginBottom="10px">
      <ModalSubTitle>レッスン内容</ModalSubTitle>
      <Table>
        <thead>
          <tr>
            <Th>生徒名</Th>
            <Th>学年と教科</Th>
            <Th>カテゴリー</Th>
            <Th>時間</Th>
            <Th></Th>
          </tr>
        </thead>
        <tbody>
          {lessonInfo.map((lesson, index) => (
            <Tr key={index}>
              <Td>
                <input
                  type="text"
                  value={lesson.studentName}
                  onChange={(e) =>
                    handleInputChange(index, "studentName", e.target.value)
                  }
                  placeholder="生徒名"
                />
              </Td>
              <Td>
                <input
                  type="text"
                  value={lesson.grade}
                  onChange={(e) =>
                    handleInputChange(index, "grade", e.target.value)
                  }
                  placeholder="学年"
                />
                <input
                  type="text"
                  value={lesson.subject}
                  onChange={(e) =>
                    handleInputChange(index, "subject", e.target.value)
                  }
                  placeholder="教科"
                />
              </Td>
              <Td>
                <select
                  value={lesson.status}
                  onChange={(e) =>
                    handleInputChange(index, "status", e.target.value)
                  }
                >
                  <option value="">選択してください</option>
                  <option value="MU">MU</option>
                  <option value="休み">休み</option>
                </select>
              </Td>
              <Td>
                <input
                  type="text"
                  value={lesson.time}
                  onChange={(e) =>
                    handleInputChange(index, "time", e.target.value)
                  }
                  placeholder="時間 (10分単位)"
                  min="0"
                  max="100"
                  step="10"
                />
              </Td>
              <Td>
                <DeleteButton onClick={() => handleRemoveLesson(index)}>
                  &#x2715;
                </DeleteButton>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <AddButtonWrapper>
        <AddButton onClick={handleAddLesson}>+</AddButton>
      </AddButtonWrapper>
    </Section>
  );
};

export default LessonInputList;
