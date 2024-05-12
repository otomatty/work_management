import React from "react";
import styled from "styled-components";
import { FaCaretDown } from "react-icons/fa"; // ドロップダウンアイコン用

// スタイル定義
const SelectContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 15px;
  padding-right: 35px; // アイコンのスペースを確保
  border-radius: 8px;
  border: 2px solid #ccc;
  background-color: white;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  appearance: none; // ネイティブのセレクトボックスのスタイルを無効化
  &:focus {
    outline: none;
    border-color: #007bff;
  }
  &:hover {
    border-color: #0056b3; // ホバー時のボーダーカラー
  }
`;

const Icon = styled(FaCaretDown)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none; // アイコン上でのクリックを無効化
`;

const Option = styled.option``;

// コンポーネント定義
const SelectBox = ({ options, defaultValue, onChange }) => {
  return (
    <SelectContainer>
      <Select defaultValue={defaultValue} onChange={onChange}>
        {options.map((option, index) => (
          <Option key={index} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
      <Icon />
    </SelectContainer>
  );
};

export default SelectBox;
