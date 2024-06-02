import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { LearningInfo } from '../../../types';

interface LearningInfoFormProps {
  learningInfo: LearningInfo;
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

const LearningInfoForm: React.FC<LearningInfoFormProps> = ({
  learningInfo,
  handleChange,
}) => {
  const { t } = useTranslation('studentInfo');
  return (
    <FormContainer>
      <Label>{t('course')}:</Label>
      <Input
        type="text"
        name="course"
        value={learningInfo.course}
        onChange={handleChange}
      />
      <Label>{t('schedule')}:</Label>
      <Input
        type="text"
        name="schedule"
        value={learningInfo.schedule}
        onChange={handleChange}
      />
      <Label>{t('grades')}:</Label>
      <Input
        type="text"
        name="grades"
        value={learningInfo.grades}
        onChange={handleChange}
      />
      <Label>{t('homeworkStatus')}:</Label>
      <Input
        type="text"
        name="homeworkStatus"
        value={learningInfo.homeworkStatus}
        onChange={handleChange}
      />
    </FormContainer>
  );
};

export default LearningInfoForm;
