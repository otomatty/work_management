import React from "react";
import styled from "styled-components";

interface SectionProps {
  marginBottom?: string; // margin-bottom の値をオプショナルで受け取る
  children: React.ReactNode; // 子要素を受け取る
}

// styled-components を使用してスタイル付きの div を作成
const StyledSection = styled.div<{ $marginBottom?: string }>`
  margin-bottom: ${(props) =>
    props.$marginBottom || "20px"}; // デフォルト値は 20px
`;

const Section: React.FC<SectionProps> = ({ marginBottom, children }) => {
  return <StyledSection $marginBottom={marginBottom}>{children}</StyledSection>;
};

export default Section;
