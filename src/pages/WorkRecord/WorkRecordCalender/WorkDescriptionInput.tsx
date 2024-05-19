import React from "react";
import styled from "styled-components";
import Section from "../../../components/layout/SectionComponent";
import ModalSubTitle from "../../../components/atoms/ModalSubTitle/ModalSubTitle";

const TextArea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none; // リサイズ不可に設定
`;

interface WorkDescriptionInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const WorkDescriptionInput: React.FC<WorkDescriptionInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <Section marginBottom="20px">
      <ModalSubTitle>業務内容</ModalSubTitle>
      <TextArea
        value={value}
        onChange={onChange}
        rows={5}
        placeholder="業務内容を入力してください"
      />
    </Section>
  );
};

export default WorkDescriptionInput;
