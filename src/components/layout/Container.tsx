import React from "react";
import styled from "styled-components";

const StyledContainer = styled.section`
  margin-bottom: 20px; // ここでセクションごとのmargin-bottomを指定
  @media screen and (max-width: 600px) {
    max-width: 400px;
  }
`;

const Container = ({ children }: { children: React.ReactNode }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
