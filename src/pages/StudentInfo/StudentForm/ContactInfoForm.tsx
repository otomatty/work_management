import React from 'react';
import styled from 'styled-components';
import { ContactInfo } from '../../../types';
import { useTranslation } from 'react-i18next';

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

interface ContactInfoFormProps {
  contactInfo: ContactInfo;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const ContactInfoForm: React.FC<ContactInfoFormProps> = ({
  contactInfo,
  handleChange,
}) => {
  const { t } = useTranslation('studentInfo');

  return (
    <FormContainer>
      <Label>{t('guardianName')}:</Label>
      <Input
        type="text"
        name="guardianName"
        value={contactInfo.guardianName}
        onChange={handleChange}
      />
      <Label>{t('guardianPhone')}:</Label>
      <Input
        type="text"
        name="guardianPhone"
        value={contactInfo.guardianPhone}
        onChange={handleChange}
      />
      <Label>{t('guardianEmail')}:</Label>
      <Input
        type="email"
        name="guardianEmail"
        value={contactInfo.guardianEmail}
        onChange={handleChange}
      />
      <Label>{t('address')}:</Label>
      <Input
        type="text"
        name="address"
        value={contactInfo.address}
        onChange={handleChange}
      />
      <Label>{t('lineId')}:</Label>
      <Input
        type="text"
        name="lineId"
        value={contactInfo.lineId}
        onChange={handleChange}
      />
      <Label>{t('lineRegisteredBy')}:</Label>
      <Input
        type="text"
        name="lineRegisteredBy"
        value={contactInfo.lineRegisteredBy}
        onChange={handleChange}
      />
    </FormContainer>
  );
};

export default ContactInfoForm;
