import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled.label`
  display: flex;
  align-items: center;
  justify-content: left;
  cursor: pointer;
  margin: 5px 0;
  position: relative;
`;

const HiddenRadio = styled.input.attrs({ type: "radio" })`
  opacity: 0;
  position: absolute;
  width: 0;
  height: 0;
`;

const StyledRadio = styled(motion.div)`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #007bff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: #fff; // 背景色を白に設定

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: #007bff;
    border-radius: 50%;
    transform: scale(
      ${(props) => (props.checked ? 0.5 : 0)}
    ); // 選択時は中心に小さな円を表示
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scale(
      ${(props) => (props.checked ? 0.5 : 0.7)}
    ); // マウスオーバー時にリップルエフェクト
  }

  &:active::after {
    transform: scale(0.9);
  }
`;

const Label = styled.span`
  font-size: 16px;
  color: #333;
  margin-left: 8px;
`;

const RadioButton = ({ label, name, value, checked, onChange }) => {
  // onChangeイベントハンドラを修正
  const handleChange = (e) => {
    // オリジナルのonChangeプロパティがあれば呼び出す
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Container>
      <HiddenRadio
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange} // 修正したhandleChangeを使用
      />
      <StyledRadio
        checked={checked}
        animate={{ scale: checked ? 1.1 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      />
      <Label>{label}</Label>
    </Container>
  );
};

export default RadioButton;
