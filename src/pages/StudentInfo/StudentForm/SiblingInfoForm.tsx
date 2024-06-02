import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { SiblingInfo } from '../../../types';

interface SiblingInfoFormProps {
  siblingInfo: SiblingInfo;
  handleChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  addSibling: () => void;
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

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const SiblingInfoForm: React.FC<SiblingInfoFormProps> = ({
  siblingInfo,
  handleChange,
  addSibling,
}) => {
  const { t } = useTranslation('studentInfo');
  return (
    <FormContainer>
      {siblingInfo.siblingNames.map((sibling, index) => (
        <div key={index}>
          <Label>{t('siblingName')}:</Label>
          <Input
            type="text"
            value={sibling}
            onChange={(e) => handleChange(index, e)}
          />
        </div>
      ))}
      <Button type="button" onClick={addSibling}>
        {t('addSibling')}
      </Button>
    </FormContainer>
  );
};

export default SiblingInfoForm;
