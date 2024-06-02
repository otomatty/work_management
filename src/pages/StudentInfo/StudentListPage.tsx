import React, { useEffect, useState } from 'react';
import { getStudents } from '../../firebase/students/students';
import { StudentCollection } from '../../types';
import StudentForm from './StudentForm/StudentForm';
import Container from '../../components/layout/Container';
import Header from '../../components/organisms/Header';
import { useTranslation } from 'react-i18next';

const StudentListPage: React.FC = () => {
  const { t } = useTranslation('studentInfo');

  const [students, setStudents] = useState<StudentCollection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsData = await getStudents();
        setStudents(studentsData);
      } catch (error) {
        console.error('Error fetching students: ', error);
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
  };

  if (loading) {
    return <div>{t('loading')}</div>;
  }

  return (
    <Container>
      <Header />
      <h2>{t('studentList')}</h2>
      <button onClick={handleAddStudentClick}>{t('addStudent')}</button>
      {showForm && <StudentForm onClose={handleCloseForm} />}
      <ul>
        {students.map((student) => (
          <li key={student.studentId}>
            {student.studentName} - {student.grade} - {student.schoolName}
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default StudentListPage;
