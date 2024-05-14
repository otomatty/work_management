import styled from "styled-components";

// ButtonGroup コンポーネントの定義
const ButtonGroup = styled.div<{ $gap?: number }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.$gap || 8}px; // デフォルトの間隔は8px
`;

export default ButtonGroup;
