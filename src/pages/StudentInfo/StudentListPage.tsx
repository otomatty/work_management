import React, { useEffect, useState } from "react";
import { studentsService } from "../../services/students/studentsServices";
import {
  StudentCollection,
  ContactInfo,
  SiblingInfo,
  NotificationInfo,
} from "../../types";
import StudentForm from "./StudentForm/StudentForm";
import Container from "../../components/layout/Container";
import Header from "../../components/organisms/Header";
import { useTranslation } from "react-i18next";
import DeleteModeToggle from "../../components/molecules/DeleteModeToggle";
import EditModeToggle from "../../components/molecules/EditModeToggle";
import StudentTable from "./StudentTable/StudentTable";
import SectionContainer from "../../components/layout/SectionContainer";

const StudentListPage: React.FC = () => {
  const { t } = useTranslation("studentInfo");

  const [students, setStudents] = useState<StudentCollection[]>([]);
  const [contacts, setContacts] = useState<ContactInfo[]>([]);
  const [siblings, setSiblings] = useState<SiblingInfo[]>([]);
  const [notifications, setNotifications] = useState<NotificationInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [studentToEdit, setStudentToEdit] = useState<StudentCollection | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const studentsData = await studentsService.getStudents();
        setStudents(studentsData);

        const contactsPromises = studentsData.map((student) =>
          studentsService.getContacts(student.studentId)
        );
        const siblingsPromises = studentsData.map((student) =>
          studentsService.getSiblings(student.studentId)
        );
        const notificationsPromises = studentsData.map((student) =>
          studentsService.getNotifications(student.studentId)
        );

        const [allContacts, allSiblings, allNotifications] = await Promise.all([
          Promise.all(contactsPromises),
          Promise.all(siblingsPromises),
          Promise.all(notificationsPromises),
        ]);

        setContacts(allContacts.flat());
        setSiblings(allSiblings.flat());
        setNotifications(allNotifications.flat());
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddStudentClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setStudentToEdit(null);
  };

  const handleStudentAdded = (newStudent: StudentCollection) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
    setShowForm(false);
  };

  const handleToggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
  };

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleDeleteStudent = async (studentId: string) => {
    try {
      await studentsService.deleteStudent(studentId);
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
      <SectionContainer>
        <Header />
      </SectionContainer>
      <SectionContainer>
        <button onClick={handleAddStudentClick}>{t("addStudent")}</button>
        {showForm && (
          <StudentForm
            onClose={handleCloseForm}
            onStudentAdded={handleStudentAdded}
            studentToEdit={studentToEdit}
          />
        )}
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
        <StudentTable
          students={students}
          contacts={contacts}
          siblings={siblings}
          notifications={notifications}
          onDelete={handleDeleteStudent}
          onEdit={handleEditStudent}
          deleteMode={deleteMode}
          editMode={editMode}
        />
      </SectionContainer>
    </Container>
  );
};

export default StudentListPage;
