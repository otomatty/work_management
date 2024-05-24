import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { RootState } from "../../redux/store";
import {
  fetchTeachers,
  addNewTeacherRequest,
  removeTeacherRequest,
} from "../../redux/actions";
import TeacherTable from "./TeacherManager/TeacherTable";
import DeleteModeToggle from "./TeacherManager/DeleteModeToggle";
import { Teacher } from "../../types";

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
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const { teachers, loading, error } = useSelector(
    (state: RootState) => state.teacher
  );
  const [adding, setAdding] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const handleAddTeacher = (name: string) => {
    dispatch(addNewTeacherRequest(name));
    setAdding(false);
  };

  const handleDeleteTeacher = (id: string) => {
    dispatch(removeTeacherRequest(id));
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
        onAdd={handleAddTeacher}
        onCancel={() => setAdding(false)}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default TeacherManager;
