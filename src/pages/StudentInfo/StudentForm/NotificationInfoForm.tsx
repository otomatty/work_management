import React from 'react';
import { NotificationInfo } from '../../../types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface NotificationInfoFormProps {
  notificationInfo: NotificationInfo;
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

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const NotificationInfoForm: React.FC<NotificationInfoFormProps> = ({
  notificationInfo,
  handleChange,
}) => {
  const { t } = useTranslation('studentInfo');
  return (
    <FormContainer>
      <Label>{t('notificationSent')}:</Label>
      <Checkbox
        type="checkbox"
        name="notificationSent"
        checked={notificationInfo.notificationSent}
        onChange={handleChange}
      />
      <Label>{t('notificationReceived')}:</Label>
      <Checkbox
        type="checkbox"
        name="notificationReceived"
        checked={notificationInfo.notificationReceived}
        onChange={handleChange}
      />
    </FormContainer>
  );
};

export default NotificationInfoForm;
