import styled from "styled-components";

export const DropdownItem = styled.div<{ $isCloseButton?: boolean }>`
  cursor: pointer;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  background-color: ${(props) =>
    props.$isCloseButton ? "#007bff" : "#f9f9f9"};
  color: ${(props) => (props.$isCloseButton ? "white" : "black")};
  text-align: ${(props) => (props.$isCloseButton ? "center" : "left")};
  &:hover {
    background-color: ${(props) =>
      props.$isCloseButton ? "#0056b3" : "#f1f1f1"};
  }
`;
