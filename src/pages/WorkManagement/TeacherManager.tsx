import React, { useState, useEffect } from "react";
import styled from "styled-components"; // この行を追加
import TeacherTable from "./TeacherTable";
import DeleteModeToggle from "./DeleteModeToggle";
import { addTeacher, deleteTeacher } from "../../firebase";
import { getTeachers } from "../../services";

// スタイルドコンポーネントの定義
const AddButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`;

const TeacherManager: React.FC = () => {
  const [teachers, setTeachers] = useState<{ id: string; name: string }[]>([]);
  const [adding, setAdding] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    const loadTeachers = async () => {
      const loadedTeachers = await getTeachers();
      setTeachers(loadedTeachers);
    };
    loadTeachers();
  }, []);

  const handleAddTeacher = async (name: string) => {
    await addTeacher(name);
    setAdding(false);
    reloadTeachers();
  };

  const handleDeleteTeacher = async (id: string) => {
    await deleteTeacher(id);
    reloadTeachers();
  };

  const reloadTeachers = async () => {
    const loadedTeachers = await getTeachers();
    setTeachers(loadedTeachers);
  };

  return (
    <div>
      <h2>講師管理</h2>
      <DeleteModeToggle
        deleteMode={deleteMode}
        onToggle={() => setDeleteMode(!deleteMode)}
      />
      {!adding && (
        <AddButton onClick={() => setAdding(true)}>講師追加</AddButton>
      )}
      <TeacherTable
        teachers={teachers}
        deleteMode={deleteMode}
        onDelete={handleDeleteTeacher}
        adding={adding}
        onAdd={(name: string) => {
          handleAddTeacher(name);
        }}
        onCancel={() => setAdding(false)}
      />
    </div>
  );
};

export default TeacherManager;
