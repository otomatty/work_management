import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import {
  addStudent,
  addContactInfo,
  addNotificationInfo,
  addSiblingInfo,
  addLearningInfo,
  addAchievements,
  updateStudent, // Added for updating student
} from "../../../firebase/students/students";
import {
  StudentCollection,
  ContactInfo,
  NotificationInfo,
  SiblingInfo,
  LearningInfo,
  Achievements,
} from "../../../types";
import BasicInfoForm from "./BasicInfoForm";
import ContactInfoForm from "./ContactInfoForm";
import NotificationInfoForm from "./NotificationInfoForm";
import SiblingInfoForm from "./SiblingInfoForm";
import LearningInfoForm from "./LearningInfoForm";
import AchievementsForm from "./AchievementsForm";
import styled from "styled-components";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: #218838;
  }
`;

const CloseButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: #c82333;
  }
`;

interface StudentFormProps {
  onClose: () => void;
  onStudentAdded: (student: StudentCollection) => void;
  studentToEdit?: StudentCollection | null; // Changed to StudentCollection | null
}

const StudentForm: React.FC<StudentFormProps> = ({
  onClose,
  onStudentAdded,
  studentToEdit, // Changed to StudentCollection | null
}) => {
  const { t } = useTranslation("studentInfo");
  const [student, setStudent] = useState<StudentCollection>(
    studentToEdit || {
      studentId: "",
      studentName: "",
      gender: "",
      dateOfBirth: "",
      grade: "",
      schoolName: "",
    }
  );
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    studentId: "",
    guardianName: "",
    guardianPhone: "",
    guardianEmail: "",
    address: "",
    lineId: "",
    lineRegisteredBy: "",
  });
  const [notificationInfo, setNotificationInfo] = useState<NotificationInfo>({
    studentId: "",
    notificationSent: false,
    notificationReceived: false,
  });
  const [siblingInfo, setSiblingInfo] = useState<SiblingInfo>({
    studentId: "",
    siblingNames: [],
  });
  const [learningInfo, setLearningInfo] = useState<LearningInfo>({
    studentId: "",
    course: "",
    schedule: "",
    grades: "",
    homeworkStatus: "",
  });
  const [achievements, setAchievements] = useState<Achievements>({
    studentId: "",
    eikenLevel: "",
    sukenLevel: "",
    highSchoolAdmissions: "",
    universityAdmissions: "",
  });

  useEffect(() => {
    if (studentToEdit) {
      setStudent(studentToEdit);
    }
  }, [studentToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSiblingChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setSiblingInfo((prevState) => {
      const newSiblingNames = [...prevState.siblingNames];
      newSiblingNames[index] = value;
      return { ...prevState, siblingNames: newSiblingNames };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (studentToEdit) {
        await updateStudent(student.studentId, student); // Update student logic
        console.log("Student updated successfully");
      } else {
        const studentRef = await addStudent(student);
        const studentId = studentRef.id;
        await addContactInfo({ ...contactInfo, studentId });
        await addNotificationInfo({ ...notificationInfo, studentId });
        await addSiblingInfo({ ...siblingInfo, studentId });
        await addLearningInfo({ ...learningInfo, studentId });
        await addAchievements({ ...achievements, studentId });
        console.log("All documents written successfully");
        onStudentAdded({ ...student, studentId });
      }
      onClose();
    } catch (error) {
      console.error("Error adding/updating document: ", error);
    }
  };

  return (
    <FormWrapper>
      <BasicInfoForm student={student} handleChange={handleChange} />
      <ContactInfoForm contactInfo={contactInfo} handleChange={handleChange} />
      <NotificationInfoForm
        notificationInfo={notificationInfo}
        handleChange={handleChange}
      />
      <SiblingInfoForm
        siblingInfo={siblingInfo}
        handleChange={handleSiblingChange}
        addSibling={() =>
          setSiblingInfo((prevState) => ({
            ...prevState,
            siblingNames: [...prevState.siblingNames, ""],
          }))
        }
      />
      <LearningInfoForm
        learningInfo={learningInfo}
        handleChange={handleChange}
      />
      <AchievementsForm
        achievements={achievements}
        handleChange={handleChange}
      />
      <div>
        <SubmitButton type="submit" onClick={handleSubmit}>
          {studentToEdit ? t("update") : t("submit")}
        </SubmitButton>
        <CloseButton type="button" onClick={onClose}>
          {t("close")}
        </CloseButton>
      </div>
    </FormWrapper>
  );
};

export default StudentForm;
