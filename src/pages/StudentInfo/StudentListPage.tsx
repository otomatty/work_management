import React, { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../../firebase/students/students";
import { StudentCollection } from "../../types";
import StudentForm from "./StudentForm/StudentForm";
import Container from "../../components/layout/Container";
import Header from "../../components/organisms/Header";
import { useTranslation } from "react-i18next";
import DeleteModeToggle from "../../components/molecules/DeleteModeToggle";
import EditModeToggle from "../../components/molecules/EditModeToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const DeleteIcon = styled(FontAwesomeIcon)`
  color: #dc3545;
  cursor: pointer;
  margin-left: 10px;
`;

const EditIcon = styled(FontAwesomeIcon)`
  color: #007bff;
  cursor: pointer;
  margin-left: 10px;
`;

const StudentListPage: React.FC = () => {
  const { t } = useTranslation("studentInfo");

  const [students, setStudents] = useState<StudentCollection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [studentToEdit, setStudentToEdit] = useState<StudentCollection | null>(
    null
  );

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsData = await getStudents();
        setStudents(studentsData);
      } catch (error) {
        console.error("Error fetching students: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleAddStudentClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setStudentToEdit(null); // フォームを閉じたときに編集モードをリセット
  };

  const handleStudentAdded = (newStudent: StudentCollection) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
    setShowForm(false); // フォームを閉じる
  };

  const handleToggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
  };

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleDeleteStudent = async (studentId: string) => {
    try {
      await deleteStudent(studentId);
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.studentId !== studentId)
      );
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleEditStudent = (student: StudentCollection) => {
    setStudentToEdit(student);
    setShowForm(true);
  };

  if (loading) {
    return <div>{t("loading")}</div>;
  }

  return (
    <Container>
      <Header />
      <DeleteModeToggle
        deleteMode={deleteMode}
        onToggle={handleToggleDeleteMode}
        activeLabel="削除モード終了"
        inactiveLabel="生徒削除"
      />
      <EditModeToggle
        editMode={editMode}
        onToggle={handleToggleEditMode}
        activeLabel="編集モード終了"
        inactiveLabel="生徒編集"
      />
      <h2>{t("studentList")}</h2>
      <button onClick={handleAddStudentClick}>{t("addStudent")}</button>
      {showForm && (
        <StudentForm
          onClose={handleCloseForm}
          onStudentAdded={handleStudentAdded}
          studentToEdit={studentToEdit}
        />
      )}
      <ul>
        {students.map((student) => (
          <li key={student.studentId}>
            {student.studentName} - {student.grade} - {student.schoolName}
            {deleteMode && (
              <DeleteIcon
                icon={faTrash}
                onClick={() => handleDeleteStudent(student.studentId)}
              />
            )}
            {editMode && (
              <EditIcon
                icon={faEdit}
                onClick={() => handleEditStudent(student)}
              />
            )}
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default StudentListPage;
