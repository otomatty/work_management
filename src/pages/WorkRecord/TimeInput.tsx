import React, { useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin: 10px 0;
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333;
  font-weight: 500;
  width: 12%;
`;

const Input = styled.input`
  cursor: text;
  width: 88%;
  padding: 8px;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 5px;
  transition:
    border-color 0.3s,
    box-shadow 0.3s,
    background-color 0.3s,
    color 0.3s;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
    outline: none;
    background-color: #e6f7ff;
    color: #0056b3;
  }

  &:hover {
    border-color: #0056b3;
  }
`;

interface TimeInputProps {
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  value: string; // 親コンポーネントから受け取る時間の値
}

const TimeInput: React.FC<TimeInputProps> = ({
  label,
  onChange,
  placeholder,
  value,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    if (inputRef.current) {
      onChange(inputRef.current.value);
    }
  };

  return (
    <Container>
      <Label>{label}</Label>
      <Input
        ref={inputRef}
        type="time"
        onChange={handleChange}
        placeholder={placeholder}
        value={value} // Input 要素に value 属性を追加
      />
    </Container>
  );
};

export default TimeInput;
