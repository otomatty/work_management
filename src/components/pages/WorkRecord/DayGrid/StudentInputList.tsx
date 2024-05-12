import React, { useEffect } from "react";
import styled from "styled-components";
import ModalSubTitle from "../../../ui/ModalSubTitle";
import Section from "../../../layouts/SectionComponent";
import { StudentChangeInfo } from "../../../../types";
import {
  saveStudentChangeInfo,
  fetchStudentChangeInfo,
} from "../../../../firebase/firestoreFunctions";

const Table = styled.table`
  width: 50%;
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
  width: 50%;
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

interface StudentInputListProps {
  teacherId: string;
  year: number;
  month: number;
  day: number;
  studentChangeInfo: StudentChangeInfo[];
  setStudentChangeInfo: (studentChangeInfo: StudentChangeInfo[]) => void;
}

const StudentInputList: React.FC<StudentInputListProps> = ({
  teacherId,
  year,
  month,
  day,
  studentChangeInfo,
  setStudentChangeInfo,
}) => {
  useEffect(() => {
    const loadData = async () => {
      const fetchedStudentChangeInfo = await fetchStudentChangeInfo(
        teacherId,
        year,
        month,
        day,
      );
      setStudentChangeInfo(fetchedStudentChangeInfo);
    };

    loadData();
  }, [teacherId, year, month, day, setStudentChangeInfo]);

  const handleInputChange = async (
    index: number,
    field: keyof StudentChangeInfo,
    value: string,
  ) => {
    const updatedStudents = [...studentChangeInfo];
    updatedStudents[index][field] = value;
    setStudentChangeInfo(updatedStudents);
    await saveStudentChangeInfo(teacherId, year, month, day, updatedStudents);
  };

  const handleAddStudent = async () => {
    const newStudent: StudentChangeInfo = {
      studentName: "",
      status: "",
      time: "",
    };
    const newStudentChangeInfo = [...studentChangeInfo, newStudent];
    setStudentChangeInfo(newStudentChangeInfo);
    await saveStudentChangeInfo(
      teacherId,
      year,
      month,
      day,
      newStudentChangeInfo,
    );
  };

  const handleRemoveStudent = async (index: number) => {
    const filteredStudents = studentChangeInfo.filter((_, i) => i !== index);
    setStudentChangeInfo(filteredStudents);
    await saveStudentChangeInfo(teacherId, year, month, day, filteredStudents);
  };

  return (
    <Section marginBottom="10px">
      <ModalSubTitle>レッスン変更情報</ModalSubTitle>
      <Table>
        <thead>
          <tr>
            <Th>生徒名</Th>
            <Th>MU / 休み</Th>
            <Th>時間</Th>
            <Th></Th>
          </tr>
        </thead>
        <tbody>
          {studentChangeInfo.map((student, index) => (
            <Tr key={index}>
              <Td>
                <input
                  type="text"
                  value={student.studentName}
                  onChange={(e) =>
                    handleInputChange(index, "studentName", e.target.value)
                  }
                  placeholder="生徒名"
                />
              </Td>
              <Td>
                <select
                  value={student.status}
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
                  value={student.time}
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
                <DeleteButton onClick={() => handleRemoveStudent(index)}>
                  &#x2715;
                </DeleteButton>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <AddButtonWrapper>
        <AddButton onClick={handleAddStudent}>+</AddButton>
      </AddButtonWrapper>
    </Section>
  );
};

export default StudentInputList;
