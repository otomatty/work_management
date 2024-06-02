import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { StudentCollection } from '../../../types';

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

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  student,
  handleChange,
}) => {
  const { t } = useTranslation('studentInfo');

  return (
    <FormContainer>
      <Label>{t('studentName')}:</Label>
      <Input
        type="text"
        name="studentName"
        value={student.studentName}
        onChange={handleChange}
        required
      />
      <Label>{t('gender')}:</Label>
      <Select
        name="gender"
        value={student.gender}
        onChange={handleChange}
        required
      >
        <option value="">{t('selectGender')}</option>
        <option value="male">{t('male')}</option>
        <option value="female">{t('female')}</option>
        <option value="other">{t('other')}</option>
      </Select>
      <Label>{t('dateOfBirth')}:</Label>
      <Input
        type="date"
        name="dateOfBirth"
        value={student.dateOfBirth}
        onChange={handleChange}
        required
      />
      <Label>{t('grade')}:</Label>
      <Input
        type="text"
        name="grade"
        value={student.grade}
        onChange={handleChange}
        required
      />
      <Label>{t('schoolName')}:</Label>
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
