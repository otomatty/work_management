import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const CheckboxContainer = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  opacity: 0;
  position: absolute;
  margin: 0;
`;

const StyledCheckbox = styled(motion.div)`
  display: inline-flex;
  width: 20px;
  height: 20px;
  background: ${(props) => (props.checked ? "#007bff" : "transparent")};
  border-radius: 3px;
  transition: all 150ms;
  border: 2px solid #007bff;
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
  }
  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;

// アニメーションのバリアントを定義
const checkboxVariants = {
  checked: { scale: 1.2 },
  unchecked: { scale: 1 },
};

const Checkbox = ({ className, checked, ...props }) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox
      checked={checked}
      variants={checkboxVariants}
      animate={checked ? "checked" : "unchecked"}
    >
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);

export default Checkbox;
