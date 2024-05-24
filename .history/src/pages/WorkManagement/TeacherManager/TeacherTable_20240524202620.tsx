import React from "react";
import styled from "styled-components";
import AddTeacherForm from "../AddTeacherForm";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  background-color: #f5f5f5;
  color: #333;
  padding: 10px;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
`;

const DeleteIcon = styled.span`
  color: #dc3545;
  cursor: pointer;
  margin-left: 10px;
`;

interface Teacher {
  id: string;
  name: string;
  // 事務時間と教務時間のプロパティを追加することを想定
  // adminHours: number;
  // teachingHours: number;
}

interface Props {
  teachers: Teacher[];
  deleteMode: boolean;
  onDelete: (id: string) => void;
  adding: boolean;
  onAdd: (name: string) => void;
  onCancel: () => void;
}

const TeacherTable: React.FC<Props> = ({
  teachers,
  deleteMode,
  onDelete,
  adding,
  onAdd,
  onCancel,
}) => {
  return (
    <Table>
      <thead>
        <tr>
          <Th>講師名</Th>
          <Th>今月の事務時間</Th>
          <Th>今月の教務時間</Th>
        </tr>
      </thead>
      <tbody>
        {teachers.map((teacher) => (
          <tr key={teacher.id}>
            <Td>
              {teacher.name}
              {deleteMode && (
                <DeleteIcon onClick={() => onDelete(teacher.id)}>✕</DeleteIcon>
              )}
            </Td>
            <Td>
              {/* Firestoreから読み込む事務時間を表示 */}
              {/* {teacher.adminHours} */}
            </Td>
            <Td>
              {/* Firestoreから読み込む教務時間を表示 */}
              {/* {teacher.teachingHours} */}
            </Td>
          </tr>
        ))}
        {adding && (
          <tr>
            <Td colSpan={deleteMode ? 4 : 3}>
              <AddTeacherForm onAdd={onAdd} onCancel={onCancel} />
            </Td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default TeacherTable;
