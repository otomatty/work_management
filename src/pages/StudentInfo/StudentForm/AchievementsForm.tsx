import React from 'react';
import { Achievements } from '../../../types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface AchievementsFormProps {
  achievements: Achievements;
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

const AchievementsForm: React.FC<AchievementsFormProps> = ({
  achievements,
  handleChange,
}) => {
  const { t } = useTranslation('studentInfo');
  return (
    <FormContainer>
      <Label>{t('eikenLevel')}:</Label>
      <Input
        type="text"
        name="eikenLevel"
        value={achievements.eikenLevel}
        onChange={handleChange}
      />
      <Label>{t('sukenLevel')}:</Label>
      <Input
        type="text"
        name="sukenLevel"
        value={achievements.sukenLevel}
        onChange={handleChange}
      />
      <Label>{t('highSchoolAdmissions')}:</Label>
      <Input
        type="text"
        name="highSchoolAdmissions"
        value={achievements.highSchoolAdmissions}
        onChange={handleChange}
      />
      <Label>{t('universityAdmissions')}:</Label>
      <Input
        type="text"
        name="universityAdmissions"
        value={achievements.universityAdmissions}
        onChange={handleChange}
      />
    </FormContainer>
  );
};

export default AchievementsForm;
