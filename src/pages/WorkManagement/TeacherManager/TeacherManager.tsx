import React, { useState, useEffect, startTransition } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { RootState } from "../../../redux/store";
import {
  fetchTeachers,
  addNewTeacher,
  removeTeacher,
  updateTeacherName,
} from "../../../redux/teacher/teacherSlice";
import TeacherTable from "./TeacherTable";
import DeleteModeToggle from "../../../components/molecules/DeleteModeToggle";
import EditModeToggle from "../../../components/molecules/EditModeToggle";
import TimeFormatToggle from "../../../components/atoms/TimeFormatToggle/TimeFormatToggle";

const Title = styled.h3`
  margin: 20px auto 20px auto;
`;

const Container = styled.div`
  background-color: #fff;
  margin-bottom: 20px;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AddButton = styled.button`
  font-size: 0.8rem;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`;

const TeacherManager: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const { teachers } = useSelector((state: RootState) => state.teacher);
  const [adding, setAdding] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isTimeFormat, setIsTimeFormat] = useState(true);

  const handleToggle = () => {
    setIsTimeFormat(!isTimeFormat);
  };

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const handleAddTeacher = (name: string) => {
    startTransition(() => {
      dispatch(addNewTeacher(name));
      setAdding(false);
    });
  };

  const handleDeleteTeacher = (id: string) => {
    startTransition(() => {
      dispatch(removeTeacher(id));
    });
  };

  const handleUpdateTeacherName = (id: string, newName: string) => {
    startTransition(() => {
      dispatch(updateTeacherName({ id, newName }));
    });
  };

  return (
    <Container>
      <Title>講師一覧表</Title>
      <Toolbar>
        <div>
          {!adding && (
            <AddButton onClick={() => setAdding(true)}>講師追加</AddButton>
          )}
          <DeleteModeToggle
            activeLabel="削除モード終了"
            inactiveLabel="講師削除"
            deleteMode={deleteMode}
            onToggle={() => setDeleteMode(!deleteMode)}
          />
          <EditModeToggle
            activeLabel="編集モード終了"
            inactiveLabel="講師編集"
            editMode={editMode}
            onToggle={() => setEditMode(!editMode)}
          />
        </div>
        <TimeFormatToggle isChecked={isTimeFormat} onToggle={handleToggle} />
      </Toolbar>

      <TeacherTable
        teachers={teachers}
        deleteMode={deleteMode}
        editMode={editMode}
        onDelete={handleDeleteTeacher}
        onUpdate={handleUpdateTeacherName}
        adding={adding}
        onAdd={handleAddTeacher}
        onCancel={() => setAdding(false)}
        isTimeFormat={isTimeFormat}
      />
    </Container>
  );
};

export default TeacherManager;
