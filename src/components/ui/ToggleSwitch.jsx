import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// スタイル定義
const SwitchLabel = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled(motion.span)`
  position: relative;
  cursor: pointer;
  width: 60px;
  height: 34px;
  border-radius: 34px;
  display: flex;
  align-items: center;
`;

const SliderButton = styled(motion.span)`
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const LabelText = styled.span`
  color: #333;
  font-weight: bold;
  text-align: center;
  display: inline-block;
  width: 100px;
`;

// コンポーネント定義
const ToggleSwitch = ({ label, isChecked, onChange, checkedColor }) => {
  const sliderVariants = {
    checked: {
      backgroundColor: checkedColor || "#007bff", // Use checkedColor or default to "#007bff"
    },
    unchecked: {
      backgroundColor: "#ccc",
    },
  };

  const sliderButtonVariants = {
    checked: {
      x: 26, // オンの状態でのSliderButtonの位置
      transition: { type: "spring", stiffness: 700, damping: 30 }, // スプリングアニメーションを適用
    },
    unchecked: {
      x: 0, // オフの状態でのSliderButtonの位置
      transition: { type: "spring", stiffness: 700, damping: 30 }, // スプリングアニメーションを適用
    },
  };
  return (
    <SwitchLabel>
      <LabelText>{label}</LabelText>
      <SwitchInput type="checkbox" checked={isChecked} onChange={onChange} />
      <Slider
        className="slider"
        variants={sliderVariants}
        initial={false} // Ensure the animation plays from the initial state
        animate={isChecked ? "checked" : "unchecked"} // Use the condition to switch between variants
      >
        <SliderButton
          initial={false}
          animate={isChecked ? "checked" : "unchecked"} // isCheckedの値に基づいてアニメーションを切り替え
          variants={sliderButtonVariants}
        />
      </Slider>
    </SwitchLabel>
  );
};

export default ToggleSwitch;
