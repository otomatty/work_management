import React, { useState } from "react";
import styled from "styled-components";
import AddTeacherForm from "./AddTeacherForm";
import Modal from "../../../components/molecules/Modal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(
    null
  );

  const handleDeleteClick = (id: string) => {
    setSelectedTeacherId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTeacherId) {
      onDelete(selectedTeacherId);
    }
    setIsModalOpen(false);
    setSelectedTeacherId(null);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setSelectedTeacherId(null);
  };

  return (
    <>
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
                  <DeleteIcon onClick={() => handleDeleteClick(teacher.id)}>
                    ✕
                  </DeleteIcon>
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
      <Modal
        isOpen={isModalOpen}
        message="本当に削除しますか？"
        onClose={handleCancelDelete}
      >
        <button onClick={handleConfirmDelete}>はい</button>
        <button onClick={handleCancelDelete}>いいえ</button>
      </Modal>
    </>
  );
};

export default TeacherTable;
