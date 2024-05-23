import React, { useState } from 'react';
import styled from 'styled-components';
import ModalSubTitle from '../../../components/atoms/ModalSubTitle';
import Section from '../../../components/layout/SectionComponent';
import GradeSelector from '../../../components/molecules/GradeSelector';
import Modal from '../../../components/molecules/Modal'; // Modalをインポート
import { LessonInfo } from '../../../types';

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
  width: 18%;
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

const Input = styled.input`
  margin: 4px 0;
  padding: 4px;
  box-sizing: border-box;
`;

const Select = styled.select`
  margin: 4px 0;
  padding: 4px;
  box-sizing: border-box;
`;

const ButtonAsInput = styled.button`
  margin: 4px 0;

  padding: 4px;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  border: 1px solid #ccc;
  cursor: pointer;
  text-align: left;

  &:hover {
    background-color: #f9f9f9;
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
  const [isGradeSelectorOpen, setIsGradeSelectorOpen] = useState(false);
  const [currentGradeIndex, setCurrentGradeIndex] = useState<number | null>(
    null
  );

  const handleInputChange = async (
    index: number,
    field: keyof LessonInfo,
    value: string
  ) => {
    const updatedLessons = [...lessonInfo];
    updatedLessons[index] = {
      ...updatedLessons[index],
      [field]: field === 'time' ? Number(value) : value,
    };
    setLessonInfo(updatedLessons);
  };

  const handleAddLesson = async () => {
    const newLesson: LessonInfo = {
      studentName: '',
      grade: '',
      subject: '',
      status: '',
      time: 0, // 初期値を number 型に変更
    };
    const newLessonInfo = [...lessonInfo, newLesson];
    setLessonInfo(newLessonInfo);
  };

  const handleRemoveLesson = async (index: number) => {
    const filteredLessons = lessonInfo.filter((_, i) => i !== index);
    setLessonInfo(filteredLessons);
  };

  const handleGradeSelect = (index: number) => {
    setCurrentGradeIndex(index);
    setIsGradeSelectorOpen(true);
  };

  const handleGradeChange = (grade: string) => {
    if (currentGradeIndex !== null) {
      handleInputChange(currentGradeIndex, 'grade', grade);
      setIsGradeSelectorOpen(false);
      setCurrentGradeIndex(null);
    }
  };

  return (
    <Section marginBottom="10px">
      <ModalSubTitle>レッスン内容</ModalSubTitle>
      <Table>
        <thead>
          <tr>
            <Th>生徒名</Th>
            <Th>学年</Th>
            <Th>教科</Th>
            <Th>カテゴリー</Th>
            <Th>時間</Th>
            <Th></Th>
          </tr>
        </thead>
        <tbody>
          {lessonInfo.map((lesson, index) => (
            <Tr key={index}>
              <Td>
                <Input
                  type="text"
                  value={lesson.studentName}
                  onChange={(e) =>
                    handleInputChange(index, 'studentName', e.target.value)
                  }
                  placeholder="生徒名"
                />
              </Td>
              <Td>
                <ButtonAsInput
                  onClick={(e) => {
                    e.preventDefault();
                    handleGradeSelect(index);
                  }}
                >
                  {lesson.grade || '学年を選択'}
                </ButtonAsInput>
              </Td>
              <Td>
                <Select
                  value={lesson.subject}
                  onChange={(e) =>
                    handleInputChange(index, 'subject', e.target.value)
                  }
                >
                  <option value="">教科を選択</option>
                  <option value="国語">国語</option>
                  <option value="英語">英語</option>
                  <option value="数学">数学</option>
                  <option value="理科">理科</option>
                  <option value="社会">社会</option>
                  <option value="英会話">英会話</option>
                </Select>
              </Td>
              <Td>
                <Select
                  value={lesson.status}
                  onChange={(e) =>
                    handleInputChange(index, 'status', e.target.value)
                  }
                >
                  <option value="">カテゴリーを選択</option>
                  <option value="通常">通常</option>
                  <option value="MU">MU</option>
                  <option value="休み">休み</option>
                </Select>
              </Td>
              <Td>
                <Input
                  type="number"
                  value={lesson.time}
                  onChange={(e) =>
                    handleInputChange(index, 'time', e.target.value)
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
      <Modal
        isOpen={isGradeSelectorOpen}
        onClose={() => setIsGradeSelectorOpen(false)}
      >
        <GradeSelector
          grade={lessonInfo[currentGradeIndex!]?.grade || ''}
          setGrade={handleGradeChange}
        />
      </Modal>
    </Section>
  );
};

export default LessonInputList;
