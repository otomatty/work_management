import React, { useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { StudentCollection } from "../../../types";

interface BasicInfoFormProps {
  student: StudentCollection;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const calculateGrade = (dateOfBirth: string): string => {
  if (!dateOfBirth) return "";

  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear(); // 'let' に変更
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  if (age < 3) return "未就学児";
  if (age === 3) return "年少";
  if (age === 4) return "年中";
  if (age === 5) return "年長";
  if (age >= 6 && age <= 11) return `小学${age - 5}年生`;
  if (age >= 12 && age <= 14) return `中学${age - 11}年生`;
  if (age >= 15 && age <= 17) return `高校${age - 14}年生`;
  return "社会人";
};

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  student,
  handleChange,
}) => {
  const { t } = useTranslation("studentInfo");

  useEffect(() => {
    if (student.dateOfBirth) {
      const grade = calculateGrade(student.dateOfBirth);
      handleChange({
        target: {
          name: "grade",
          value: grade,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [student.dateOfBirth, handleChange]);

  const gradeOptions = [
    "未就学児",
    "年少",
    "年中",
    "年長",
    "小学1年生",
    "小学2年生",
    "小学3年生",
    "小学4年生",
    "小学5年生",
    "小学6年生",
    "中学1年生",
    "中学2年生",
    "中学3年生",
    "高校1年生",
    "高校2年生",
    "高校3年生",
    "社会人",
  ];

  return (
    <FormContainer>
      <Label>{t("studentName")}:</Label>
      <Input
        type="text"
        name="studentName"
        value={student.studentName}
        onChange={handleChange}
        required
      />
      <Label>{t("gender")}:</Label>
      <Select
        name="gender"
        value={student.gender}
        onChange={handleChange}
        required
      >
        <option value="">{t("selectGender")}</option>
        <option value="male">{t("male")}</option>
        <option value="female">{t("female")}</option>
        <option value="other">{t("other")}</option>
      </Select>
      <Label>{t("dateOfBirth")}:</Label>
      <Input
        type="date"
        name="dateOfBirth"
        value={student.dateOfBirth}
        onChange={handleChange}
        required
      />
      <Label>{t("grade")}:</Label>
      <Select
        name="grade"
        value={student.grade}
        onChange={handleChange}
        required
      >
        {gradeOptions.map((grade) => (
          <option key={grade} value={grade}>
            {grade}
          </option>
        ))}
      </Select>
      <Label>{t("schoolName")}:</Label>
      <Input
        type="text"
        name="schoolName"
        value={student.schoolName}
        onChange={handleChange}
        required
      />
    </FormContainer>
  );
};

export default BasicInfoForm;
