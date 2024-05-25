import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { RootState } from "../../../redux/store";
import {
  fetchTeachers,
  addNewTeacher,
  removeTeacher,
} from "../../../redux/teacher/teacherSlice";
import TeacherTable from "./TeacherTable";
import DeleteModeToggle from "./DeleteModeToggle";
import TimeFormatToggle from "../../../components/atoms/TimeFormatToggle/TimeFormatToggle";

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
  const [isTimeFormat, setIsTimeFormat] = useState(true);

  const handleToggle = () => {
    setIsTimeFormat(!isTimeFormat);
  };

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const handleAddTeacher = (name: string) => {
    dispatch(addNewTeacher(name));
    setAdding(false);
  };

  const handleDeleteTeacher = (id: string) => {
    dispatch(removeTeacher(id));
  };

  return (
    <div>
      <h2>講師一覧表</h2>
      <div>
        <div>
          {!adding && (
            <AddButton onClick={() => setAdding(true)}>講師追加</AddButton>
          )}
          <DeleteModeToggle
            deleteMode={deleteMode}
            onToggle={() => setDeleteMode(!deleteMode)}
          />
        </div>
        <TimeFormatToggle isChecked={isTimeFormat} onToggle={handleToggle} />
      </div>

      <TeacherTable
        teachers={teachers}
        deleteMode={deleteMode}
        onDelete={handleDeleteTeacher}
        adding={adding}
        onAdd={handleAddTeacher}
        onCancel={() => setAdding(false)}
        isTimeFormat={isTimeFormat}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default TeacherManager;
