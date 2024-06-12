import React, { useState } from "react";
import styled from "styled-components";
import { FaBackspace, FaRedo } from "react-icons/fa"; // アイコンをインポート

const PinContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PinInputField = styled.input`
  width: 200px; /* 入力欄を大きくする */
  height: 50px; /* 入力欄を大きくする */
  font-size: 36px; /* フォントサイズを大きくする */
  text-align: center;
  margin: 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
`;

const KeypadContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 20px;
`;

const KeypadButton = styled.button`
  width: 60px;
  height: 60px;
  font-size: 24px;
  border: 2px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const ActionButton = styled.button`
  width: 60px;
  height: 60px;
  font-size: 24px; /* アイコンのサイズに合わせる */
  border: 2px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const SubmitButton = styled.button`
  width: 200px;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const PinInput: React.FC<{ onSubmit: (pin: string) => void }> = ({
  onSubmit,
}) => {
  const [pin, setPin] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 4) {
      setPin(value);
    }
  };

  const handleKeypadClick = (num: string) => {
    if (pin.length < 4) {
      setPin(pin + num);
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const handleReset = () => {
    setPin("");
  };

  const handleSubmit = () => {
    onSubmit(pin);
  };

  return (
    <PinContainer>
      <PinInputField
        type="text"
        value={pin}
        onChange={handleChange}
        maxLength={4}
        readOnly
      />
      <KeypadContainer>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
          <KeypadButton key={num} onClick={() => handleKeypadClick(num)}>
            {num}
          </KeypadButton>
        ))}
        <ActionButton onClick={handleReset}>
          <FaRedo />
        </ActionButton>
        <KeypadButton onClick={() => handleKeypadClick("0")}>0</KeypadButton>
        <ActionButton onClick={handleDelete}>
          <FaBackspace />
        </ActionButton>
      </KeypadContainer>
      <SubmitButton onClick={handleSubmit}>決定</SubmitButton>
    </PinContainer>
  );
};

export default PinInput;
