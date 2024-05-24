import React, { useState } from "react";
import styled from "styled-components";
import AddTeacherForm from "./AddTeacherForm";
import Modal from "../../../components/molecules/Modal";
import Button from "../../../components/atoms/Button"; // Buttonコンポーネントをインポート
import ButtonGroup from "../../../components/layout/ButtonGroup";

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

const StyledInput = styled.input`
  width: 50%;
  padding: 10px;
  margin: 10px 0;
  box-sizing: border-box;
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
  const [inputTeacherName, setInputTeacherName] = useState<string>("");

  const handleDeleteClick = (id: string) => {
    setSelectedTeacherId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    const selectedTeacher = teachers.find(
      (teacher) => teacher.id === selectedTeacherId
    );
    if (selectedTeacher && selectedTeacher.name === inputTeacherName) {
      onDelete(selectedTeacherId!);
      setIsModalOpen(false);
      setSelectedTeacherId(null);
      setInputTeacherName("");
    } else {
      alert("講師名が一致しません。");
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setSelectedTeacherId(null);
    setInputTeacherName("");
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
        message="削除する講師名を入力してください。"
        onClose={handleCancelDelete}
      >
        <StyledInput
          type="text"
          value={inputTeacherName}
          onChange={(e) => setInputTeacherName(e.target.value)}
          placeholder="講師名を入力"
        />
        <ButtonGroup>
          <Button
            label="はい"
            onClick={handleConfirmDelete}
            backgroundColor="#dc3545"
          />
          <Button
            label="いいえ"
            onClick={handleCancelDelete}
            backgroundColor="#6c757d"
          />
        </ButtonGroup>
      </Modal>
    </>
  );
};

export default TeacherTable;
